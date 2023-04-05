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
  const { land, setLandId } = useContext(Web3Context);

  
  console.log("dar", land);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = land
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
              <Th fontSize={{ base: 10, md: 17 }}>Owner Address</Th>
              <Th fontSize={{ base: 10, md: 17 }}>District</Th>
              <Th fontSize={{ base: 10, md: 17 }}>PropertyId</Th>
              <Th fontSize={{ base: 10, md: 17 }}>landArea Sqft</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Verify</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((row, index) => (
              <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                <Td>{index}</Td>
                <Td>{row?.ownerAddress}</Td>
                <Td>{row?.district}</Td>
                <Td>{row?.propertyPID}</Td>
                <Td>{row?.landArea} sqft</Td>
                <Td>
                  <Button
                    backgroundColor={"green"}
                    borderRadius={15}
                    p={{ base: 2, md: 5 }}
                    fontSize={{ base: 10, md: 14 }}
                    onClick={() => {
                      setOpen(true);

                      setLandId(row.id);
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
        <VerifyLandModel isOpen={isOpen} setOpen={setOpen} land={land} />
      )}

      <Flex bgColor={"red"}>
        <Pagination handlePageClick={handlePageClick} page={currentPage} />
      </Flex>
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
