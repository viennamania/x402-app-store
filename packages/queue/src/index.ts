import IORedis from "ioredis";
import { Queue } from "bullmq";
import type {
  MissionVerificationJobPayload,
  RewardCreditJobPayload,
  WithdrawalSubmitJobPayload
} from "@repo/types";

export const queueNames = {
  missionVerification: "mission-verification",
  rewardCredit: "reward-credit",
  withdrawalSubmit: "withdrawal-submit"
} as const;

export function createRedisConnection(redisUrl: string) {
  return new IORedis(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
  });
}

export function createPlatformQueues(redisUrl: string) {
  const connection = createRedisConnection(redisUrl);

  return {
    connection,
    missionVerificationQueue: new Queue<MissionVerificationJobPayload>(
      queueNames.missionVerification,
      { connection }
    ),
    rewardCreditQueue: new Queue<RewardCreditJobPayload>(
      queueNames.rewardCredit,
      { connection }
    ),
    withdrawalSubmitQueue: new Queue<WithdrawalSubmitJobPayload>(
      queueNames.withdrawalSubmit,
      { connection }
    )
  };
}

export function enqueueMissionVerification(
  queue: Queue<MissionVerificationJobPayload>,
  payload: MissionVerificationJobPayload
) {
  return queue.add(queueNames.missionVerification, payload, {
    removeOnComplete: 200,
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 2_000
    }
  });
}

export function enqueueRewardCredit(
  queue: Queue<RewardCreditJobPayload>,
  payload: RewardCreditJobPayload
) {
  return queue.add(queueNames.rewardCredit, payload, {
    jobId: payload.idempotencyKey,
    removeOnComplete: 500
  });
}

export function enqueueWithdrawalSubmit(
  queue: Queue<WithdrawalSubmitJobPayload>,
  payload: WithdrawalSubmitJobPayload
) {
  return queue.add(queueNames.withdrawalSubmit, payload, {
    jobId: payload.requestId,
    removeOnComplete: 500
  });
}
