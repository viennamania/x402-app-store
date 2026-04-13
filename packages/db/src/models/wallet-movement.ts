import { model, models, Schema } from "mongoose";
import type { WalletMovementRecord } from "@repo/types";
import { nowIso } from "./shared";

const walletMovementSchema = new Schema<WalletMovementRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    requestId: { type: String, required: true },
    walletAddress: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ["USDT"] },
    status: {
      type: String,
      required: true,
      enum: ["requested", "queued", "submitted", "confirmed", "failed", "reversed"]
    },
    txHash: { type: String },
    createdAt: { type: String, default: nowIso }
  },
  {
    collection: "wallet_movements"
  }
);

walletMovementSchema.index({ requestId: 1 }, { unique: true });
walletMovementSchema.index({ userId: 1, createdAt: -1 });

export const WalletMovementModel =
  models.WalletMovementRecord ??
  model<WalletMovementRecord>("WalletMovementRecord", walletMovementSchema);
