function shortenEthereumAddress(address) {
  const firstThree = address.slice(0, 5);
  const lastThree = address.slice(-3);
  return `${firstThree}...${lastThree}`;
}

export default shortenEthereumAddress;
