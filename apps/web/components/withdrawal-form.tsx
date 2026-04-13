"use client";

import { useState } from "react";
import { ShellCard } from "@repo/ui";
import type { Dictionary, Locale } from "@/lib/i18n";
import { formatReward } from "@/lib/formatters";

type WithdrawalStatus = keyof Dictionary["withdrawals"]["status"];

export function WithdrawalForm({
  maxAmount,
  copy,
  locale
}: {
  maxAmount: number;
  copy: Dictionary["withdrawals"];
  locale: Locale;
}) {
  const [amount, setAmount] = useState(Math.min(25, maxAmount));
  const [status, setStatus] = useState<WithdrawalStatus>("idle");

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
        <p className="section-eyebrow">{copy.eyebrow}</p>
        <h3>{copy.title}</h3>
        <p className="muted-copy">{copy.description}</p>
      </div>
      <label className="field">
        <span>{copy.amount}</span>
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
        {copy.request} {formatReward(amount, locale)}
      </button>
      <div className="sync-status">
        <span>{copy.pipelineStatus}</span>
        <strong>{copy.status[status]}</strong>
      </div>
    </ShellCard>
  );
}
