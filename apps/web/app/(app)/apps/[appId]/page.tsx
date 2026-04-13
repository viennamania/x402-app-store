import Link from "next/link";
import { notFound } from "next/navigation";
import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getStorefrontBySlug } from "@/lib/mock-data";
import { formatNumber } from "@/lib/formatters";

export default async function AppDetailPage({
  params
}: {
  params: { appId: string };
}) {
  const { dictionary, locale } = await getRequestDictionary();
  const entry = getStorefrontBySlug(locale, params.appId);

  if (!entry) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="hero-grid">
        <div className="hero-panel accent-panel">
          <p className="section-eyebrow">
            {
              dictionary.taxonomy.categories[
                entry.app.category as keyof typeof dictionary.taxonomy.categories
              ]
            }
          </p>
          <h1>{entry.app.name}</h1>
          <p className="hero-copy">{entry.app.description}</p>
          <div className="chip-row">
            <Pill tone="success">{entry.app.rewardRange}</Pill>
            <Pill>{entry.app.supportedRegions.join(" • ")}</Pill>
          </div>
        </div>
        <ShellCard>
          <SectionHeading
            eyebrow={dictionary.appDetail.listingSignalsEyebrow}
            title={dictionary.appDetail.listingSignalsTitle}
            description={dictionary.appDetail.listingSignalsDescription}
          />
          <div className="stack">
            <div className="sync-status">
              <span>{dictionary.appDetail.liveMissions}</span>
              <strong>{entry.missions.length}</strong>
            </div>
            <div className="sync-status">
              <span>{dictionary.appDetail.rating}</span>
              <strong>{entry.app.rating.toFixed(1)} / 5</strong>
            </div>
            <div className="sync-status">
              <span>{dictionary.appDetail.installBase}</span>
              <strong>{formatNumber(entry.app.installCount, locale)}</strong>
            </div>
          </div>
        </ShellCard>
      </section>

      <section className="stack">
        <SectionHeading
          eyebrow={dictionary.appDetail.missionsEyebrow}
          title={dictionary.appDetail.missionsTitle}
          description={dictionary.appDetail.missionsDescription}
        />
        {entry.missions.map((mission) => (
          <ShellCard key={mission.id}>
            <div className="chip-row">
              <Pill>
                {
                  dictionary.taxonomy.verificationMethods[
                    mission.verificationMethod as keyof typeof dictionary.taxonomy.verificationMethods
                  ]
                }
              </Pill>
              <Pill tone="success">{mission.reward.amount} USDT</Pill>
            </div>
            <div className="stack">
              <h3 className="card-title">{mission.title}</h3>
              <p className="detail-copy">{mission.description}</p>
            </div>
            <div className="timeline">
              {mission.proofRequirements.map((item) => (
                <div className="timeline-step" key={item}>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <Link className="primary-link" href={`/missions/${mission.id}`}>
              {dictionary.appDetail.reviewMissionFlow}
            </Link>
          </ShellCard>
        ))}
      </section>
    </div>
  );
}
