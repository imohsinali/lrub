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
import PaymentModel from "@/components/Models/paymentModel";

const TableWithPagination = () => {
  const requeststatus = {
    0: "pending",
    1: "rejected",
    2: "accepted",

    3: "paymentdone",
    4: "completed",
  };
  const { land, sendRequest, pkr } = useContext(Web3Context);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  const landPrice = (landid) => {
    console.log(landid);
    const filteredLand = land?.filter((la) => la.id === landid);
    console.log(filteredLand);
    return filteredLand?.length > 0 ? filteredLand[0].landPrice : null;
  };

  console.log("filert lands");

  const handlePageClick = (p) => {
    setCurrentPage(p);
    console.log(p);
  };

  const [isOpen, setOpen] = useState(false);
  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {!sendRequest > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box mt={{ base: 20, md: 20 }}>
          <PaginationTop
            land={sendRequest}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Divider />

          <Box overflowX="auto">
            <Table >
              <Thead backgroundColor={"black"} color={"white"} mt={4}>
                <Tr>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Requst Id</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Land Id</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Seller Address</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Actual Price</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Offer Price</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Status</Th>
                  <Th fontSize={{ base: 10, md: 17 }}color={"white"}>Make Payment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sendRequest?.map((row, index) => (
                  <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                    <Td>{row.reqId}</Td>

                    <Td>{row.landId}</Td>

                    <Td>{row?.sellerId}</Td>
                    <Td>{Math.round(landPrice(row?.landId) * pkr)}</Td>
                    <Td>{Math.round(row?.bidPrice * pkr)}</Td>
                    <Td>{requeststatus[row?.requestStatus]}</Td>
                    <Td>
                      <Button
                        backgroundColor={"green"}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        isDisabled={row?.requestStatus != 2}
                        onClick={() => {
                          const dataToStore = {
                            landId: row.landId,
                            sellerId: row.sellerId,
                            landPrice: row.bidPrice,
                            reqId: row.reqId,
                            buyerId: row.buyerId,
                          };

                          localStorage.setItem(
                            "Paymentland",
                            JSON.stringify(dataToStore)
                          );
                          setOpen(true);
                        }}
                      >
                        Make A Payment
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {sendRequest?.length == 0 && (
              <Flex backgroundColor={"orange.100"} p={4}>
                There are no Matching entries
              </Flex>
            )}
          </Box>
          {sendRequest && (
            <PaginationButtom
              land={sendRequest}
              postsPerPage={postsPerPage}
              setPostPerPage={setPostPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </Box>
      )}

      {isOpen && <PaymentModel isOpen={isOpen} setOpen={setOpen} />}
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
