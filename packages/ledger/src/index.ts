import type {
  RewardCreditJobPayload,
  RewardLedgerRecord,
  WithdrawalRequestDto
} from "@repo/types";

export function buildRewardCreditEntry(
  payload: RewardCreditJobPayload
): RewardLedgerRecord {
  return {
    id: `ledger_${payload.idempotencyKey}`,
    userId: payload.userId,
    missionSessionId: payload.missionSessionId,
    type: "reward_credit",
    amount: payload.amount,
    currency: payload.currency,
    idempotencyKey: payload.idempotencyKey,
    source: "mission_reward",
    metadata: {
      missionSessionId: payload.missionSessionId
    },
    createdAt: new Date().toISOString()
  };
}

export function buildWithdrawalHoldEntries(request: WithdrawalRequestDto) {
  const timestamp = new Date().toISOString();

  return [
    {
      id: `hold_${request.userId}_${timestamp}`,
      userId: request.userId,
      type: "withdrawal_hold" as const,
      amount: -Math.abs(request.amount),
      currency: request.currency,
      idempotencyKey: `withdrawal:${request.userId}:${request.walletAddress}:${request.amount}`,
      source: "withdrawal_request",
      metadata: {
        walletAddress: request.walletAddress
      },
      createdAt: timestamp
    }
  ];
}

export function calculateProjectedAvailableBalance(
  ledgerEntries: Array<Pick<RewardLedgerRecord, "amount">>
) {
  return ledgerEntries.reduce((total, entry) => total + entry.amount, 0);
}
