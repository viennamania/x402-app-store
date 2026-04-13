import { loadWebEnv } from "@repo/config";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const env = loadWebEnv();

export const defaultChain = defineChain(env.NEXT_PUBLIC_DEFAULT_CHAIN_ID);

export const thirdwebClient = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
});

export const supportedWallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet")
];
