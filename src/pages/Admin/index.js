import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import PaginationButtom from "@/components/pagination/PaginationButtom";
import PaginationTop from "@/components/pagination/PaginationTop";
import { handleCopy } from "@/components/utils/copyAddress";
import FilterCard from "@/components/utils/filterCard";
import FilterMethod from "@/components/utils/filterMethodCard";
import shortenEthereumAddress from "@/components/utils/shortenAddress";
import { age } from "@/components/utils/timeStamp";
import { UpDownIcon } from "@chakra-ui/icons";
// import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Divider,
} from "@chakra-ui/react";

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
import { useContext, useEffect, useMemo, useState } from "react";
import {
  FaLandmark,
  FaUser,
  FaUserTie,
  FaExchangeAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const AdminDashboard = () => {
  const {
    contract,
    totalUser,
    totalLand,
    totalInsp,
    totalLandTransfer,
    users,
    land,
    fun,
  } = useContext(Web3Context);
  const [transactions, setTransaction] = useState();
  useEffect(() => {
    const fun1 = async () => {
      const url =
        "https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0xB0Bf89B9e79c3E1482F85B32Ff1e901cC46aC37B&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=6SPF5NK1C7PGN4VQGDTA7RII7SIUUUSUK5";
      const { data } = await axios.get(url);
      console.log("re", data?.result);
      setTransaction(data?.result);
    };
    fun1();
    fun();
  }, [contract]);

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
    0x935400ee: "Chnage Detail",
    0x9dec448e: "Buy Request",
    0x4ba1f098: "Request Accepted",
    0x935400ee	: "Change Detail",
    0x314967ac: "Add Land",
  };

  const [open, setOpen] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = transactions;

  const [order, setOrder] = useState("desc");
  const handleTimeFilter = () => {
    const sorted =
      order == "desc"
        ? transactions.sort((a, b) => b.timeStamp - a.timeStamp)
        : transactions.sort((a, b) => a.timeStamp - b.timeStamp);

    setTransaction(sorted);
    setOrder(order == "desc" ? "asc" : "desc"); // Toggle the order direction
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
      {!transactions > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box>
          <PaginationTop
            land={transactions}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Divider />

          <Box overflowX="auto">
            <Table variant="simple" position="relative">
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
                <Flex position={"absolute"} left={200} zIndex={10}>
                  <FilterCard
                    transactions={transactions}
                    setTransaction={setTransaction}
                  />
                </Flex>
              )}

              {openMethod && (
                <Flex
                  position={"absolute"}
                  left={{ base: 500, sm: 940 }}
                  zIndex={10}
                >
                  <FilterMethod
                    transactions={transactions}
                    setTransaction={setTransaction}
                  />
                </Flex>
              )}

              <Tbody zIndex={10}>
                {currentPosts?.map((tx) => (
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
                    <Td>{age(tx?.timeStamp)}</Td>
                    <Td>{methodP[Number(tx?.methodId)]}</Td>
                    <Td>{tx.isError=="0" ? "Success" : "Failed"}</Td>
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
          {currentPosts && (
            <PaginationButtom
              land={transactions}
              postsPerPage={postsPerPage}
              setPostPerPage={setPostPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </Box>
      )}
    </>
  );
};
