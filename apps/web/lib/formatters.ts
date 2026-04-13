export const usdt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});

export function formatReward(amount: number) {
  return `${amount.toFixed(2)} USDT`;
}
