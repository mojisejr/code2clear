import ConnectWallet from "~/components/Header/ConnectWallet";
import Header from "~/components/Header/Header";
import Layout from "~/components/Layouts/Layout";
import Logo from "~/components/Header/Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import VerificationBox from "~/components/Verify/VerificationBox";
import { useAccount } from "wagmi";

export default function VerifiedPage() {
  const { isConnected } = useAccount();
  const { user, isSignedIn, isLoaded } = useUser();
  const { query, replace } = useRouter();
  const { address } = query;

  useEffect(() => {
    if (isConnected) {
      void replace("/verify");
    }
  }, [isConnected]);

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Layout>
        {isLoaded ? (
          <>
            {isSignedIn ? (
              <div className="flex min-h-[500px] w-full items-center justify-center">
                <VerificationBox
                  imageUrl={user.imageUrl}
                  address={address as `0x${string}`}
                  email={user.primaryEmailAddress.emailAddress}
                >
                  <div className="flex max-w-[300px] flex-col items-center gap-3 pt-4">
                    <div> connect wallet and get back to the app</div>
                    <ConnectButton />
                  </div>
                </VerificationBox>
              </div>
            ) : (
              <div className="flex min-h-[500px] w-full items-center justify-center">
                <div className="text-xl font-bold text-red-600">
                  Not Authorized!
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[500px] w-full items-center justify-center">
            <div className="text-xl font-bold">Loading...</div>
          </div>
        )}
      </Layout>
    </>
  );
}
