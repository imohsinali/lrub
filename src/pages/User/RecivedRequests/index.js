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
} from "@chakra-ui/react";
import Pagination from "@/components/utils/pagination";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import VerifyLandModel from "@/components/Models/VerifyLandModel";

const TableWithPagination = () => {
  const { land, setLandId, landstatus, contract, pkr } =
    useContext(Web3Context);
  const [loadingRow, setLoadingRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = landstatus
    ?.slice(indexOfFirstPost, indexOfLastPost)
    .filter(Boolean);

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
  const AcceptReject = async (reqId, desion) => {
    try {
      setLoadingRow(reqId);

      const offer = await contract.acceptRequest(Number(reqId), desion);
      await offer.wait();

      toast({
        title: "Offered Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoadingRow(null);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
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
              <Th fontSize={{ base: 10, md: 17 }}>Buyer Address</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Actual Price</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Offer Price</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Status</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Reject</Th>

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
                      AcceptReject(row.reqId, false);
                    }}
                    isLoading={row.reqId === loadingRow}
                    isDisabled={row.requestStatus > 0}
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
                      AcceptReject(row.reqId, true);
                    }}
                    isLoading={row.reqId === loadingRow}
                    isDisabled={row.requestStatus > 0}
                  >
                    {row.requestStatus > 1 ? "Accepted" : "Accept"}
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
