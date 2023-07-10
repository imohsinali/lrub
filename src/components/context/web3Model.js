import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import contractABI from "../contract/lrub.json";

import WalletConnect from "@walletconnect/web3-provider";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { getAlluser, Lands, RecivedRequest, SendRequest } from "./functions";
// const contractAddress = "0x0421587b973034bB7388B4fDC73416937543c29d";
// const contractAddress = "0xf8d9B8AA3E76203196DecE61f25Ce841F3e04475";

// const contractAddress = "0xC08FC998D15F3621d413D5936b2EA23a9AEb93bb";
// const contractAddress = "0x8b5018C3de4e271464809bc3A6a2509e154343D8";
//0xB0Bf89B9e79c3E1482F85B32Ff1e901cC46aC37B
const contractAddress = "0xB0Bf89B9e79c3E1482F85B32Ff1e901cC46aC37B";

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
    getBlock();
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        router.push("/");

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
      setPkr(data.PkrUsd / data.MaticUsd);
      setMatic(data.MaticUsd / data.PkrUsd);
    } catch (error) {
      console.error(error);
      setPkr(null);
      setMatic(null);
    }
  }

  const { data: users, error: userError } = useSWR(
    ["users", contract],
    async () => await getAlluser(contract),
    { revalidateOnMount: true }
  );

  const { data: land, error: landError } = useSWR(
    ["land", contract],
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

  console.log(land, users, landstatus, sendRequest);

  const currentUser = users?.filter((u) => u.address == account);
  const currentUserLand = land?.filter((land) => land.ownerAddress == account);
  const landforSell = land?.filter((land) => land.isforSell);
  console.log("sel", landforSell);

  console.log("asasas", landforSell);
  const [mapzoom, setMapzoom] = useState(false);

  const getBlock = async () => {
    const oneDayAgoTimestamp = Math.floor(Date.now() / 1000) - 24 * 60 * 60;

    const currentBlockNumber = await library?.getBlockNumber();
    console.log("estimatedBlockNumber", currentBlockNumber);
  };

  const [totalUser, settotalUser] = useState();
  const [totalLand, settotalLand] = useState();
  const [totalInsp, settotalInsp] = useState();
  const [totalLandTransfer, settotalLandTransfer] = useState();

  const fun = async () => {
    const user = await contract?.userCount();
    settotalUser(parseInt(user?._hex));
    const land = await contract?.landsCount();
    settotalLand(parseInt(land?._hex));

    const insp = await contract?.ReturnAllLandIncpectorList();
    settotalInsp(parseInt(insp?.length));
    const transfer = await contract?.documentId();
    settotalLandTransfer(parseInt(transfer?._hex));
  };
  const web3ContextValue = {
    fun,
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
    totalUser,
    totalLand,
    totalInsp,
    totalLandTransfer,
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
