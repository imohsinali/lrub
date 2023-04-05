import {
  Box,
  Flex,
  Text,
  Image,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Web3Context } from "../context/web3Model";

const Card = ({
  id,
  district,
  landpic,
  landPrice,
  allLatitudeLongitude,
  document,
  landAddress,
  landArea,
  ownerAddress,
  propertyPID,
  registerdate,
  isLandVerified,
  isforSell,
  proxyownerAddress,
  timestamp,
  verfiedby,
  landStatus
}) => {
  const { contract } = useContext(Web3Context);

  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  console.log("land id", id);
  const sellLand = async (id) => {
    try {
      if (isLandVerified) {
        setLoading(true);
        await contract.changeDetails(
          id,
          true,
          false,
          false,
          false,
          !isforSell,
          0,
          "",
          "",
          {
            gasLimit: 1000000,
          }
        );
        toast({
          title: "Changed Susscesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
      } else if (!isLandVerified) {
        toast({
          title: "Land is Not verified",
          status: "loading",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }

    //     function changeDetails(
    //     uint _landId,
    //     bool s,
    //     bool p,
    //     bool i,
    //     bool c,
    //     bool sell,
    //     uint _newPrice,
    //     string memory _newPic,
    //     string memory _allLatiLongi
    // )
  };
  return (
    <Box
      h={490}
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

      <Flex mb={2} justifyContent="space-between">
        <Text>
          <Text as="span" fontWeight="bold">
            Area:{" "}
          </Text>
          {landArea} Sqft
        </Text>

        <Text display={"inline"} color={isLandVerified?'green':'red'}>
          {isLandVerified ? "verified" : "not verfied"}
        </Text>
      </Flex>
      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Price:{" "}
        </Text>
        {landPrice}Pkr
      </Text>
      <Text fontSize="xl" fontWeight="light" mb="2">
        {landAddress}
      </Text>

      <Text color="gray.600" display={{}}>
        {/* {landpic} */}
      </Text>
      <Divider />
      <Flex justifyContent={"space-between"} mt={2}>
        <Button
          variant="outline"
          borderRadius={"10px"}
          colorScheme="green"
          isLoading={loading}
          onClick={() => sellLand(id)}
          isDisabled={landStatus == "paymentdone"}
        >
          {isforSell ? "Cancel" : "sell now"}
        </Button>
        <Button
          variant="ghost"
          borderRadius={"10px"}
          colorScheme="blue"
          onClick={() => {
            localStorage.setItem(
              "landdetails",
              JSON.stringify({
                id,
                district,
                landpic,
                landPrice,
                allLatitudeLongitude,
                document,
                landArea,
                ownerAddress,
                propertyPID,
                registerdate,
                landAddress,
                proxyownerAddress,
                timestamp,
                verfiedby,
                isLandVerified,
                isforSell,
                landStatus,
              })
            );
            router.push("MyLands/LandDetails");
          }}
        >
          View Details
        </Button>
      </Flex>
    </Box>
  );
};

const LandCard = () => {
  const { currentUserLand } = useContext(Web3Context);

  return (
    <Flex wrap={"wrap"} alignItems={"center"} justifyContent={"space-evenly"}>
      {currentUserLand?.map((land) => (
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
