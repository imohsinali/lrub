import { Button, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Context } from "@/components/context/context";
import { AuthContext } from "@/components/context/User";

const OAuthButton = () => {
  const { connectWallet, currentAccount, contract ,authState} = useContext(Context);

  const router = useRouter();

  const { data: registeredInspector, error } = useSWR(
    ["data", connectWallet, contract, currentAccount],
    async () => {
      const registeredInspector = await contract.isLandInspector(
        currentAccount
      );
      return registeredInspector;
    }
  );


     let {role}=authState
    const { setAuthState,auth } = useContext(AuthContext);
    console.log("abksansknd", auth);

    const loginPage=()=>{
      if(role.Admin)
      {
     setAuthState({
                       token: "Admin",
             });

             router.push('/Admin')

      }

      if(role.User)
      {
             setAuthState({
               token: "user",
             });

             router.push("/user");

      }
    }


  const handleSubmit = () => {
    connectWallet();
     loginPage();


  };

  return (
    <Flex flexDirection={"column"} width={"100%"} mb={2} gap={3}>
      <Button
        bgColor="orange.400"
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
        spinnerPlacement="start"
        color={"white"}
      >
        Connect to TustWallet
      </Button>
    </Flex>
  );
};

export default OAuthButton;
