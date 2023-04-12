import { useState } from "react";
import { Address } from "viem";
import Connect from "./Connect";
import TokenForm from "./TokenForm";

function App() {
  const [account, setAccount] = useState<Address>();

  return (
    <div className="App">
      <h1 className="title">Le simple dapp</h1>
      {account ? (
        <>
          <p>Hello, {account}</p>
          <TokenForm account={account} />
        </>
      ) : (
        <Connect setAccount={setAccount} />
      )}
    </div>
  );
}

export default App;
