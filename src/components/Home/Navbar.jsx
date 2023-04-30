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
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Web3Context } from "../context/web3Model";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { setCookie } from "nookies";
export default function Navbar() {
  const toast = useToast();

  const router = useRouter();
  const { account, connectWallet, contract, matic, disconnect } =
    useContext(Web3Context);
  const [loginClicked, setLogin] = useState(false);
  console.log(matic);

  function handleSetPath(_roleA, _roleI, _roleU) {
    console.log("ajsdkaj", process?.env?.NEXT_PUBLIC_SECRET_ADMIN);
    const role = {
      Admin: _roleA,
      Inspector: _roleI,
      User: _roleU,
    };
    localStorage.setItem("role", JSON.stringify(role));
  }
  const { data: registeredInspector, error1 } = useSWR(
    ["data", contract, account],
    async () => {
      const registeredInspector = await contract.isLandInspector(account);
      return registeredInspector;
    }
  );
  const [toastShown, setToastShown] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);

  const toastSuccess = () => {
    console.log("toastShown:", toastShown); // add this line

    if (!toastShown) {
      toast({
        title: "Connected to Wallet",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setToastShown(true);
    }
  };

  const toastError = () => {
    if (!toastShown) {
      toast({
        title: "Connecting to the Wallet",
        status: "loading",
        duration: 2000,
        isClosable: true,
      });

      setToastShown(true);
    }
  };

  useEffect(() => {
    const login = async () => {
      if (!loginInProgress) {
        setLoginInProgress(true);
        try {
          const role = JSON.parse(localStorage.getItem("role"));
          await connectWallet();

          const Admin1 = await contract?.isContractOwner(account);
          const Inpector = await contract?.isLandInspector(account);
          const UserRegistered = await contract?.RegisteredUserMapping(account);
          console.log("login called", Admin1, Inpector); // add this line

          loginPage(role, Admin1, Inpector, UserRegistered);
        } catch (error) {
          console.error(error);
        }
      }
      setLoginInProgress(false);
    };

    loginClicked && login();
  }, [loginClicked, account, contract]);

  const loginPage = async (role, Admin, Inpector, UserRegistered) => {
    try {
      if (role?.Admin && Admin) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1H")
          .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_ADMIN));
        setCookie(null, "Admintoken", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "development",
        });
        router.push("/Admin");
        toastSuccess();
      } else if (role?.Admin && !Admin) {
        handleSetPath(false, false, false);
        setLogin(false);
        toastError();
        setToastShown(false);
      } else if (role?.Inspector && Inpector) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1H")
          .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_INSP));
        setCookie(null, "Inspectortoken", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "development",
        });
        router.push("/Inspector");
        toastSuccess();
      } else if (role?.Inspector && !Inpector) {
        toastError();
        handleSetPath(false, false, false);
        setLogin(false);
        setToastShown(false);
      } else if (role?.User && UserRegistered) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1H")
          .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_USER));
        setCookie(null, "Usertoken", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "development",
        });
        router.push("/User");
        toastSuccess();
      } else if (role?.User && !UserRegistered) {
        router.push("/Register");
        toastSuccess();
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      bg={"#F7FAFC"}
      height={"90px"}
      padding="5px 10px"
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
              fontSize={"1rem"}
              onClick={() => {
                setLogin(true);

                handleSetPath(true, false, false);
              }}
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
                setLogin(true);

                handleSetPath(false, true, false);
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
                setLogin(true);

                handleSetPath(false, false, true);
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
                    setLogin(true);

                    handleSetPath(true, false, false);
                  }}
                >
                  Admin
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setLogin(true);

                    handleSetPath(false, true, false);
                  }}
                >
                  Inspector
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setLogin(true);

                    handleSetPath(false, false, true);
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

// export async  function getServerSideProps()
// {

//   const  SECRET=process?.env?.SECRET
//       console.log("ajsdkaj", SECRET);

// }
