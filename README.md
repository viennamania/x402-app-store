# X402 App Store Project

Production-minded MVP scaffold for a USDT reward app store:

- `apps/web`: Next.js App Router storefront, wallet surface, and admin UI
- `apps/admin-api`: thin internal API for domain operations
- `apps/worker`: BullMQ workers for verification and reward processing
- `packages/*`: shared DTOs, models, env parsing, ledger helpers, queue definitions, fraud logic, blockchain config, and UI primitives

## Getting started

```bash
pnpm install
pnpm build
```

Copy `.env.example` to `.env` when you are ready to run services locally.
