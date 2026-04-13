import type {
  AdminOverviewDto,
  ApiEnvelope,
  AppRecord,
  CampaignRecord,
  MissionRecord,
  RewardLedgerRecord,
  WalletSummaryDto
} from "@repo/types";

export const apps: AppRecord[] = [
  {
    id: "app_pulseplay",
    slug: "pulseplay",
    name: "PulsePlay",
    tagline: "Short-form game loops with verified reward payouts",
    description: "Arcade-style retention product tuned for reward campaigns.",
    category: "games",
    heroImage: "/art/pulseplay.png",
    rewardRange: "2-18 USDT",
    featured: true,
    missionCount: 4,
    installCount: 18420,
    rating: 4.8,
    supportedRegions: ["US", "KR", "JP"]
  },
  {
    id: "app_signalai",
    slug: "signal-ai",
    name: "Signal AI",
    tagline: "AI research copilots with invite-based growth missions",
    description: "A workflow app that rewards activations and usage depth.",
    category: "ai",
    heroImage: "/art/signal-ai.png",
    rewardRange: "5-24 USDT",
    featured: true,
    missionCount: 3,
    installCount: 9120,
    rating: 4.6,
    supportedRegions: ["US", "CA", "DE"]
  }
];

export const missions: MissionRecord[] = [
  {
    id: "mission_install_pulseplay",
    appId: "app_pulseplay",
    title: "Install and clear the tutorial arena",
    description: "Install the app, finish the tutorial, and upload proof.",
    reward: { amount: 6, currency: "USDT" },
    status: "live",
    verificationMethod: "screenshot",
    estimatedMinutes: 10,
    proofRequirements: ["Tutorial clear screen", "Wallet-linked account screenshot"]
  },
  {
    id: "mission_signal_activation",
    appId: "app_signalai",
    title: "Complete first AI workspace setup",
    description: "Create a workspace, invite one teammate, and submit proof.",
    reward: { amount: 14, currency: "USDT" },
    status: "live",
    verificationMethod: "manual_review",
    estimatedMinutes: 18,
    proofRequirements: ["Workspace dashboard", "Invite confirmation email"]
  }
];

export const campaigns: CampaignRecord[] = [
  {
    id: "campaign_pulse_q2",
    appId: "app_pulseplay",
    name: "PulsePlay Q2 Retention Sprint",
    dailyBudget: { amount: 1200, currency: "USDT" },
    conversionTarget: 180,
    startAt: "2026-04-01T00:00:00.000Z",
    endAt: "2026-06-30T00:00:00.000Z",
    status: "active"
  }
];

export const rewardLedger: RewardLedgerRecord[] = [
  {
    id: "ledger_demo_001",
    userId: "user_demo",
    missionSessionId: "session_demo_001",
    type: "reward_credit",
    amount: 14,
    currency: "USDT",
    idempotencyKey: "reward:session_demo_001",
    source: "mission_reward",
    metadata: { missionId: "mission_signal_activation" },
    createdAt: "2026-04-12T14:10:00.000Z"
  }
];

export const adminOverview: AdminOverviewDto = {
  queuedVerifications: 42,
  pendingPayouts: 8,
  flaggedSessions: 5,
  reserveCoverageRatio: 1.84,
  rewardVelocity24h: 3620
};

export const walletSummary: WalletSummaryDto = {
  available: { amount: 124.8, currency: "USDT" },
  pending: { amount: 18, currency: "USDT" },
  lifetimeEarned: { amount: 480.6, currency: "USDT" },
  nextPayoutEta: "Within 8 hours after fraud clearance",
  recentMovements: [
    {
      id: "move_001",
      userId: "user_demo",
      requestId: "withdraw_001",
      walletAddress: "0x3Ae9...A1D9",
      amount: 50,
      currency: "USDT",
      status: "confirmed",
      txHash: "0xabc123",
      createdAt: "2026-04-12T09:22:00.000Z"
    }
  ]
};

export function envelope<T>(data: T): ApiEnvelope<T> {
  return { data };
}
