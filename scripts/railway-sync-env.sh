#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash scripts/railway-sync-env.sh [--environment <name>] [--deploy] [env_file]

Examples:
  bash scripts/railway-sync-env.sh
  bash scripts/railway-sync-env.sh --environment production
  bash scripts/railway-sync-env.sh --environment production --deploy .env

Notes:
  - Run `railway login` and `railway link` first.
  - Set each service's Config as Code path in Railway dashboard:
    admin-api -> /apps/admin-api/railway.json
    worker    -> /apps/worker/railway.json
EOF
}

ENV_FILE=".env"
RAILWAY_ENVIRONMENT=""
DEPLOY_AFTER_SYNC=0
ENV_FILE_EXPLICIT=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --deploy)
      DEPLOY_AFTER_SYNC=1
      shift
      ;;
    -e|--environment)
      if [[ $# -lt 2 ]]; then
        echo "Missing value for $1" >&2
        exit 1
      fi
      RAILWAY_ENVIRONMENT="$2"
      shift 2
      ;;
    *)
      if [[ "$ENV_FILE_EXPLICIT" -eq 1 ]]; then
        echo "Unexpected argument: $1" >&2
        usage >&2
        exit 1
      fi
      ENV_FILE="$1"
      ENV_FILE_EXPLICIT=1
      shift
      ;;
  esac
done

if ! command -v railway >/dev/null 2>&1; then
  echo "railway CLI is not installed." >&2
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Env file not found: $ENV_FILE" >&2
  exit 1
fi

if ! railway whoami >/dev/null 2>&1; then
  echo "Railway CLI is not authenticated. Run: railway login" >&2
  exit 1
fi

if ! railway status >/dev/null 2>&1; then
  echo "This directory is not linked to a Railway project. Run: railway link" >&2
  exit 1
fi

get_env_value() {
  local key="$1"
  local line

  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -n 1 || true)"
  if [[ -z "$line" ]]; then
    return 1
  fi

  line="${line%$'\r'}"
  line="${line#*=}"

  if [[ "${line:0:1}" == '"' && "${line: -1}" == '"' ]]; then
    line="${line:1:${#line}-2}"
  elif [[ "${line:0:1}" == "'" && "${line: -1}" == "'" ]]; then
    line="${line:1:${#line}-2}"
  fi

  printf '%s' "$line"
}

get_env_or_default() {
  local key="$1"
  local fallback="$2"

  if get_env_value "$key" >/dev/null 2>&1; then
    get_env_value "$key"
    return 0
  fi

  printf '%s' "$fallback"
}

require_env() {
  local key="$1"
  local value

  if ! value="$(get_env_value "$key")" || [[ -z "$value" ]]; then
    echo "Missing required key in $ENV_FILE: $key" >&2
    exit 1
  fi

  printf '%s' "$value"
}

set_service_var() {
  local service="$1"
  local key="$2"
  local value="$3"

  printf 'Setting %s for %s\n' "$key" "$service" >&2
  if [[ -n "$RAILWAY_ENVIRONMENT" ]]; then
    printf '%s' "$value" | railway variable set "$key" -s "$service" -e "$RAILWAY_ENVIRONMENT" --stdin --skip-deploys >/dev/null
  else
    printf '%s' "$value" | railway variable set "$key" -s "$service" --stdin --skip-deploys >/dev/null
  fi
}

sync_admin_api() {
  local app_name node_env mongo_uri mongo_db redis_url admin_api_port thirdweb_secret chain_id

  app_name="$(get_env_or_default "APP_NAME" "X402 App Store")"
  node_env="$(get_env_or_default "NODE_ENV" "production")"
  mongo_uri="$(require_env "MONGODB_URI")"
  mongo_db="$(require_env "MONGODB_DB_NAME")"
  redis_url="$(require_env "REDIS_URL")"
  admin_api_port="$(get_env_or_default "ADMIN_API_PORT" "4000")"
  thirdweb_secret="$(require_env "THIRDWEB_SECRET_KEY")"
  chain_id="$(get_env_or_default "NEXT_PUBLIC_DEFAULT_CHAIN_ID" "8453")"

  set_service_var "admin-api" "APP_NAME" "$app_name"
  set_service_var "admin-api" "NODE_ENV" "$node_env"
  set_service_var "admin-api" "MONGODB_URI" "$mongo_uri"
  set_service_var "admin-api" "MONGODB_DB_NAME" "$mongo_db"
  set_service_var "admin-api" "REDIS_URL" "$redis_url"
  set_service_var "admin-api" "ADMIN_API_PORT" "$admin_api_port"
  set_service_var "admin-api" "THIRDWEB_SECRET_KEY" "$thirdweb_secret"
  set_service_var "admin-api" "NEXT_PUBLIC_DEFAULT_CHAIN_ID" "$chain_id"
}

sync_worker() {
  local app_name node_env mongo_uri mongo_db redis_url concurrency chain_id

  app_name="$(get_env_or_default "APP_NAME" "X402 App Store")"
  node_env="$(get_env_or_default "NODE_ENV" "production")"
  mongo_uri="$(require_env "MONGODB_URI")"
  mongo_db="$(require_env "MONGODB_DB_NAME")"
  redis_url="$(require_env "REDIS_URL")"
  concurrency="$(get_env_or_default "WORKER_CONCURRENCY" "5")"
  chain_id="$(get_env_or_default "NEXT_PUBLIC_DEFAULT_CHAIN_ID" "8453")"

  set_service_var "worker" "APP_NAME" "$app_name"
  set_service_var "worker" "NODE_ENV" "$node_env"
  set_service_var "worker" "MONGODB_URI" "$mongo_uri"
  set_service_var "worker" "MONGODB_DB_NAME" "$mongo_db"
  set_service_var "worker" "REDIS_URL" "$redis_url"
  set_service_var "worker" "WORKER_CONCURRENCY" "$concurrency"
  set_service_var "worker" "NEXT_PUBLIC_DEFAULT_CHAIN_ID" "$chain_id"
}

deploy_service() {
  local service="$1"

  echo "Deploying $service" >&2
  if [[ -n "$RAILWAY_ENVIRONMENT" ]]; then
    railway up -s "$service" -e "$RAILWAY_ENVIRONMENT"
  else
    railway up -s "$service"
  fi
}

echo "Syncing Railway variables from $ENV_FILE" >&2
sync_admin_api
sync_worker

echo "Variable sync complete." >&2

if [[ "$DEPLOY_AFTER_SYNC" -eq 1 ]]; then
  deploy_service "admin-api"
  deploy_service "worker"
fi
