import { chakra, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Paginate } from "react-paginate-chakra-ui";

export default function Pagination({ handlePageClick, page }) {
  console.log("pagination",Paginate);
  return (
    <Stack p={0} align="center" position="fixed" bottom="0" left="0" right="0">
      <Paginate
        bgColor={'gray.300'}
        page={page}

        count={70000}
        pageSize={10}
        onPageChange={handlePageClick}
        margin={2}
        mb={0}
        shadow="lg"
        fontWeight="blue"
        variant="outline"
        border="2px solid"
        w={{ base: "100%", sm: "80%", md: "50%", lg: "30%" }}
        mx="auto"
      />
    </Stack>
  );
}
