import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
// import { getWeb3Modal } from "./web3Modal";
import Web3Modal from "web3modal";
import contractABI from "../contract/lrub.json";



import WalletConnect from "@walletconnect/web3-provider";
import { useRouter } from "next/router";
// const contractAddress = "0xbd1c2bec6b1ad8057f462d46de2b91c7289322b1";
const contractAddress = "0xD46eD2856742C3741d6d558694aA5A7fb9f58e60";


const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      rpc: {
        80001:
          "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
      },
    },
    chainId: 80001,
  },
};

async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: providerOptions,
    
  });
  return web3Modal;
}
export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const router = useRouter();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState();
  const [contract, setContract] = useState();

  const connectWallet = async () => {
    try {
      const web3Modal = await getWeb3Modal();
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      const signer = library.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );
      setContract(contract);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      // Store the contract and account values in localStorage
    } catch (error) {
      setError(error);
    }
  };


  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    const web3Modal = await getWeb3Modal();

    web3Modal.clearCachedProvider();
    localStorage.setItem("walletconnect", null);
    //  localStorage.setItem('sess')

    router.push("/");
  };

  useEffect(() => {
    const web3 = async () => {
      const web3Modal = await getWeb3Modal();

      if (web3Modal.cachedProvider) {
        connectWallet();
      }
    };
    web3();
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  

  const web3ContextValue = {
    provider,
    library,
    account,
    signature,
    error,
    chainId,
    network,
    message,
    verified,
    contract,
    connectWallet,
    refreshState,
    disconnect,
  };

  return (
    <Web3Context.Provider value={web3ContextValue}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
