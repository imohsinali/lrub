import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import {
  Button,
  Container,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

import Map from "@/components/utils/Map";
import LandDetails from "@/components/Cards/landDetails";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYWluYmFsdGkiLCJhIjoiY2xhNGE2ZWd0MHg4ZTNwbXpiN2Q3a2ZsYiJ9.2J8OizwcJnm4U0Idhsu5IA";

const Myland = () => {
  const toast = useToast();

  const { contract, pkr } = useContext(Web3Context);
  const router = useRouter();
  const [land, setLand] = useState();
  const [lng, setLng] = useState(70);
  const [lat, setLat] = useState(30);
  const [zoom, setZoom] = useState(4);
  const [role, setRole] = useState();
  const [coordArray, setCoordArray] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const land = JSON.parse(localStorage.getItem("landdetails"));
    setLand(land);
    setLng(land?.coord1);
    setLat(land?.coord2);
    setZoom(land?.zoom);
    setCoordArray(land?.coordArray);
    setRole(land?.role);
  }, []);

  const verifyLandA = async (id) => {
    try {
      setLoading(true);
     const verfied= await contract.verifyLandAccepted(id);
     await verfied.wait()
      toast({
        title: "Verified Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
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

  const verifyLandR = async (id) => {
    try {
      setLoading(true);
    const reject=  await contract.verifyLandRejected(id);
    await reject.wait()
      toast({
        title: "Reject Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
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
    <SidebarWithHeader>
      <Flex mt={20}>
        <Button
          variant={"link"}
          onClick={() => router.push(`/User/${land?.link}`)}
        >
          Back to {land?.link}
        </Button>
      </Flex>

      {coordArray && (
        <Map zoom={zoom} lat={lat} lng={lng} coordArray={coordArray} />
      )}

      <LandDetails land={land} user={"user"} pkr={pkr} />
      <Container mt={4} gap={10}>
        <Button
          backgroundColor={"red"}
          borderRadius={15}
          p={{ base: 2, md: 5 }}
          fontSize={{ base: 10, md: 14 }}
          mr={3}
          colorScheme="blue"
          onClick={() => verifyLandR(land.id)}
          isDisabled={land?.isLandVerified}
          isLoading={loading}
        >
          Reject
        </Button>
        <Button
          backgroundColor={"green"}
          borderRadius={15}
          p={{ base: 2, md: 5 }}
          fontSize={{ base: 10, md: 14 }}
          mr={3}
          colorScheme="blue"
          onClick={() => verifyLandA(land.id)}
          isDisabled={land?.isLandVerified}
          isLoading={loading}
        >
          Confirm
        </Button>
      </Container>
    </SidebarWithHeader>
  );
};

export default Myland;
