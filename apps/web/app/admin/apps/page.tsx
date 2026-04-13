import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { storefrontApps } from "@/lib/mock-data";

export default function AdminAppsPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Apps"
        title="Campaign inventory is organized by app quality and mission depth."
        description="App approvals and reward budgeting should stay close to the mission inventory each listing can actually sustain."
      />
      <section className="admin-grid">
        {storefrontApps.map((entry) => (
          <ShellCard key={entry.app.id}>
            <div className="chip-row">
              <Pill>{entry.app.category}</Pill>
              <Pill tone={entry.app.featured ? "success" : "default"}>
                {entry.app.featured ? "featured" : "catalog"}
              </Pill>
            </div>
            <h3 className="card-title">{entry.app.name}</h3>
            <p className="detail-copy">{entry.app.description}</p>
            <div className="sync-status">
              <span>Missions</span>
              <strong>{entry.missions.length}</strong>
            </div>
            <div className="sync-status">
              <span>Supported regions</span>
              <strong>{entry.app.supportedRegions.length}</strong>
            </div>
          </ShellCard>
        ))}
      </section>
    </div>
  );
}
