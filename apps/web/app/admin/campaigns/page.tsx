import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { campaigns } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default function AdminCampaignsPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Campaigns"
        title="Budget pacing should be readable before the operator opens a chart."
        description="The scaffold keeps the first admin pass simple: budgets, targets, and campaign status."
      />
      <ShellCard>
        {campaigns.map((campaign) => (
          <div className="list-row" key={campaign.id}>
            <div className="stack">
              <div className="chip-row">
                <Pill tone="success">{campaign.status}</Pill>
              </div>
              <strong>{campaign.name}</strong>
              <p className="detail-copy">
                Runs {campaign.startAt.slice(0, 10)} to {campaign.endAt.slice(0, 10)}
              </p>
            </div>
            <div className="stack">
              <strong>{formatReward(campaign.dailyBudget.amount)}</strong>
              <span className="mini-label">
                target {campaign.conversionTarget} conversions
              </span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
