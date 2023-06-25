import { motion } from "framer-motion";
import Link from "next/link";
import { useAccount } from "wagmi";

const Menu = () => {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        <motion.ul
          className="flex h-full items-center justify-center
          gap-[30%]
          "
          initial={{ opacity: 0, y: +20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <li className="hover:underline">
            <Link href="#">TRANSLATOR</Link>
          </li>
          <li className="hover:underline">
            <Link href="/verify">VERIFY</Link>
          </li>
          <li className="hover:underline">
            <Link href="#">ABOUT</Link>
          </li>
          <li className="hover:underline">
            <Link href="#">PRICING</Link>
          </li>
        </motion.ul>
      ) : null}
    </>
  );
};

export default Menu;
