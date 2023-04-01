import { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
} from "@chakra-ui/react";
import Pagination from "@/components/utils/pagination";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { ethers } from "ethers";
import useSWR from "swr";
import { Web3Context } from "@/components/context/web3Model";
import VerifyLandModel from "@/components/Models/VerifyLandModel";

const TableWithPagination = () => {
  const { contract, setUser } = useContext(Web3Context);

  const { data: users } = useSWR(["data", contract], async () => {
    const userAddresses = await contract.ReturnAllUserList();

    const users = await Promise.all(
      userAddresses.map(async (address) => {
        const {
          name,
          city,
          dob,
          document,
          profilepic,
          isUserVerified,
          cinc,
          verfiedby,
          verifydate,
          email,
        } = await contract.UserMapping(address);
        return {
          address,
          name: ethers.utils.parseBytes32String(name),
          city: ethers.utils.parseBytes32String(city),
          email: ethers.utils.parseBytes32String(email),
          verifydate: parseInt(verifydate._hex),
          dob: ethers.utils.parseBytes32String(dob),
          cnic: parseInt(cinc._hex),
          verfiedby,
          isUserVerified,
          document,
          profilepic,
        };
      })
    );
    return users;
  });
  console.log("dar", users);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users
    ?.slice(indexOfFirstPost, indexOfLastPost)
    .filter(Boolean);

  console.log("indexOfFirstPost", indexOfFirstPost);

  const handlePageClick = (p) => {
    setCurrentPage(p);
    console.log(p);
  };

  const [isOpen, setOpen] = useState(false);
  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {/* <FiltersBox/> */}
      <Box overflowX="auto">
        <Table
          variant={{ base: "unstyled", md: "simple" }}
          mt={{ base: 20, md: 20 }}
        >
          <Thead fontSize={{ base: 14, md: 20 }}>
            <Tr fontSize={{ base: 12, md: 17 }}>
              <Th fontSize={{ base: 10, md: 17 }}>#</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Wallet Address</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Name</Th>
              <Th fontSize={{ base: 10, md: 17 }}>City</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Cnic</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((row, index) => (
              <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                <Td>{index}</Td>
                <Td>{row.address}</Td>
                <Td>{row.name.split("|").join(" ")}</Td>
                <Td>{row.city}</Td>
                <Td>{row.cnic}</Td>
                <Td>
                  <Button
                    backgroundColor={"green"}
                    borderRadius={15}
                    p={{ base: 2, md: 5 }}
                    fontSize={{ base: 10, md: 14 }}
                    onClick={() => {
                      setOpen(true);

                      setUser(row.address);
                    }}
                  >
                    Verify
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {isOpen && (
        <VerifyLandModel isOpen={isOpen} setOpen={setOpen} user={users} />
      )}

      <Flex bgColor={"red"}>
        <Pagination handlePageClick={handlePageClick} page={currentPage} />
      </Flex>
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
