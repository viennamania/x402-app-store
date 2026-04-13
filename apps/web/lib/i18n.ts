import { cookies } from "next/headers";

export const localeCookieName = "x402-locale";
export const locales = ["en", "ko"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && locales.includes(value as Locale);
}

export const dictionaries = {
  en: {
    metadata: {
      title: "X402 App Store",
      description:
        "A mobile-friendly reward app where people can finish simple tasks, earn rewards, and request payouts."
    },
    language: {
      label: "Language",
      options: {
        en: "EN",
        ko: "KO"
      }
    },
    pwa: {
      installTitle: "Install X402 on your phone",
      installDescription:
        "Add the app to your home screen for faster access and a cleaner mobile layout.",
      installAction: "Install",
      dismissAction: "Later",
      offlineTitle: "You are offline",
      offlineDescription:
        "Saved pages can still open, but balances and payout status need a connection."
    },
    brand: {
      storefront: "Reward app store",
      controlPlane: "Operations dashboard"
    },
    nav: {
      store: "Store",
      wallet: "Wallet",
      rewards: "Earnings",
      history: "History",
      admin: "Dashboard",
      storefront: "Storefront",
      overview: "Overview",
      apps: "Apps",
      campaigns: "Campaigns",
      payouts: "Payouts",
      fraud: "Risk"
    },
    landing: {
      eyebrow: "Start Here",
      title: "Find simple app tasks and earn rewards in one place.",
      description:
        "Browse apps, complete easy tasks, connect your wallet, and request payouts without jumping between separate tools.",
      primaryCta: "Browse Apps",
      secondaryCta: "Open Dashboard",
      scaffoldEyebrow: "How It Works",
      scaffoldTitle: "A simpler reward flow for everyday users.",
      scaffoldDescription:
        "You pick a task, send proof, and wait for review. The app keeps your earnings and payout requests easy to track.",
      highlights: ["Easy tasks", "Wallet payouts", "Safer review"],
      metricFeaturedApps: "Featured apps",
      metricFeaturedAppsNote: "Ready to try now",
      metricAvailableBalance: "Available balance",
      metricAvailableBalanceNote: "Can be requested now",
      metricRewardVelocity: "Paid in 24h",
      metricRewardVelocityNote: "Recent payout volume",
      metricInstallReach: "People reached",
      metricInstallReachNote: "Across featured apps",
      storefrontEyebrow: "For Users",
      storefrontTitle: "See rewards before you spend time.",
      storefrontDescription:
        "Each app page shows what you need to do, how long it takes, and what reward you can expect.",
      controlPlaneEyebrow: "For Operators",
      controlPlaneTitle: "The team can still review everything in one place.",
      controlPlaneDescription:
        "The dashboard tracks task review, payout requests, and suspicious activity without crowding the user experience.",
      queuedVerifications: "Reviews waiting",
      pendingPayouts: "Payouts waiting",
      reserveCoverage: "Safety buffer"
    },
    store: {
      eyebrow: "Store",
      title: "Browse apps with clear tasks and clear rewards.",
      description:
        "Every listing shows the task count, reward range, and rough effort so you can decide quickly.",
      featured: "Featured",
      liveMissions: "tasks",
      ratingSuffix: "rating",
      installs: "installs",
      rewardSuffix: "USDT reward",
      openListing: "See details"
    },
    appDetail: {
      listingSignalsEyebrow: "Before You Start",
      listingSignalsTitle: "See the reward, time, and region first.",
      listingSignalsDescription:
        "This page keeps the important details up front so users do not need to guess whether a task is worth doing.",
      liveMissions: "Open tasks",
      rating: "Rating",
      installBase: "Users",
      missionsEyebrow: "Tasks",
      missionsTitle: "Tasks stay short and easy to scan.",
      missionsDescription:
        "You can quickly see what to do, what proof to send, and what reward you get before you start.",
      reviewMissionFlow: "See task details"
    },
    missionDetail: {
      eyebrow: "Task Details",
      prepareWallet: "Open wallet",
      backTo: "Back to",
      proofEyebrow: "What To Submit",
      proofTitle: "Send simple proof after you finish.",
      proofDescription:
        "Once you send your proof, the app reviews it and then adds the reward if everything matches.",
      asyncEyebrow: "What Happens Next",
      asyncTitle: "Review steps",
      asyncDescription:
        "This is the simple flow behind one task submission.",
      runtimeEyebrow: "Good To Know",
      runtimeTitle: "Your reward shows up after review.",
      runtimeDescription:
        "The task first shows as pending, then moves to reward credit after the review completes.",
      stageOneTitle: "1. You submit proof",
      stageOneDescription: "Your screenshot or app check is saved.",
      stageTwoTitle: "2. We review it",
      stageTwoDescription:
        "Suspicious or incomplete submissions are checked more carefully.",
      stageThreeTitle: "3. Reward is added",
      stageThreeDescription:
        "Once approved, the reward is added and can move toward payout.",
      estimatedEffort: "Estimated effort",
      linkedApp: "Linked app",
      status: "Status",
      minutesShort: "min"
    },
    wallet: {
      eyebrow: "Wallet",
      title: "See what you can withdraw and what is still being checked.",
      description:
        "Your wallet page keeps your available balance, pending rewards, and payout requests easy to follow.",
      available: "Available",
      availableNote: "Ready to withdraw",
      pending: "Pending",
      pendingNote: "Still being reviewed",
      lifetimeEarned: "Total earned",
      lifetimeEarnedNote: "All rewards so far",
      payoutEta: "Next payout",
      payoutEtaNote: "Expected timing",
      movementEyebrow: "Recent Activity",
      movementTitle: "Recent wallet updates",
      movementDescription:
        "This list shows payout requests and completed transfers in simple status steps."
    },
    rewards: {
      eyebrow: "Rewards",
      title: "See where the best earning chances are today.",
      description:
        "This view shows active reward ranges and campaign budgets in plain language.",
      streamsEyebrow: "Reward List",
      streamsTitle: "Active reward offers",
      budgetsEyebrow: "Budget",
      budgetsTitle: "Daily spend at a glance",
      dailyBudgetSuffix: "daily budget"
    },
    history: {
      eyebrow: "History",
      title: "Keep a clear record of what was earned and paid.",
      description:
        "This timeline keeps reward and payout events easy to read so users can check progress without confusion."
    },
    adminOverview: {
      eyebrow: "Overview",
      title:
        "The control plane is shaped around risk and payout throughput.",
      description:
        "This admin surface is intentionally close to the domain model: queues, campaigns, payouts, fraud, and reserve health.",
      queuedVerifications: "Queued verifications",
      queuedVerificationsNote: "Awaiting worker pickup",
      pendingPayouts: "Pending payouts",
      pendingPayoutsNote: "Not yet confirmed onchain",
      flaggedSessions: "Flagged sessions",
      flaggedSessionsNote: "Needs fraud review",
      rewardVelocity: "Reward velocity",
      rewardVelocityNote: "Last 24h",
      assumptionsEyebrow: "Operating assumptions",
      assumptionsTitle: "What the platform protects by design"
    },
    adminApps: {
      eyebrow: "Apps",
      title:
        "Campaign inventory is organized by app quality and mission depth.",
      description:
        "App approvals and reward budgeting should stay close to the mission inventory each listing can actually sustain.",
      featured: "featured",
      catalog: "catalog",
      missions: "Missions",
      supportedRegions: "Supported regions"
    },
    adminCampaigns: {
      eyebrow: "Campaigns",
      title:
        "Budget pacing should be readable before the operator opens a chart.",
      description:
        "The scaffold keeps the first admin pass simple: budgets, targets, and campaign status.",
      runs: "Runs",
      to: "to",
      target: "target",
      conversions: "conversions"
    },
    adminPayouts: {
      eyebrow: "Payouts",
      title:
        "Withdrawal handling is staged, visible, and intentionally boring.",
      description:
        "Operators should see where a payout sits without needing to infer whether funds were already committed."
    },
    adminFraud: {
      eyebrow: "Fraud",
      title: "Abuse review exists before withdrawals finalize.",
      description:
        "This queue is deliberately first-class in the scaffold because reward systems fail when fraud arrives after payout.",
      riskScore: "risk score"
    },
    notFound: {
      eyebrow: "Not Found",
      title: "That route is outside the current scaffold.",
      description:
        "The monorepo structure is in place, but this page has not been implemented yet.",
      backToStore: "Back to store",
      openAdmin: "Open admin"
    },
    walletConnect: {
      eyebrow: "Wallet",
      title: "Connect your wallet once to receive rewards.",
      description:
        "After you connect, the app can match your rewards and payout requests to the right account.",
      connectionState: "Wallet",
      notConnected: "Not connected",
      backendLink: "App link",
      status: {
        idle: "Idle",
        syncing: "Checking",
        linked: "Ready",
        error: "Error"
      }
    },
    withdrawals: {
      eyebrow: "Withdraw",
      title: "Ask for a payout in a few taps.",
      description:
        "Each payout request is reviewed before money is sent, so the status may take a little time to update.",
      amount: "Amount to withdraw",
      request: "Withdraw",
      pipelineStatus: "Request status",
      status: {
        idle: "Idle",
        submitting: "Sending",
        queued: "Received",
        error: "Error"
      }
    },
    taxonomy: {
      categories: {
        games: "Games",
        ai: "AI",
        finance: "Finance"
      },
      verificationMethods: {
        screenshot: "Upload a screenshot",
        api_callback: "Checked automatically",
        manual_review: "Reviewed by our team"
      },
      movementStatuses: {
        confirmed: "Completed",
        queued: "Reviewing",
        submitted: "Sent"
      },
      campaignStatuses: {
        active: "Active",
        live: "Live"
      },
      fraudSeverity: {
        high: "High",
        medium: "Medium"
      }
    },
    data: {
      architectureSignals: [
        "Pick an app, finish a task, and send proof in a few taps.",
        "Rewards show up after the task is checked.",
        "Payout requests stay separate so balances are easier to follow."
      ],
      apps: {
        app_pulseplay: {
          tagline: "Mobile game loops with measurable retention missions",
          description:
            "PulsePlay runs fast install-to-activation campaigns with screenshot proof and replayable daily challenges."
        },
        app_signalai: {
          tagline: "AI workflow adoption missions for B2B growth teams",
          description:
            "Signal AI pays for verified onboarding depth instead of cheap top-of-funnel clicks."
        },
        app_marginflow: {
          tagline: "Onchain finance funnels with wallet-native reward rails",
          description:
            "MarginFlow rewards funded onboarding paths while keeping the actual payout ledger off the client."
        }
      },
      missions: {
        mission_install_pulseplay: {
          title: "Install and clear the tutorial arena",
          description:
            "Install the app, finish the guided arena, and submit the completion screen plus account proof.",
          proofRequirements: [
            "Tutorial clear screen",
            "Wallet-linked account screenshot"
          ]
        },
        mission_daily_streak: {
          title: "Maintain a 3-day return streak",
          description:
            "Complete three daily comeback sessions in a seven-day window.",
          proofRequirements: [
            "Automatic app callback",
            "Linked account state"
          ]
        },
        mission_signal_activation: {
          title: "Create your first AI workspace",
          description:
            "Set up a workspace, upload two assets, and invite one teammate.",
          proofRequirements: [
            "Workspace screenshot",
            "Invite confirmation email"
          ]
        },
        mission_marginflow_fund: {
          title: "Fund a sandbox vault and finish the safety checklist",
          description:
            "Open a sandbox vault, fund it with demo balance, and finish the risk walkthrough.",
          proofRequirements: [
            "Vault summary screen",
            "Checklist completion receipt"
          ]
        }
      },
      campaigns: {
        campaign_pulse_q2: "PulsePlay Q2 Retention Sprint",
        campaign_signal_growth: "Signal AI Activation Push"
      },
      wallet: {
        nextPayoutEta: "Usually within 8 hours after review"
      },
      fraudReasons: {
        session_demo_003: "reused device fingerprint and missing proof chain",
        session_demo_009: "multi-account IP clustering"
      }
    }
  },
  ko: {
    metadata: {
      title: "X402 앱 스토어",
      description:
        "간단한 앱 미션을 하고 보상을 받은 뒤 출금까지 확인할 수 있는 모바일 중심 리워드 앱입니다."
    },
    language: {
      label: "언어",
      options: {
        en: "EN",
        ko: "KO"
      }
    },
    pwa: {
      installTitle: "휴대폰에 X402 설치하기",
      installDescription:
        "홈 화면에 추가하면 더 빠르게 열 수 있고 모바일 화면도 더 깔끔하게 보입니다.",
      installAction: "설치",
      dismissAction: "나중에",
      offlineTitle: "지금은 오프라인 상태입니다",
      offlineDescription:
        "저장된 화면은 볼 수 있지만 잔액과 출금 상태를 새로 불러오려면 연결이 필요합니다."
    },
    brand: {
      storefront: "리워드 앱 스토어",
      controlPlane: "운영 대시보드"
    },
    nav: {
      store: "스토어",
      wallet: "지갑",
      rewards: "적립",
      history: "내역",
      admin: "대시보드",
      storefront: "스토어",
      overview: "개요",
      apps: "앱",
      campaigns: "캠페인",
      payouts: "출금",
      fraud: "이상 징후"
    },
    landing: {
      eyebrow: "시작하기",
      title: "쉬운 앱 미션을 찾고 한곳에서 보상을 받으세요.",
      description:
        "앱을 고르고, 쉬운 미션을 완료하고, 지갑을 연결하고, 출금까지 한 흐름으로 확인할 수 있습니다.",
      primaryCta: "앱 둘러보기",
      secondaryCta: "대시보드 열기",
      scaffoldEyebrow: "이용 방식",
      scaffoldTitle: "일반 사용자도 바로 이해할 수 있는 보상 흐름.",
      scaffoldDescription:
        "미션을 고르고 증빙을 보내면 검토 후 보상이 반영됩니다. 적립과 출금 요청도 한눈에 볼 수 있습니다.",
      highlights: ["쉬운 미션", "지갑 출금", "안전한 검토"],
      metricFeaturedApps: "추천 앱",
      metricFeaturedAppsNote: "지금 바로 참여 가능",
      metricAvailableBalance: "사용 가능 잔액",
      metricAvailableBalanceNote: "지금 출금 요청 가능",
      metricRewardVelocity: "최근 24시간 지급",
      metricRewardVelocityNote: "최근 출금 규모",
      metricInstallReach: "도달 사용자",
      metricInstallReachNote: "추천 앱 기준",
      storefrontEyebrow: "사용자용",
      storefrontTitle: "시간 쓰기 전에 보상을 먼저 확인하세요.",
      storefrontDescription:
        "각 앱 페이지에서 해야 할 일, 예상 시간, 받을 보상을 먼저 보고 결정할 수 있습니다.",
      controlPlaneEyebrow: "운영자용",
      controlPlaneTitle: "운영팀도 같은 흐름을 쉽게 확인할 수 있습니다.",
      controlPlaneDescription:
        "대시보드에서는 검토 대기 미션, 출금 요청, 이상 징후를 한 화면에서 볼 수 있습니다.",
      queuedVerifications: "검토 대기",
      pendingPayouts: "출금 대기",
      reserveCoverage: "안전 여유"
    },
    store: {
      eyebrow: "스토어",
      title: "해야 할 일과 받을 보상이 분명한 앱만 모았습니다.",
      description:
        "각 앱 카드에서 미션 수, 보상 범위, 대략적인 난이도를 바로 확인할 수 있습니다.",
      featured: "추천",
      liveMissions: "미션",
      ratingSuffix: "평점",
      installs: "설치",
      rewardSuffix: "USDT 리워드",
      openListing: "자세히 보기"
    },
    appDetail: {
      listingSignalsEyebrow: "시작 전 확인",
      listingSignalsTitle: "보상, 시간, 참여 가능 지역을 먼저 봅니다.",
      listingSignalsDescription:
        "시작 전에 중요한 정보를 앞에 모아 두어서 이 미션이 할 만한지 빠르게 판단할 수 있습니다.",
      liveMissions: "열린 미션",
      rating: "평점",
      installBase: "이용자 수",
      missionsEyebrow: "미션",
      missionsTitle: "미션은 짧고 읽기 쉽게 정리했습니다.",
      missionsDescription:
        "무엇을 해야 하는지, 어떤 증빙이 필요한지, 얼마를 받는지 바로 확인할 수 있습니다.",
      reviewMissionFlow: "미션 자세히 보기"
    },
    missionDetail: {
      eyebrow: "미션 상세",
      prepareWallet: "지갑 열기",
      backTo: "돌아가기:",
      proofEyebrow: "제출할 것",
      proofTitle: "완료 후 간단한 증빙만 보내면 됩니다.",
      proofDescription:
        "증빙을 보내면 확인 절차를 거친 뒤 조건이 맞을 때 보상이 반영됩니다.",
      asyncEyebrow: "다음 단계",
      asyncTitle: "검토 순서",
      asyncDescription: "미션 제출 후에는 아래 순서로 처리됩니다.",
      runtimeEyebrow: "알아두기",
      runtimeTitle: "보상은 검토 후에 보입니다.",
      runtimeDescription:
        "처음에는 대기 상태로 보이고, 검토가 끝나면 보상으로 넘어갑니다.",
      stageOneTitle: "1. 증빙 제출",
      stageOneDescription: "스크린샷이나 앱 확인 정보가 저장됩니다.",
      stageTwoTitle: "2. 검토 진행",
      stageTwoDescription: "이상하거나 부족한 제출은 더 꼼꼼히 확인합니다.",
      stageThreeTitle: "3. 보상 반영",
      stageThreeDescription: "승인되면 보상이 추가되고 출금 가능한 흐름으로 이동합니다.",
      estimatedEffort: "예상 소요",
      linkedApp: "연결 앱",
      status: "상태",
      minutesShort: "분"
    },
    wallet: {
      eyebrow: "지갑",
      title: "지금 출금 가능한 금액과 검토 중인 금액을 쉽게 확인하세요.",
      description:
        "이 화면에서 사용 가능 잔액, 검토 중인 보상, 출금 요청 상태를 한눈에 볼 수 있습니다.",
      available: "사용 가능",
      availableNote: "지금 출금 요청 가능",
      pending: "대기 중",
      pendingNote: "아직 검토 중",
      lifetimeEarned: "총 적립",
      lifetimeEarnedNote: "지금까지 받은 보상",
      payoutEta: "다음 출금",
      payoutEtaNote: "예상 시점",
      movementEyebrow: "최근 활동",
      movementTitle: "최근 지갑 변경 내역",
      movementDescription:
        "이 목록에서는 출금 요청과 완료된 전송 상태를 쉬운 단계로 볼 수 있습니다."
    },
    rewards: {
      eyebrow: "리워드",
      title: "오늘 어떤 앱에서 보상을 더 받을 수 있는지 확인하세요.",
      description:
        "활성 보상 범위와 캠페인 예산을 쉬운 말로 같이 보여줍니다.",
      streamsEyebrow: "리워드 목록",
      streamsTitle: "지금 참여 가능한 보상",
      budgetsEyebrow: "예산",
      budgetsTitle: "하루 예산 한눈에 보기",
      dailyBudgetSuffix: "일일 예산"
    },
    history: {
      eyebrow: "내역",
      title: "언제 적립됐고 언제 출금됐는지 깔끔하게 확인하세요.",
      description:
        "리워드와 출금 흐름을 읽기 쉬운 형태로 보여줘서 진행 상황을 헷갈리지 않게 합니다."
    },
    adminOverview: {
      eyebrow: "개요",
      title: "이 운영 화면은 리스크와 출금 처리량을 중심으로 설계됩니다.",
      description:
        "이 관리자 화면은 의도적으로 도메인 모델 가까이에 있습니다. 큐, 캠페인, 출금, 부정행위, 준비금을 한 번에 봅니다.",
      queuedVerifications: "대기 중인 검증",
      queuedVerificationsNote: "worker 수집 대기",
      pendingPayouts: "처리 대기 출금",
      pendingPayoutsNote: "온체인 확정 전",
      flaggedSessions: "표시된 세션",
      flaggedSessionsNote: "부정행위 검토 필요",
      rewardVelocity: "리워드 처리량",
      rewardVelocityNote: "최근 24시간",
      assumptionsEyebrow: "운영 가정",
      assumptionsTitle: "플랫폼이 기본적으로 보호하는 것"
    },
    adminApps: {
      eyebrow: "앱",
      title: "캠페인 인벤토리는 앱 품질과 미션 깊이에 맞춰 정리됩니다.",
      description:
        "앱 승인과 리워드 예산은 각 앱이 실제로 감당할 수 있는 미션 인벤토리와 가까이 있어야 합니다.",
      featured: "추천",
      catalog: "카탈로그",
      missions: "미션",
      supportedRegions: "지원 지역"
    },
    adminCampaigns: {
      eyebrow: "캠페인",
      title: "운영자가 차트를 열기 전에 예산 페이싱이 읽혀야 합니다.",
      description:
        "이 스캐폴드는 첫 운영 패스를 단순하게 유지합니다. 예산, 목표, 상태를 먼저 보여줍니다.",
      runs: "운영 기간",
      to: "~",
      target: "목표",
      conversions: "전환"
    },
    adminPayouts: {
      eyebrow: "출금",
      title: "출금 처리는 단계별로 보이고, 의도적으로 단조롭게 운영됩니다.",
      description:
        "운영자는 자금이 이미 커밋됐는지 추측하지 않고도 현재 출금 위치를 볼 수 있어야 합니다."
    },
    adminFraud: {
      eyebrow: "부정행위",
      title: "출금 확정 전에 악용 심사가 먼저 존재합니다.",
      description:
        "리워드 시스템은 출금 이후에 사기를 발견하면 무너지기 때문에, 이 큐를 스캐폴드에서도 1급 흐름으로 둡니다.",
      riskScore: "위험 점수"
    },
    notFound: {
      eyebrow: "찾을 수 없음",
      title: "이 경로는 현재 스캐폴드 범위 밖입니다.",
      description:
        "모노레포 구조는 준비돼 있지만, 이 페이지는 아직 구현되지 않았습니다.",
      backToStore: "스토어로 돌아가기",
      openAdmin: "관리 화면 열기"
    },
    walletConnect: {
      eyebrow: "지갑",
      title: "보상을 받으려면 먼저 지갑을 연결하세요.",
      description:
        "한 번 연결하면 보상 적립과 출금 요청을 같은 계정으로 맞춰서 처리할 수 있습니다.",
      connectionState: "지갑 상태",
      notConnected: "미연결",
      backendLink: "앱 연결 상태",
      status: {
        idle: "대기",
        syncing: "확인 중",
        linked: "준비 완료",
        error: "오류"
      }
    },
    withdrawals: {
      eyebrow: "출금",
      title: "몇 번의 터치만으로 출금을 요청하세요.",
      description:
        "출금은 바로 전송되지 않고 검토 후 처리되므로 상태가 바뀌기까지 조금 시간이 걸릴 수 있습니다.",
      amount: "출금 금액",
      request: "출금",
      pipelineStatus: "요청 상태",
      status: {
        idle: "대기",
        submitting: "보내는 중",
        queued: "접수됨",
        error: "오류"
      }
    },
    taxonomy: {
      categories: {
        games: "게임",
        ai: "AI",
        finance: "금융"
      },
      verificationMethods: {
        screenshot: "스크린샷 제출",
        api_callback: "자동 확인",
        manual_review: "운영팀 확인"
      },
      movementStatuses: {
        confirmed: "완료",
        queued: "검토 중",
        submitted: "전송됨"
      },
      campaignStatuses: {
        active: "활성",
        live: "진행 중"
      },
      fraudSeverity: {
        high: "높음",
        medium: "중간"
      }
    },
    data: {
      architectureSignals: [
        "앱을 고르고 미션을 끝낸 뒤 몇 번의 터치로 증빙을 보낼 수 있습니다.",
        "검토가 끝나면 보상이 반영됩니다.",
        "출금 요청은 따로 관리해서 잔액 흐름을 더 쉽게 볼 수 있습니다."
      ],
      apps: {
        app_pulseplay: {
          tagline: "측정 가능한 리텐션 미션을 가진 모바일 게임 루프",
          description:
            "PulsePlay는 스크린샷 증빙과 반복 가능한 일일 챌린지를 중심으로 빠른 설치-활성화 캠페인을 운영합니다."
        },
        app_signalai: {
          tagline: "B2B 성장팀을 위한 AI 워크플로우 도입 미션",
          description:
            "Signal AI는 값싼 퍼널 상단 클릭이 아니라 검증된 온보딩 깊이에 대해 보상합니다."
        },
        app_marginflow: {
          tagline: "지갑 네이티브 리워드 레일을 갖춘 온체인 금융 퍼널",
          description:
            "MarginFlow는 실제 지급 원장을 클라이언트 밖에 두면서도 입금 기반 온보딩 경로에 리워드를 붙입니다."
        }
      },
      missions: {
        mission_install_pulseplay: {
          title: "튜토리얼 아레나를 설치하고 클리어하기",
          description:
            "앱을 설치하고 가이드 아레나를 끝낸 뒤, 완료 화면과 계정 증빙을 제출하세요.",
          proofRequirements: [
            "튜토리얼 클리어 화면",
            "지갑 연동 계정 스크린샷"
          ]
        },
        mission_daily_streak: {
          title: "3일 연속 복귀 스트릭 유지",
          description:
            "7일 안에 하루 복귀 세션을 세 번 완료하세요.",
          proofRequirements: ["자동 앱 콜백", "연동 계정 상태"]
        },
        mission_signal_activation: {
          title: "첫 AI 워크스페이스 만들기",
          description:
            "워크스페이스를 만들고, 자산 두 개를 업로드하고, 팀원 한 명을 초대하세요.",
          proofRequirements: [
            "워크스페이스 스크린샷",
            "초대 확인 이메일"
          ]
        },
        mission_marginflow_fund: {
          title: "샌드박스 볼트를 충전하고 안전 체크리스트 완료",
          description:
            "샌드박스 볼트를 열고 데모 잔액을 넣은 뒤, 리스크 안내 절차를 끝내세요.",
          proofRequirements: [
            "볼트 요약 화면",
            "체크리스트 완료 영수증"
          ]
        }
      },
      campaigns: {
        campaign_pulse_q2: "PulsePlay 2분기 리텐션 스프린트",
        campaign_signal_growth: "Signal AI 활성화 푸시"
      },
      wallet: {
        nextPayoutEta: "보통 검토 후 8시간 이내"
      },
      fraudReasons: {
        session_demo_003: "기기 지문 재사용 및 증빙 체인 누락",
        session_demo_009: "다중 계정 IP 군집"
      }
    }
  }
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  return isLocale(cookieLocale) ? cookieLocale : defaultLocale;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export async function getRequestDictionary() {
  const locale = await getRequestLocale();
  return {
    locale,
    dictionary: getDictionary(locale)
  };
}
