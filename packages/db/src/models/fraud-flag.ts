import { model, models, Schema } from "mongoose";
import type { FraudFlagRecord } from "@repo/types";
import { nowIso } from "./shared";

const fraudFlagSchema = new Schema<FraudFlagRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    missionSessionId: { type: String, index: true },
    severity: {
      type: String,
      required: true,
      enum: ["low", "medium", "high", "critical"]
    },
    reason: { type: String, required: true },
    score: { type: Number, required: true },
    createdAt: { type: String, default: nowIso }
  },
  {
    collection: "fraud_flags"
  }
);

fraudFlagSchema.index({ userId: 1, createdAt: -1 });

export const FraudFlagModel =
  models.FraudFlagRecord ??
  model<FraudFlagRecord>("FraudFlagRecord", fraudFlagSchema);
