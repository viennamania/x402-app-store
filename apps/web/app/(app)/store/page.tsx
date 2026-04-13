import Link from "next/link";
import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getStorefrontApps } from "@/lib/mock-data";
import { formatCompact } from "@/lib/formatters";

export default async function StorePage() {
  const { dictionary, locale } = await getRequestDictionary();
  const storefrontApps = getStorefrontApps(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.store.eyebrow}
        title={dictionary.store.title}
        description={dictionary.store.description}
      />

      <section className="app-grid">
        {storefrontApps.map(({ app, missions }) => (
          <ShellCard key={app.id}>
            <div className="chip-row">
              <Pill>
                {
                  dictionary.taxonomy.categories[
                    app.category as keyof typeof dictionary.taxonomy.categories
                  ]
                }
              </Pill>
              {app.featured ? <Pill tone="success">{dictionary.store.featured}</Pill> : null}
            </div>
            <div className="stack">
              <h2 className="app-card-title">{app.name}</h2>
              <p className="detail-copy">{app.tagline}</p>
            </div>
            <div className="meta-row">
              <strong>{app.rewardRange}</strong>
              <span className="mini-label">
                {missions.length} {dictionary.store.liveMissions}
              </span>
            </div>
            <div className="meta-row">
              <strong>
                {app.rating.toFixed(1)} {dictionary.store.ratingSuffix}
              </strong>
              <span className="mini-label">
                {formatCompact(app.installCount, locale)} {dictionary.store.installs}
              </span>
            </div>
            <div className="timeline">
              {missions.slice(0, 2).map((mission) => (
                <div className="timeline-step" key={mission.id}>
                  <strong>{mission.title}</strong>
                  <p className="detail-copy">
                    {mission.reward.amount} {dictionary.store.rewardSuffix}
                  </p>
                </div>
              ))}
            </div>
            <Link className="primary-link" href={`/apps/${app.slug}`}>
              {dictionary.store.openListing}
            </Link>
          </ShellCard>
        ))}
      </section>
    </div>
  );
}
