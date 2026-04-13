import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { payoutQueue } from "@/lib/mock-data";
import { formatReward } from "@/lib/formatters";

export default function AdminPayoutsPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Payouts"
        title="Withdrawal handling is staged, visible, and intentionally boring."
        description="Operators should see where a payout sits without needing to infer whether funds were already committed."
      />
      <ShellCard>
        {payoutQueue.map((movement) => (
          <div className="list-row" key={movement.id}>
            <div className="stack">
              <div className="chip-row">
                <Pill tone={movement.status === "submitted" ? "success" : "warning"}>
                  {movement.status}
                </Pill>
              </div>
              <strong>{movement.requestId}</strong>
              <p className="detail-copy">{movement.walletAddress}</p>
            </div>
            <div className="stack">
              <strong>{formatReward(movement.amount)}</strong>
              <span className="mini-label">{movement.createdAt}</span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
