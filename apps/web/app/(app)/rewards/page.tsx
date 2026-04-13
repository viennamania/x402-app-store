import { SectionHeading, ShellCard } from "@repo/ui";
import { campaigns, storefrontApps } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default function RewardsPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Rewards"
        title="The reward surface explains earning capacity without hiding the risk controls."
        description="Campaign budgets, mission payouts, and worker gating are visible together so the economics remain legible."
      />

      <section className="split-grid">
        <ShellCard>
          <div className="stack">
            <p className="section-eyebrow">Reward Streams</p>
            <h3 className="card-title">Active payout inventory</h3>
          </div>
          <div className="timeline">
            {storefrontApps.map((entry) => (
              <div className="timeline-step" key={entry.app.id}>
                <strong>{entry.app.name}</strong>
                <p className="detail-copy">{entry.app.rewardRange}</p>
              </div>
            ))}
          </div>
        </ShellCard>
        <ShellCard>
          <div className="stack">
            <p className="section-eyebrow">Campaign Budgets</p>
            <h3 className="card-title">Daily burn remains observable</h3>
          </div>
          <div className="timeline">
            {campaigns.map((campaign) => (
              <div className="timeline-step" key={campaign.id}>
                <strong>{campaign.name}</strong>
                <p className="detail-copy">
                  {formatReward(campaign.dailyBudget.amount)} daily budget
                </p>
              </div>
            ))}
          </div>
        </ShellCard>
      </section>
    </div>
  );
}
