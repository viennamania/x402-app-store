import { model, models, Schema } from "mongoose";
import type { RewardLedgerRecord } from "@repo/types";
import { nowIso } from "./shared";

const rewardLedgerSchema = new Schema<RewardLedgerRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    missionSessionId: { type: String, index: true },
    type: {
      type: String,
      required: true,
      enum: [
        "reward_credit",
        "withdrawal_hold",
        "withdrawal_release",
        "withdrawal_settlement"
      ]
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ["USDT"] },
    idempotencyKey: { type: String, required: true },
    source: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    createdAt: { type: String, default: nowIso }
  },
  {
    collection: "reward_ledger"
  }
);

rewardLedgerSchema.index({ idempotencyKey: 1 }, { unique: true });
rewardLedgerSchema.index({ userId: 1, createdAt: -1 });

export const RewardLedgerModel =
  models.RewardLedgerRecord ??
  model<RewardLedgerRecord>("RewardLedgerRecord", rewardLedgerSchema);
