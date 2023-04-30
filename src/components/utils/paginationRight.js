import { Box, Button, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
const PRight = () => {
  return (
    <Flex gap={1}>
      <Button
        color={"purple.400"}
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
        _hover={{
          backgroundColor: "purple.400",
          color: "white",
        }}
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
        leftIcon={<ChevronLeftIcon />}
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
        page 1 of 100
      </Box>
      <Button
        fontWeight={{ base: "0.7rem", sm: "1rem" }}
        color={"purple.400"}
        _hover={{
          backgroundColor: "purple.400",
          color: "white",
        }}
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
      ></Button>
    </Flex>
  );
};

export default PRight;
