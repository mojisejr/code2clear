import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { ReactNode } from "react";
import { minAddress } from "~/utils/minAddress";
import { CgLogOut } from "react-icons/cg";

interface VerificationBoxProps {
  imageUrl: string;
  email: string;
  address: `0x${string}`;
  children: ReactNode;
}

const VerificationBox = ({
  imageUrl,
  email,
  address,
  children,
}: VerificationBoxProps) => {
  return (
    <>
      <div className="rounded-xl bg-gradient-to-b from-slate-100 to-slate-50 p-7 shadow-xl">
        <div className="flex w-full gap-3 pb-2">
          <Image
            className="rounded-full"
            src={imageUrl}
            width={50}
            height={50}
            alt="user"
          />
          <div className="flex flex-col">
            <div className="text-xl font-bold">{email}</div>
            <div className="flex items-center justify-between font-bold text-slate-500">
              {address ? `${minAddress(address)}` : null}
              <SignOutButton>
                <button className="text-sm hover:text-blue-400">
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
        <hr />
        <>{children}</>
      </div>
    </>
  );
};

export default VerificationBox;
