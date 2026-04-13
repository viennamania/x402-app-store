import { MetricCard, SectionHeading, ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";
import { WithdrawalForm } from "@/components/withdrawal-form";
import { WalletConnectPanel } from "@/components/wallet-connect-panel";
import { formatReward } from "@/lib/formatters";
import { getWalletSummary } from "@/lib/mock-data";

export default async function WalletPage() {
  const { dictionary, locale } = await getRequestDictionary();
  const walletSummary = getWalletSummary(locale);

  return (
    <div className="page-shell">
      <SectionHeading
        eyebrow={dictionary.wallet.eyebrow}
        title={dictionary.wallet.title}
        description={dictionary.wallet.description}
      />

      <section className="metric-grid">
        <MetricCard
          label={dictionary.wallet.available}
          value={formatReward(walletSummary.available.amount, locale)}
          note={dictionary.wallet.availableNote}
        />
        <MetricCard
          label={dictionary.wallet.pending}
          value={formatReward(walletSummary.pending.amount, locale)}
          note={dictionary.wallet.pendingNote}
        />
        <MetricCard
          label={dictionary.wallet.lifetimeEarned}
          value={formatReward(walletSummary.lifetimeEarned.amount, locale)}
          note={dictionary.wallet.lifetimeEarnedNote}
        />
        <MetricCard
          label={dictionary.wallet.payoutEta}
          value={walletSummary.nextPayoutEta}
          note={dictionary.wallet.payoutEtaNote}
        />
      </section>

      <section className="two-column">
        <WalletConnectPanel copy={dictionary.walletConnect} />
        <WithdrawalForm
          copy={dictionary.withdrawals}
          locale={locale}
          maxAmount={walletSummary.available.amount}
        />
      </section>

      <section className="stack">
        <SectionHeading
          eyebrow={dictionary.wallet.movementEyebrow}
          title={dictionary.wallet.movementTitle}
          description={dictionary.wallet.movementDescription}
        />
        <ShellCard>
          {walletSummary.recentMovements.map((movement) => (
            <div className="list-row" key={movement.id}>
              <div className="stack">
                <strong>{movement.requestId}</strong>
                <p className="detail-copy">{movement.walletAddress}</p>
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
      </section>
    </div>
  );
}
