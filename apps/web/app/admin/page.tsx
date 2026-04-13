import { MetricCard, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { adminOverview, getArchitectureSignals } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default async function AdminOverviewPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const architectureSignals = getArchitectureSignals(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.adminOverview.eyebrow}
        title={dictionary.adminOverview.title}
        description={dictionary.adminOverview.description}
      />
      <section className="metric-grid">
        <MetricCard
          label={dictionary.adminOverview.queuedVerifications}
          value={String(adminOverview.queuedVerifications)}
          note={dictionary.adminOverview.queuedVerificationsNote}
        />
        <MetricCard
          label={dictionary.adminOverview.pendingPayouts}
          value={String(adminOverview.pendingPayouts)}
          note={dictionary.adminOverview.pendingPayoutsNote}
        />
        <MetricCard
          label={dictionary.adminOverview.flaggedSessions}
          value={String(adminOverview.flaggedSessions)}
          note={dictionary.adminOverview.flaggedSessionsNote}
        />
        <MetricCard
          label={dictionary.adminOverview.rewardVelocity}
          value={formatReward(adminOverview.rewardVelocity24h, locale)}
          note={dictionary.adminOverview.rewardVelocityNote}
        />
      </section>
      <ShellCard>
        <div className="stack">
          <p className="section-eyebrow">{dictionary.adminOverview.assumptionsEyebrow}</p>
          <h3 className="card-title">{dictionary.adminOverview.assumptionsTitle}</h3>
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
