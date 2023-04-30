import { useContext, useState, useCallback, useMemo } from "react";
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
  Text,
  Select,
  Container,
} from "@chakra-ui/react";

import Pagination from "@/components/utils/pagination";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import { Lands } from "@/components/context/functions";
import useSWR from "swr";
import { useRouter } from "next/router";
import PRight from "@/components/utils/paginationRight";
import { Spinner } from "@chakra-ui/react";

const TableWithPagination = () => {
  const router = useRouter();
  const { contract, currentUser, account } = useContext(Web3Context);

  const { data: lands, error: landError } = useSWR(
    ["lands", contract],
    async () => await Lands(contract),
    { revalidateOnMount: true }
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(7);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    return lands?.slice(indexOfFirstPost, indexOfLastPost).filter(Boolean);
  }, [lands, indexOfFirstPost, indexOfLastPost]);

  const handlePageClick = useCallback(
    (p) => {
      setCurrentPage(p);
      console.log(p);
    },
    [setCurrentPage]
  );

  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {/* <FiltersBox/> */}

      {currentPosts ? (
        <Box mt={{ base: 20, md: 20 }}>
          {currentPosts && (
            <Flex
              mb={6}
              justifyContent="space-between"
              flexDirection={{
                base: "column",
                sm: "row",
              }}
            >
              <Flex>More than 2,670,766,608 transactions found</Flex>
              <PRight />
            </Flex>
          )}

          <Divider />
          <Box overflowX="auto">
            <Table variant={"simple"}>
              <Thead fontSize={{ base: 14, md: 20 }} color={"white"}>
                <Tr
                  fontSize={{ base: 12, md: 17 }}
                  backgroundColor="black"
                  color="white"
                >
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    #
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    Owner Address
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    District
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    PropertyId
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    landArea Sqft
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    Verify
                  </Th>
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
                        backgroundColor={
                          row?.isLandVerified ? "green.400" : "gray.300"
                        }
                        color={
                          row?.isLandVerified ? "whiteAlpha.800" : "black.100"
                        }
                        _hover={{
                          color: "white",
                          backgroundColor: "cyan.400",
                        }}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        onClick={() => {
                          const [coord, zoom] =
                            row?.allLatitudeLongitude?.split("/");
                          const coordArray = coord?.split(";")?.map((pair) => {
                            const [longitude, latitude] = pair?.split(",");
                            return [Number(longitude), Number(latitude)];
                          });

                          localStorage.setItem(
                            "landdetails",
                            JSON.stringify({
                              id: row?.id,
                              district: row?.district,
                              landpic: row?.landpic,
                              landPrice: row?.landPrice,
                              zoom,
                              coord1: coordArray[0][0],
                              coord2: coordArray[0][1],
                              coordArray,
                              document: row?.document,
                              landArea: row?.landArea,
                              ownerAddress: row?.ownerAddress,
                              propertyPID: row?.propertyPID,
                              registerdate: row?.registerdate,
                              landAddress: row?.landAddress,
                              proxyownerAddress: row?.proxyownerAddress,
                              timestamp: row?.timestamp,
                              verfiedby: row?.verfiedby,
                              isLandVerified: row?.isLandVerified,
                              isforSell: row?.isforSell,
                              landStatus: row?.landStatus,
                              isUserVerified: currentUser[0].isUserVerified,
                              currentUser: currentUser[0].address == account,
                              link: "LandMarket",
                              role: "landVerification",
                            })
                          );
                          router.push("/Inspector/VerifyLand/Verification");
                        }}
                      >
                        {row?.isLandVerified ? "Verified" : " Verify"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {currentPosts && (
            <Flex
              justifyContent="space-between"
              mt={4}
              flexDirection={{
                base: "column",
                sm: "row",
              }}
            >
              <Flex gap={1} alignItems="center">
                <Text>Show</Text>
                <Select
                  size="sm"
                  heigth={20}
                  defaultValue="10"
                  borderRadius={"5"}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Select>
                <Text> Records</Text>
              </Flex>
              <PRight />
            </Flex>
          )}
        </Box>
      ) : (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      )}
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
