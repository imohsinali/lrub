import { Box, Button, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
const PRight = ({ lands, post, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(lands?.length / post);

  return (
    <Flex gap={1}>
      <Button
        color={"purple.400"}
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
        _hover={{
          backgroundColor: "purple.400",
          color: "white",
        }}
        onClick={() => setCurrentPage(1)}
        isDisabled={currentPage <= 1}
      >
        First
      </Button>
      <Button
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
        color={"purple.400"}
        _hover={{
          backgroundColor: "purple.400",
          color: "white",
        }}
        isDisabled={currentPage <= 1}
        leftIcon={<ChevronLeftIcon />}
        onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
      ></Button>

      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="7.5rem"
        h="2.5rem"
        bg="gray.100"
        cursor="default"
        borderRadius="md"
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
      >
        {currentPage} of {totalPages}
      </Box>
      <Button
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
        color={"purple.400"}
        _hover={{
          backgroundColor: "purple.400",
          color: "white",
        }}
        onClick={() => setCurrentPage(totalPages)}
        isDisabled={currentPage >= totalPages}
      >
        Last
      </Button>

      <Button
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
        color={"purple.400"}
        _hover={{
          backgroundColor: "purple.400",
          color: "white",
        }}
        leftIcon={<ChevronRightIcon />}
        isDisabled={currentPage >= totalPages}
        onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
      ></Button>
    </Flex>
  );
};

export default PRight;
