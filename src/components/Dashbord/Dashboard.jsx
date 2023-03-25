import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import Image from "next/image";
import { useRouter } from "next/router";
import MobileNav from "./MobileNav";
import NavItem from "./NavItem";
import { decryptData } from "../utils/encrytpDycrytp";
import FiltersBox from "../utils/BoxFilter";
import {  useEffect, useState } from "react";
// import { IconType } from 'react-icons';
// import { ReactText } from 'react';
import {AdminLink,InspectorLinks} from './paths'
export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        {
          // console.log('user',data)
        }
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [links, setLinks] = useState();
  useEffect(() => {
          const role = JSON.parse(localStorage.getItem("role"));

    if (role?.Admin) {
      setLinks(AdminLink);
    } else if (role?.Inspector) {
      setLinks(InspectorLinks);
    }
  }, []);
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <Image src="/images/nlogo.jpg" width={70} height={55} alt="image" />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {links?.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => router.push(link.src)}
          src={link.src}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
