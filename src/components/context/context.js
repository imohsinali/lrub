import contractABI from "../contract/lrub.json";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import Web3Modal from "web3modal";

import WalletConnect from "@walletconnect/web3-provider";
export const Context = React.createContext();

// const { ethereum } = window;
// const contractAddress="0x0C84632F86C08850Db4BbFC2b2C0f4AddB19EB79"
// const contractAddress = "0x71c1a7AE879D0E47d0987E6afd409b79B9Ae8f3D";
const contractAddress = "0xbd1c2bec6b1ad8057f462d46de2b91c7289322b1";

const createEthereumContract = () => {
  const provider = new Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    signer
  );

  return transactionsContract;
};

export const ContextProvider = ({ children }) => {
  // const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  // const [transactions, setTransactions] = useState(localStorage.getItem('transaction'));
  const [contract, setContract] = useState();
  // const [provider1, setProvider] = useState();
const defaultModelState = {
  open: false,
  role: {
    Inspector: false,
    Admin: false,
    User: false,
  },
};
const defaultLogin ={
  
    Inspector: false,
    Admin: false,
    User: false,
  }
const [login, setLogin] = useState(defaultLogin);

const [authState, setAuthState] = useState(defaultModelState);



  const checkIfWalletIsConnect = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const transactionsContract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );
      setContract(transactionsContract);
      setProvider(provider);
      console.log("hello 2", provider);
      console.log("hello", transactionsContract);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.ReturnAllLandIncpectorList();
        console.log(availableTransactions);
        // const structuredTransactions = availableTransactions.map((transaction) => ({
        //   name: transaction.name,
        //   age: parseInt(transaction.age._hex),
        //   // timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        //   city: transaction.city,
        //   // keyword: transaction.keyword,
        //   // amount: parseInt(transaction.amount._hex) / (10 ** 18)
        // }));

        // console.log(structuredTransactions);

        // setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(checkIfWalletIsConnect())
  const connectWallet1 = async () => {
    try {
      setProcessing(true);

      // Check if the `ethereum` object is available
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }

      // Prompt the user to connect their wallet
      await window.ethereum.enable();

      // Check if the user has already granted permission
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length === 0) {
        throw new Error("Please connect your MetaMask wallet");
      }
      if(accounts.length>0)
      {
        console.log('hell')
      let f=  await window.ethereum.request({
  method: "eth_requestAccounts",
  params: [{ eth_accounts: {} }],
      })
        console.log(window.ethereum);

              const provider1 = new Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const transactionsContract = new ethers.Contract(
                contractAddress,
                contractABI.abi,
                signer
              );

      }
      const provider1 = new Web3Provider(window.ethereum);
      const signer = provider1.getSigner();
      const transactionsContract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );
      // Get the current account and set up the contract

      setCurrentAccount(accounts[0]);
      setContract(transactionsContract);

      // Reload the page (optional)
      // window.location.reload();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

async function lockMetamask() {
  
// Check if provider is connected
await web3Modal.clearCachedProvider();

console.log("i am")
if (window.ethereum.isConnected()) {
  // Get the current dApp origin (e.g. "https://example.com")
  console.log(window.ethereum)
  // Disconnect the dApp from MetaMask
  try {
await window.ethereum.request({
  method: "eth_requestAccounts",
  params: [{ eth_accounts: {} }],
});

  } catch (error) {
    console.error(error);
  }
} else {
  console.error("MetaMask not connected");
}
}


  // ...

const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      rpc: {
        80001: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
      },
    },
    chainId: 80001,
  },
};

async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: providerOptions,
  });
  return web3Modal;
}

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: providerOptions,
  });
  return web3Modal;
}

// const connectWallet = async () => {
//   try {
//     console.log("he");

//     const web3Modal = await getWeb3Modal();
//     const provider = await web3Modal.connect();
//     const library = new ethers.providers.Web3Provider(provider);
//     const accounts = await library.listAccounts();
//     const network = await library.getNetwork();
//     setProvider(provider);
//     setLibrary(library);
     
//     if (accounts) setAccount(accounts[0]);
//     setChainId(network.chainId);
//   } catch (error) {
//     setError(error);
//   }
// };


const connectWallet = async () => {
  try {
    const web3Modal = await getWeb3Modal();

    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const signer = library.getSigner(); // get the signer object

    // const contractAbi = [...]; // import the contract ABI
    // const contractAddress = '0x...'; // set the contract address
    
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    ); // create a contract instance with the signer
    setContract(contract)

    const accounts = await library.listAccounts();
    const network = await library.getNetwork();
    setProvider(provider);
    setLibrary(library);
    console.log("walllet", account[0],account)
     
    if (accounts) setAccount(accounts[0]);
    console.log(network.chainId)
    setChainId(network.chainId);

    // interact with the contract
    // const transaction = await contract.transfer(receiverAddress, amount);
    // const signedTx = await signer.signTransaction(transaction);
    // const txResponse = await library.sendTransaction(signedTx);
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

    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(async () => {
    const web3Modal = await getWeb3Modal();

    if (web3Modal.cachedProvider) {
      connectWallet();
    }
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



  // useEffect(() => {
  //   checkIfWalletIsConnect();
  //   getAllTransactions();
  // }, []);
  const [coordinates, setCoordinates] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  return (
    <Context.Provider
      value={{
        connectWallet,
        // ConnectWallet,
        checkIfWalletIsConnect,
        setCoordinates,
        account,
        currentAccount,
        contract,
        provider,
        coordinates,
        isModalVisible,
        setIsModalVisible,
        setCurrentAccount,
        processing,
        setProcessing,
        authState,
        setAuthState,
        login,
        setLogin,
        lockMetamask,
      }}
    >
      {children}
    </Context.Provider>
  );
};
