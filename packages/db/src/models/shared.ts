import { Schema } from "mongoose";
import type { RewardValue } from "@repo/types";

export const nowIso = () => new Date().toISOString();

export const rewardValueSchema = new Schema<RewardValue>(
  {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, enum: ["USDT"] }
  },
  { _id: false }
);
