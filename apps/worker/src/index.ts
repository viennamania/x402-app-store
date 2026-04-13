import { Worker } from "bullmq";
import { loadWorkerEnv } from "@repo/config";
import { connectToMongo } from "@repo/db";
import { createPlatformQueues, queueNames } from "@repo/queue";
import type {
  MissionVerificationJobPayload,
  RewardCreditJobPayload,
  WithdrawalSubmitJobPayload
} from "@repo/types";
import { createMissionVerificationProcessor } from "./processors/mission-verification.js";
import { processRewardCredit } from "./processors/reward-credit.js";
import { processWithdrawalSubmit } from "./processors/withdrawal-submit.js";

const env = loadWorkerEnv();
const queues = createPlatformQueues(env.REDIS_URL);

void connectToMongo(env.MONGODB_URI)
  .then(() => {
    console.log("[worker] Mongo connection ready");
  })
  .catch((error) => {
    console.warn("[worker] Mongo connection skipped", error);
  });

const missionVerificationWorker = new Worker<MissionVerificationJobPayload>(
  queueNames.missionVerification,
  async (job) =>
    createMissionVerificationProcessor(queues.rewardCreditQueue)(job.data),
  {
    connection: queues.connection,
    concurrency: env.WORKER_CONCURRENCY
  }
);

const rewardCreditWorker = new Worker<RewardCreditJobPayload>(
  queueNames.rewardCredit,
  async (job) => processRewardCredit(job.data),
  {
    connection: queues.connection,
    concurrency: env.WORKER_CONCURRENCY
  }
);

const withdrawalSubmitWorker = new Worker<WithdrawalSubmitJobPayload>(
  queueNames.withdrawalSubmit,
  async (job) => processWithdrawalSubmit(job.data),
  {
    connection: queues.connection,
    concurrency: Math.max(1, Math.floor(env.WORKER_CONCURRENCY / 2))
  }
);

for (const worker of [
  missionVerificationWorker,
  rewardCreditWorker,
  withdrawalSubmitWorker
]) {
  worker.on("completed", (job, result) => {
    console.log(`[worker] ${job.queueName}:${job.id} completed`, result);
  });

  worker.on("failed", (job, error) => {
    console.error(`[worker] ${job?.queueName}:${job?.id} failed`, error);
  });
}

async function shutdown() {
  await Promise.all([
    missionVerificationWorker.close(),
    rewardCreditWorker.close(),
    withdrawalSubmitWorker.close()
  ]);

  await Promise.all([
    queues.missionVerificationQueue.close(),
    queues.rewardCreditQueue.close(),
    queues.withdrawalSubmitQueue.close()
  ]);

  await queues.connection.quit();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

console.log("[worker] reward pipeline online");
