export const minAddress = (address: `0x${string}`) => {
  return `${address.slice(0, 6)}...${address.slice(38)}`;
};
