import { useEffect, useState } from "react";

export const useIsMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};
