import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const Card = ({ image, title, description }) => {
  return (
    <Box maxW="sm">
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent="space-evenly"
      >
        <Text fontWeight="bold" fontSize="xl" mb={7} mt={5}>
          {title}
        </Text>
        <Image src={image} alt={title} width={70} mb={7} height={10} />
        <Text fontSize="md" align={"center"}>
          {description}{" "}
        </Text>
      </Flex>
    </Box>
  );
};

export default Card;
