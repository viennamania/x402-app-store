import { SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getWalletSummary } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default async function HistoryPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const walletSummary = getWalletSummary(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.history.eyebrow}
        title={dictionary.history.title}
        description={dictionary.history.description}
      />
      <ShellCard>
        {walletSummary.recentMovements.map((movement) => (
          <div className="list-row" key={movement.id}>
            <div className="stack">
              <strong>{movement.requestId}</strong>
              <span className="mini-label">{movement.createdAt}</span>
            </div>
            <div className="stack">
              <strong>{formatReward(movement.amount, locale)}</strong>
              <span className="mini-label">
                {
                  dictionary.taxonomy.movementStatuses[
                    movement.status as keyof typeof dictionary.taxonomy.movementStatuses
                  ] ?? movement.status
                }
              </span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
