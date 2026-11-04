#!/bin/sh
set -eu

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

validate_arguments() {
  [ "$#" -eq 2 ] || fail "Usage: $0 DEPLOYMENT_DIRECTORY IMAGE@sha256:DIGEST"
  deployment_dir=$1
  image=$2

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
  [ -f compose.next.yml ] && [ -r compose.next.yml ] || fail "Readable compose.next.yml is required"
  [ -f .env ] && [ -r .env ] || fail "Readable .env is required"
}

compose() {
  docker compose --project-directory "$project_dir" -p "$project_name" -f "$@"
}

cleanup() {
  [ -z "$temp_file" ] || rm -f "$temp_file"
  [ -z "$backup_file" ] || rm -f "$backup_file"
  rmdir .deploy.lock
}

initialize_deployment() {
  # Both Compose files must use the same project name.
  project_dir=$(pwd -P)
  project_hash=$(printf '%s' "$project_dir" | cksum)
  project_hash=${project_hash%% *}
  project_name="tklein-it-$project_hash"

  mkdir .deploy.lock 2>/dev/null || fail "Deployment is already running or .deploy.lock cannot be created"
  temp_file=
  backup_file=
  trap cleanup 0
  trap 'exit 1' HUP INT TERM
  temp_file=$(mktemp .deploy-image.XXXXXX) || fail "Cannot create deployment state file"
  export DEPLOY_IMAGE="$image"
}

validate_compose() {
  services=$(compose compose.next.yml config --services) || fail "Cannot inspect Compose services"
  [ "$services" = web ] || fail "Compose configuration must contain only the web service"
  configured_image=$(compose compose.next.yml config --images) || fail "Cannot inspect Compose images"
  [ "$configured_image" = "$image" ] || fail "Compose image does not match the requested digest"
}

backup_current_deployment() {
  previous_image=
  if [ -f compose.yml ]; then
    container=$(compose compose.yml ps --all -q web) || fail "Cannot inspect current service"
    if [ -n "$container" ]; then
      previous_image=$(docker inspect --format '{{.Config.Image}}' "$container") || fail "Cannot inspect current image"
    elif [ -f .deploy-image ]; then
      IFS= read -r previous_image < .deploy-image || fail "Cannot read previous image"
    fi
    backup_file=$(mktemp .compose-backup.XXXXXX) || fail "Cannot create Compose backup"
    cp compose.yml "$backup_file" || fail "Cannot back up Compose configuration"
  fi
}

service_is_healthy() {
  container=$(compose "$1" ps -q web) || return 1
  [ -n "$container" ] || return 1
  status=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$container") || return 1
  [ "$status" = healthy ]
}

rollback() {
  if [ -n "$previous_image" ] && [ -f compose.yml ]; then
    printf '%s\n' "Restoring previous image: $previous_image" >&2
    if ! DEPLOY_IMAGE="$previous_image" compose compose.yml up -d --no-deps --pull never --wait --wait-timeout 60 web ||
       ! DEPLOY_IMAGE="$previous_image" service_is_healthy compose.yml; then
      printf '%s\n' "Rollback failed; manual intervention is required" >&2
    fi
  else
    printf '%s\n' "No previous Compose configuration and image are available for rollback" >&2
  fi
}

pull_image() {
  docker pull "$image" || fail "Image pull failed; running service was not changed"
}

start_and_wait() {
  trap 'rollback; exit 1' HUP INT TERM
  if ! compose compose.next.yml up -d --no-deps --pull never --wait --wait-timeout 60 web; then
    rollback
    fail "Deployment failed"
  fi
  if ! service_is_healthy compose.next.yml; then
    rollback
    fail "Service did not become healthy"
  fi
}

restore_compose_backup() {
  if [ -n "$backup_file" ]; then
    if mv -f "$backup_file" compose.yml; then
      backup_file=
      rollback
    else
      printf '%s\n' "Cannot restore Compose configuration; backup retained at $backup_file" >&2
      backup_file=
    fi
  else
    printf '%s\n' "No previous Compose configuration is available for rollback" >&2
  fi
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
  if ! mv -f compose.next.yml compose.yml; then
    rollback
    fail "Cannot promote Compose configuration"
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
check_requirements
initialize_deployment
validate_compose
backup_current_deployment
pull_image
start_and_wait
save_deployment
