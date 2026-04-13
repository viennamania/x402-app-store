import { model, models, Schema } from "mongoose";
import type { MissionSessionRecord } from "@repo/types";

const missionSessionSchema = new Schema<MissionSessionRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    missionId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: ["started", "submitted", "verified", "rejected", "rewarded"]
    },
    proofUrl: { type: String },
    submittedAt: { type: String },
    verifiedAt: { type: String },
    rejectionReason: { type: String },
    deviceFingerprint: { type: String }
  },
  {
    collection: "mission_sessions"
  }
);

missionSessionSchema.index({ missionId: 1, userId: 1, status: 1 });

export const MissionSessionModel =
  models.MissionSessionRecord ??
  model<MissionSessionRecord>("MissionSessionRecord", missionSessionSchema);
