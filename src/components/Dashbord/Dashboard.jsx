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
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/router";
import MobileNav from "./MobileNav";
import NavItem from "./NavItem";
import { decryptData } from "../utils/encrytpDycrytp";
// import { IconType } from 'react-icons';
// import { ReactText } from 'react';

const LinkItems = [
  { name: "Home", icon: FiHome, src: "/Admin" },
  { name: "Add Inspector", icon: FiTrendingUp, src: "/Admin/AddInspector" },
  { name: "View the List", icon: FiCompass, src: "/Admin/ViewtheList" },
  { name: "Change Admin", icon: FiStar, src: "/ChangeAdmin" },
  { name: "Search Details", icon: FiSettings, src: "/SearchDetail" },
];

export default function SidebarWithHeader({ children }) {
//  let data1= decryptData(data);
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
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => router.push(link.src)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

