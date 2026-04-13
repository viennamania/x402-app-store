import type { WithdrawalSubmitJobPayload } from "@repo/types";

export async function processWithdrawalSubmit(
  payload: WithdrawalSubmitJobPayload
) {
  return {
    status: "submitted",
    requestId: payload.requestId,
    walletAddress: payload.walletAddress,
    nextStage: "confirmation"
  };
}
