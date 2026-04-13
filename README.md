# X402 App Store Project

Production-minded MVP scaffold for a USDT reward app store:

- `apps/web`: Next.js App Router storefront, wallet surface, and admin UI
- `apps/admin-api`: thin internal API for domain operations
- `apps/worker`: BullMQ workers for verification and reward processing
- `packages/*`: shared DTOs, models, env parsing, ledger helpers, queue definitions, fraud logic, blockchain config, and UI primitives
- `apps/*/railway.json`: service-specific Railway config for monorepo deployment

## Getting started

```bash
pnpm install
pnpm build
```

Copy `.env.example` to `.env` when you are ready to run services locally.

## Railway

This repo is a shared monorepo, so Railway services should build from the repo root and use service-specific commands.

Use these config paths when creating Railway services:

- `admin-api`: `/apps/admin-api/railway.json`
- `worker`: `/apps/worker/railway.json`
- `web` (optional, if you want Railway for the frontend too): `/apps/web/railway.json`

Recommended service layout:

- Deploy `admin-api` and `worker` on Railway
- Keep `web` on Vercel if you want the original split, or deploy `web` on Railway as a third service

Important monorepo note:

- Do not point the Railway Root Directory at `apps/admin-api`, `apps/worker`, or `apps/web` for this shared-workspace setup
- Keep the source at repo root and let each service use its own `buildCommand` / `startCommand`
- Railway's docs note that config-file paths are absolute-from-repo-root and do not follow Root Directory

Suggested Railway variables:

- `MONGODB_URI`
- `REDIS_URL`
- `NEXT_PUBLIC_DEFAULT_CHAIN_ID`
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- `THIRDWEB_SECRET_KEY` for `admin-api`
- `ADMIN_API_PORT=4000` for `admin-api`
- `WORKER_CONCURRENCY=5` for `worker`

If `web` is deployed outside Railway:

- set `ADMIN_API_BASE_URL` in the web deployment to the public Railway URL for `admin-api`

If `web` is also deployed on Railway:

- you can still use the public Railway URL for `admin-api`
- if you later want fully private service-to-service traffic inside Railway, switch to Railway private networking hostnames for Railway-to-Railway calls only

## Deployment Env Matrix

### Vercel `web`

| Variable | Development | Preview | Production | Notes |
| --- | --- | --- | --- | --- |
| `APP_NAME` | `X402 App Store` | `X402 App Store` | `X402 App Store` | Optional |
| `ADMIN_API_BASE_URL` | `http://localhost:4000` or dev Railway URL | `https://admin-api-staging.up.railway.app` | `https://admin-api-prod.up.railway.app` | Server-only in Vercel |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://your-app-git-branch.vercel.app` | `https://yourdomain.com` | Public |
| `NEXT_PUBLIC_DEFAULT_CHAIN_ID` | `8453` | `8453` | `8453` | Public |
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | `your-thirdweb-client-id` | `your-thirdweb-client-id` | `your-thirdweb-client-id` | Public |

### Railway `admin-api`

| Variable | Local | Staging / Preview | Production | Notes |
| --- | --- | --- | --- | --- |
| `APP_NAME` | `X402 App Store` | `X402 App Store` | `X402 App Store` | Optional |
| `NODE_ENV` | `development` | `production` | `production` | Railway runtime should stay production-like |
| `MONGODB_URI` | local Mongo URL | staging Mongo URL | production Mongo URL | Required |
| `REDIS_URL` | local Redis URL | staging Redis URL | production Redis URL | Required |
| `ADMIN_API_PORT` | `4000` | `4000` | `4000` | Internal service port |
| `THIRDWEB_SECRET_KEY` | dev secret | staging secret | production secret | Secret |
| `NEXT_PUBLIC_DEFAULT_CHAIN_ID` | `8453` | `8453` | `8453` | Present in current shared schema |

### Railway `worker`

| Variable | Local | Staging / Preview | Production | Notes |
| --- | --- | --- | --- | --- |
| `APP_NAME` | `X402 App Store` | `X402 App Store` | `X402 App Store` | Optional |
| `NODE_ENV` | `development` | `production` | `production` | |
| `MONGODB_URI` | local Mongo URL | staging Mongo URL | production Mongo URL | Required |
| `REDIS_URL` | local Redis URL | staging Redis URL | production Redis URL | Required |
| `WORKER_CONCURRENCY` | `5` | `5` | `5` or higher | Tune for queue load |
| `NEXT_PUBLIC_DEFAULT_CHAIN_ID` | `8453` | `8453` | `8453` | Present in current shared schema |

### Production examples

Vercel `web`

```env
APP_NAME=X402 App Store
ADMIN_API_BASE_URL=https://admin-api-prod.up.railway.app
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-thirdweb-client-id
```

Railway `admin-api`

```env
APP_NAME=X402 App Store
NODE_ENV=production
MONGODB_URI=...
REDIS_URL=...
ADMIN_API_PORT=4000
THIRDWEB_SECRET_KEY=...
NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453
```

Railway `worker`

```env
APP_NAME=X402 App Store
NODE_ENV=production
MONGODB_URI=...
REDIS_URL=...
WORKER_CONCURRENCY=5
NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453
```

### Rules

- `NEXT_PUBLIC_*` values are exposed to the browser bundle
- Do not put `MONGODB_URI`, `REDIS_URL`, or `THIRDWEB_SECRET_KEY` in the Vercel `web` project
- If `web` runs on Vercel, set `ADMIN_API_BASE_URL` to the public Railway URL for `admin-api`
