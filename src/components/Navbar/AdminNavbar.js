import { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AuthContext } from "../context/User";
import { Router, useRouter } from "next/router";
import Link from "next/link";

const AdminNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);
  const { auth, setAuthState, decryptData } = useContext(AuthContext);

  
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // add event listener to check for window resize
  window.addEventListener("resize", handleResize);

  // cleanup function to remove event listener
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  let router=useRouter();

  const hanndleLogOut=()=>{
   const token = decryptData(auth.token)

    console.log(token)
    if(token=='Admin')
    {
       setAuthState("logout")
       router.push('/')
       
    }
  }
  return (
    <>
      <Flex
        bg="gray.100"
        p={4}
        align="center"
        justify={isMobile ? "space-between" : "flex-start"}
      >
        <Box>
          <Heading size="md">Admin Dashboard</Heading>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <VStack spacing={4} align="stretch">
                    <Button w="full" variant="ghost">
                      <Link href="/Admin/AddInspector">Add Inspector</Link>
                    </Button>
                    <Button w="full" variant="ghost">
                      <Link href={"/Admin/viewAllInspector"}> View All</Link>
                    </Button>
                    <Button
                      w="full"
                      variant="ghost"
                      onClick={() => console.log("clisk")}
                    >
                      Change Admin
                    </Button>
                    <Button w="full" variant="ghost">
                      Logout
                    </Button>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <Spacer />
            <Box>
              <Button mx={2} variant="ghost">
                <Link href="/Admin/AddInspector">Add Inspector</Link>
              </Button>
              <Button mx={2} variant="ghost">
                <Link href={"/Admin/viewAllInspector"}> View All</Link>
              </Button>
              <Button mx={2} variant="ghost">
                Change Admin
              </Button>
              <Button mx={2} variant="ghost" onClick={() => hanndleLogOut()}>
                Logout
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};



export default AdminNavbar;