"use client";

import { useState } from "react";
import { ShellCard } from "@repo/ui";
import { formatReward } from "@/lib/formatters";

export function WithdrawalForm({ maxAmount }: { maxAmount: number }) {
  const [amount, setAmount] = useState(Math.min(25, maxAmount));
  const [status, setStatus] = useState("idle");

  async function submitWithdrawal() {
    setStatus("submitting");

    const response = await fetch("/api/withdrawals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "user_demo",
        walletAddress: "0x3Ae9...A1D9",
        amount,
        currency: "USDT"
      })
    });

    setStatus(response.ok ? "queued" : "error");
  }

  return (
    <ShellCard>
      <div className="stack">
        <p className="section-eyebrow">Withdrawals</p>
        <h3>Queue payout requests, do not execute them inline.</h3>
        <p className="muted-copy">
          Every request enters verification, submission, and confirmation
          stages before final settlement.
        </p>
      </div>
      <label className="field">
        <span>Amount</span>
        <input
          max={maxAmount}
          min={5}
          onChange={(event) => setAmount(Number(event.target.value))}
          step={1}
          type="number"
          value={amount}
        />
      </label>
      <button className="primary-button" onClick={() => void submitWithdrawal()}>
        Request {formatReward(amount)}
      </button>
      <div className="sync-status">
        <span>Pipeline status</span>
        <strong>{status}</strong>
      </div>
    </ShellCard>
  );
}
