import { createPublicClient, createWalletClient, custom, http } from "viem";
import { goerli } from "viem/chains";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
  chain: goerli,
});

export const publicClient = createPublicClient({
  chain: goerli,
  // transport: http( Infura / Alchemy / etc URL ),
  transport: http(),
});
