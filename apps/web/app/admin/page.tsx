import { MetricCard, SectionHeading, ShellCard } from "@repo/ui";
import { adminOverview, architectureSignals } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default function AdminOverviewPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Overview"
        title="The control plane is shaped around risk and payout throughput."
        description="This admin surface is intentionally close to the domain model: queues, campaigns, payouts, fraud, and reserve health."
      />
      <section className="metric-grid">
        <MetricCard
          label="Queued verifications"
          value={String(adminOverview.queuedVerifications)}
          note="Awaiting worker pickup"
        />
        <MetricCard
          label="Pending payouts"
          value={String(adminOverview.pendingPayouts)}
          note="Not yet confirmed onchain"
        />
        <MetricCard
          label="Flagged sessions"
          value={String(adminOverview.flaggedSessions)}
          note="Needs fraud review"
        />
        <MetricCard
          label="Reward velocity"
          value={formatReward(adminOverview.rewardVelocity24h)}
          note="Last 24h"
        />
      </section>
      <ShellCard>
        <div className="stack">
          <p className="section-eyebrow">Operating assumptions</p>
          <h3 className="card-title">What the platform protects by design</h3>
        </div>
        <ul className="architecture-list">
          {architectureSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </ShellCard>
    </div>
  );
}
