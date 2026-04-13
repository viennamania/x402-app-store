import { MetricCard, SectionHeading, ShellCard } from "@repo/ui";
import { WithdrawalForm } from "@/components/withdrawal-form";
import { WalletConnectPanel } from "@/components/wallet-connect-panel";
import { formatReward } from "@/lib/formatters";
import { walletSummary } from "@/lib/mock-data";

export default function WalletPage() {
  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Wallet"
        title="Balance projections stay fast; settlement stays controlled."
        description="The wallet surface shows derived balances for speed, but the ledger and worker pipeline remain the financial source of truth."
      />

      <section className="metric-grid">
        <MetricCard
          label="Available"
          value={formatReward(walletSummary.available.amount)}
          note="Ready for verified payout requests"
        />
        <MetricCard
          label="Pending"
          value={formatReward(walletSummary.pending.amount)}
          note="Awaiting verification or settlement"
        />
        <MetricCard
          label="Lifetime earned"
          value={formatReward(walletSummary.lifetimeEarned.amount)}
          note="Ledger-derived history"
        />
        <MetricCard
          label="Payout ETA"
          value={walletSummary.nextPayoutEta}
          note="Operational SLA"
        />
      </section>

      <section className="two-column">
        <WalletConnectPanel />
        <WithdrawalForm maxAmount={walletSummary.available.amount} />
      </section>

      <section className="stack">
        <SectionHeading
          eyebrow="Movement History"
          title="Recent wallet movements"
          description="Movements represent payout requests and confirmations, separate from reward credits in the ledger."
        />
        <ShellCard>
          {walletSummary.recentMovements.map((movement) => (
            <div className="list-row" key={movement.id}>
              <div className="stack">
                <strong>{movement.requestId}</strong>
                <p className="detail-copy">{movement.walletAddress}</p>
              </div>
              <div className="stack">
                <strong>{formatReward(movement.amount)}</strong>
                <span className="mini-label">{movement.status}</span>
              </div>
            </div>
          ))}
        </ShellCard>
      </section>
    </div>
  );
}
