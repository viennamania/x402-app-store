import { model, models, Schema } from "mongoose";
import type { UserRecord } from "@repo/types";
import { nowIso } from "./shared";

const userAuthSchema = new Schema<UserRecord["auth"]>(
  {
    provider: { type: String, required: true, enum: ["thirdweb"] },
    externalAccountId: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new Schema<UserRecord>(
  {
    id: { type: String, required: true, unique: true, index: true },
    handle: { type: String, required: true },
    displayName: { type: String, required: true },
    linkedWallets: [{ type: String, required: true }],
    auth: { type: userAuthSchema, required: true },
    createdAt: { type: String, default: nowIso }
  },
  {
    collection: "users"
  }
);

userSchema.index({ "auth.externalAccountId": 1 }, { unique: true });

export const UserModel =
  models.UserRecord ?? model<UserRecord>("UserRecord", userSchema);
