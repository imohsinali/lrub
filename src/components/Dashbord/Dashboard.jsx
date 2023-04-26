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
import FiltersBox from "../utils/BoxFilter";
import {  useContext, useEffect, useState } from "react";
import {AdminLink,InspectorLinks,UserLinks} from './paths'
import { Web3Context } from "../context/web3Model";
export default function SidebarWithHeader({ children }) {
  const { currentUser } = useContext(Web3Context);

  const [links, setLinks] = useState();
  const [role,setRole]=useState('');
  const [data,setData]=useState('')

  const router = useRouter();

  useEffect(() => {

    try {
      if (router.pathname.startsWith("/Admin")) {
        setLinks(AdminLink);
        setRole("Admin");
      } else if (router.pathname.startsWith("/Inspector")) {
        setLinks(InspectorLinks);
        setRole("Inspector");
        setData(currentUser[0]);

      } else if (router.pathname.startsWith("/User")) {
        setLinks(UserLinks);
        setRole("User");

        setData(currentUser[0]);
      }
    } catch (error) {}
  }, [router.pathname]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH={{base:"100vh", sm:"125vh"}} bg={useColorModeValue("gray.50", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        links={links}
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
          <SidebarContent onClose={onClose} links={links} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} role={role} data={data} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        {
          // console.log('user',data)
        }
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose,links, ...rest }) => {
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
