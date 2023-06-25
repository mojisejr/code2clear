import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mt-[100px] flex min-h-screen flex-col items-center justify-start bg-[#FAFAFA] text-black">
      {children}
    </div>
  );
};

export default Layout;
