import { model, models, Schema } from "mongoose";
import type { CampaignRecord } from "@repo/types";
import { rewardValueSchema } from "./shared";

const campaignSchema = new Schema<CampaignRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    appId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    dailyBudget: { type: rewardValueSchema, required: true },
    conversionTarget: { type: Number, required: true },
    startAt: { type: String, required: true },
    endAt: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["draft", "active", "paused", "completed"]
    }
  },
  {
    collection: "campaigns"
  }
);

campaignSchema.index({ appId: 1, status: 1 });

export const CampaignModel =
  models.CampaignRecord ?? model<CampaignRecord>("CampaignRecord", campaignSchema);
