"use client";

import { useEffect, useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ShellCard } from "@repo/ui";
import { defaultChain, supportedWallets, thirdwebClient } from "@/lib/thirdweb";

type LinkStatus = "idle" | "syncing" | "linked" | "error";

export function WalletConnectPanel() {
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
        <p className="section-eyebrow">Wallet Access</p>
        <h3>Connect with thirdweb, keep business state off the client.</h3>
        <p className="muted-copy">
          The web app only handles wallet UX. Linking, balances, and payout
          state stay behind the internal API and worker pipeline.
        </p>
      </div>
      <ConnectButton
        client={thirdwebClient}
        wallets={supportedWallets}
        chain={defaultChain}
      />
      <div className="sync-status">
        <span>Connection state</span>
        <strong>
          {account?.address
            ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
            : "Not connected"}
        </strong>
      </div>
      <div className="sync-status">
        <span>Backend link</span>
        <strong>{status}</strong>
      </div>
    </ShellCard>
  );
}
