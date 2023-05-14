import { useContext, useEffect, useMemo, useState } from "react";
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
  Text,
  Image,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import Pagination from "@/components/utils/pagination";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import useSWR from "swr";
import { Web3Context } from "@/components/context/web3Model";
import VerifyUserModel from "@/components/Models/VerifyUserModel";
import { getAlluser } from "@/components/context/functions";
import { useClipboard } from "@chakra-ui/react";
import PaginationTop from "@/components/pagination/PaginationTop";
import PaginationButtom from "@/components/pagination/PaginationButtom";
import { useRouter } from "next/router";

const TableWithPagination = () => {
  const router = useRouter();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const { contract } = useContext(Web3Context);

  const [users, setUser] = useState();

  useEffect(() => {
    const fun = async () => {
      const users = await getAlluser(contract);

      setUser(users);
    };
    fun();
  }, [contract]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    return users?.slice(indexOfFirstPost, indexOfLastPost).filter(Boolean);
  }, [users, indexOfFirstPost, indexOfLastPost]);

  const [isOpen, setOpen] = useState(false);

  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      {!users > 0 ? (
        <Flex mt={60} h="100%" w="100%" align="center" justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box mt={{ base: 20, md: 20 }}>
          <PaginationTop
            land={users}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Divider />

          <Box overflowX="auto">
            <Table variant={{ base: "unstyled", md: "simple" }} position="relative">
              <Thead fontSize={{ base: 14, md: 20 }} color={"white"}>
                <Tr
                  fontSize={{ base: 12, md: 17 }}
                  backgroundColor="black"
                  color="white"
                >
                  <Th fontSize={{ base: 10, md: 17 }} color={"white"}>
                    #
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    Wallet Address
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    Name
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    City
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    Cnic
                  </Th>
                  <Th fontSize={{ base: 10, md: 17 }} color="white">
                    Verify
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPosts?.map((user, index) => (
                  <Tr key={user.address} fontSize={{ base: 12, md: 17 }}>
                    <Td>{index}</Td>
                    <Td>
                      <Flex>
                        <Text>{user.address}</Text>
                        {user.isUserVerified && (
                          <Image
                            ml={1}
                            width={5}
                            src={"/images/verified.png"}
                          />
                        )}
                      </Flex>
                    </Td>
                    <Td>{user.name.split("|").join(" ")}</Td>
                    <Td>{user.city}</Td>
                    <Td>{user.cnic}</Td>
                    <Td>
                      <Button
                        backgroundColor={
                          user?.isUserVerified ? "green.400" : "gray.300"
                        }
                        color={
                          user?.isUserVerified ? "whiteAlpha.800" : "black.100"
                        }
                        _hover={{
                          color: "white",
                          backgroundColor: "cyan.400",
                        }}
                        borderRadius={15}
                        p={{ base: 2, md: 5 }}
                        fontSize={{ base: 10, md: 14 }}
                        onClick={() => {
                          localStorage.setItem(
                            "userdetails",
                            JSON.stringify({
                              address: user?.address,
                              name: user?.name,
                              district: user?.district,
                              cnic: user?.cnic,
                              profilepic: user?.profilepic,
                              document: user?.document,
                              registerdate:user?.registerdate,
                              verifydate: user?.verifydate,
                              verfiedby: user?.verfiedby,
                              isUserVerified: user?.isUserVerified,
                              userStatus: user?.verStatus,
                              link: "VerifyUser",
                              role: "userVerification",
                            })
                          );
                          router.push("/Inspector/VerifyUser/Verification");
                        }}
                      >
                        {user?.verStatus === 3
                          ? "Verified by Admin"
                          : user?.verStatus === 2
                          ? "Verified"
                          : user?.verStatus === 1
                          ? "Rejected"
                          : "Requested"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {currentPosts && (
            <PaginationButtom
              land={users}
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
