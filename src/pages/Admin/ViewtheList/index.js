// import React from "react";
// import { useTable, usePagination } from "react-table";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Flex,
//   IconButton,
//   Text,
//   Tooltip,
//   Select,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
// } from "@chakra-ui/react";
// import {
//   ArrowRightIcon,
//   ArrowLeftIcon,
//   ChevronRightIcon,
//   ChevronLeftIcon,
// } from "@chakra-ui/icons";

// import makeData from "./makeData";

// function CustomTable({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page, // Instead of using 'rows', we'll use page,
//     // which has only the rows for the active page

//     // The rest of these things are super handy, too ;)
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 2 },
//     },
//     usePagination
//   );

//   // Render the UI for your table
//   return (
//     <>
      
//       <Table {...getTableProps()}>
//         <Thead>
//           {headerGroups.map((headerGroup) => (
//             <Tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
//               ))}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row);
//             return (
//               <Tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
//                   );
//                 })}
//               </Tr>
//             );
//           })}
//         </Tbody>
//       </Table>

//       <Flex justifyContent="space-between" m={4} alignItems="center">
//         <Flex>
//           <Tooltip label="First Page">
//             <IconButton
//               onClick={() => gotoPage(0)}
//               isDisabled={!canPreviousPage}
//               icon={<ArrowLeftIcon h={3} w={3} />}
//               mr={4}
//             />
//           </Tooltip>
//           <Tooltip label="Previous Page">
//             <IconButton
//               onClick={previousPage}
//               isDisabled={!canPreviousPage}
//               icon={<ChevronLeftIcon h={6} w={6} />}
//             />
//           </Tooltip>
//         </Flex>

//         <Flex alignItems="center">
//           <Text flexShrink="0" mr={8}>
//             Page{" "}
//             <Text fontWeight="bold" as="span">
//               {pageIndex + 1}
//             </Text>{" "}
//             of{" "}
//             <Text fontWeight="bold" as="span">
//               {pageOptions.length}
//             </Text>
//           </Text>
//           <Text flexShrink="0">Go to page:</Text>{" "}
//           <NumberInput
//             ml={2}
//             mr={8}
//             w={28}
//             min={1}
//             max={pageOptions.length}
//             onChange={(value) => {
//               const page = value ? value - 1 : 0;
//               gotoPage(page);
//             }}
//             defaultValue={pageIndex + 1}
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
//           <Select
//             w={32}
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//             }}
//           >
//             {[10, 20, 30, 40, 50].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </Select>
//         </Flex>

//         <Flex>
//           <Tooltip label="Next Page">
//             <IconButton
//               onClick={nextPage}
//               isDisabled={!canNextPage}
//               icon={<ChevronRightIcon h={6} w={6} />}
//             />
//           </Tooltip>
//           <Tooltip label="Last Page">
//             <IconButton
//               onClick={() => gotoPage(pageCount - 1)}
//               isDisabled={!canNextPage}
//               icon={<ArrowRightIcon h={3} w={3} />}
//               ml={4}
//             />
//           </Tooltip>
//         </Flex>
//       </Flex>
//     </>
//   );
// }

// function App() {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Name",
//         columns: [
//           {
//             Header: "First Name",
//             accessor: "firstName",
//           },
//           {
//             Header: "Last Name",
//             accessor: "lastName",
//           },
//         ],
//       },
//       {
//         Header: "Info",
//         columns: [
//           {
//             Header: "Age",
//             accessor: "age",
//           },
//           {
//             Header: "Visits",
//             accessor: "visits",
//           },
//           {
//             Header: "Status",
//             accessor: "status",
//           },
//           {
//             Header: "Profile Progress",
//             accessor: "progress",
//           },
//         ],
//       },
//     ],
//     []
//   );

//   const data = React.useMemo(() => makeData(100000), []);

//   return <CustomTable columns={columns} data={data} />;
// }

// export default App;


import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";

function Index() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          marginTop={10}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Add Land Inspector
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="wallet" isRequired>
                  <FormLabel>wallet address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Add Inspector
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}

export default Index;





const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: "Mohsin",
    lastName: "Ali",
    age: 30,
    visits: 10,
    progress: 5,
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

