import { z } from "zod";

const baseEnvSchema = z.object({
  APP_NAME: z.string().default("X402 App Store"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/x402"),
  REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
  ADMIN_API_BASE_URL: z.string().url().default("http://localhost:4000"),
  ADMIN_API_PORT: z.coerce.number().int().positive().default(4000),
  WORKER_CONCURRENCY: z.coerce.number().int().positive().default(5),
  THIRDWEB_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string().default("test-client-id"),
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: z.coerce.number().int().positive().default(8453),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000")
});

export type BaseEnv = z.infer<typeof baseEnvSchema>;

export function loadBaseEnv(input: NodeJS.ProcessEnv = process.env): BaseEnv {
  return baseEnvSchema.parse(input);
}

const webEnvSchema = baseEnvSchema.pick({
  APP_NAME: true,
  ADMIN_API_BASE_URL: true,
  NEXT_PUBLIC_APP_URL: true,
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: true,
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: true
});

export type WebEnv = z.infer<typeof webEnvSchema>;

export function loadWebEnv(input: NodeJS.ProcessEnv = process.env): WebEnv {
  return webEnvSchema.parse(input);
}

const adminApiEnvSchema = baseEnvSchema.pick({
  APP_NAME: true,
  NODE_ENV: true,
  MONGODB_URI: true,
  REDIS_URL: true,
  ADMIN_API_PORT: true,
  THIRDWEB_SECRET_KEY: true,
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: true
});

export type AdminApiEnv = z.infer<typeof adminApiEnvSchema>;

export function loadAdminApiEnv(
  input: NodeJS.ProcessEnv = process.env
): AdminApiEnv {
  return adminApiEnvSchema.parse(input);
}

const workerEnvSchema = baseEnvSchema.pick({
  APP_NAME: true,
  NODE_ENV: true,
  MONGODB_URI: true,
  REDIS_URL: true,
  WORKER_CONCURRENCY: true,
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: true
});

export type WorkerEnv = z.infer<typeof workerEnvSchema>;

export function loadWorkerEnv(
  input: NodeJS.ProcessEnv = process.env
): WorkerEnv {
  return workerEnvSchema.parse(input);
}
