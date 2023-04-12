import { FormEvent, useEffect, useState } from "react";
import { Address, formatUnits, parseUnits } from "viem";
import { abi } from "./data/abi";
import { publicClient, walletClient } from "./lib/client";

const contractInfo = {
  address: "0x7b8E5E828480B1D6ea62f0194E565982285ffe67",
  abi,
} as const;

export default function TokenForm({ account }: { account: Address }) {
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState<bigint>();

  async function getBalance() {
    const bal = await publicClient.readContract({
      ...contractInfo,
      functionName: "balanceOf",
      args: [account],
    });

    if (bal) setBalance(bal);
  }

  async function send(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setStatus("Loading...");

    const formData = new FormData(evt.currentTarget);
    const to = formData.get("to") as Address;
    const amount = formData.get("amount") as `${number}`;
    const amountParsed = parseUnits(amount, 6);

    try {
      const { request } = await publicClient.simulateContract({
        ...contractInfo,
        account: account,
        functionName: "transfer",
        args: [to, amountParsed],
      });

      const tx = await walletClient.writeContract(request);

      setStatus(tx);
    } catch (err: any) {
      setStatus("Oh no!");
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="token-section">
      <h3>USDC (wink wink)</h3>
      <strong>Balance: {balance ? formatUnits(balance, 6) : "..."}</strong>
      <form onSubmit={send}>
        <input type="text" name="to" placeholder="Recipient" required />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          required
          step="any"
        />
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
