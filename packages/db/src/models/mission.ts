import { model, models, Schema } from "mongoose";
import type { MissionRecord } from "@repo/types";
import { rewardValueSchema } from "./shared";

const missionSchema = new Schema<MissionRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    appId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: rewardValueSchema, required: true },
    status: {
      type: String,
      required: true,
      enum: ["draft", "live", "paused", "archived"]
    },
    verificationMethod: {
      type: String,
      required: true,
      enum: ["screenshot", "api_callback", "manual_review"]
    },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    proofRequirements: [{ type: String, required: true }]
  },
  {
    collection: "missions"
  }
);

missionSchema.index({ appId: 1, status: 1 });

export const MissionModel =
  models.MissionRecord ?? model<MissionRecord>("MissionRecord", missionSchema);
