import { Box, Flex, Text, Image, Divider, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";

const Card = ({ district, landpic }) => (
  <Box
    h={390}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    p="1"
    m="2"
    // mr='0'
    width={{ base: "90%", sm: 330 }}
    transition="transform .2s"
    _hover={{ transform: "scale(1.05)" }}
  >
    <Image
      src={`https://gateway.pinata.cloud/ipfs/${landpic}`}
      minwidth={340}
      minH={280}
    />

    <Text fontSize="xl" fontWeight="semibold" mb="2">
      {district}
    </Text>
    <Text color="gray.600" display={{}}>
      {/* {landpic} */}
    </Text>
    <Divider />
    <Flex justifyContent={"space-between"} mt={2}>
      <Button variant="outline" borderRadius={"10px"} colorScheme="green">
        Buy now
      </Button>
      <Button variant="ghost" borderRadius={"10px"} colorScheme="blue">
        View Details
      </Button>
    </Flex>
  </Box>
);



const LandCard = ({data}) => {
    console.log(data)
  return (
    <Flex wrap={"wrap"} alignItems={"center"} justifyContent={"space-evenly"}>
      {data?.map((land) => (
        <Card
          key={land.id}
          {...land}
          transition="transform .2s"
          _hover={{ transform: "scale(1.05)" }}
        />
      ))}
    </Flex>
  );
};

export default LandCard;
