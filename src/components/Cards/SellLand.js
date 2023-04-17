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
  landStatus,
}) => {
  const { contract,account,matic,pkr } = useContext(Web3Context);
  console.log(pkr,'pkr')
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  console.log("land id", id);
  const sellLand = async (id) => {
    try {
      if (isLandVerified) {
        setLoading(true);
      const sell=  await contract.changeDetails(
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
        await sell.wait()
        setLoading(false);
        toast({
          title: "Changed Susscesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
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

        <Text display={"inline"} color={isLandVerified ? "green" : "red"}>
          {isLandVerified ? "verified" : "not verfied"}
        </Text>
      </Flex>
      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Price:{" "}
        </Text>
        { Math.round(landPrice*pkr)} {" "}
        pkr
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
            const [coord, zoom] = allLatitudeLongitude?.split("/");
            const coordArray = coord?.split(";")?.map((pair) => {
              const [longitude, latitude] = pair?.split(",");
              return [Number(longitude), Number(latitude)];
            });

            localStorage.setItem(
              "landdetails",
              JSON.stringify({
                id,
                district,
                landpic,
                landPrice,
                zoom,
                coord1: coordArray[0][0],
                coord2: coordArray[0][1],
                coordArray,
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
                account,
                landStatus,
                isUserVerified: true,
                link: "MyLands",
              })
            );
            router.push("LandDetails");
          }}
        >
          View Details
        </Button>
      </Flex>
    </Box>
  );
};

const LandCard = ({ currentUserLand }) => {

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
