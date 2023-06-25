import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

const ConnectWallet = () => {
  //@dev: prevent hydration error
  const { address, isConnected } = useAccount();

  return (
    <>
      <ConnectButton accountStatus={"address"} />
    </>
  );
};

export default ConnectWallet;
