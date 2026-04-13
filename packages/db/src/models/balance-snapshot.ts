import { model, models, Schema } from "mongoose";
import type { BalanceSnapshotRecord } from "@repo/types";
import { nowIso } from "./shared";

const balanceSnapshotSchema = new Schema<BalanceSnapshotRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    available: { type: Number, required: true },
    pending: { type: Number, required: true },
    locked: { type: Number, required: true },
    currency: { type: String, required: true, enum: ["USDT"] },
    updatedAt: { type: String, default: nowIso }
  },
  {
    collection: "balance_snapshots"
  }
);

balanceSnapshotSchema.index({ userId: 1 }, { unique: true });

export const BalanceSnapshotModel =
  models.BalanceSnapshotRecord ??
  model<BalanceSnapshotRecord>("BalanceSnapshotRecord", balanceSnapshotSchema);
