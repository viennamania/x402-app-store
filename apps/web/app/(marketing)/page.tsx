import Link from "next/link";
import {
  InfoStrip,
  MetricCard,
  Pill,
  SectionHeading,
  ShellCard
} from "@repo/ui";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { getRequestDictionary } from "@/lib/i18n";
import {
  adminOverview,
  getArchitectureSignals,
  getStorefrontApps,
  getWalletSummary
} from "@/lib/mock-data";
import { formatCompact, formatReward } from "@/lib/formatters";

export default async function LandingPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const architectureSignals = getArchitectureSignals(locale);
  const storefrontApps = getStorefrontApps(locale);
  const walletSummary = getWalletSummary(locale);

  return (
    <div className="page-shell">
      <div className="page-toolbar">
        <LocaleSwitcher
          label={dictionary.language.label}
          locale={locale}
          options={dictionary.language.options}
        />
      </div>
      <section className="hero-grid">
        <div className="hero-panel accent-panel">
          <p className="section-eyebrow">{dictionary.landing.eyebrow}</p>
          <h1>{dictionary.landing.title}</h1>
          <p className="hero-copy">{dictionary.landing.description}</p>
          <div className="hero-actions">
            <Link className="primary-link" href="/store">
              {dictionary.landing.primaryCta}
            </Link>
            <Link className="secondary-link" href="/admin">
              {dictionary.landing.secondaryCta}
            </Link>
          </div>
        </div>
        <ShellCard>
          <SectionHeading
            eyebrow={dictionary.landing.scaffoldEyebrow}
            title={dictionary.landing.scaffoldTitle}
            description={dictionary.landing.scaffoldDescription}
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
          label={dictionary.landing.metricFeaturedApps}
          value={String(storefrontApps.filter((entry) => entry.app.featured).length)}
          note={dictionary.landing.metricFeaturedAppsNote}
        />
        <MetricCard
          label={dictionary.landing.metricAvailableBalance}
          value={formatReward(walletSummary.available.amount, locale)}
          note={dictionary.landing.metricAvailableBalanceNote}
        />
        <MetricCard
          label={dictionary.landing.metricRewardVelocity}
          value={formatReward(adminOverview.rewardVelocity24h, locale)}
          note={dictionary.landing.metricRewardVelocityNote}
        />
        <MetricCard
          label={dictionary.landing.metricInstallReach}
          value={formatCompact(
            storefrontApps.reduce((total, entry) => total + entry.app.installCount, 0),
            locale
          )}
          note={dictionary.landing.metricInstallReachNote}
        />
      </section>

      <section className="split-grid">
        <ShellCard>
          <SectionHeading
            eyebrow={dictionary.landing.storefrontEyebrow}
            title={dictionary.landing.storefrontTitle}
            description={dictionary.landing.storefrontDescription}
          />
          <div className="timeline">
            {storefrontApps.slice(0, 2).map((entry) => (
              <div className="timeline-step" key={entry.app.id}>
                <div className="chip-row">
                  <Pill>
                    {
                      dictionary.taxonomy.categories[
                        entry.app.category as keyof typeof dictionary.taxonomy.categories
                      ]
                    }
                  </Pill>
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
            eyebrow={dictionary.landing.controlPlaneEyebrow}
            title={dictionary.landing.controlPlaneTitle}
            description={dictionary.landing.controlPlaneDescription}
          />
          <div className="stack">
            <InfoStrip
              label={dictionary.landing.queuedVerifications}
              value={String(adminOverview.queuedVerifications)}
            />
            <InfoStrip
              label={dictionary.landing.pendingPayouts}
              value={String(adminOverview.pendingPayouts)}
            />
            <InfoStrip
              label={dictionary.landing.reserveCoverage}
              value={`${adminOverview.reserveCoverageRatio.toFixed(2)}x`}
            />
          </div>
        </ShellCard>
      </section>
    </div>
  );
}
