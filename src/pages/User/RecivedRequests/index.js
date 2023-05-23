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
  useToast,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import PaginationTop from "@/components/pagination/PaginationTop";
import PaginationButtom from "@/components/pagination/PaginationButtom";

const TableWithPagination = () => {
  const { land, setLandId, landstatus, contract, pkr } =
    useContext(Web3Context);
  const [loadingRow, setLoadingRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const currentPosts = landstatus;

  const landPrice = (landid) => {
    console.log(landid);
    const filteredLand = land?.filter((la) => la.id === landid);
    console.log(filteredLand);
    return filteredLand?.length > 0 ? filteredLand[0].landPrice : null;
  };

  console.log("aland", landstatus);

  const handlePageClick = (p) => {
    setCurrentPage(p);
    console.log(p);
  };

  const toast = useToast();
  const Accept = async (reqId) => {
    try {
      setLoadingRow(reqId);

      const accepted = await contract.acceptRequest(Number(reqId));
      await accepted.wait();

      toast({
        title: "Accept Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoadingRow(null);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoadingRow(null);
    }
  };

  const Reject = async (reqId) => {
    try {
      setLoadingRow(reqId);

      const reject = await contract.rejectRequest(Number(reqId));
      await reject.wait();

      toast({
        title: "reject Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoadingRow(null);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoadingRow(null);
    }
  };

  const requeststatus = {
    0: "pending",
    1: "rejected",
    2: "accepted",
    3: "paymentdone",
    4: "completed",
  };
  const [isOpen, setOpen] = useState(false);

  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {!landstatus > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box mt={{ base: 20, md: 20 }}>
          <PaginationTop
            land={landstatus}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Divider />

          <Box overflowX="auto">
            <Table >
              <Thead backgroundColor={"black"} color={"white"} mt={4}>
                <Tr>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Requst Id
                  </Th>

                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Land Id
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Buyer Address
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Actual Price
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Offer Price
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Status
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Reject
                  </Th>

                  <Th fontSize={{ base: 10, md: 17 }}>Accept</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPosts?.map((row, index) => (
                  <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                    <Td>{row.reqId}</Td>

                    <Td>{row.landId}</Td>

                    <Td>{row?.buyerId}</Td>
                    <Td>{Math.round(landPrice(row?.landId) * pkr)}</Td>
                    <Td>{Math.round(row?.bidPrice * pkr)}</Td>
                    <Td>{requeststatus[row?.requestStatus]}</Td>

                    <Td>
                      <Button
                        backgroundColor={"red"}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        onClick={() => {
                          Reject(row.reqId);
                        }}
                        isLoading={row.reqId === loadingRow}
                        isDisabled={row.requestStatus > 2}
                      >
                        {row.requestStatus == 1 ? "Rejected" : "Reject"}
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        backgroundColor={"green"}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        onClick={() => {
                          Accept(row.reqId);
                        }}
                        isLoading={row.reqId === loadingRow}
                        isDisabled={row.requestStatus > 2}
                      >
                        {row.requestStatus > 1 ? "Accepted" : "Accept"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {landstatus?.length == 0 && (
              <Flex backgroundColor={"orange.100"} p={4}>
                There are no Matching entries
              </Flex>
            )}
          </Box>
          {currentPosts && (
            <PaginationButtom
              land={landstatus}
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
