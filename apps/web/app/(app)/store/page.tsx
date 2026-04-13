import Link from "next/link";
import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { storefrontApps } from "@/lib/mock-data";
import { compact } from "@/lib/formatters";

export default function StorePage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Store"
        title="Browse reward-backed apps with mission depth, not clickbait."
        description="Each listing combines discovery, mission inventory, and payout expectations so users can judge whether a campaign is worth the effort."
      />

      <section className="app-grid">
        {storefrontApps.map(({ app, missions }) => (
          <ShellCard key={app.id}>
            <div className="chip-row">
              <Pill>{app.category}</Pill>
              {app.featured ? <Pill tone="success">Featured</Pill> : null}
            </div>
            <div className="stack">
              <h2 className="app-card-title">{app.name}</h2>
              <p className="detail-copy">{app.tagline}</p>
            </div>
            <div className="meta-row">
              <strong>{app.rewardRange}</strong>
              <span className="mini-label">{missions.length} live missions</span>
            </div>
            <div className="meta-row">
              <strong>{app.rating.toFixed(1)} rating</strong>
              <span className="mini-label">
                {compact.format(app.installCount)} installs
              </span>
            </div>
            <div className="timeline">
              {missions.slice(0, 2).map((mission) => (
                <div className="timeline-step" key={mission.id}>
                  <strong>{mission.title}</strong>
                  <p className="detail-copy">{mission.reward.amount} USDT reward</p>
                </div>
              ))}
            </div>
            <Link className="primary-link" href={`/apps/${app.slug}`}>
              Open listing
            </Link>
          </ShellCard>
        ))}
      </section>
    </div>
  );
}
