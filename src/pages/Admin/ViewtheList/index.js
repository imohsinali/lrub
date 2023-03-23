import { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Tc,
  Td,
  Select,
  Button,
} from "@chakra-ui/react";
import Pagination from "@/components/utils/pagination";
import ProtectedRoute from "@/components/protected/protectedRoute";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import FiltersBox from "@/components/utils/BoxFilter";
import { Context } from "@/components/context/context";
import { ethers } from "ethers";
import RemoveModel from "@/components/Models/RemoveModel";
import useSWR from "swr";



const TableWithPagination = () => {
    const { contract, currentAccount } = useContext(Context);

const { data: inspectors } = useSWR(["data", contract], async () => {
  const inspectorAddresses = await contract.ReturnAllLandIncpectorList();
  const inpsectors = await Promise.all(
    inspectorAddresses.map(async (address) => {
      const { name, city, dob, designation, cnic } =
        await contract.InspectorMapping(address);
      return {
        address,
        name: ethers.utils.parseBytes32String(name),
        city: ethers.utils.parseBytes32String(city),
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
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inspectors?.slice(indexOfFirstPost, indexOfLastPost);

  console.log("indexOfFirstPost", indexOfFirstPost);

  const handlePageClick = (p) => {
    setCurrentPage(p);
    console.log(p);
  };

  const [isOpen,setOpen]=useState(false)
  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        {/* <FiltersBox/> */}
        <Table variant="simple" mt={20}>
          <Thead fontSize={40}>
            <Tr fontSize={40}>
              <Th fontSize={17}>#</Th>
              <Th fontSize={17}>Wallet Address</Th>
              <Th fontSize={17}>Name</Th>
              <Th fontSize={17}>City</Th>
              <Th fontSize={17}>Cnic</Th>
              <Th fontSize={17}>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((row, index) => (
              <Tr key={row.address}>
                <Td>{index}</Td>
                <Td>{row.address}</Td>
                <Td>{row.name}</Td>
                <Td>{row.city}</Td>
                <Td>{row.cnic}</Td>
                <Td>
                  <Button
                    backgroundColor={"red"}
                    borderRadius={15}
                    p={5}
                    onClick={() => setOpen(true)}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {isOpen && <RemoveModel isOpen={isOpen} setOpen={setOpen} />}

        <Pagination handlePageClick={handlePageClick} page={currentPage} />
      </SidebarWithHeader>
    </ProtectedRoute>
  );
};

export default TableWithPagination;
