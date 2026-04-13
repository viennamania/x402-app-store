import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getStorefrontApps } from "@/lib/mock-data";

export default async function AdminAppsPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const storefrontApps = getStorefrontApps(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.adminApps.eyebrow}
        title={dictionary.adminApps.title}
        description={dictionary.adminApps.description}
      />
      <section className="admin-grid">
        {storefrontApps.map((entry) => (
          <ShellCard key={entry.app.id}>
            <div className="chip-row">
              <Pill>
                {
                  dictionary.taxonomy.categories[
                    entry.app.category as keyof typeof dictionary.taxonomy.categories
                  ]
                }
              </Pill>
              <Pill tone={entry.app.featured ? "success" : "default"}>
                {entry.app.featured
                  ? dictionary.adminApps.featured
                  : dictionary.adminApps.catalog}
              </Pill>
            </div>
            <h3 className="card-title">{entry.app.name}</h3>
            <p className="detail-copy">{entry.app.description}</p>
            <div className="sync-status">
              <span>{dictionary.adminApps.missions}</span>
              <strong>{entry.missions.length}</strong>
            </div>
            <div className="sync-status">
              <span>{dictionary.adminApps.supportedRegions}</span>
              <strong>{entry.app.supportedRegions.length}</strong>
            </div>
          </ShellCard>
        ))}
      </section>
    </div>
  );
}
