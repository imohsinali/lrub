import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useContext } from "react";
import { Context } from "../context/context";
import AuthModel from "../Models/Auth/AuthModel";




export default function Navbar() {
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
        <AuthModel />
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
              onClick={() => handleSetPath(true, false, false)}
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
              onClick={() => handleSetPath(false, true, false)}
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
              onClick={() => handleSetPath(false, false, true)}
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
                  onClick={() => handleSetPath(true, false, false)}
                >
                  Admin
                </MenuItem>

                <MenuItem
                  // icon={<GrUserAdmin />}
                  onClick={() => handleSetPath(false, true, false)}
                >
                  Inspector
                </MenuItem>
                <MenuItem
                  // icon={<GrUserAdmin />}
                  onClick={() => handleSetPath(false, false, true)}
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
