import {
  Box,
  Flex,
  Text,
  Image,
  Divider,
  Button,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Web3Context } from "../context/web3Model";
import BuyLandModel from "../Models/BuyLandModel";

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
  const { contract, account, currentUser, land, setLandId, matic,pkr } =
    useContext(Web3Context);

  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);

  console.log("land id", id);
  const sellLand = async (id) => {
    try {
      if (currentUser[0].isUserVerified) {
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
      } else if (!currentUser[0].isUserVerified) {
        toast({
          title: "You are Not verified",
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
  };

  return (
    <Box
      h={ownerAddress == account ? 450 : 500}
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
        minH={230}
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
        {Math.round(landPrice * pkr)}Pkr
      </Text>
      <Text fontSize="xl" fontWeight="light" mb="2">
        {landAddress}
      </Text>

      <Text color="gray.600" display={{}}>
        {/* {landpic} */}
      </Text>

      <Divider />

      <Box display="flex" flexWrap="wrap">
        <Flex justifyContent={"space-between"} mt={2} flex="1">
          <Button
            variant="outline"
            borderRadius={"10px"}
            colorScheme="green"
            isLoading={loading}
            onClick={() => {
              setLandId(id);
              setOpen(true);
            }}
            isDisabled={ownerAddress == account || landStatus == "paymentdone"}
          >
            Make offer
          </Button>
        </Flex>
        <Flex mt={2} flex="1" justifyContent="flex-end">
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
                  landStatus,
                  isUserVerified: currentUser[0].isUserVerified,
                  currentUser: currentUser[0].address == account,
                  link: "LandMarket",
                })
              );
              router.push("LandDetails");
            }}
          >
            View Details
          </Button>
        </Flex>
      </Box>
      {isOpen && <BuyLandModel isOpen={isOpen} setOpen={setOpen} land={land} />}
    </Box>
  );
};

const LandCard = () => {
  const { landforSell } = useContext(Web3Context);

  return (
    <Flex wrap={"wrap"} alignItems={"center"} justifyContent={"space-evenly"}>
      {landforSell?.map((land) => (
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
