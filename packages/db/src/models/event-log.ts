import { model, models, Schema } from "mongoose";
import type { EventLogRecord } from "@repo/types";
import { nowIso } from "./shared";

const eventLogSchema = new Schema<EventLogRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    aggregateId: { type: String, required: true, index: true },
    aggregateType: {
      type: String,
      required: true,
      enum: ["app", "mission", "mission_session", "reward", "withdrawal", "fraud"]
    },
    type: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    createdAt: { type: String, default: nowIso }
  },
  {
    collection: "event_logs"
  }
);

eventLogSchema.index({ aggregateType: 1, aggregateId: 1, createdAt: -1 });

export const EventLogModel =
  models.EventLogRecord ?? model<EventLogRecord>("EventLogRecord", eventLogSchema);
