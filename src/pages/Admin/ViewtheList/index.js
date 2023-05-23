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
  Divider,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import RemoveModel from "@/components/Models/RemoveModel";
import useSWR from "swr";
import { Web3Context } from "@/components/context/web3Model";
import PaginationButtom from "@/components/pagination/PaginationButtom";
import PaginationTop from "@/components/pagination/PaginationTop";
const TableWithPagination = () => {
  const { contract, users } = useContext(Web3Context);

  const { data: inspectors } = useSWR(
    ["inspector", contract, users],
    async () => {
      const inspectorAddresses = await contract.ReturnAllLandIncpectorList();
      const inspectors = users.filter((user) =>
        inspectorAddresses.includes(user.address)
      );

      return inspectors;
    }
  );
  console.log("dar", inspectors);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage  * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inspectors
    ?.slice(indexOfFirstPost, indexOfLastPost)
    .filter(Boolean);
  console.log("indexOfFirstPost", indexOfFirstPost);

  const [isOpen, setOpen] = useState(false);
  return (
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {!inspectors > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box mt={{ base: 20, md: 20 }}>
          <PaginationTop
            land={inspectors}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Divider />
          <Box overflowX="auto">
            <Table variant={"simple"} position="relative">
              <Thead fontSize={{ base: 14, md: 20 }} color={"white"} backgroundColor={'black'}>
                <Tr>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>#</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Wallet Address</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Posting District</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Cnic</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPosts?.map((row, index) => (
                  <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                    <Td>{index}</Td>
                    <Td>{row.address}</Td>
                    <Td>{row.city}</Td>
                    <Td>{row.cnic}</Td>
                    <Td>
                      <Button
                        backgroundColor={"red"}
                        color="white"
                        _hover={{
                          backgroundColor: "red.200",
                        }}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        onClick={() => setOpen(true)}
                      >
                        Remove
                      </Button>
                      {isOpen && (
                        <RemoveModel
                          isOpen={isOpen}
                          setOpen={setOpen}
                          landInspector={row}
                        />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {currentPosts && (
            <PaginationButtom
              land={inspectors}
              postsPerPage={postsPerPage}
              setPostPerPage={setPostPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </Box>
      )}
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
