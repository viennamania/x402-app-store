import Link from "next/link";
import { notFound } from "next/navigation";
import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getStorefrontBySlug } from "@/lib/mock-data";

export default function AppDetailPage({
  params
}: {
  params: { appId: string };
}) {
  const entry = getStorefrontBySlug(params.appId);

  if (!entry) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="hero-grid">
        <div className="hero-panel accent-panel">
          <p className="section-eyebrow">{entry.app.category}</p>
          <h1>{entry.app.name}</h1>
          <p className="hero-copy">{entry.app.description}</p>
          <div className="chip-row">
            <Pill tone="success">{entry.app.rewardRange}</Pill>
            <Pill>{entry.app.supportedRegions.join(" • ")}</Pill>
          </div>
        </div>
        <ShellCard>
          <SectionHeading
            eyebrow="Listing Signals"
            title="Campaign quality is visible before the user starts."
            description="This page combines mission count, supported regions, reward range, and verification method so the funnel feels intentional."
          />
          <div className="stack">
            <div className="sync-status">
              <span>Live missions</span>
              <strong>{entry.missions.length}</strong>
            </div>
            <div className="sync-status">
              <span>Rating</span>
              <strong>{entry.app.rating.toFixed(1)} / 5</strong>
            </div>
            <div className="sync-status">
              <span>Install base</span>
              <strong>{entry.app.installCount.toLocaleString()}</strong>
            </div>
          </div>
        </ShellCard>
      </section>

      <section className="stack">
        <SectionHeading
          eyebrow="Missions"
          title="Every mission has an explicit proof path."
          description="The UI can stay simple because verification and reward credit move through the worker pipeline after submission."
        />
        {entry.missions.map((mission) => (
          <ShellCard key={mission.id}>
            <div className="chip-row">
              <Pill>{mission.verificationMethod}</Pill>
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
              Review mission flow
            </Link>
          </ShellCard>
        ))}
      </section>
    </div>
  );
}
