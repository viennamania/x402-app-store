import Link from "next/link";
import {
  InfoStrip,
  MetricCard,
  Pill,
  SectionHeading,
  ShellCard
} from "@repo/ui";
import {
  adminOverview,
  architectureSignals,
  storefrontApps,
  walletSummary
} from "@/lib/mock-data";
import { compact, formatReward } from "@/lib/formatters";

export default function LandingPage() {
  return (
    <div className="page-shell">
      <section className="hero-grid">
        <div className="hero-panel accent-panel">
          <p className="section-eyebrow">Product Brief</p>
          <h1>Reward discovery that feels like an app store, not an ad wall.</h1>
          <p className="hero-copy">
            X402 is a USDT reward app marketplace where discovery, mission
            completion, and payout settlement live in one controlled product
            loop.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/store">
              Open Store
            </Link>
            <Link className="secondary-link" href="/admin">
              Review Ops Surface
            </Link>
          </div>
        </div>
        <ShellCard>
          <SectionHeading
            eyebrow="Why this scaffold"
            title="Built around queue-first rewards and server-owned balances."
            description="The web app handles browsing and wallet UX; the admin API and workers own verification, credits, withdrawals, and fraud review."
          />
          <div className="chip-row">
            <Pill tone="success">Next.js App Router</Pill>
            <Pill tone="success">BullMQ workers</Pill>
            <Pill tone="warning">Ledger-first payouts</Pill>
          </div>
          <div className="timeline">
            {architectureSignals.map((signal) => (
              <div className="timeline-step" key={signal}>
                <strong>{signal}</strong>
              </div>
            ))}
          </div>
        </ShellCard>
      </section>

      <section className="metric-grid">
        <MetricCard
          label="Featured apps"
          value={String(storefrontApps.filter((entry) => entry.app.featured).length)}
          note="Store pages wired first"
        />
        <MetricCard
          label="Available balance"
          value={formatReward(walletSummary.available.amount)}
          note="Projection, not source of truth"
        />
        <MetricCard
          label="Reward velocity"
          value={formatReward(adminOverview.rewardVelocity24h)}
          note="24h payout volume"
        />
        <MetricCard
          label="Install reach"
          value={compact.format(
            storefrontApps.reduce((total, entry) => total + entry.app.installCount, 0)
          )}
          note="Top-of-funnel inventory"
        />
      </section>

      <section className="split-grid">
        <ShellCard>
          <SectionHeading
            eyebrow="Storefront"
            title="The first user-facing loop is already mapped."
            description="Browse featured apps, open mission detail, connect a wallet, and queue a withdrawal request through thin proxy routes."
          />
          <div className="timeline">
            {storefrontApps.slice(0, 2).map((entry) => (
              <div className="timeline-step" key={entry.app.id}>
                <div className="chip-row">
                  <Pill>{entry.app.category}</Pill>
                  <Pill tone="success">{entry.app.rewardRange}</Pill>
                </div>
                <h3 className="card-title">{entry.app.name}</h3>
                <p className="detail-copy">{entry.app.tagline}</p>
              </div>
            ))}
          </div>
        </ShellCard>
        <ShellCard>
          <SectionHeading
            eyebrow="Control Plane"
            title="Admin views mirror the backend split."
            description="Campaigns, payouts, fraud queues, and ledger surfaces sit behind a dedicated internal API and worker runtime."
          />
          <div className="stack">
            <InfoStrip label="Queued verifications" value={String(adminOverview.queuedVerifications)} />
            <InfoStrip label="Pending payouts" value={String(adminOverview.pendingPayouts)} />
            <InfoStrip
              label="Reserve coverage"
              value={`${adminOverview.reserveCoverageRatio.toFixed(2)}x`}
            />
          </div>
        </ShellCard>
      </section>
    </div>
  );
}
