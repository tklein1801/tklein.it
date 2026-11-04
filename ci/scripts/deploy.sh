#!/bin/sh
set -eu
set +x

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

validate_arguments() {
  [ "$#" -eq 8 ] || fail "Usage: $0 DIRECTORY IMAGE@sha256:DIGEST COMPOSE_FILE SERVICE PROJECT HEALTH_TIMEOUT REGISTRY_HOST LOGIN_REQUIRED"
  deployment_dir=$1
  image=$2
  compose_file=$3
  service=$4
  project_name=$5
  health_timeout=$6
  registry_host=$7
  registry_login_required=$8

  case "$image" in
    *@sha256:*) repository=${image%@sha256:*}; digest=${image##*@sha256:} ;;
    *) fail "Image must be a complete sha256 digest reference" ;;
  esac
  case "$repository" in
    ''|-*|*[!a-zA-Z0-9._/:@-]*|*@*) fail "Invalid image repository" ;;
  esac
  case "$digest" in
    *[!0-9a-f]*|'') fail "Invalid sha256 digest" ;;
  esac
  [ "${#digest}" -eq 64 ] || fail "Invalid sha256 digest length"
  case "$health_timeout" in ''|*[!0-9]*) fail "Health timeout must be a positive integer" ;; esac
  [ "$health_timeout" -gt 0 ] || fail "Health timeout must be a positive integer"
  case "$compose_file" in ''|/*|*[!a-zA-Z0-9_./-]*|*..*) fail "Invalid Compose file path" ;; esac
  case "$service" in ''|*[!a-zA-Z0-9_.-]*) fail "Invalid service name" ;; esac
  case "$project_name" in ''|*[!a-zA-Z0-9_-]*) fail "Invalid Compose project name" ;; esac
  case "$registry_host" in ''|*[!a-zA-Z0-9.-]*) fail "Invalid registry host" ;; esac
  case "$registry_login_required" in true|false) ;; *) fail "Registry login setting must be true or false" ;; esac
}

check_requirements() {
  command -v docker >/dev/null 2>&1 || fail "Docker is required"
  docker compose version >/dev/null 2>&1 || fail "Docker Compose is required"
  compose_up_help=$(docker compose up --help) || fail "Cannot inspect Docker Compose up options"
  printf '%s\n' "$compose_up_help" | grep -Eq '(^|[[:space:],])--wait([[:space:],=]|$)' || fail "Docker Compose must support up --wait"
  printf '%s\n' "$compose_up_help" | grep -Eq '(^|[[:space:],])--wait-timeout([[:space:],=]|$)' || fail "Docker Compose must support up --wait-timeout"
  docker info >/dev/null 2>&1 || fail "Docker daemon is unavailable"
  [ -d "$deployment_dir" ] || fail "Deployment directory does not exist: $deployment_dir"
  cd "$deployment_dir" || fail "Cannot enter deployment directory"
  [ -d repository ] || fail "Compose deployment package is missing"
  [ -f .image-override.next.yml ] && [ -r .image-override.next.yml ] || fail "Image override file is required"
  [ -f "repository/$compose_file" ] && [ -r "repository/$compose_file" ] || fail "Compose file is missing from the deploy package"
}

compose() {
  docker compose --project-directory "$project_dir" -p "$project_name" -f "$@"
}

cleanup() {
  set +e
  cleanup_failed=0
  [ -z "$temp_file" ] || rm -f "$temp_file"
  [ -z "$backup_file" ] || rm -f "$backup_file"
  [ -z "$compose_backup_file" ] || rm -f "$compose_backup_file"
  if [ -n "$docker_config_dir" ]; then
    rm -f "$docker_config_dir/config.json" || { printf '%s\n' "Cannot remove temporary Docker credentials: $docker_config_dir" >&2; cleanup_failed=1; }
    rmdir "$docker_config_dir" || { printf '%s\n' "Cannot remove temporary Docker directory: $docker_config_dir" >&2; cleanup_failed=1; }
  fi
  rmdir .deploy.lock
  [ "$cleanup_failed" -eq 0 ] || exit 1
}

initialize_deployment() {
  # Both Compose files must use the same project name.
  project_dir=$(pwd -P)
  project_name=$configured_project

  mkdir .deploy.lock 2>/dev/null || fail "Deployment is already running or .deploy.lock cannot be created"
  temp_file=
  backup_file=
  compose_backup_file=
  docker_config_dir=
  trap cleanup 0
  trap 'exit 1' HUP INT TERM
  temp_file=$(mktemp .deploy-image.XXXXXX) || fail "Cannot create deployment state file"
  export DEPLOY_IMAGE="$image"
}

validate_compose() {
  services=$(compose repository/"$compose_file" -f .image-override.next.yml config --services) || fail "Cannot inspect Compose services"
  printf '%s\n' "$services" | grep -Fxq "$service" || fail "Service '$service' is not defined in the Compose file"
  configured_images=$(compose repository/"$compose_file" -f .image-override.next.yml config --images) || fail "Cannot inspect Compose images"
  [ "$(printf '%s\n' "$configured_images" | grep -Fxc "$image")" -eq 1 ] || fail "Image override does not contain exactly the selected digest"
  compose repository/"$compose_file" -f .image-override.next.yml config -q || fail "Invalid Compose configuration"
}

backup_current_deployment() {
  previous_image=
  if [ -f .image-override.yml ] && [ -f .compose.yml ]; then
    container=$(compose .compose.yml -f .image-override.yml ps --all -q "$service") || fail "Cannot inspect current service"
    if [ -n "$container" ]; then
      previous_image=$(docker inspect --format '{{.Config.Image}}' "$container") || fail "Cannot inspect current image"
    elif [ -f .deploy-image ]; then
      IFS= read -r previous_image < .deploy-image || fail "Cannot read previous image"
    fi
    backup_file=$(mktemp .compose-backup.XXXXXX) || fail "Cannot create image override backup"
    cp .image-override.yml "$backup_file" || fail "Cannot back up image override"
    compose_backup_file=$(mktemp .compose-file-backup.XXXXXX) || fail "Cannot create Compose backup"
    cp .compose.yml "$compose_backup_file" || fail "Cannot back up Compose file"
  fi
}

service_is_healthy() {
  container=$(compose "$@" ps -q "$service") || return 1
  [ -n "$container" ] || return 1
  status=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$container") || return 1
  [ "$status" = healthy ]
}

rollback() {
  if [ -n "$previous_image" ]; then
    printf '%s\n' "Restoring previous image: $previous_image" >&2
    printf 'services:\n  "%s":\n    image: "%s"\n' "$service" "$previous_image" > .image-override.rollback.yml
    if ! compose .compose.yml -f .image-override.rollback.yml up -d --no-deps --pull never --no-build --wait --wait-timeout "$health_timeout" "$service" ||
       ! service_is_healthy .compose.yml -f .image-override.rollback.yml; then
      printf '%s\n' "Rollback failed; manual intervention is required" >&2
    fi
    rm -f .image-override.rollback.yml
  else
    printf '%s\n' "No previous image is available; stopping the failed first deployment" >&2
    compose .compose.next.yml -f .image-override.next.yml stop "$service" >/dev/null 2>&1 || :
    compose .compose.next.yml -f .image-override.next.yml rm -f "$service" >/dev/null 2>&1 || :
  fi
}

pull_image() {
  docker pull "$image" || fail "Image pull failed; running service was not changed"
}

login_registry() {
  [ "$registry_login_required" = true ] || return 0
  [ -d .registry-credentials ] && [ ! -L .registry-credentials ] || fail "Registry credentials directory is required"
  [ -f .registry-credentials/username ] && [ -r .registry-credentials/username ] || fail "Readable registry username is required"
  [ -f .registry-credentials/password ] && [ -r .registry-credentials/password ] || fail "Readable registry password is required"
  registry_username=$(cat .registry-credentials/username) || fail "Cannot read registry username"
  [ -n "$registry_username" ] || fail "Registry username is empty"
  umask 077
  docker_config_dir=$(mktemp -d) || fail "Cannot create Docker configuration directory"
  DOCKER_CONFIG=$docker_config_dir
  export DOCKER_CONFIG
  docker_binary=$(command -v docker)
  docker_binary=$(CDPATH= cd "$(dirname "$docker_binary")" && pwd -P)/$(basename "$docker_binary")
  # Prevent Docker from discovering a host credential helper.
  PATH="$docker_config_dir" "$docker_binary" login "$registry_host" --username "$registry_username" --password-stdin < .registry-credentials/password >/dev/null 2>&1 || fail "Registry login failed; running service was not changed"
}

start_and_wait() {
  trap 'rollback; exit 1' HUP INT TERM
  if ! compose .compose.next.yml -f .image-override.next.yml up -d --no-deps --pull never --no-build --wait --wait-timeout "$health_timeout" "$service"; then
    rollback
    fail "Deployment failed"
  fi
  if ! service_is_healthy .compose.next.yml -f .image-override.next.yml; then
    rollback
    fail "Service did not become healthy"
  fi
}

restore_compose_backup() {
  if [ -n "$backup_file" ]; then
    mv -f "$backup_file" .image-override.yml || printf '%s\n' "Cannot restore override backup: $backup_file" >&2
    backup_file=
  fi
  if [ -n "$compose_backup_file" ]; then
    mv -f "$compose_backup_file" .compose.yml || printf '%s\n' "Cannot restore Compose backup: $compose_backup_file" >&2
    compose_backup_file=
  fi
  rollback
}

save_deployment() {
  # Promote Compose only after health succeeds, then atomically save the image state.
  if ! printf '%s\n' "$image" > "$temp_file"; then
    rollback
    fail "Cannot prepare deployed image state"
  fi
  # Finish the state change before reporting an interrupted deployment.
  interrupted=false
  trap 'interrupted=true' HUP INT TERM
  if ! cp repository/"$compose_file" .compose.next.yml || ! mv -f .compose.next.yml .compose.yml; then
    restore_compose_backup
    fail "Cannot promote Compose file"
  fi
  if ! mv -f .image-override.next.yml .image-override.yml; then
    restore_compose_backup
    rollback
    fail "Cannot promote image override"
  fi
  if ! mv -f "$temp_file" .deploy-image; then
    restore_compose_backup
    fail "Cannot save deployed image"
  fi
  temp_file=
  trap 'exit 1' HUP INT TERM
  [ "$interrupted" = false ] || fail "Deployment completed, but was interrupted during state promotion"
  printf '%s\n' "Deployment healthy: $image"
}

validate_arguments "$@"
configured_project=$project_name
registry_login_required=$8
check_requirements
initialize_deployment
validate_compose
backup_current_deployment
login_registry
pull_image
start_and_wait
save_deployment
