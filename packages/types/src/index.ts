export type RewardCurrency = "USDT";

export type AppCategory = "ai" | "finance" | "games" | "social" | "utility";
export type MissionStatus = "draft" | "live" | "paused" | "archived";
export type MissionSessionStatus =
  | "started"
  | "submitted"
  | "verified"
  | "rejected"
  | "rewarded";
export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type RewardLedgerEntryType =
  | "reward_credit"
  | "withdrawal_hold"
  | "withdrawal_release"
  | "withdrawal_settlement";
export type WalletMovementStatus =
  | "requested"
  | "queued"
  | "submitted"
  | "confirmed"
  | "failed"
  | "reversed";
export type FraudSeverity = "low" | "medium" | "high" | "critical";

export interface RewardValue {
  amount: number;
  currency: RewardCurrency;
}

export interface UserAuthRecord {
  provider: "thirdweb";
  externalAccountId: string;
}

export interface UserRecord {
  id: string;
  handle: string;
  displayName: string;
  linkedWallets: string[];
  auth: UserAuthRecord;
  createdAt: string;
}

export interface AppRecord {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  heroImage: string;
  rewardRange: string;
  featured: boolean;
  missionCount: number;
  installCount: number;
  rating: number;
  supportedRegions: string[];
}

export interface MissionRecord {
  id: string;
  appId: string;
  title: string;
  description: string;
  reward: RewardValue;
  status: MissionStatus;
  verificationMethod: "screenshot" | "api_callback" | "manual_review";
  estimatedMinutes: number;
  proofRequirements: string[];
}

export interface MissionSessionRecord {
  id: string;
  missionId: string;
  userId: string;
  status: MissionSessionStatus;
  proofUrl?: string;
  submittedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  deviceFingerprint?: string;
}

export interface CampaignRecord {
  id: string;
  appId: string;
  name: string;
  dailyBudget: RewardValue;
  conversionTarget: number;
  startAt: string;
  endAt: string;
  status: CampaignStatus;
}

export interface RewardLedgerRecord {
  id: string;
  userId: string;
  missionSessionId?: string;
  type: RewardLedgerEntryType;
  amount: number;
  currency: RewardCurrency;
  idempotencyKey: string;
  source: string;
  metadata: Record<string, string | number | boolean | null>;
  createdAt: string;
}

export interface BalanceSnapshotRecord {
  id: string;
  userId: string;
  available: number;
  pending: number;
  locked: number;
  currency: RewardCurrency;
  updatedAt: string;
}

export interface WalletMovementRecord {
  id: string;
  userId: string;
  requestId: string;
  walletAddress: string;
  amount: number;
  currency: RewardCurrency;
  status: WalletMovementStatus;
  txHash?: string;
  createdAt: string;
}

export interface FraudFlagRecord {
  id: string;
  userId: string;
  missionSessionId?: string;
  severity: FraudSeverity;
  reason: string;
  score: number;
  createdAt: string;
}

export interface EventLogRecord {
  id: string;
  aggregateId: string;
  aggregateType:
    | "app"
    | "mission"
    | "mission_session"
    | "reward"
    | "withdrawal"
    | "fraud";
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface StorefrontAppDto {
  app: AppRecord;
  missions: MissionRecord[];
}

export interface MissionDetailDto {
  mission: MissionRecord;
  app: Pick<AppRecord, "id" | "name" | "slug" | "tagline">;
}

export interface WalletSummaryDto {
  available: RewardValue;
  pending: RewardValue;
  lifetimeEarned: RewardValue;
  nextPayoutEta: string;
  recentMovements: WalletMovementRecord[];
}

export interface AdminOverviewDto {
  queuedVerifications: number;
  pendingPayouts: number;
  flaggedSessions: number;
  reserveCoverageRatio: number;
  rewardVelocity24h: number;
}

export interface WalletLinkRequestDto {
  walletAddress: string;
  provider: "thirdweb";
}

export interface WithdrawalRequestDto {
  userId: string;
  walletAddress: string;
  amount: number;
  currency: RewardCurrency;
}

export interface MissionVerificationJobPayload {
  missionSessionId: string;
  userId: string;
  missionId: string;
  proofUrl?: string;
}

export interface RewardCreditJobPayload {
  missionSessionId: string;
  userId: string;
  amount: number;
  currency: RewardCurrency;
  idempotencyKey: string;
}

export interface WithdrawalSubmitJobPayload {
  requestId: string;
  userId: string;
  walletAddress: string;
  amount: number;
  currency: RewardCurrency;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: Record<string, string | number | boolean>;
}
