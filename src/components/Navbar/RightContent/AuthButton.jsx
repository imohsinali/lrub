import { Context } from "@/components/context/context";

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
import React, { useContext } from "react";
// import { GrUserAdmin } from "react-icons/gr";

const AuthButton = () => {
  const {
    
    setAuthState,
  } = useContext(Context);


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
  );
};

export default AuthButton;
