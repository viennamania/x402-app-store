import type {
  AdminOverviewDto,
  AppRecord,
  CampaignRecord,
  MissionDetailDto,
  MissionRecord,
  StorefrontAppDto,
  WalletMovementRecord,
  WalletSummaryDto
} from "@repo/types";
import { getDictionary, type Locale } from "@/lib/i18n";

const appCatalog: AppRecord[] = [
  {
    id: "app_pulseplay",
    slug: "pulseplay",
    name: "PulsePlay",
    tagline: "Mobile game loops with measurable retention missions",
    description:
      "PulsePlay runs fast install-to-activation campaigns with screenshot proof and replayable daily challenges.",
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
    tagline: "AI workflow adoption missions for B2B growth teams",
    description:
      "Signal AI pays for verified onboarding depth instead of cheap top-of-funnel clicks.",
    category: "ai",
    heroImage: "/art/signal-ai.png",
    rewardRange: "5-24 USDT",
    featured: true,
    missionCount: 3,
    installCount: 9120,
    rating: 4.6,
    supportedRegions: ["US", "CA", "DE"]
  },
  {
    id: "app_marginflow",
    slug: "marginflow",
    name: "MarginFlow",
    tagline: "Onchain finance funnels with wallet-native reward rails",
    description:
      "MarginFlow rewards funded onboarding paths while keeping the actual payout ledger off the client.",
    category: "finance",
    heroImage: "/art/marginflow.png",
    rewardRange: "8-40 USDT",
    featured: false,
    missionCount: 5,
    installCount: 6040,
    rating: 4.5,
    supportedRegions: ["US", "BR", "MX"]
  }
];

const missionCatalog: MissionRecord[] = [
  {
    id: "mission_install_pulseplay",
    appId: "app_pulseplay",
    title: "Install and clear the tutorial arena",
    description:
      "Install the app, finish the guided arena, and submit the completion screen plus account proof.",
    reward: { amount: 6, currency: "USDT" },
    status: "live",
    verificationMethod: "screenshot",
    estimatedMinutes: 10,
    proofRequirements: ["Tutorial clear screen", "Wallet-linked account screenshot"]
  },
  {
    id: "mission_daily_streak",
    appId: "app_pulseplay",
    title: "Maintain a 3-day return streak",
    description:
      "Complete three daily comeback sessions in a seven-day window.",
    reward: { amount: 12, currency: "USDT" },
    status: "live",
    verificationMethod: "api_callback",
    estimatedMinutes: 20,
    proofRequirements: ["Automatic app callback", "Linked account state"]
  },
  {
    id: "mission_signal_activation",
    appId: "app_signalai",
    title: "Create your first AI workspace",
    description:
      "Set up a workspace, upload two assets, and invite one teammate.",
    reward: { amount: 14, currency: "USDT" },
    status: "live",
    verificationMethod: "manual_review",
    estimatedMinutes: 18,
    proofRequirements: ["Workspace screenshot", "Invite confirmation email"]
  },
  {
    id: "mission_marginflow_fund",
    appId: "app_marginflow",
    title: "Fund a sandbox vault and finish the safety checklist",
    description:
      "Open a sandbox vault, fund it with demo balance, and finish the risk walkthrough.",
    reward: { amount: 18, currency: "USDT" },
    status: "live",
    verificationMethod: "manual_review",
    estimatedMinutes: 16,
    proofRequirements: ["Vault summary screen", "Checklist completion receipt"]
  }
];

const walletSummaryBase: WalletSummaryDto = {
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
    },
    {
      id: "move_002",
      userId: "user_demo",
      requestId: "reward_001",
      walletAddress: "0x3Ae9...A1D9",
      amount: 14,
      currency: "USDT",
      status: "queued",
      createdAt: "2026-04-12T14:10:00.000Z"
    }
  ]
};

export const adminOverview: AdminOverviewDto = {
  queuedVerifications: 42,
  pendingPayouts: 8,
  flaggedSessions: 5,
  reserveCoverageRatio: 1.84,
  rewardVelocity24h: 3620
};

const campaignsBase: CampaignRecord[] = [
  {
    id: "campaign_pulse_q2",
    appId: "app_pulseplay",
    name: "PulsePlay Q2 Retention Sprint",
    dailyBudget: { amount: 1200, currency: "USDT" },
    conversionTarget: 180,
    startAt: "2026-04-01T00:00:00.000Z",
    endAt: "2026-06-30T00:00:00.000Z",
    status: "active"
  },
  {
    id: "campaign_signal_growth",
    appId: "app_signalai",
    name: "Signal AI Activation Push",
    dailyBudget: { amount: 900, currency: "USDT" },
    conversionTarget: 96,
    startAt: "2026-04-06T00:00:00.000Z",
    endAt: "2026-05-20T00:00:00.000Z",
    status: "active"
  }
];

export const payoutQueue: WalletMovementRecord[] = [
  {
    id: "move_010",
    userId: "user_alpha",
    requestId: "withdraw_010",
    walletAddress: "0xABCD...91ef",
    amount: 65,
    currency: "USDT",
    status: "submitted",
    txHash: "0x9123ff",
    createdAt: "2026-04-12T18:40:00.000Z"
  },
  {
    id: "move_011",
    userId: "user_beta",
    requestId: "withdraw_011",
    walletAddress: "0x9981...fE0B",
    amount: 22,
    currency: "USDT",
    status: "queued",
    createdAt: "2026-04-12T20:10:00.000Z"
  }
];

const fraudQueueBase = [
  {
    missionSessionId: "session_demo_003",
    score: 72,
    severity: "high",
    reason: "reused device fingerprint and missing proof chain"
  },
  {
    missionSessionId: "session_demo_009",
    score: 58,
    severity: "medium",
    reason: "multi-account IP clustering"
  }
];

function localizeApp(locale: Locale, app: AppRecord): AppRecord {
  const dictionary = getDictionary(locale);
  const copy = dictionary.data.apps[app.id as keyof typeof dictionary.data.apps];

  if (!copy) {
    return app;
  }

  return {
    ...app,
    tagline: copy.tagline,
    description: copy.description
  };
}

function localizeMission(locale: Locale, mission: MissionRecord): MissionRecord {
  const dictionary = getDictionary(locale);
  const copy =
    dictionary.data.missions[
      mission.id as keyof typeof dictionary.data.missions
    ];

  if (!copy) {
    return mission;
  }

  return {
    ...mission,
    title: copy.title,
    description: copy.description,
    proofRequirements: [...copy.proofRequirements]
  };
}

export function getStorefrontApps(locale: Locale): StorefrontAppDto[] {
  return appCatalog.map((app) => {
    const localizedApp = localizeApp(locale, app);
    const localizedMissions = missionCatalog
      .filter((mission) => mission.appId === app.id)
      .map((mission) => localizeMission(locale, mission));

    return {
      app: localizedApp,
      missions: localizedMissions
    };
  });
}

export function getWalletSummary(locale: Locale): WalletSummaryDto {
  const dictionary = getDictionary(locale);

  return {
    ...walletSummaryBase,
    nextPayoutEta: dictionary.data.wallet.nextPayoutEta,
    recentMovements: walletSummaryBase.recentMovements.map((movement) => ({
      ...movement
    }))
  };
}

export function getCampaigns(locale: Locale): CampaignRecord[] {
  const dictionary = getDictionary(locale);

  return campaignsBase.map((campaign) => ({
    ...campaign,
    name:
      dictionary.data.campaigns[
        campaign.id as keyof typeof dictionary.data.campaigns
      ] ?? campaign.name
  }));
}

export function getFraudQueue(locale: Locale) {
  const dictionary = getDictionary(locale);

  return fraudQueueBase.map((item) => ({
    ...item,
    reason:
      dictionary.data.fraudReasons[
        item.missionSessionId as keyof typeof dictionary.data.fraudReasons
      ] ?? item.reason
  }));
}

export function getArchitectureSignals(locale: Locale) {
  return [...getDictionary(locale).data.architectureSignals];
}

export function getStorefrontBySlug(locale: Locale, slugOrId: string) {
  return getStorefrontApps(locale).find(
    (entry) => entry.app.slug === slugOrId || entry.app.id === slugOrId
  );
}

export function getMissionDetail(
  locale: Locale,
  missionId: string
): MissionDetailDto | null {
  const mission = missionCatalog.find((entry) => entry.id === missionId);

  if (!mission) {
    return null;
  }

  const app = appCatalog.find((entry) => entry.id === mission.appId);

  if (!app) {
    return null;
  }

  const localizedMission = localizeMission(locale, mission);
  const localizedApp = localizeApp(locale, app);

  return {
    mission: localizedMission,
    app: {
      id: localizedApp.id,
      name: localizedApp.name,
      slug: localizedApp.slug,
      tagline: localizedApp.tagline
    }
  };
}
