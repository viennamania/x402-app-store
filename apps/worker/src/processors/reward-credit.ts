import type { RewardCreditJobPayload } from "@repo/types";
import { buildRewardCreditEntry } from "@repo/ledger";

export async function processRewardCredit(payload: RewardCreditJobPayload) {
  return {
    status: "credited",
    ledgerEntry: buildRewardCreditEntry(payload)
  };
}
