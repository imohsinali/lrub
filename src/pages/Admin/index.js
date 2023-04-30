import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import FilterCard from "@/components/utils/filterCard";
import FilterMethod from "@/components/utils/filterMethodCard";
import shortenEthereumAddress from "@/components/utils/shortenAddress";
import { UpDownIcon } from "@chakra-ui/icons";
// import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

const AHome = () => {
  return (
    <SidebarWithHeader>
      <AdminDashboard />
    </SidebarWithHeader>
  );
};

export default AHome;
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {
  FaLandmark,
  FaUser,
  FaUserTie,
  FaExchangeAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [transactions, setTransaction] = useState();
  useEffect(() => {
    const fun = async () => {
      const url =
        "https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0x8b5018C3de4e271464809bc3A6a2509e154343D8&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=6SPF5NK1C7PGN4VQGDTA7RII7SIUUUSUK5";
      const { data } = await axios.get(url);
      console.log("re", data?.result);
      setTransaction(data?.result);
    };
    fun();
  }, []);

  const {
    contract,
    totalUser,
    totalLand,
    totalInsp,
    totalLandTransfer,
    users,
    land,
  } = useContext(Web3Context);

  const pendinguser = users?.filter((user) => user.verStatus == 0);
  const pendingland = land?.filter((la) => la.verStatus == 0);
  const pending = pendinguser?.length + pendingland?.length;

  console.log("p", pendinguser, pendingland, land);
  const methodP = {
    0x60806040: "Contract Creation",
    0x6910c46d: "Add Inspector",
    0x54f1ebfb: "User Verification",
    0xa6951e1f: "Land Verification",
    0x43e8349a: "Transfer Land",
    0x58051d93: "Subplot",
    0xe749752c: "User Registered",
    0xf98cf07c: "Make Payment",
    0x935400ee: "Request Rejected",
    0x9dec448e: "Buy Request",
    0x4ba1f098: "Request Accepted",
    0x2d7788db: "Change Detail",
    0x314967ac: "Add Land",
  };

  const [open, setOpen] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);

  const [order, setOrder] = useState("desc");

  const handleCopy = (text) => {
    // Create a temporary input element to hold the text
    const input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    // Copy the text to the clipboard
    document.execCommand("copy");
    document.body.removeChild(input);
  };
  const handleTimeFilter = () => {
    const sorted =
      order === "desc"
        ? transactions.sort((a, b) => b.timeStamp - a.timeStamp)
        : transactions.sort((a, b) => a.timeStamp - b.timeStamp);

    setTransaction(sorted);
    setOrder(order === "desc" ? "asc" : "desc"); // Toggle the order direction
  };
  return (
    <>
      <Heading mb={4} mt={20}>
        Admin Dashboard
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={8} mb={4}>
        <Box bg="blue.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaUser} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Total Registered Users</StatLabel>
              <StatNumber>{totalUser}</StatNumber>
            </Stat>
          </Flex>
        </Box>
        <Box bg="green.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaLandmark} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Total Land</StatLabel>
              <StatNumber>{totalLand}</StatNumber>
            </Stat>
          </Flex>
        </Box>
        <Box bg="purple.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaUserTie} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Total Land Inspectors</StatLabel>
              <StatNumber>{totalInsp}</StatNumber>
            </Stat>
          </Flex>
        </Box>
        <Box bg="orange.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaExchangeAlt} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Total Transferred Land</StatLabel>
              <StatNumber>{totalLandTransfer}</StatNumber>
            </Stat>
          </Flex>
        </Box>
        <Box bg="red.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaClock} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Pending Verification Requests</StatLabel>
              <StatNumber>{pending}</StatNumber>
            </Stat>
          </Flex>
        </Box>
        <Box bg="yellow.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaCheckCircle} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Completed Verification Requests</StatLabel>
              <StatNumber>
                {totalUser + totalLand + totalLandTransfer - pending}
              </StatNumber>
            </Stat>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead backgroundColor={"black"} color={"white"} mt={4}>
            <Tr>
              <Th fontSize={"1rem"} color={"white"}>
                Tx Hash
              </Th>
              <Th fontSize={"1rem"} color={"white"}>
                {" "}
                Tx from
                <Button
                  // variant={'outline'}
                  // bgColor={"green"}
                  onClick={() => {
                    setOpen(!open);
                    setOpenMethod(false);
                  }}
                  _hover={{
                    backgroundColor: "gray.400",
                  }}
                  ml={2}
                  width={4}
                  height={6}
                  leftIcon={
                    <Image
                      src={"/images/ficon.png"}
                      bgColor={"green"}
                      width={14}
                      height={0}
                      p={1}
                      alt=""
                    />
                  }
                ></Button>
              </Th>

              <Th fontSize={"1rem"} color={"white"}>
                Block No
              </Th>
              <Th fontSize={"1rem"} color={"white"}>
                Age
                <Button
                  // variant={'outline'}
                  // bgColor={"green"}
                  onClick={handleTimeFilter}
                  _hover={{
                    backgroundColor: "gray.400",
                  }}
                  ml={2}
                  width={4}
                  height={6}
                  color="black"
                >
                  <Icon as={UpDownIcon} />
                </Button>
              </Th>
              <Th fontSize={"1rem"} color={"white"}>
                Method
                <Button
                  // variant={'outline'}
                  // bgColor={"green"}
                  onClick={() => {
                    setOpenMethod(!openMethod);
                    setOpen(false);
                  }}
                  _hover={{
                    backgroundColor: "gray.400",
                  }}
                  ml={2}
                  width={4}
                  height={6}
                  leftIcon={
                    <Image
                      src={"/images/ficon.png"}
                      bgColor={"green"}
                      width={14}
                      height={0}
                      p={1}
                      alt=""
                    />
                  }
                ></Button>
              </Th>
              <Th fontSize={"1rem"} color={"white"}>
                Status
              </Th>
            </Tr>
          </Thead>
          {open && (
            <Flex position={"absolute"} left={500} zIndex={10}>
              <FilterCard
                transactions={transactions}
                setTransaction={setTransaction}
              />
            </Flex>
          )}

          {openMethod && (
            <Flex position={"absolute"} left={1240} zIndex={10}>
              <FilterMethod
                transactions={transactions}
                setTransaction={setTransaction}
              />
            </Flex>
          )}

          <Tbody zIndex={10}>
            {transactions?.map((tx) => (
              <Tr key={tx.hash}>
                <Td zIndex={10}>
                  <Button
                    size="sm"
                    onClick={() => handleCopy(tx.hash)}
                    variant="none"
                    // colorScheme="blue"
                  >
                    {shortenEthereumAddress(tx.hash)}
                  </Button>
                </Td>

                <Td zIndex={10}>
                  <Button
                    size="sm"
                    onClick={() => handleCopy(tx.from)}
                    variant="none"
                    // colorScheme="blue"
                  >
                    {shortenEthereumAddress(tx.from)}
                  </Button>
                </Td>
                <Td>{tx.blockNumber}</Td>
                <Td>{timsps(tx.timeStamp)}</Td>
                <Td>{methodP[Number(tx?.methodId)]}</Td>
                <Td>{tx.isError ? "Success" : "Failed"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {transactions?.length == 0 && (
          <Flex backgroundColor={"orange.100"} p={4}>
            There are n Matching entries
          </Flex>
        )}
      </Box>
    </>
  );
};

const timsps = (birthTimestamp) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // current timestamp in seconds
  const ageInSeconds = currentTimestamp - birthTimestamp;
  let outputString = "";

  if (ageInSeconds < 60) {
    outputString = `${ageInSeconds} s`;
  } else if (ageInSeconds < 3600) {
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInMinutes} m ${remainingSeconds} s`;
  } else if (ageInSeconds < 86400) {
    const ageInHours = Math.floor(ageInSeconds / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  } else if (ageInSeconds < 2592000) {
    const ageInDays = Math.floor(ageInSeconds / 86400);
    const remainingHours = Math.floor((ageInSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInDays} d ${remainingHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  } else if (ageInSeconds < 31536000) {
    const ageInMonths = Math.floor(ageInSeconds / 2592000);
    const remainingDays = Math.floor((ageInSeconds % 2592000) / 86400);
    const remainingHours = Math.floor((ageInSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInMonths} mon ${remainingDays} d ${remainingHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  } else {
    const ageInYears = Math.floor(ageInSeconds / 31536000);
    const remainingMonths = Math.floor((ageInSeconds % 31536000) / 2592000);
    const remainingDays = Math.floor((ageInSeconds % 2592000) / 86400);
    const remainingHours = Math.floor((ageInSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((ageInSeconds % 3600) / 60);
    const remainingSeconds = ageInSeconds % 60;
    outputString = `${ageInYears} y ${remainingMonths} mon ${remainingDays} d ${remainingHours} h ${remainingMinutes} m ${remainingSeconds} s`;
  }

  console.log(`The age is: ${outputString}`);

  return outputString;
};
