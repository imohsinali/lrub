import WalletConnectProvider from "@walletconnect/web3-provider";

async function getWalletConnectProvider() {
  const provider = new WalletConnectProvider({
    rpc: {
      1: `{https://mainnet.infura.io/v3/${process.env.INFURA_KEY}}`,
      5: `{https://goerli.infura.io/v3/${process.env.INFURA_KEY}}`,
      80001: `{https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}}`,
    },
    qrcode: true,
  });
  await provider.enable();
  return provider;
}

export async function providerOptions() {
  const provider = new WalletConnectProvider({
    rpc: {
      1: `{https://mainnet.infura.io/v3/${process.env.INFURA_KEY}}`,
      5: `{https://goerli.infura.io/v3/${process.env.INFURA_KEY}}`,
      80001: `{https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}}`,
    },
    qrcode: true,
  });
  await provider.enable();
  return provider;
}
