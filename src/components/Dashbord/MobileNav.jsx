import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Badge,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { Web3Context } from "../context/web3Model";
import CurrencySelect from "../utils/Currency";

const MobileNav = ({onOpen,role,data, ...rest }) => {
  const router =useRouter()
  const { disconnect } = useContext(Web3Context);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Link href="/">
          {/* <Image src="/images/nlogo.jpg" width={70} height={55} alt="image" /> */}
        </Link>
      </Text>
      {/* <Flex mr={70}>
        <FiltersBox />
      </Flex> */}

      <HStack spacing={{ base: "0", md: "6" }}>
        <CurrencySelect/>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {/* <Badge count={<CheckCircleTwoTone twoToneColor="#52c41a" />}> */}
                <Avatar
                  size={"sm"}
                  src={`https://gateway.pinata.cloud/ipfs/${data?.profilepic}`}
                  style={{
                    border: data?.isUserVerified
                      ? "2px solid green"
                      : "2px solid red",
                  }}
                />
                {/* </Badge> */}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{data?.name?.split("|")?.join(" ")}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {role == "Admin"
                      ? "Admin"
                      : role == "Inspector"
                      ? "Inspector"
                      : role == "User"
                      ? ""
                      : "Gust"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              
              <MenuItem onClick={()=>router.push('/User/Profile')}>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  disconnect();
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;

