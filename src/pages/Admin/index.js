import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
// import React from "react";

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
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  FaLandmark,
  FaUser,
  FaUserTie,
  FaExchangeAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { contract, totalUser, totalLand, totalInsp, totalLandTransfer } =
    useContext(Web3Context);

  return (
    <>
      <Heading mb={4} mt={20}>
        Admin Dashboard
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
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
              <StatNumber>10</StatNumber>
            </Stat>
          </Flex>
        </Box>
        <Box bg="yellow.500" color="white" p={4} borderRadius="md">
          <Flex alignItems="center">
            <Box as={FaCheckCircle} fontSize="3xl" mr={4} />
            <Stat>
              <StatLabel>Completed Verification Requests</StatLabel>
              <StatNumber>50</StatNumber>
            </Stat>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  );
};
