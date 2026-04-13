import { Pill, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { getFraudQueue } from "@/lib/mock-data";

export default async function AdminFraudPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const fraudQueue = getFraudQueue(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.adminFraud.eyebrow}
        title={dictionary.adminFraud.title}
        description={dictionary.adminFraud.description}
      />
      <ShellCard>
        {fraudQueue.map((item) => (
          <div className="list-row" key={item.missionSessionId}>
            <div className="stack">
              <div className="chip-row">
                <Pill tone={item.severity === "high" ? "warning" : "default"}>
                  {
                    dictionary.taxonomy.fraudSeverity[
                      item.severity as keyof typeof dictionary.taxonomy.fraudSeverity
                    ] ?? item.severity
                  }
                </Pill>
              </div>
              <strong>{item.missionSessionId}</strong>
              <p className="detail-copy">{item.reason}</p>
            </div>
            <div className="stack">
              <strong>{item.score}</strong>
              <span className="mini-label">{dictionary.adminFraud.riskScore}</span>
            </div>
          </div>
        ))}
      </ShellCard>
    </div>
  );
}
