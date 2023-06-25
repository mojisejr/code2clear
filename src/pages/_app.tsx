import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

//Clerk
import { ClerkProvider } from "@clerk/nextjs";

//Wagmi
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "wallet lists",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId: "Code2Clear" }),
    ],
  },
]);

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
