import { Address } from "viem";
import { walletClient } from "./lib/client";

export default function Connect({
  setAccount,
}: {
  setAccount: (account: Address) => void;
}) {
  async function connectWallet() {
    const [account] = await walletClient.requestAddresses();

    setAccount(account);
  }

  return (
    <div>
      <button type="button" onClick={connectWallet}>
        Connect
      </button>
    </div>
  );
}
