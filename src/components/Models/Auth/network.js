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

    // const contract = new ethers.Contract(
    //   contractAddress,
    //   contractABI.abi,
    //   signer
    // ); // create a contract instance with the signer
    // setContract(contract);

    const accounts = await library.listAccounts();
    const network = await library.getNetwork();
    setProvider(provider);
    setLibrary(library);

    if (accounts) setAccount(accounts[0]);
    console.log(network.chainId);
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

const { setAuthState } = useContext(Context);

function handleSetPath(_roleA, _roleI, _roleU) {
  setAuthState({
    open: true,
    role: {
      Admin: _roleA,
      Inspector: _roleI,
      User: _roleU,
    },
  });

  toast({
    title: "Connected to Metamask",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
}
const toast = useToast();

// Set the `token`

const { currentAccount, contract, authState } = useContext(Context);

const router = useRouter();

const { data: registeredInspector, error1 } = useSWR(
  ["data", contract, currentAccount],
  async () => {
    const registeredInspector = await contract.isLandInspector(currentAccount);
    return registeredInspector;
  }
);

let { role } = authState;

const Admin = account == "0xa91ad5bc6487900B5D5ba28EAc7D4BD40db06e76";
console.log(Admin);

console.log("asdkj", account);
const loginPage = () => {
  if (role.Admin && Admin) {
    localStorage.setItem("session", "token");

    // redirect to protected route
    router.push("/Admin");

    const data = encryptData("Admin");
    setCookie(null, "token", data, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
    router.push("/Admin");
    //  window.location.reload();
  }

  if (role.User) {
    localStorage.setItem("session", null);

    const data = encryptData("User");

    setCookie(null, "token", data, {
      //  maxAge: 30 * 24 * 60 * 60, // 30 days
      maxAge: 60 * 60, // 30 days

      path: "/",
    });

    router.push("/User");
  }
};

async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: providerOptions,
  });
  return web3Modal;
}

// useEffect( async() => {
//     const web3Modal = await getWeb3Modal();

//   if (web3Modal.cachedProvider) {
//     connectWallet();
//   }
// }, []);

// useEffect(() => {
//   if (provider?.on) {
//     const handleAccountsChanged = (accounts) => {
//       console.log("accountsChanged", accounts);
//       if (accounts) setAccount(accounts[0]);
//     };

//     const handleChainChanged = (_hexChainId) => {
//       setChainId(_hexChainId);
//     };

//     const handleDisconnect = () => {
//       console.log("disconnect", error);
//       disconnect();
//     };

//     provider.on("accountsChanged", handleAccountsChanged);
//     provider.on("chainChanged", handleChainChanged);
//     provider.on("disconnect", handleDisconnect);

//     return () => {
//       if (provider.removeListener) {
//         provider.removeListener("accountsChanged", handleAccountsChanged);
//         provider.removeListener("chainChanged", handleChainChanged);
//         provider.removeListener("disconnect", handleDisconnect);
//       }
//     };
//   }
// }, [provider]);

const handleSubmit = () => {
  // e.preventDefault();
  // checkIfWalletIsConnect();
  // lockMetamask();
  //  connectWallet();
  connectWallet();
  loginPage();
};
