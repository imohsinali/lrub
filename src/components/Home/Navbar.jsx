import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { Context } from "../context/context";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { setCookie } from "nookies";
import { encryptData } from "@/components/utils/encrytpDycrytp";
import contractABI from "../contract/lrub.json";
import { ethers } from "ethers";
import Web3Modal from "web3modal";


import WalletConnect from "@walletconnect/web3-provider";
import { Web3Context } from "../context/web3Model";
const contractAddress = "0xbd1c2bec6b1ad8057f462d46de2b91c7289322b1";



export default function Navbar() {


const { provider,
    library,
    account,
    signature,
    error,
    chainId,
    network,
    message,
    verified,
    connectWallet,
    refreshState,
    disconnect}=useContext(Web3Context)





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
console.log("msohi", account)

const Admin = account == "0xa91ad5bc6487900B5D5ba28EAc7D4BD40db06e76";
console.log(Admin);

console.log("asdkj", account,Admin);

useEffect(() => {
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
      toast({
        title: "Connected to Metamask",
        status: "success",
        duration: 2000,
        isClosable: true,
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
  loginPage()
}, [account]);
const handleSubmit =async () => {
  // e.preventDefault();
  // checkIfWalletIsConnect();
  // lockMetamask();
  console.log(provider)
  //  connectWallet();
  try {
    await connectWallet();

    
  } catch (error) {
    
    
  }
 
};


  return (
    <Flex
      bg={"#F7FAFC"}
      height={"100px"}
      padding="6px 15px"
      alignItems={"center"}
      justifyContent="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
    >
      <Flex align={"center"} borderRadius={"50%"} width={20}>
        <div style={{ borderRadius: "50%", overflow: "hidden" }}>
          <Image src="/images/nlogo.jpg" width={70} height={70} alt="image" />
        </div>
      </Flex>

      <>
        <Flex justify={"center"} align={"center"}>
          <Flex>
            <Button
              variant={"outline"}
              height="40px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              borderRadius={15}
              color={"blackAlpha.900"}
              mr="2px"
              onClick={() => {
                handleSetPath(true, false, false);
                handleSubmit();
              }}
              // onClick={connectWallet}
              fontSize={"1rem"}
            >
              Admin
            </Button>
            <Button
              variant={"outline"}
              height="40px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              mr="2px"
              borderRadius={15}
              color={"blackAlpha.900"}
              // onClick={() => handleSetPath(false, true, false)}
              fontSize={"1rem"}
            >
              Inspector
            </Button>
            <Button
              variant={"outline"}
              height="40px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              borderRadius={15}
              color={"blackAlpha.900"}
              mr="2px"
              fontSize={"1rem"}
              // onClick={() =>
              // handleSetPath(false, false, true);}
              onClick={connectWallet}
            >
              User
            </Button>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                display={{ base: "flex", sm: "none" }}
              />
              <MenuList>
                <MenuItem
                  // icon={<GrUserAdmin />}
                  // onClick={() => handleSetPath(true, false, false)}
                  onClick={() => {
                    handleSetPath(true, false, false);
                    handleSubmit();
                  }}
                >
                  Admin
                </MenuItem>

                <MenuItem
                // icon={<GrUserAdmin />}
                // onClick={() => handleSetPath(false, true, false)}
                >
                  Inspector
                </MenuItem>
                <MenuItem
                // icon={<GrUserAdmin />}
                // onClick={() => {
                //   handleSetPath(false, false, true);
                //   handleSubmit();
                // }}
                >
                  User
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </>
    </Flex>
  );
}
