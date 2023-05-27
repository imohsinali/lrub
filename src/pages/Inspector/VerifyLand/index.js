import { useContext, useState, useCallback, useMemo, useEffect } from "react";
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
} from "@chakra-ui/react";
import Image from "next/image";

import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Web3Context } from "@/components/context/web3Model";
import { Lands } from "@/components/context/functions";
import useSWR from "swr";
import { useRouter } from "next/router";
import PRight from "@/components/utils/paginationRight";
import { Spinner } from "@chakra-ui/react";
import shortenEthereumAddress from "@/components/utils/shortenAddress";
import { handleCopy } from "@/components/utils/copyAddress";
import FilterCard from "@/components/utils/filterCard";
import PaginationButtom from "@/components/pagination/PaginationButtom";
import PaginationTop from "@/components/pagination/PaginationTop";

const TableWithPagination = () => {
  const router = useRouter();
  const { contract, currentUser, account } = useContext(Web3Context);

  const [land, setCurrent] = useState();

  useEffect(() => {
    const fun = async () => {
      const lands = await Lands(contract);

      setCurrent(lands);
    };
    fun();
  }, [contract]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    return land?.slice(indexOfFirstPost, indexOfLastPost).filter(Boolean);
  }, [land, indexOfFirstPost, indexOfLastPost]);

  const [open, setOpen] = useState(false);

  return (
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {!land > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box mt={{ base: 20, md: 20 }}>
          <PaginationTop
            land={land}
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
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    #
                  </Th>
                  <Th fontSize={"1rem"} color={"white"}>
                    {" "}
                    Owner Address
                    <Button
                      // variant={'outline'}
                      // bgColor={"green"}
                      onClick={() => {
                        setOpen(!open);
                        setOpenMethod(false);
                      }}
                      _hover={{
                        backgroundColor: "gray.400",
                      }}
                      ml={2}
                      width={4}
                      height={6}
                      leftIcon={
                        <Image
                          src={"/images/ficon.png"}
                          bgColor={"green"}
                          width={14}
                          height={0}
                          p={1}
                          alt=""
                        />
                      }
                    ></Button>
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

              {open && (
                <Flex position={"absolute"} left={100} zIndex={10}>
                  <FilterCard transactions={land} setTransaction={setCurrent} />
                </Flex>
              )}
              <Tbody>
                {currentPosts?.map((row, index) => (
                  <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {" "}
                      <Button
                        size="sm"
                        onClick={() => handleCopy(row?.ownerAddress)}
                        variant="none"
                        // colorScheme="blue"
                      >
                        {shortenEthereumAddress(row?.ownerAddress)}
                      </Button>
                    </Td>
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
            <PaginationButtom
              land={land}
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
