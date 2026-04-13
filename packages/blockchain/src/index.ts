import type { WalletLinkRequestDto } from "@repo/types";

export interface ChainConfig {
  id: number;
  label: string;
  payoutAsset: "USDT";
}

export const supportedChains: ChainConfig[] = [
  { id: 8453, label: "Base", payoutAsset: "USDT" },
  { id: 42161, label: "Arbitrum", payoutAsset: "USDT" },
  { id: 137, label: "Polygon", payoutAsset: "USDT" }
];

export function resolveChainConfig(chainId: number): ChainConfig {
  return supportedChains.find((chain) => chain.id === chainId) ?? supportedChains[0]!;
}

export function createWalletLinkCommand(
  userId: string,
  request: WalletLinkRequestDto
) {
  return {
    userId,
    walletAddress: request.walletAddress,
    provider: request.provider,
    linkedAt: new Date().toISOString()
  };
}
