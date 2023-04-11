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
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import { landRequest } from "@/components/context/functions";
import useSWR from "swr";
import shortenEthereumAddress from "@/components/utils/shortenAddress";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const TableWithPagination = () => {
  const { contract } = useContext(Web3Context);
  const router = useRouter();

  const { data: landrequest, error: sendreqError } = useSWR(
    ["landRequest", contract],
    async () => await landRequest(contract),
    { revalidateOnMount: true }
  );

  const lands = landrequest?.filter(
    (land) => land.requestStatus == 3 || land.requestStatus == 4
  );
  const requeststatus = {
    0: "pending",
    1: "accepted",
    2: "rejected",
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
              <Th fontSize={{ base: 10, md: 17 }}>#</Th>

              <Th fontSize={{ base: 10, md: 17 }}>Land Id</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Seller Address</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Buyer Address</Th>
              <Th fontSize={{ base: 10, md: 17 }}>View Document</Th>

              <Th fontSize={{ base: 10, md: 17 }}>Status</Th>
              <Th fontSize={{ base: 10, md: 17 }}>Transfer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lands?.map((land, index) => (
              <Tr key={land.landId} fontSize={{ base: 12, md: 17 }}>
                <Td>{index}</Td>

                <Td>{land.landId}</Td>

                <Td>{shortenEthereumAddress(land?.sellerId)}</Td>
                <Td>{shortenEthereumAddress(land?.buyerId)}</Td>
                <Td>
                  <Button variant={"link"}>View</Button>
                </Td>

                <Td>{requeststatus[land?.requestStatus]}</Td>
                <Td>
                  <Button
                    backgroundColor={"green"}
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
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
