import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0 && !isHeaderCollapsed) {
        setIsHeaderCollapsed(true);
      } else if (scrollTop === 0 && isHeaderCollapsed) {
        setIsHeaderCollapsed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeaderCollapsed]);
  return (
    <motion.header
      initial={{ height: "100px" }}
      animate={{ opacity: isHeaderCollapsed ? 0.3 : 1, height: "100px" }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 right-0 top-0 z-10 bg-slate-200"
    >
      <div className="flex h-full w-full items-center justify-between p-[50px]">
        {children}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </motion.header>
  );
};

export default Header;
