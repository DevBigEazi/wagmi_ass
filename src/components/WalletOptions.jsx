import * as React from "react";
import { useConnect } from "wagmi";


const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
};

export default WalletOptions;
