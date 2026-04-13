import type { Queue } from "bullmq";
import type {
  MissionVerificationJobPayload,
  RewardCreditJobPayload
} from "@repo/types";
import { scoreMissionSession } from "@repo/fraud";
import { enqueueRewardCredit } from "@repo/queue";

export function createMissionVerificationProcessor(
  rewardCreditQueue: Queue<RewardCreditJobPayload>
) {
  return async (payload: MissionVerificationJobPayload) => {
    const fraudFlag = scoreMissionSession({
      id: payload.missionSessionId,
      proofUrl: payload.proofUrl,
      deviceFingerprint: "fp-demo"
    });

    if (fraudFlag) {
      return {
        status: "manual_review",
        fraudFlag
      };
    }

    const rewardPayload: RewardCreditJobPayload = {
      missionSessionId: payload.missionSessionId,
      userId: payload.userId,
      amount: 6,
      currency: "USDT",
      idempotencyKey: `reward:${payload.missionSessionId}`
    };

    await enqueueRewardCredit(rewardCreditQueue, rewardPayload);

    return {
      status: "verified",
      queuedRewardCredit: rewardPayload.idempotencyKey
    };
  };
}
