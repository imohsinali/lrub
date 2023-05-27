import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { timeStamp } from "@/components/utils/timeStamp";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

import Map from "@/components/utils/Map";
import LandDetailsForm from "@/components/Form/LandDetailsForm";
import LandDetails from "@/components/Cards/landDetails";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYWluYmFsdGkiLCJhIjoiY2xhNGE2ZWd0MHg4ZTNwbXpiN2Q3a2ZsYiJ9.2J8OizwcJnm4U0Idhsu5IA";

const Myland = () => {
  const { contract ,pkr} = useContext(Web3Context);
  const router = useRouter();
  const [land, setLand] = useState();
  const [lng, setLng] = useState(70);
  const [lat, setLat] = useState(30);
  const [zoom, setZoom] = useState(4);
  const [coordArray, setCoordArray] = useState();
  useEffect(() => {
    const land = JSON.parse(localStorage.getItem("landdetails"));
    setLand(land);
    setLng(land?.coord1);
    setLat(land?.coord2);
    setZoom(land?.zoom);
    setCoordArray(land?.coordArray);
  }, []);
  
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

      {land?.ownerAddress == land?.account &&
        land?.isLandVerified &&
        !land?.isforSell && <LandDetailsForm landid={land?.id} />}
    </SidebarWithHeader>
  );
};

export default Myland;
