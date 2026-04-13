import { SectionHeading, ShellCard } from "@repo/ui";
import { walletSummary } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default function HistoryPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="History"
        title="Auditability matters more than decoration once money moves."
        description="This timeline keeps reward and withdrawal traces explicit so a real ledger-backed history view can slot in later with minimal UI churn."
      />
      <ShellCard>
        {walletSummary.recentMovements.map((movement) => (
          <div className="list-row" key={movement.id}>
            <div className="stack">
              <strong>{movement.requestId}</strong>
              <span className="mini-label">{movement.createdAt}</span>
            </div>
            <div className="stack">
              <strong>{formatReward(movement.amount)}</strong>
              <span className="mini-label">{movement.status}</span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
