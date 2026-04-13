import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { fraudQueue } from "@/lib/mock-data";

export default function AdminFraudPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Fraud"
        title="Abuse review exists before withdrawals finalize."
        description="This queue is deliberately first-class in the scaffold because reward systems fail when fraud arrives after payout."
      />
      <ShellCard>
        {fraudQueue.map((item) => (
          <div className="list-row" key={item.missionSessionId}>
            <div className="stack">
              <div className="chip-row">
                <Pill tone={item.severity === "high" ? "warning" : "default"}>
                  {item.severity}
                </Pill>
              </div>
              <strong>{item.missionSessionId}</strong>
              <p className="detail-copy">{item.reason}</p>
            </div>
            <div className="stack">
              <strong>{item.score}</strong>
              <span className="mini-label">risk score</span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
