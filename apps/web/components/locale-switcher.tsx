"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  options: Record<Locale, string>;
};

export function LocaleSwitcher({
  locale,
  label,
  options
}: LocaleSwitcherProps) {
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [isPending, startTransition] = useTransition();

  async function updateLocale(nextLocale: Locale) {
    if (nextLocale === selectedLocale) {
      return;
    }

    setSelectedLocale(nextLocale);

    await fetch("/api/locale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ locale: nextLocale })
    });

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="locale-switcher" aria-label={label}>
      <span className="locale-label">{label}</span>
      <div className="locale-options">
        {(Object.keys(options) as Locale[]).map((option) => (
          <button
            className={option === selectedLocale ? "locale-option is-active" : "locale-option"}
            disabled={isPending}
            key={option}
            onClick={() => void updateLocale(option)}
            type="button"
          >
            {options[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
