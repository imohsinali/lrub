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
  Text,
  Image,
} from "@chakra-ui/react";
import Pagination from "@/components/utils/pagination";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import useSWR from "swr";
import { Web3Context } from "@/components/context/web3Model";
import VerifyUserModel from "@/components/Models/VerifyUserModel";
import { getAlluser } from "@/components/context/functions";

const TableWithPagination = () => {
  const { setUser, contract } = useContext(Web3Context);
  const { data: users, error: userError } = useSWR(
    ["user", contract],
    async () => await getAlluser(contract),
    { revalidateOnMount: true }
  );

  const [currentPage, setCurrentPage] = useState(0);
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
              <Th fontSize={{ base: 10, md: 17 }}>Verify</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((row, index) => (
              <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                <Td>{index}</Td>
                <Td>
                  <Flex>
                    <Text>{row.address}</Text>
                    {row.isUserVerified && (
                      <Image ml={1} width={5} src={"/images/verified.png"} />
                    )}
                  </Flex>
                </Td>
                <Td>{row.name.split("|").join(" ")}</Td>
                <Td>{row.city}</Td>
                <Td>{row.cnic}</Td>
                <Td>
                  <Button
                    backgroundColor={
                      row?.isUserVerified ? "green.400" : "gray.300"
                    }
                    color={row?.isUserVerified ? "whiteAlpha.800" : "black.100"}
                    _hover={{
                      color: "white",
                      backgroundColor: "cyan.400",
                    }}
                    borderRadius={15}
                    p={{ base: 2, md: 5 }}
                    fontSize={{ base: 10, md: 14 }}
                    onClick={() => {
                      setOpen(true);

                      setUser(row.address);
                    }}
                  >
                    {
                    
                   row?.verStatus === 3 ? "Verified by Admin" : row?.verStatus === 2 ? "Verified" : row?.verStatus === 1 ? "Rejected" : "Requested"
                    }
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {isOpen && (
        <VerifyUserModel isOpen={isOpen} setOpen={setOpen} user={users} />
      )}

      <Flex bgColor={"red"}>
        <Pagination handlePageClick={handlePageClick} page={currentPage} />
      </Flex>
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
