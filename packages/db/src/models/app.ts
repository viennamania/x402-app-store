import { model, models, Schema } from "mongoose";
import type { AppRecord } from "@repo/types";

const appSchema = new Schema<AppRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["ai", "finance", "games", "social", "utility"]
    },
    heroImage: { type: String, required: true },
    rewardRange: { type: String, required: true },
    featured: { type: Boolean, default: false },
    missionCount: { type: Number, default: 0 },
    installCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    supportedRegions: [{ type: String, required: true }]
  },
  {
    collection: "apps"
  }
);

appSchema.index({ slug: 1 }, { unique: true });

export const AppModel =
  models.AppRecord ?? model<AppRecord>("AppRecord", appSchema);
