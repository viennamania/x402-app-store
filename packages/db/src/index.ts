import mongoose from "mongoose";
import { AppModel } from "./models/app";
import { BalanceSnapshotModel } from "./models/balance-snapshot";
import { CampaignModel } from "./models/campaign";
import { EventLogModel } from "./models/event-log";
import { FraudFlagModel } from "./models/fraud-flag";
import { MissionModel } from "./models/mission";
import { MissionSessionModel } from "./models/mission-session";
import { RewardLedgerModel } from "./models/reward-ledger";
import { UserModel } from "./models/user";
import { WalletMovementModel } from "./models/wallet-movement";

declare global {
  var __x402_mongo__: Promise<typeof mongoose> | undefined;
}

export function connectToMongo(mongoUri: string) {
  if (!global.__x402_mongo__) {
    global.__x402_mongo__ = mongoose.connect(mongoUri);
  }

  return global.__x402_mongo__;
}

export const models = {
  UserModel,
  AppModel,
  MissionModel,
  MissionSessionModel,
  CampaignModel,
  RewardLedgerModel,
  BalanceSnapshotModel,
  WalletMovementModel,
  FraudFlagModel,
  EventLogModel
};

export {
  AppModel,
  BalanceSnapshotModel,
  CampaignModel,
  EventLogModel,
  FraudFlagModel,
  MissionModel,
  MissionSessionModel,
  RewardLedgerModel,
  UserModel,
  WalletMovementModel
};
