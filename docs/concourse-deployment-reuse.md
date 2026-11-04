# Reusing the Concourse Deployment

This guide explains how to reuse the deployment task and remote script in another Concourse project. It targets Linux VPS hosts that run applications with Docker Compose.

The shared deployment implementation consists of:

- `ci/tasks/deploy.task.yml`: validates deployment settings and assembles the package.
- `ci/scripts/deploy.sh`: authenticates to a registry, pulls an image, updates one Compose service, checks health, and attempts rollback.
- A Concourse `ssh-scp` resource: creates the target directory, transfers files, runs the script, and removes temporary credentials.

Copy both implementation files into the new repository, or keep them in a shared CI repository and reference them through a Git input. Keep the task and script versions synchronized.

## Requirements

The application repository must provide:

- A Docker image built and pushed before the deploy job runs.
- An immutable image digest from the same successful build as the source revision.
- A Compose file containing the service whose image the build produces.
- Any runtime files referenced by Compose, provisioned on the VPS before deployment.
- A healthcheck on the deployed service. Compose must support `up --wait` and `--wait-timeout`.

The VPS must provide Docker Engine, the Docker Compose plugin, SSH access, and permission for the SSH account to create the configured deployment directory. The server must be able to access the image registry.

Compose-relative files are included by copying the repository alongside the Compose file. Their relative references therefore resolve within that copied repository. Runtime-only configuration such as `.env` must be provisioned in the deployment directory separately. The deployment does not copy or overwrite runtime configuration files.

The service being deployed must use an `image:` reference. The deployment overrides this service image with the selected digest and runs Compose with `--no-build`. Other Compose services may remain in the file, but the job updates only the configured service and does not start its dependencies because it uses `--no-deps`.

## Configure deployment values

Add values like these to the pipeline vars file:

```yaml
deployment:
  path: services/example
  project: example-production
  compose_file: docker-compose.yml
  service: app
  health_timeout: '60'
  registry:
    host: ghcr.io
    login_required: 'true'
```

`path` must be relative to the SSH user's home directory. The task rejects absolute paths and unsafe path components. `project` must remain stable across releases. If adopting an existing Compose deployment, use the same project name that currently owns its containers.

`compose_file` is a path inside the repository input. `service` names the service receiving the new image. `health_timeout` is a positive number of seconds. `registry.host` names the registry host without a scheme. Set `login_required` to `'false'` for public images; otherwise provide read-only credentials in Concourse's credential manager.

The current task expects these Concourse variables:

| Pipeline value | Task parameter | Purpose |
| --- | --- | --- |
| `deployment.path` | `DEPLOY_PATH` | Remote working directory, relative to SSH home. |
| `deployment.service` | `DEPLOY_SERVICE` | Compose service to update. |
| `deployment.compose_file` | `DEPLOY_COMPOSE_FILE` | Compose file path inside the repository. |
| `deployment.project` | `DEPLOY_PROJECT` | Stable Compose project name. |
| `deployment.health_timeout` | `DEPLOY_HEALTH_TIMEOUT` | Wait limit for startup and rollback. |
| `deployment.registry.host` | `REGISTRY_HOST` | Registry for `docker login`. |
| `deployment.registry.login_required` | `REGISTRY_LOGIN_REQUIRED` | Whether registry login is required. |
| Vault credential | `REGISTRY_USERNAME` | Registry account name. |
| Vault credential | `REGISTRY_PASSWORD` | Registry read token. |

Keep registry credentials separate from image-push credentials. Use a token with package read access only. Never put secrets in the vars file.

## Configure Concourse resources

Define the SSH/SCP resource in the consuming pipeline. The resource must support a `put` with `files` and `commands`, and it must enforce a pinned `known_hosts` value:

```yaml
resources:
  - name: server-target
    type: ssh-scp
    source:
      user: ((deployment-vps.ssh_username))
      host: ((deployment-vps.host))
      known_hosts: ((deployment-vps.known_hosts))
      private_key: ((deployment-vps.ssh_private_key))
```

Also define `repository`, `container-registry`, and `ci-source` inputs. `container-registry` must expose `repository` and `digest` files when fetched with `skip_download: true`. The selected registry version and repository version must both have passed through the same successful build job.

## Add the deployment job

The following example shows the required sequence. Adapt resource names and credential paths to the consuming pipeline:

```yaml
jobs:
  - name: deploy
    serial: true
    plan:
      - in_parallel:
          - get: repository
            passed: [build]
          - get: container-registry
            passed: [build]
            params: {skip_download: true}
          - get: ci-source
      - task: assemble-deployment
        file: ci-source/ci/tasks/deploy.task.yml
        params:
          DEPLOY_PATH: ((deployment.path))
          DEPLOY_SERVICE: ((deployment.service))
          DEPLOY_COMPOSE_FILE: ((deployment.compose_file))
          DEPLOY_PROJECT: ((deployment.project))
          DEPLOY_HEALTH_TIMEOUT: ((deployment.health_timeout))
          REGISTRY_HOST: ((deployment.registry.host))
          REGISTRY_LOGIN_REQUIRED: ((deployment.registry.login_required))
          REGISTRY_USERNAME: ((deployment-registry.username))
          REGISTRY_PASSWORD: ((deployment-registry.password))
      - load_var: deploy-image
        file: deploy-files/image-ref
        format: trim
      - put: server-target
        inputs: []
        no_get: true
        params:
          commands:
            - "mkdir -p -- '((deployment.path))' && umask 077 && mkdir -- '((deployment.path))/.registry-credentials'"
      - do:
          - put: server-target
            inputs: [deploy-files, registry-credentials]
            no_get: true
            params:
              files:
                'deploy-files/compose.next.yml': '((deployment.path))/.compose.next.yml'
                'deploy-files/image-override.yml': '((deployment.path))/.image-override.next.yml'
                'deploy-files/repository': '((deployment.path))/repository'
                'deploy-files/deploy.next.sh': '((deployment.path))/deploy.next.sh'
                'registry-credentials/username': '((deployment.path))/.registry-credentials/username'
                'registry-credentials/password': '((deployment.path))/.registry-credentials/password'
              commands:
                - "sh '((deployment.path))/deploy.next.sh' '((deployment.path))' '((.:deploy-image))' '((deployment.compose_file))' '((deployment.service))' '((deployment.project))' '((deployment.health_timeout))' '((deployment.registry.host))' '((deployment.registry.login_required))'"
        ensure:
          put: server-target
          inputs: []
          no_get: true
          params:
            commands:
              - "if [ -d '((deployment.path))/.registry-credentials' ]; then rm -f -- '((deployment.path))/.registry-credentials/username' '((deployment.path))/.registry-credentials/password' && rmdir -- '((deployment.path))/.registry-credentials'; fi"
```

`serial: true` prevents overlapping builds of this deploy job. Use only one pipeline or manual deployment per target directory. The resource's `ensure` removes the credential files after normal success or failure. A worker loss, network break, or server outage can prevent cleanup, so inspect the directory before retrying if a run was interrupted.

## Deployment behavior

The task reads the repository and digest from the successful build and creates a digest-pinned Compose override for the configured service. On the server, the script validates the Compose model, logs into the registry when configured, and pulls the exact image before changing the running service. It then runs only the target service with `--no-deps --no-build` and waits up to the configured timeout for a healthy status.

If an update fails, the script attempts to restart the previous image and checks its health. On a failed first deployment, it stops and removes the failed target service. One-service Compose deployments can still have a short interruption during container replacement.

The script stores the Compose file, image override, and last deployed digest in the target directory. Do not change the configured project name after first deployment unless intentionally migrating the Compose project. Keep prior images available in the registry for redeployment and rollback.

## Validate before enabling

Validate the assembled pipeline and inspect the resolved task parameters:

```sh
fly -t ci validate-pipeline -c ci/ci.pipeline.yml -l ci/vars.yml --strict
```

Before enabling automatic deploys, verify the following:

1. The Compose file and configured service exist in the repository.
2. The service has an image field and a functioning healthcheck.
3. Runtime files exist in the target directory with restricted permissions.
4. The SSH user can write to the target path and access Docker without an interactive prompt.
5. A read-only registry token can pull the image, or the image is public and login is disabled.
6. The build publishes a digest and both deploy inputs are tied to the same successful build.
7. The initial Compose project name does not conflict with a different existing project.
8. A manual first deployment and a rollback test succeed before automatic triggering is enabled.

The pipeline task and remote script are project-neutral, but the current SSH resource name, input names, and Vault variable paths in the example are conventions. Adapt those bindings when reusing the files in a different pipeline.
