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
        "Production-minded MVP scaffold for a USDT reward app store with queue-first rewards and wallet-native UX."
    },
    language: {
      label: "Language",
      options: {
        en: "EN",
        ko: "KO"
      }
    },
    brand: {
      storefront: "Reward app store",
      controlPlane: "Reward engine control plane"
    },
    nav: {
      store: "Store",
      wallet: "Wallet",
      rewards: "Rewards",
      history: "History",
      admin: "Admin",
      storefront: "Storefront",
      overview: "Overview",
      apps: "Apps",
      campaigns: "Campaigns",
      payouts: "Payouts",
      fraud: "Fraud"
    },
    landing: {
      eyebrow: "Product Brief",
      title: "Reward discovery that feels like an app store, not an ad wall.",
      description:
        "X402 is a USDT reward app marketplace where discovery, mission completion, and payout settlement live in one controlled product loop.",
      primaryCta: "Open Store",
      secondaryCta: "Review Ops Surface",
      scaffoldEyebrow: "Why this scaffold",
      scaffoldTitle:
        "Built around queue-first rewards and server-owned balances.",
      scaffoldDescription:
        "The web app handles browsing and wallet UX; the admin API and workers own verification, credits, withdrawals, and fraud review.",
      metricFeaturedApps: "Featured apps",
      metricFeaturedAppsNote: "Store pages wired first",
      metricAvailableBalance: "Available balance",
      metricAvailableBalanceNote: "Projection, not source of truth",
      metricRewardVelocity: "Reward velocity",
      metricRewardVelocityNote: "24h payout volume",
      metricInstallReach: "Install reach",
      metricInstallReachNote: "Top-of-funnel inventory",
      storefrontEyebrow: "Storefront",
      storefrontTitle: "The first user-facing loop is already mapped.",
      storefrontDescription:
        "Browse featured apps, open mission detail, connect a wallet, and queue a withdrawal request through thin proxy routes.",
      controlPlaneEyebrow: "Control Plane",
      controlPlaneTitle: "Admin views mirror the backend split.",
      controlPlaneDescription:
        "Campaigns, payouts, fraud queues, and ledger surfaces sit behind a dedicated internal API and worker runtime.",
      queuedVerifications: "Queued verifications",
      pendingPayouts: "Pending payouts",
      reserveCoverage: "Reserve coverage"
    },
    store: {
      eyebrow: "Store",
      title: "Browse reward-backed apps with mission depth, not clickbait.",
      description:
        "Each listing combines discovery, mission inventory, and payout expectations so users can judge whether a campaign is worth the effort.",
      featured: "Featured",
      liveMissions: "live missions",
      ratingSuffix: "rating",
      installs: "installs",
      rewardSuffix: "USDT reward",
      openListing: "Open listing"
    },
    appDetail: {
      listingSignalsEyebrow: "Listing Signals",
      listingSignalsTitle: "Campaign quality is visible before the user starts.",
      listingSignalsDescription:
        "This page combines mission count, supported regions, reward range, and verification method so the funnel feels intentional.",
      liveMissions: "Live missions",
      rating: "Rating",
      installBase: "Install base",
      missionsEyebrow: "Missions",
      missionsTitle: "Every mission has an explicit proof path.",
      missionsDescription:
        "The UI can stay simple because verification and reward credit move through the worker pipeline after submission.",
      reviewMissionFlow: "Review mission flow"
    },
    missionDetail: {
      eyebrow: "Mission Detail",
      prepareWallet: "Prepare wallet",
      backTo: "Back to",
      proofEyebrow: "Proof Contract",
      proofTitle: "The request cycle stops at submission.",
      proofDescription:
        "Verification and reward credit do not happen inline. A mission session hands off to the queue, then the worker decides whether to credit or flag.",
      asyncEyebrow: "Async Stages",
      asyncTitle: "Verification pipeline",
      asyncDescription:
        "This is the operational loop behind a single mission submission.",
      runtimeEyebrow: "Runtime Notes",
      runtimeTitle: "Production-minded even while scaffolded.",
      runtimeDescription:
        "The interfaces are explicit so real integrations can replace the mock data without changing the page contracts.",
      stageOneTitle: "1. Session submitted",
      stageOneDescription: "Proof is captured and stored for worker pickup.",
      stageTwoTitle: "2. Fraud scoring",
      stageTwoDescription:
        "Low confidence sessions divert into manual review.",
      stageThreeTitle: "3. Reward credit queued",
      stageThreeDescription:
        "Idempotency is keyed to the mission session before the ledger changes.",
      estimatedEffort: "Estimated effort",
      linkedApp: "Linked app",
      status: "Status",
      minutesShort: "min"
    },
    wallet: {
      eyebrow: "Wallet",
      title: "Balance projections stay fast; settlement stays controlled.",
      description:
        "The wallet surface shows derived balances for speed, but the ledger and worker pipeline remain the financial source of truth.",
      available: "Available",
      availableNote: "Ready for verified payout requests",
      pending: "Pending",
      pendingNote: "Awaiting verification or settlement",
      lifetimeEarned: "Lifetime earned",
      lifetimeEarnedNote: "Ledger-derived history",
      payoutEta: "Payout ETA",
      payoutEtaNote: "Operational SLA",
      movementEyebrow: "Movement History",
      movementTitle: "Recent wallet movements",
      movementDescription:
        "Movements represent payout requests and confirmations, separate from reward credits in the ledger."
    },
    rewards: {
      eyebrow: "Rewards",
      title:
        "The reward surface explains earning capacity without hiding the risk controls.",
      description:
        "Campaign budgets, mission payouts, and worker gating are visible together so the economics remain legible.",
      streamsEyebrow: "Reward Streams",
      streamsTitle: "Active payout inventory",
      budgetsEyebrow: "Campaign Budgets",
      budgetsTitle: "Daily burn remains observable",
      dailyBudgetSuffix: "daily budget"
    },
    history: {
      eyebrow: "History",
      title: "Auditability matters more than decoration once money moves.",
      description:
        "This timeline keeps reward and withdrawal traces explicit so a real ledger-backed history view can slot in later with minimal UI churn."
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
      eyebrow: "Wallet Access",
      title: "Connect with thirdweb, keep business state off the client.",
      description:
        "The web app only handles wallet UX. Linking, balances, and payout state stay behind the internal API and worker pipeline.",
      connectionState: "Connection state",
      notConnected: "Not connected",
      backendLink: "Backend link",
      status: {
        idle: "Idle",
        syncing: "Syncing",
        linked: "Linked",
        error: "Error"
      }
    },
    withdrawals: {
      eyebrow: "Withdrawals",
      title: "Queue payout requests, do not execute them inline.",
      description:
        "Every request enters verification, submission, and confirmation stages before final settlement.",
      amount: "Amount",
      request: "Request",
      pipelineStatus: "Pipeline status",
      status: {
        idle: "Idle",
        submitting: "Submitting",
        queued: "Queued",
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
        screenshot: "Screenshot proof",
        api_callback: "API callback",
        manual_review: "Manual review"
      },
      movementStatuses: {
        confirmed: "Confirmed",
        queued: "Queued",
        submitted: "Submitted"
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
        "Queue every reward credit before any balance projection changes.",
        "Treat reward_ledger as source-of-truth and balance snapshots as derived state.",
        "Keep wallet UX client-side, but link state and payouts server-owned."
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
        nextPayoutEta: "Within 8 hours after fraud clearance"
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
        "큐 중심 리워드 처리와 지갑 네이티브 UX를 갖춘 USDT 리워드 앱 스토어 MVP 스캐폴드입니다."
    },
    language: {
      label: "언어",
      options: {
        en: "EN",
        ko: "KO"
      }
    },
    brand: {
      storefront: "리워드 앱 스토어",
      controlPlane: "리워드 운영 컨트롤 플레인"
    },
    nav: {
      store: "스토어",
      wallet: "지갑",
      rewards: "리워드",
      history: "내역",
      admin: "관리",
      storefront: "스토어",
      overview: "개요",
      apps: "앱",
      campaigns: "캠페인",
      payouts: "출금",
      fraud: "부정행위"
    },
    landing: {
      eyebrow: "프로덕트 브리프",
      title: "광고판이 아니라 앱 스토어처럼 느껴지는 리워드 탐색.",
      description:
        "X402는 탐색, 미션 완료, 정산 출금을 하나의 통제된 흐름으로 묶은 USDT 리워드 앱 마켓플레이스입니다.",
      primaryCta: "스토어 열기",
      secondaryCta: "운영 화면 보기",
      scaffoldEyebrow: "왜 이 구조인가",
      scaffoldTitle:
        "큐 우선 리워드 처리와 서버 소유 잔액 모델을 중심에 둡니다.",
      scaffoldDescription:
        "웹은 탐색과 지갑 UX를 담당하고, admin API와 worker가 검증, 적립, 출금, 부정행위 심사를 맡습니다.",
      metricFeaturedApps: "추천 앱",
      metricFeaturedAppsNote: "스토어 페이지 우선 연결",
      metricAvailableBalance: "사용 가능 잔액",
      metricAvailableBalanceNote: "원장이 아닌 투영값",
      metricRewardVelocity: "리워드 처리량",
      metricRewardVelocityNote: "최근 24시간 출금 규모",
      metricInstallReach: "설치 도달 수",
      metricInstallReachNote: "상단 퍼널 인벤토리",
      storefrontEyebrow: "스토어",
      storefrontTitle: "첫 사용자 루프는 이미 설계돼 있습니다.",
      storefrontDescription:
        "추천 앱을 둘러보고, 미션 상세를 열고, 지갑을 연결하고, 얇은 프록시 라우트로 출금 요청을 큐잉할 수 있습니다.",
      controlPlaneEyebrow: "운영 제어면",
      controlPlaneTitle: "관리자 뷰는 백엔드 분리를 그대로 반영합니다.",
      controlPlaneDescription:
        "캠페인, 출금, 부정행위 큐, 원장 화면은 전용 내부 API와 worker 런타임 뒤에 배치됩니다.",
      queuedVerifications: "대기 중인 검증",
      pendingPayouts: "처리 대기 출금",
      reserveCoverage: "지급 준비율"
    },
    store: {
      eyebrow: "스토어",
      title: "낚시성 클릭이 아니라 미션 깊이로 판단하는 리워드 앱 탐색.",
      description:
        "각 리스트는 탐색, 미션 인벤토리, 출금 기대치를 함께 보여줘서 사용자가 참여 가치가 있는지 판단할 수 있습니다.",
      featured: "추천",
      liveMissions: "진행 중 미션",
      ratingSuffix: "평점",
      installs: "설치",
      rewardSuffix: "USDT 리워드",
      openListing: "상세 보기"
    },
    appDetail: {
      listingSignalsEyebrow: "리스트 신호",
      listingSignalsTitle: "시작하기 전에 캠페인 품질이 드러납니다.",
      listingSignalsDescription:
        "이 페이지는 미션 수, 지원 지역, 리워드 범위, 검증 방식을 함께 보여줘서 퍼널이 의도적으로 느껴지게 합니다.",
      liveMissions: "진행 중 미션",
      rating: "평점",
      installBase: "설치 기반",
      missionsEyebrow: "미션",
      missionsTitle: "모든 미션에는 명시적인 증빙 경로가 있습니다.",
      missionsDescription:
        "제출 이후 검증과 적립은 worker 파이프라인으로 넘어가기 때문에 UI는 단순하게 유지될 수 있습니다.",
      reviewMissionFlow: "미션 흐름 보기"
    },
    missionDetail: {
      eyebrow: "미션 상세",
      prepareWallet: "지갑 준비",
      backTo: "돌아가기:",
      proofEyebrow: "증빙 계약",
      proofTitle: "요청 사이클은 제출 단계에서 멈춥니다.",
      proofDescription:
        "검증과 리워드 적립은 인라인으로 처리되지 않습니다. 미션 세션이 큐로 넘어가고, 이후 worker가 적립 또는 플래그 여부를 결정합니다.",
      asyncEyebrow: "비동기 단계",
      asyncTitle: "검증 파이프라인",
      asyncDescription: "하나의 미션 제출 뒤에서 실제로 도는 운영 루프입니다.",
      runtimeEyebrow: "런타임 메모",
      runtimeTitle: "스캐폴드 상태여도 운영을 염두에 둡니다.",
      runtimeDescription:
        "페이지 계약을 바꾸지 않고도 실제 연동으로 교체할 수 있도록 인터페이스를 명확하게 두었습니다.",
      stageOneTitle: "1. 세션 제출",
      stageOneDescription: "증빙이 저장되고 worker가 가져갈 수 있는 상태가 됩니다.",
      stageTwoTitle: "2. 부정행위 점수화",
      stageTwoDescription: "신뢰도가 낮은 세션은 수동 심사로 우회됩니다.",
      stageThreeTitle: "3. 리워드 적립 큐 등록",
      stageThreeDescription:
        "원장이 바뀌기 전에 미션 세션 기준으로 idempotency 키가 고정됩니다.",
      estimatedEffort: "예상 소요",
      linkedApp: "연결 앱",
      status: "상태",
      minutesShort: "분"
    },
    wallet: {
      eyebrow: "지갑",
      title: "잔액은 빠르게 보여주고, 정산은 통제된 흐름으로 유지합니다.",
      description:
        "지갑 화면은 속도를 위해 파생 잔액을 보여주지만, 재무의 원본은 여전히 원장과 worker 파이프라인입니다.",
      available: "사용 가능",
      availableNote: "검증된 출금 요청 가능",
      pending: "대기 중",
      pendingNote: "검증 또는 정산 대기",
      lifetimeEarned: "누적 적립",
      lifetimeEarnedNote: "원장 기반 이력",
      payoutEta: "출금 ETA",
      payoutEtaNote: "운영 SLA",
      movementEyebrow: "이동 내역",
      movementTitle: "최근 지갑 이동",
      movementDescription:
        "이동 내역은 원장 적립과 분리된 출금 요청과 확정 상태를 보여줍니다."
    },
    rewards: {
      eyebrow: "리워드",
      title: "리스크 통제를 숨기지 않고도 적립 가능성을 설명합니다.",
      description:
        "캠페인 예산, 미션 리워드, worker 게이팅을 함께 노출해 경제 구조가 읽히도록 유지합니다.",
      streamsEyebrow: "리워드 스트림",
      streamsTitle: "활성 지급 인벤토리",
      budgetsEyebrow: "캠페인 예산",
      budgetsTitle: "일일 소진량이 계속 보입니다",
      dailyBudgetSuffix: "일일 예산"
    },
    history: {
      eyebrow: "내역",
      title: "돈이 움직이기 시작하면 장식보다 추적 가능성이 중요합니다.",
      description:
        "이 타임라인은 리워드와 출금 흐름을 명시적으로 유지해서, 나중에 실제 원장 기반 이력을 최소한의 UI 변경으로 끼워 넣을 수 있게 합니다."
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
      eyebrow: "지갑 접근",
      title: "thirdweb로 연결하되, 비즈니스 상태는 클라이언트 밖에 둡니다.",
      description:
        "웹은 지갑 UX만 담당합니다. 연결 상태, 잔액, 출금 상태는 내부 API와 worker 파이프라인 뒤에 유지됩니다.",
      connectionState: "연결 상태",
      notConnected: "미연결",
      backendLink: "백엔드 연동",
      status: {
        idle: "대기",
        syncing: "동기화 중",
        linked: "연결됨",
        error: "오류"
      }
    },
    withdrawals: {
      eyebrow: "출금",
      title: "출금 요청은 즉시 실행하지 말고 큐에 넣습니다.",
      description:
        "최종 정산 전까지 모든 요청은 검증, 제출, 확인 단계를 거칩니다.",
      amount: "금액",
      request: "요청",
      pipelineStatus: "파이프라인 상태",
      status: {
        idle: "대기",
        submitting: "제출 중",
        queued: "대기열 등록",
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
        screenshot: "스크린샷 증빙",
        api_callback: "API 콜백",
        manual_review: "수동 심사"
      },
      movementStatuses: {
        confirmed: "확정",
        queued: "대기",
        submitted: "제출됨"
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
        "잔액 투영값이 바뀌기 전에 모든 리워드 적립을 먼저 큐에 넣습니다.",
        "reward_ledger를 원본으로 두고 잔액 스냅샷은 파생 상태로 취급합니다.",
        "지갑 UX는 클라이언트에 두되, 연결 상태와 출금은 서버가 소유합니다."
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
        nextPayoutEta: "부정행위 심사 통과 후 8시간 이내"
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
