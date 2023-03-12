
import { Button, Flex} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from "next/router";
import { useContext,useEffect,useState } from "react";

  import useSWR from "swr";
import { Context } from '@/components/context/context';


const OAuthButton = () => {
    const {
      connectWallet,
      currentAccount,
      contract,
      authState,
        setLogin,
        login
    } = useContext(Context);
const Adminlogin = "0xa91ad5bc6487900b5d5ba28eac7d4bd40db06e76"==currentAccount;

    console.log(currentAccount);
    const { data, error } = useSWR(
      ["data", connectWallet, contract, currentAccount],
      async () => {
        const registeredInspector = await contract.isLandInspector(
          currentAccount
        );
        return registeredInspector;
      }
    );
    console.log("ml", login);

    useEffect(() => {
      // console.log(checkIfWalletIsConnect())
      console.log("uef", data);
    }, [data]);
const router=useRouter()
   let {role}= authState

console.log(role)
const loginPage = () => {
  if (role.Inspector && data) {
    setLogin({ Admin:false, Inspector: true,User:false });


    router.push("/Inspector");
  }
  if (role.Admin && Adminlogin) {
  setLogin({ Admin: true,Inspector:false,User:false });


    router.push("/Admin");
  }
  if (role.User && registeredUser) {
    localStorage.setItem("Userlogin", true);
    localStorage.setItem("Inspectorlogin", false);
    localStorage.setItem("Adminlogin", false);
    console.log("msohin");
    router.push("/user");
  }
  if (role.User && !registeredUser) {
    localStorage.setItem("Userlogin", true);
    localStorage.setItem("Inspectorlogin", false);
    localStorage.setItem("Adminlogin", false);
    console.log("msohin");
  router.pathname("/registration");
  }

  // setIsModalVisible(false);
};
    
    console.log(data);
    const handleSubmit = () => {
      connectWallet();
    console.log("r", role.Inspector);

      loginPage()
    };

  return (
    <Flex flexDirection={"column"} width={"100%"} mb={2} gap={3}>
      <Button
        // isLoading
        loadingText="Connecting"
        bgColor="orange.400"
        // variant="outline"
        spinnerPlacement="start"
        color={"white"}
        onClick={() => {
          handleSubmit();
        }}
      >
        Connect to Metamask
      </Button>
      <Button
        isLoading
        loadingText="Connecting"
        bgColor="blue.400"
        // variant="outline"
        spinnerPlacement="start"
        color={"white"}
      >
        Connect to TustWallet
      </Button>
    </Flex>
  );
}

export default OAuthButton