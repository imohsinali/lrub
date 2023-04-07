import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import contractABI from "../contract/lrub.json";

import WalletConnect from "@walletconnect/web3-provider";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { getAlluser, Lands, RecivedRequest, SendRequest } from "./functions";

// const contractAddress = "0x81Ad7380ae722619d37A216708105f42E1C372e1";
const contractAddress = "0xf8d9B8AA3E76203196DecE61f25Ce841F3e04475";

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
  const [pkr, setPkr] = useState(null);
  const [matic, setMatic] = useState(null);
  const [userAddress, setUser] = useState("");
  const [landId, setLandId] = useState();

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
    router.push("/");
  };

  useEffect(() => {
    const web3 = async () => {
      const web3Modal = await getWeb3Modal();
      if (web3Modal.cachedProvider) {
        connectWallet();
      }
    };
    fetchData();
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
  async function fetchData() {
    try {
      const { data } = await axios.get("/api/matic");
      setPkr(data.PkrUsd);
      setMatic(data.MaticUsd);
    } catch (error) {
      console.error(error);
      setPkr(null);
      setMatic(null);
    }
  }
  // const [land, setLands] = useState();
  // const [users,setUsers]=useState()

  const { data: users, error: userError } = useSWR(
    ["users", contract],
    async () => await getAlluser(contract),
    { revalidateOnMount: true }
  );

  const { data: land, error: landError } = useSWR(
    ["lands", contract],
    async () => await Lands(contract),
    { revalidateOnMount: true }
  );

  const { data: landstatus, error: statusError } = useSWR(
    ["status", contract],
    async () => await RecivedRequest(contract),
    { revalidateOnMount: true }
  );

  const { data: sendRequest, error: sendreqError } = useSWR(
    ["sendRequest", contract],
    async () => await SendRequest(contract),
    { revalidateOnMount: true }
  );


  console.log(land, users, landstatus,sendRequest);

  const currentUser = users?.filter((u) => u.address == account);
  const currentUserLand = land?.filter((land) => land.ownerAddress == account);
  const landforSell = land?.filter((land) => land.isforSell);
  console.log("sel", landforSell);

  console.log("asasas", landforSell);
  const [mapzoom,setMapzoom]=useState(false)
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
    currentUser,
    connectWallet,
    refreshState,
    disconnect,
    currentUserLand,
    matic,
    pkr,
    userAddress,
    setUser,
    users,
    land,
    landId,
    landforSell,
    setLandId,
    landstatus,
    sendRequest,
    mapzoom,
    setMapzoom,
  };

  return (
    <Web3Context.Provider value={web3ContextValue}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
