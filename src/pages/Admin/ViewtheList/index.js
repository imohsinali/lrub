import { useContext, useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import Pagination from "@/components/utils/pagination";
import ProtectedRoute from "@/components/protected/protectedRoute";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { ethers } from "ethers";
import RemoveModel from "@/components/Models/RemoveModel";
import useSWR from "swr";
import { Web3Context } from "@/components/context/web3Model";

const TableWithPagination = () => {
  const { contract } = useContext(Web3Context);

  const { data: inspectors } = useSWR(["data", contract], async () => {
    const inspectorAddresses = await contract.ReturnAllLandIncpectorList();
    const inpsectors = await Promise.all(
      inspectorAddresses.map(async (address) => {
        const { name, city, dob, designation, cnic, district, email, phone } =
          await contract.InspectorMapping(address);
        return {
          address,
          name: ethers.utils.parseBytes32String(name),
          city: ethers.utils.parseBytes32String(city),
          district: ethers.utils.parseBytes32String(district),
          email: ethers.utils.parseBytes32String(email),
          phone: parseInt(phone._hex),
          dob: ethers.utils.parseBytes32String(dob),
          cnic: parseInt(cnic._hex),
          designation: ethers.utils.parseBytes32String(designation),
        };
      })
    );
    return inpsectors;
  });
  console.log("dar", inspectors);
const [currentPage, setCurrentPage] = useState(0);
const [postsPerPage] = useState(10);
const indexOfLastPost = (currentPage + 1) * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = inspectors
  ?.slice(indexOfFirstPost, indexOfLastPost)
  .filter(Boolean);
  console.log("indexOfFirstPost", indexOfFirstPost);

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
                <Th fontSize={{ base: 10, md: 17 }}>#</Th>
                <Th fontSize={{ base: 10, md: 17 }}>Wallet Address</Th>
                <Th fontSize={{ base: 10, md: 17 }}>Name</Th>
                <Th fontSize={{ base: 10, md: 17 }}>City</Th>
                <Th fontSize={{ base: 10, md: 17 }}>Cnic</Th>
                <Th fontSize={{ base: 10, md: 17 }}>Remove</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPosts?.map((row, index) => (
                <Tr key={row.address} fontSize={{ base: 12, md: 17 }}>
                  <Td>{index}</Td>
                  <Td>{row.address}</Td>
                  <Td>{row.name.split('|').join(" ")}</Td>
                  <Td>{row.city}</Td>
                  <Td>{row.cnic}</Td>
                  <Td>
                    <Button
                      backgroundColor={"red"}
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

        <Pagination handlePageClick={handlePageClick} page={currentPage} />
      </SidebarWithHeader>
    
  );
};

export default TableWithPagination;
