/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from "next/head";
import ConnectWallet from "~/components/Header/ConnectWallet";
import Header from "~/components/Header/Header";
import Logo from "~/components/Header/Logo";
import Menu from "~/components/Header/Menu";
import Layout from "~/components/Layouts/Layout";

import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import OnlyVerified from "~/components/Verify/OnlyVerified";

export default function VerfiyPage() {
  const { isConnected, address } = useAccount();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      void replace("/");
    }
  }, [isConnected]);

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Code2Clear" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Logo />
        <Menu />
        <ConnectWallet />
      </Header>
      <Layout>
        {isConnected ? (
          <>
            <SignedIn>
              <div className="flex min-h-[500px] items-center">
                <OnlyVerified />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex min-h-[500px] items-center">
                <SignIn
                  afterSignInUrl={`/verified?address=${address}`}
                  afterSignUpUrl={`/verified?address=${address}`}
                />
              </div>
            </SignedOut>
          </>
        ) : null}
      </Layout>
    </>
  );
}
