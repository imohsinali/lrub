import { UserInfo } from "@/components/Cards/profileDetails";
import { Lands } from "@/components/context/functions";
import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";
import { districtData } from "@/components/utils/districts";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import useSWR from "swr";
import { useContext, useState } from "react";
import LandDetail from "@/components/Cards/landInformation";
export default function ChangeAdmin() {
  const { contract, users, currentUser, totalLand } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [userfound, setFoundUser] = useState(false);
  const [landfound, setLandFound] = useState(false);
  const [land, setLand] = useState();

  const toast = useToast();

  const handleUser = async (event) => {
    setFoundUser(false);

    event.preventDefault();

    const formData = new FormData(event.target);

    const us = users?.filter((user) => user.address == formData.get("address"));

    if (us) {
      toast({
        title: "User Found",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setFoundUser(true);
      setUser(us);
    } 
    
    else {
      toast({
        title: "User Not Found",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
      setFoundUser(false);

      setLoading(false);
    }
  };

  const { data: lands, error: landError } = useSWR(
    ["landsd", contract],
    async () => await Lands(contract),
    { revalidateOnMount: true }
  );
  const hanleLand = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const filter = lands?.filter(
      (land) => land.id == Number(formData.get("address"))
    );
    const [coord, zoom] = filter[0]?.allLatitudeLongitude?.split("/");
    const coordArray = coord?.split(";")?.map((pair) => {
      const [longitude, latitude] = pair?.split(",");
      return [Number(longitude), Number(latitude)];
    });
    localStorage.setItem(
      "landdetails",
      JSON.stringify({
        id: filter[0]?.id,
        district: filter[0]?.district,
        landpic: filter[0]?.landpic,
        landPrice: filter[0]?.landPrice,
        zoom,
        coord1: coordArray[0][0],
        coord2: coordArray[0][1],
        coordArray,
        document: filter[0]?.document,
        landArea: filter[0]?.landArea,
        ownerAddress: filter[0]?.ownerAddress,
        propertyPID: filter[0]?.propertyPID,
        registerdate: filter[0]?.registerdate,
        landAddress: filter[0]?.landAddress,
        proxyownerAddress: filter[0]?.proxyownerAddress,
        timestamp: filter[0]?.timestamp,
        verfiedby: filter[0]?.verfiedby,
        isLandVerified: filter[0]?.isLandVerified,
        isforSell: filter[0]?.isforSell,
        landStatus: filter[0]?.landStatus,
      })
    );
    if (filter) {
      toast({
        title: "land Found",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLandFound(true);
    } else {
      toast({
        title: "land not  Found",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLandFound(false);
    }
    setLandFound(false);
  };

  const [role, setRole] = useState({ user: false, Insp: true, land: false });

  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="calc(100vh - 4rem)"
          bg={useColorModeValue("gray.50", "gray.800")}
          marginTop={{ base: "5", sm: 1 }}
        >
          <Heading mb={8}>Search Details</Heading>
          <Flex
            flexDirection={"column"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            justifyContent="center"
            alignItems={"center"}
            p={10}
            gap={1}
            width={{ base: "100%", md: "800px" }}
          >
            <Flex gap={2}>
              <Button
                onClick={() =>
                  setRole({ user: true, Insp: false, land: false })
                }
              >
                User
              </Button>
              <Button
                onClick={() =>
                  setRole({ user: false, Insp: false, land: true })
                }
              >
                Land
              </Button>
            </Flex>

            <Flex
              display={{ base: "block", md: "flex" }}
              width={{ base: "100%", md: "800px" }}
              p={4}
              as="form"
              onSubmit={role.user ? handleUser : role.land ? hanleLand : ""}
            >
              <FormControl id="address" isRequired flex={0.8}>
                <FormLabel>
                  {role.land ? "Land ID" : "Wallet Address"}
                </FormLabel>
                <InputGroup width={"full"}>
                  <InputLeftAddon children="0x" />
                  <Input
                    width={"full"}
                    type="text"
                    placeholder={
                      role.land ? "Enter land id" : "Enter wallet address"
                    }
                    name="address"
                  />
                </InputGroup>
              </FormControl>

              <Button
                flex={0.1}
                bg={"blue.400"}
                colorScheme="blue"
                _hover={{ bg: "blue.500" }}
                mt={8}
                w={{ base: "80%", sm: "50%", md: "100px" }}
                mx="auto"
                p={0}
                type="submit"
                isLoading={loading}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {role.user && userfound && (
          <Container
            mt={-20}
            width={{
              base: "100%",
              md: 1000,
            }}
            justifyContent="center"
            alignItems={"center"}
            maxW={800}
            boxShadow={"lg"}
            p={10}
          >
            <Text>User Information</Text>

            <UserInfo user={user ? user[0] : user} role={"user"} />
          </Container>
        )}

        {role.land && landfound && <LandDetail />}
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}
