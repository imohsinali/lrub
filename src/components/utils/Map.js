import { Flex, Box } from "@chakra-ui/react";

import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
const Map = ({ lng, lat, zoom, coordArray }) => {
  console.log(lng, lat, zoom, "cooor", coordArray);
  mapboxgl.accessToken =
    "pk.eyJ1IjoibW9oYWluYmFsdGkiLCJhIjoiY2xhNGE2ZWd0MHg4ZTNwbXpiN2Q3a2ZsYiJ9.2J8OizwcJnm4U0Idhsu5IA";

  const mapContainer = useRef(null);
  const map = useRef(null);
useEffect(() => {
  if (!map.current) {
    // initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [65, 28],
      zoom: 5,
      height: "calc(5vh - 130px)",
    });
  }  
  
}, []);


useEffect(() => {
  



    map.current.flyTo({
center: [lng, lat],
zoom: zoom,
speed: 1,
curve: 1,
easing(t) {
return t;
}});
    
    if (coordArray) {
      handleDraw(coordArray);
    }

    

  
}, [lng, lat, zoom, coordArray]);





  const handleDraw = (coordArray) => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
    });
    map.current.addControl(draw);

    draw.add({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [coordArray],
      },
    });
  };

  return (
    <>
      <Box width="100%" className="formPage">
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
};

export default Map;
