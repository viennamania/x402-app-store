import Link from "next/link";
import { notFound } from "next/navigation";
import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getMissionDetail } from "@/lib/mock-data";

export default function MissionDetailPage({
  params
}: {
  params: { missionId: string };
}) {
  const detail = getMissionDetail(params.missionId);

  if (!detail) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="two-column">
        <div className="hero-panel accent-panel">
          <p className="section-eyebrow">Mission Detail</p>
          <h1>{detail.mission.title}</h1>
          <p className="hero-copy">{detail.mission.description}</p>
          <div className="chip-row">
            <Pill tone="success">{detail.mission.reward.amount} USDT</Pill>
            <Pill>{detail.mission.verificationMethod}</Pill>
          </div>
          <div className="hero-actions">
            <Link className="primary-link" href="/wallet">
              Prepare wallet
            </Link>
            <Link className="secondary-link" href={`/apps/${detail.app.slug}`}>
              Back to {detail.app.name}
            </Link>
          </div>
        </div>
        <ShellCard>
          <SectionHeading
            eyebrow="Proof Contract"
            title="The request cycle stops at submission."
            description="Verification and reward credit do not happen inline. A mission session hands off to the queue, then the worker decides whether to credit or flag."
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
            eyebrow="Async Stages"
            title="Verification pipeline"
            description="This is the operational loop behind a single mission submission."
          />
          <div className="timeline">
            <div className="timeline-step">
              <strong>1. Session submitted</strong>
              <p className="detail-copy">Proof is captured and stored for worker pickup.</p>
            </div>
            <div className="timeline-step">
              <strong>2. Fraud scoring</strong>
              <p className="detail-copy">Low confidence sessions divert into manual review.</p>
            </div>
            <div className="timeline-step">
              <strong>3. Reward credit queued</strong>
              <p className="detail-copy">Idempotency is keyed to the mission session before the ledger changes.</p>
            </div>
          </div>
        </ShellCard>
        <ShellCard>
          <SectionHeading
            eyebrow="Runtime Notes"
            title="Production-minded even while scaffolded."
            description="The interfaces are explicit so real integrations can replace the mock data without changing the page contracts."
          />
          <div className="stack">
            <div className="sync-status">
              <span>Estimated effort</span>
              <strong>{detail.mission.estimatedMinutes} min</strong>
            </div>
            <div className="sync-status">
              <span>Linked app</span>
              <strong>{detail.app.name}</strong>
            </div>
            <div className="sync-status">
              <span>Status</span>
              <strong>{detail.mission.status}</strong>
            </div>
          </div>
        </ShellCard>
      </section>
    </div>
  );
}
