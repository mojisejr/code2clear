import { useUser } from "@clerk/nextjs";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";
import VerificationBox from "./VerificationBox";
import { toast } from "react-toastify";
import { minAddress } from "~/utils/minAddress";

const OnlyVerified = () => {
  const [verifiedUser, setVerifiedUser] = useState<{
    id: string;
    wallet: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    creditId: string;
  }>();
  const { address } = useAccount();
  const { user } = useUser();
  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchVerifiedUser,
  } = api.user.get.useQuery({
    wallet: address,
  });

  const {
    data: verifiedResult,
    mutate: addUser,
    isLoading: verifyLoading,
    isSuccess: isVerified,
  } = api.user.add.useMutation();

  useEffect(() => {
    if (isSuccess) {
      setVerifiedUser(data);
    }
    if (isVerified) {
      console.log("verified result", verifiedResult);
      setVerifiedUser(verifiedResult);
      toast.success(`${minAddress(address)}: verify successful.`);
    }
  }, [isSuccess, isVerified]);

  const handleVerify = (e: SyntheticEvent) => {
    e.preventDefault();
    addUser({
      wallet: address,
      email: user.primaryEmailAddress.emailAddress,
    });
  };

  return (
    <>
      {!isLoading ? (
        <>
          {verifiedUser != undefined || verifiedUser != null ? (
            <VerificationBox
              imageUrl={user.imageUrl}
              address={address}
              email={user.primaryEmailAddress.emailAddress}
            >
              <div className="flex max-w-[300px] flex-col items-center justify-center gap-2 pt-4">
                <div>
                  Welcome {user.username} you are already{" "}
                  <span className="font-bold text-green-400">Verified</span> you
                  have got free credits and more!
                </div>
              </div>
            </VerificationBox>
          ) : (
            <VerificationBox
              imageUrl={user.imageUrl}
              address={address}
              email={user.primaryEmailAddress.emailAddress}
            >
              <div className="flex max-w-[300px] flex-col items-center justify-center gap-2 pt-4">
                <div>
                  You have been signed in. To verify your wallet please click on
                  <span className="font-bold text-red-500">
                    {" "}
                    Verifiy Wallet.
                  </span>
                </div>
                <button
                  disabled={verifyLoading}
                  onClick={(e) => handleVerify(e)}
                  className="flex w-full justify-center rounded-xl bg-gradient-to-b from-slate-200 to-slate-100 p-2 font-bold hover:shadow-md"
                >
                  {!verifyLoading ? `Verify Wallet` : "Loading.."}
                </button>
              </div>
            </VerificationBox>
          )}
        </>
      ) : (
        <div className="text-xl text-slate-600">Loading...</div>
      )}
    </>
  );
};

export default OnlyVerified;
