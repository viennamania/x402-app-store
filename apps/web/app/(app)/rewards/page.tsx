import { SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getCampaigns, getStorefrontApps } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default async function RewardsPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const storefrontApps = getStorefrontApps(locale);
  const campaigns = getCampaigns(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.rewards.eyebrow}
        title={dictionary.rewards.title}
        description={dictionary.rewards.description}
      />

      <section className="split-grid">
        <ShellCard>
          <div className="stack">
            <p className="section-eyebrow">{dictionary.rewards.streamsEyebrow}</p>
            <h3 className="card-title">{dictionary.rewards.streamsTitle}</h3>
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
            <p className="section-eyebrow">{dictionary.rewards.budgetsEyebrow}</p>
            <h3 className="card-title">{dictionary.rewards.budgetsTitle}</h3>
          </div>
          <div className="timeline">
            {campaigns.map((campaign) => (
              <div className="timeline-step" key={campaign.id}>
                <strong>{campaign.name}</strong>
                <p className="detail-copy">
                  {formatReward(campaign.dailyBudget.amount, locale)}{" "}
                  {dictionary.rewards.dailyBudgetSuffix}
                </p>
              </div>
            ))}
          </div>
        </ShellCard>
      </section>
    </div>
  );
}
