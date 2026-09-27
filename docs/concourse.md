# Concourse CI

The pipeline is defined in `ci/ci.yml`, non-secret values in `ci/vars.yml`, and the verification task in `ci/tasks/verify.yml`.

| Job | Trigger and behavior |
| --- | --- |
| `build` | New version of the `repository` Git resource: `npm install`, lint, tests, and Next build with Node 24; then push a Docker image to `ghcr.io/tklein1801/tklein.it` tagged `latest` and with the short commit hash. The Cogito resource reports build status to GitHub. |
| `pull-request` | PR targeting `main`: the same verification task, with status updates through the GitHub PR resource; no Docker build or image push. |

There are currently no separate branch pipelines, weekly `npm update` job, or GitHub Actions workflow in the repository. `npm test` currently permits zero tests.

## Setup

Concourse credential management must provide `github.private_key` (Git access), `github.pat` (PRs and commit statuses), and `docker.username` and `docker.password` (GHCR). Do not put credentials in `ci/vars.yml`. Check the token's GHCR write access and the package's intended visibility.

```sh
fly -t ci login
fly -t ci validate-pipeline -c ./.ci/ci.yml -l ./.ci/vars.yml --strict
fly -t ci set-pipeline -p tklein.it -c ./.ci/ci.yml -l ./.ci/vars.yml
fly -t ci unpause-pipeline -p tklein.it
```

Before using the pipeline, fix two issues in `ci/ci.yml`: the Git resource does not specify a `branch`, so `main` is not explicitly selected. In the PR job, `input_mapping` maps to `repo`, but `ci/tasks/verify.yml` requires an input named `repository`; the PR verification task therefore cannot start successfully. Then verify the build, PR status, and GHCR tags in Concourse/GitHub before making any status a required check.
