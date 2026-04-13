import Link from "next/link";
import { notFound } from "next/navigation";
import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getMissionDetail } from "@/lib/mock-data";

export default async function MissionDetailPage({
  params
}: {
  params: { missionId: string };
}) {
  const { dictionary, locale } = await getRequestDictionary();
  const detail = getMissionDetail(locale, params.missionId);

  if (!detail) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="two-column">
        <div className="hero-panel accent-panel">
          <p className="section-eyebrow">{dictionary.missionDetail.eyebrow}</p>
          <h1>{detail.mission.title}</h1>
          <p className="hero-copy">{detail.mission.description}</p>
          <div className="chip-row">
            <Pill tone="success">{detail.mission.reward.amount} USDT</Pill>
            <Pill>
              {
                dictionary.taxonomy.verificationMethods[
                  detail.mission.verificationMethod as keyof typeof dictionary.taxonomy.verificationMethods
                ]
              }
            </Pill>
          </div>
          <div className="hero-actions">
            <Link className="primary-link" href="/wallet">
              {dictionary.missionDetail.prepareWallet}
            </Link>
            <Link className="secondary-link" href={`/apps/${detail.app.slug}`}>
              {dictionary.missionDetail.backTo} {detail.app.name}
            </Link>
          </div>
        </div>
        <ShellCard>
          <SectionHeading
            eyebrow={dictionary.missionDetail.proofEyebrow}
            title={dictionary.missionDetail.proofTitle}
            description={dictionary.missionDetail.proofDescription}
          />
          <div className="timeline">
            {detail.mission.proofRequirements.map((item) => (
              <div className="timeline-step" key={item}>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </ShellCard>
      </section>

      <section className="split-grid">
        <ShellCard>
          <SectionHeading
            eyebrow={dictionary.missionDetail.asyncEyebrow}
            title={dictionary.missionDetail.asyncTitle}
            description={dictionary.missionDetail.asyncDescription}
          />
          <div className="timeline">
            <div className="timeline-step">
              <strong>{dictionary.missionDetail.stageOneTitle}</strong>
              <p className="detail-copy">{dictionary.missionDetail.stageOneDescription}</p>
            </div>
            <div className="timeline-step">
              <strong>{dictionary.missionDetail.stageTwoTitle}</strong>
              <p className="detail-copy">{dictionary.missionDetail.stageTwoDescription}</p>
            </div>
            <div className="timeline-step">
              <strong>{dictionary.missionDetail.stageThreeTitle}</strong>
              <p className="detail-copy">{dictionary.missionDetail.stageThreeDescription}</p>
            </div>
          </div>
        </ShellCard>
        <ShellCard>
          <SectionHeading
            eyebrow={dictionary.missionDetail.runtimeEyebrow}
            title={dictionary.missionDetail.runtimeTitle}
            description={dictionary.missionDetail.runtimeDescription}
          />
          <div className="stack">
            <div className="sync-status">
              <span>{dictionary.missionDetail.estimatedEffort}</span>
              <strong>
                {detail.mission.estimatedMinutes} {dictionary.missionDetail.minutesShort}
              </strong>
            </div>
            <div className="sync-status">
              <span>{dictionary.missionDetail.linkedApp}</span>
              <strong>{detail.app.name}</strong>
            </div>
            <div className="sync-status">
              <span>{dictionary.missionDetail.status}</span>
              <strong>
                {
                  dictionary.taxonomy.campaignStatuses[
                    detail.mission.status as keyof typeof dictionary.taxonomy.campaignStatuses
                  ] ?? detail.mission.status
                }
              </strong>
            </div>
          </div>
        </ShellCard>
      </section>
    </div>
  );
}
