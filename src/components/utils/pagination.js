import { Box, chakra, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Paginate } from "react-paginate-chakra-ui";
  import { useBreakpointValue } from "@chakra-ui/react";

export default function Pagination({ handlePageClick, page,p }) {
  console.log("pagination",Paginate);


const paginationWidth = useBreakpointValue({ base: '90%', sm: '50%', md: '30%' })

return (
  <Box
    position="fixed"
    bottom={0}
    left={-50}
    right={240}
    mx="auto"
    // w={paginationWidth}
    // backgroundColor={'red'}
    p={0}
    maxW={"100px"}
  >
    <Paginate
      page={page}
      count={10000}
      pageSize={7}
      onPageChange={handlePageClick}
      fontWeight="blue"
      width="1px"
      borderColor="blue.500"
      color='black'
      borderWidth="2px"
      backgroundColor="gray.200"
      borderRadius="md"
      fontSize={{ base: "sm", md: "md" }}
      textAlign="center"

    />
  </Box>
);
}
    
    
    
    
    
    
    
    