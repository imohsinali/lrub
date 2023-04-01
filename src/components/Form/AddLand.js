import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Container,
  IconButton,
  Button,
  Box,
} from "@chakra-ui/react";


import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { districtData } from "../utils/districts";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

// import { districtData } from "../utils/districts";
export const Form1 = ({ formData, onChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Land
      </Heading>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="landArea" fontWeight={"normal"}>
          Total Land Area Sqft
        </FormLabel>
        <Input
          id="landArea"
          type={"number"}
          value={formData.landArea}
          onChange={(e) => {
            onChange({ ...formData, landArea: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="landPrice" fontWeight={"normal"}>
          Land Price In Pkr
        </FormLabel>
        <Input
          id="landPrice"
          type={"number"}
          value={formData.landPrice}
          onChange={(e) => {
            onChange({ ...formData, landPrice: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="cnic" fontWeight={"normal"}>
          Upload Land Image
        </FormLabel>
        <Input
          type={"file"}
          id="landImage"
          //   value={formData.cnic}
          onChange={(e) => {
            onChange({ ...formData, landImage: e.target.files[0] });
          }}
        />
      </FormControl>
      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="cnic" fontWeight={"normal"}>
          Upload Land Document
        </FormLabel>
        <Input
          type={"file"}
          id="landDocument"
          onChange={(e) => {
            onChange({ ...formData, landDocument: e.target.files[0] });
          }}
        />
      </FormControl>
    </>
  );
};

export const Form2 = ({ formData, onChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Land
      </Heading>
      <FormControl mt="2%" mr="5%" isRequired>
        <FormLabel htmlFor="landPid" fontWeight={"normal"}>
          Property Id No
        </FormLabel>
        <Input
          id="landPid"
          type="number"
          value={formData.landPid}
          onChange={(e) => {
            onChange({ ...formData, landPid: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mt="2%" mr="5%" isRequired>
        <FormLabel htmlFor="landAddress" fontWeight={"normal"}>
          Physical Address of Land
        </FormLabel>
        <Input
          id="landAddress"
          type="text"
          value={formData.landAddress}
          onChange={(e) => {
            onChange({ ...formData, landAddress: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="city" fontWeight={"normal"}>
          City
        </FormLabel>
        <Input
          id="city"
          type="string"
          value={formData.city}
          onChange={(e) => {
            onChange({ ...formData, city: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="district" fontWeight={"normal"}>
          District
        </FormLabel>

        <Select
          id="district"
          name="district"
          autoComplete=""
          placeholder="Select option"
          value={formData.district}
          onChange={(e) => {
            onChange({ ...formData, district: e.target.value });
          }}
          size="sm"
          w={"full"}
          rounded="md"
          h={10}
        >
          {districtData.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};


export const Form3 = ({ formData, onChange }) => {


mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYWluYmFsdGkiLCJhIjoiY2xhNGE2ZWd0MHg4ZTNwbXpiN2Q3a2ZsYiJ9.2J8OizwcJnm4U0Idhsu5IA";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(65);
  const [lat, setLat] = useState(30);
  const [zoom, setZoom] = useState(4);
  const [searchText, setSearchText] = useState("");
  const [polygon, setPolygon] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
      height: "calc(5vh - 130px)",
    //   width: "70%",
    });
    handleDraw();
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const handleSearch = () => {
    if (!searchText) return;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchText
      )}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        const [lng, lat] = data.features[0].center;
        map.current.setCenter([lng, lat]);
        map.current.setZoom(14);
      });
  };

  const handleDraw = () => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,

      },
    });
    map.current.addControl(draw);

    map.current.on("draw.create", (e) => {
      setPolygon(e.features[0].geometry.coordinates[0]);
      onChange({ ...formData, coord: e.features[0].geometry.coordinates[0] });
      
    });

    map.current.on("draw.delete", () => {
      setPolygon([]);
      onChange({ ...formData, coord:[] });

    });
  };
  

const router=useRouter()
  useEffect(() => {
    if (router.pathname === "/User/RegisterLand") {
        console.log(router.pathname)
      document.body.style.zoom = 1;
    } else {
      document.body.style.zoom = 0.8;
    }

    return () => {
      document.body.style.zoom = 0.8;
    };
  }, [router.pathname]);



  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Land
      </Heading>
      <Box width="100%" className="formPage" onSubmit={handleSearch}>
        <Flex className="search-bar" mb={4}>
          <Input
            label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton onClick={handleSearch} color={"teal"}>
            <SearchIcon />
          </IconButton>
        </Flex>
        <Flex
          justifyContent={"space-evenly"}
          backgroundColor={"rgba(35, 55, 75, 0.9)"}
          color="white"
          mb={3}
          p={2}
        >
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </Flex>
        <Box ref={mapContainer} width={"100"} height={"450"} />
        {/* <Button variant={'outline'} onClick={handleDraw}>Save Land Coordinates</Button> */}
      </Box>
    </>
  );
}
