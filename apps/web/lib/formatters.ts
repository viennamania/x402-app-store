import type { Locale } from "@/lib/i18n";

function toIntlLocale(locale: Locale) {
  return locale === "ko" ? "ko-KR" : "en-US";
}

export function formatReward(amount: number, locale: Locale = "en") {
  return `${amount.toLocaleString(toIntlLocale(locale), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} USDT`;
}

export function formatCompact(amount: number, locale: Locale = "en") {
  return new Intl.NumberFormat(toIntlLocale(locale), {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(amount);
}

export function formatNumber(amount: number, locale: Locale = "en") {
  return amount.toLocaleString(toIntlLocale(locale));
}
