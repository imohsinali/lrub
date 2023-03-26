import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { Context } from "../context/context";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Web3Context } from "../context/web3Model";

export default function Navbar() {
  const toast = useToast();

  const router = useRouter();
  const { provider, account, connectWallet, contract } =
    useContext(Web3Context);

  const [Role,setRole]=useState() 

  function handleSetPath(_roleA, _roleI, _roleU) {
    const role = {
      Admin: _roleA,
      Inspector: _roleI,
      User: _roleU,
    };
    setRole(role)
    // localStorage.setItem('role',role)
    localStorage.setItem("role", JSON.stringify(role)); // Note: `role` is stringified before saving to local storage
  }
console.log('ask' ,Role)
  const { data: registeredInspector, error1 } = useSWR(
    ["data", contract, account],
    async () => {
      const registeredInspector = await contract.isLandInspector(account);
      return registeredInspector;
    }
  );

  const toastSucess = () => {
    toast({
      title: "Connected to Wallet",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const toastError = () => {
    toast({
      title: "Something went Wrong",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
      const role = JSON.parse(localStorage.getItem("role"));

    const loginPage = async () => {
      try {
        const Admin = await contract?.isContractOwner(account);
        const Inpector = await contract?.isLandInspector(account);
        const User = await contract?.ReturnAllUserList();
        const UserRegistered = User?.includes(account);

        // const User=await contract?.isUserRegistered(account)
        if (role?.Admin && Admin) {
          localStorage.setItem("session", "token");
          toastSucess();
          router.push("/Admin");
        } else if (role?.Inspector && Inpector) {
          localStorage.setItem("session", "token");
          toastSucess();

          router.push("/Inspector");
        } else if (role?.User && UserRegistered) {
          localStorage.setItem("session", "token");
          toastSucess();

          router.push("/User");
        } else if (role?.User && !UserRegistered && account) {
          router.push("/register");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(error)
      }


    };
    loginPage();
  }, [account,Role]);
  const handleSubmit = async () => {
    try {
      console.log(account);
      await connectWallet();
    } catch (error) {}
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
              fontSize={"1rem"}
              onClick={() => {
                handleSetPath(false, true, false);
                handleSubmit();
              }}
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
              onClick={() => {
                handleSetPath(false, false, true);
                handleSubmit();
              }}
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
                  onClick={() => {
                    handleSetPath(true, false, false);
                    handleSubmit();
                  }}
                >
                  Admin
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleSetPath(false, true, false);
                    handleSubmit();
                  }}
                >
                  Inspector
                </MenuItem>
                <MenuItem
                  
                  onClick={() => {
                    handleSetPath(false, false, true);
                    handleSubmit();
                  }}
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
