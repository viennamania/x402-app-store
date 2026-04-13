import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { payoutQueue } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default async function AdminPayoutsPage() {
  const { dictionary, locale } = await getRequestDictionary();

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.adminPayouts.eyebrow}
        title={dictionary.adminPayouts.title}
        description={dictionary.adminPayouts.description}
      />
      <ShellCard>
        {payoutQueue.map((movement) => (
          <div className="list-row" key={movement.id}>
            <div className="stack">
              <div className="chip-row">
                <Pill tone={movement.status === "submitted" ? "success" : "warning"}>
                  {
                    dictionary.taxonomy.movementStatuses[
                      movement.status as keyof typeof dictionary.taxonomy.movementStatuses
                    ] ?? movement.status
                  }
                </Pill>
              </div>
              <strong>{movement.requestId}</strong>
              <p className="detail-copy">{movement.walletAddress}</p>
            </div>
            <div className="stack">
              <strong>{formatReward(movement.amount, locale)}</strong>
              <span className="mini-label">{movement.createdAt}</span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
