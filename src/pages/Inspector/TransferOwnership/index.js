import { useContext, useEffect, useState, useMemo } from "react";
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
  Link,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import { landRequest } from "@/components/context/functions";
import useSWR from "swr";
import shortenEthereumAddress from "@/components/utils/shortenAddress";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import PaginationButtom from "@/components/pagination/PaginationButtom";
import PaginationTop from "@/components/pagination/PaginationTop";

const TableWithPagination = () => {
  const { contract } = useContext(Web3Context);
  const router = useRouter();
  const [landrequest, setLand] = useState([]);

  useEffect(() => {
    let fun = async () => {
      let land = await landRequest(contract);
      setLand(land);
    };
    fun();
  }, [contract]);

  const lands = landrequest?.filter(
    (land) => land.requestStatus == 3 || land.requestStatus == 4
  );
  console.log("landss", lands);
  const requeststatus = {
    0: "pending",
    1: "accepted",
    2: "rejected",
    3: "paymentdone",
    4: "completed",
    // <ProtectedRoute>
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    return lands?.slice(indexOfFirstPost, indexOfLastPost).filter(Boolean);
  }, [lands, indexOfFirstPost, indexOfLastPost]);

  const [isOpen, setOpen] = useState(false);
  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {!lands > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box mt={{ base: 20, md: 20 }}>
          <PaginationTop
            land={lands}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Divider />
          <Box overflowX="auto">
            <Table variant={"simple"} position="relative">
              <Thead fontSize={{ base: 14, md: 20 }} color={"white"}>
                <Tr
                  fontSize={{ base: 12, md: 17 }}
                  backgroundColor="black"
                  color="white"
                >
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    #
                  </Th>

                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Land Id
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Seller Address
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Buyer Address
                  </Th>

                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Status
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Transfer
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPosts?.map((land, index) => (
                  <Tr key={land.landId} fontSize={{ base: 12, md: 17 }}>
                    <Td>{index}</Td>

                    <Td>{land.landId}</Td>

                    <Td>{shortenEthereumAddress(land?.sellerId)}</Td>
                    <Td>{shortenEthereumAddress(land?.buyerId)}</Td>

                    <Td>{requeststatus[land?.requestStatus]}</Td>
                    <Td>
                      <Button
                        backgroundColor={"green.400"}
                        color={"whiteAlpha.800"}
                        _hover={{
                          color: "white",
                          backgroundColor: "cyan.400",
                        }}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        isDisabled={land?.requestStatus == 4}
                        onClick={() => {
                          router.push("TransferOwnership/Transfer");

                          localStorage.setItem(
                            "Transfer",
                            JSON.stringify({
                              id: land?.landId,
                              seller: land?.sellerId,
                              buyer: land?.buyerId,
                              reqId: land?.reqId,
                            })
                          );
                        }}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        {land?.requestStatus == 4 ? "Transfered" : "Transfer"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {currentPosts && (
            <PaginationButtom
              land={lands}
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
