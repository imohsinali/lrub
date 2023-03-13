import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Card = ({ image, title, description }) => {
  return (
    <Box
      maxW="sm"
    //   borderWidth="1px"
    //   borderRadius="lg"
      overflow="hidden"
      //   transition="transform .2s"
      //   _hover={{ transform: "scale(1.05)" }}
    >
      <Flex direction={'column'} alignItems={'center'} justifyContent='space-evenly'>
      <Text fontWeight="bold" fontSize="xl" mb={7} mt={10}>
        {title}
      </Text>
        <Image src={image} alt={title} width={100} mb={7} />
        <Text  fontSize="md"  >{description}  </Text>
      </Flex>
    </Box>
  );
};

export default Card;
