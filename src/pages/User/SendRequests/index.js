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
import { Web3Context } from "@/components/context/web3Model";
import VerifyLandModel from "@/components/Models/VerifyLandModel";
import PaymentModel from "@/components/Models/paymentModel";

const TableWithPagination = () => {
  const requeststatus = {
    0: "pending",
    1: "accepted",
    2: "rejected",
    3: "paymentdone",
    4: "completed",
  };
  const { land, setLandId, sendRequest, pkr } = useContext(Web3Context);

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sendRequest
    ?.slice(indexOfFirstPost, indexOfLastPost)
    .filter(Boolean);
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
      {/* <FiltersBox/> */}
      <Box overflowX="auto">
        <Table
          variant={{ base: "unstyled", md: "simple" }}
          mt={{ base: 20, md: 20 }}
        >
          <Thead fontSize={{ base: 14, md: 20 }}>
            <Tr fontSize={{ base: 12, md: 17 }}>
              <Th fontSize={{ base: 10, md: 17 }}>Requst Id</Th>

              <Th fontSize={{ base: 10, md: 17 }}>Land Id</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Seller Address</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Actual Price</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Offer Price</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Status</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Make Payment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((row, index) => (
              <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                <Td>{row.reqId}</Td>

                <Td>{row.landId}</Td>

                <Td>{row?.sellerId}</Td>
                <Td>{Math.round(landPrice(row?.landId)*pkr)}</Td>
                <Td>{row?.bidPrice*pkr}</Td>
                <Td>{requeststatus[row?.requestStatus]}</Td>
                <Td>
                  <Button
                    backgroundColor={"green"}
                    borderRadius={15}
                    p={{ base: 2, md: 5 }}
                    fontSize={{ base: 10, md: 14 }}
                    isDisabled={row?.requestStatus != 1}
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
      </Box>

      {isOpen && <PaymentModel isOpen={isOpen} setOpen={setOpen} />}

      <Flex bgColor={"red"}>
        <Pagination handlePageClick={handlePageClick} page={currentPage} />
      </Flex>
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
