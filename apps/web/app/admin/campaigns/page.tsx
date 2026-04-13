import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getCampaigns } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default async function AdminCampaignsPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const campaigns = getCampaigns(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.adminCampaigns.eyebrow}
        title={dictionary.adminCampaigns.title}
        description={dictionary.adminCampaigns.description}
      />
      <ShellCard>
        {campaigns.map((campaign) => (
          <div className="list-row" key={campaign.id}>
            <div className="stack">
              <div className="chip-row">
                <Pill tone="success">
                  {
                    dictionary.taxonomy.campaignStatuses[
                      campaign.status as keyof typeof dictionary.taxonomy.campaignStatuses
                    ] ?? campaign.status
                  }
                </Pill>
              </div>
              <strong>{campaign.name}</strong>
              <p className="detail-copy">
                {dictionary.adminCampaigns.runs} {campaign.startAt.slice(0, 10)}{" "}
                {dictionary.adminCampaigns.to} {campaign.endAt.slice(0, 10)}
              </p>
            </div>
            <div className="stack">
              <strong>{formatReward(campaign.dailyBudget.amount, locale)}</strong>
              <span className="mini-label">
                {dictionary.adminCampaigns.target} {campaign.conversionTarget}{" "}
                {dictionary.adminCampaigns.conversions}
              </span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
