# Concourse CI

The pipeline is defined in `ci/ci.pipeline.yml`. Non-secret values are in `ci/vars.yml`.

| Job | Behavior |
| --- | --- |
| `build` | Verify the repository and push the image to GHCR with the short commit hash and `latest`. |
| `deploy` | Deploy the image digest from a successful build over SSH. |
| `pull-request` | Verify pull requests and report their status. |
| `update-dependencies` | Periodically update dependencies and push changes to the repository. |

## Pipeline setup

Concourse credential management must provide `github.private_key`, `github.pat`, `docker.username`, and `docker.password`. The SSH resource also requires `deployment-vps1.ssh_username`, `deployment-vps1.host`, `deployment-vps1.known_hosts`, and `deployment-vps1.ssh_private_key`. Keep credentials out of `ci/vars.yml`.

Configure `deployment.path`, `deployment.project`, `deployment.compose_file`, `deployment.service`, `deployment.health_timeout`, and `deployment.registry` in `ci/vars.yml`. The path is relative to the SSH user's home directory. Use only letters, digits, `_`, `-`, `.`, and `/`. The SSH user must be able to create and write this directory.

```sh
fly -t ci validate-pipeline -c ./ci/ci.pipeline.yml -l ./ci/vars.yml --strict
fly -t ci set-pipeline -p tklein.it -c ./ci/ci.pipeline.yml -l ./ci/vars.yml
fly -t ci unpause-pipeline -p tklein.it
```

The deploy job triggers after a successful image build. Both build and deploy jobs run serially. A later rerun of an older build can still trigger an older deployment.

## Server preparation

Install Docker Engine and the Docker Compose plugin on the target server. The Compose plugin must support `up --wait` and `--wait-timeout`. The SSH user needs access to Docker without an interactive password. Configure the SSH host key in `deployment-vps1.known_hosts`.

The pipeline creates the deployment directory if it does not exist. The SSH user needs permission to create it in its parent directory. Runtime files referenced by Compose must exist in the deployment directory. Keep local Compose paths relative to the repository so the pipeline can transfer them. Supply runtime configuration files such as `.env` in the deployment directory before deployment. The deployment does not overwrite these runtime configuration files.

The deployment uses a Compose project name derived from the server directory. It does not adopt an existing service from another Compose project. Stop or migrate such a service before the first deployment, especially if it already uses the configured port.

When `deployment.registry.login_required` is true, the deploy job uses `docker.username` and `docker.password` from Concourse credential management to authenticate to `deployment.registry.host` on the server. The credential must allow reading the package. The SSH user must be able to create private directories in the deployment directory. The deployment uses a temporary Docker configuration and removes the transferred credentials after use. Only one pipeline or manual deployment may use this directory at a time.

If a server or worker failure interrupts cleanup, `.registry-credentials` or a temporary Docker configuration may remain. Check and remove stale credentials securely before retrying. A stale `.registry-credentials` directory blocks a new deployment rather than overwriting existing files.

## Deployment and rollback

The deploy job receives the repository and image digest from the same successful build. It creates a Compose override for the configured service and passes the complete digest reference. It never uses `latest` for a deployment. Other services in the Compose file are allowed, but the deployment updates only the configured service. Build-backed services must not rely on a `build:` directive because deployment runs Compose with `--no-build`.

The server pulls the selected image before replacing the running container. Compose then waits up to 60 seconds for the container healthcheck. A failed update attempts to restore the previous successful deployment and waits for it to become healthy. A first deployment has no previous version to restore. A single Compose service can still have a short interruption during replacement.

The script keeps the last successful Compose file and image reference in the deployment directory. Rollback requires the previous image to remain in the local Docker cache. A lock directory prevents concurrent script execution, but does not protect file transfers. Only one pipeline should target this directory. If a server interruption leaves `.deploy.lock` behind, verify that no deployment is running before removing it manually.

To repeat an earlier deployment, rerun the corresponding `deploy` job build with the same inputs:

```sh
fly -t ci rerun-build -j tklein.it/deploy -b 14 --watch
```

The command refers to deploy build 14, not build-job run 14. The digest must still exist in GHCR. Historical deploy runs from before digest-based deployment do not have the required inputs. Older repository versions whose Compose file does not support `DEPLOY_IMAGE` cannot safely be deployed through this workflow.
