"use client";

import { useEffect, useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ShellCard } from "@repo/ui";
import type { Dictionary } from "@/lib/i18n";
import { defaultChain, supportedWallets, thirdwebClient } from "@/lib/thirdweb";

type LinkStatus = keyof Dictionary["walletConnect"]["status"];

export function WalletConnectPanel({
  copy
}: {
  copy: Dictionary["walletConnect"];
}) {
  const account = useActiveAccount();
  const [status, setStatus] = useState<LinkStatus>("idle");

  useEffect(() => {
    const walletAddress = account?.address;

    if (!walletAddress) {
      setStatus("idle");
      return;
    }

    let cancelled = false;

    async function linkWallet() {
      setStatus("syncing");

      try {
        const response = await fetch("/api/wallet/link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            walletAddress,
            provider: "thirdweb"
          })
        });

        if (!response.ok) {
          throw new Error("wallet-link-failed");
        }

        if (!cancelled) {
          setStatus("linked");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    void linkWallet();

    return () => {
      cancelled = true;
    };
  }, [account?.address]);

  return (
    <ShellCard className="wallet-connect-panel">
      <div className="stack">
        <p className="section-eyebrow">{copy.eyebrow}</p>
        <h3>{copy.title}</h3>
        <p className="muted-copy">{copy.description}</p>
      </div>
      <ConnectButton
        client={thirdwebClient}
        wallets={supportedWallets}
        chain={defaultChain}
      />
      <div className="sync-status">
        <span>{copy.connectionState}</span>
        <strong>
          {account?.address
            ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
            : copy.notConnected}
        </strong>
      </div>
      <div className="sync-status">
        <span>{copy.backendLink}</span>
        <strong>{copy.status[status]}</strong>
      </div>
    </ShellCard>
  );
}
