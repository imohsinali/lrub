import { Button, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Context } from "@/components/context/context";
import { AuthContext } from "@/components/context/User";
import { setCookie } from "nookies";
import { encryptData } from "@/components/utils/encrytpDycrytp";

// Set the `token`

const OAuthButton = () => {
  const { connectWallet, currentAccount, contract, authState } =
    useContext(Context);

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

  let { role } = authState;
  const { setAuthState, auth } = useContext(AuthContext);

  const Admin =
    currentAccount ==
    "0xa91ad5bc6487900B5D5ba28EAc7D4BD40db06e76".toLowerCase();
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

  const handleSubmit =  () => {
    // e.preventDefault();

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
