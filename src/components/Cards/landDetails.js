import { Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { timeStamp } from "../utils/timeStamp";
import LandInfo from "./LandInfo";

const LandDetails = ({ land, user,pkr }) => {
  return (
    <Flex
      borderWidth="0.5px"
      borderColor="blue"
      p={2}
      width="100%"
      mt={7}
      wrap="wrap"
      direction={user == "user" ? "row" : "column"}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Property Details
      </Text>
      {user == "user" ? (
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${land?.landpic}`}
          minW={{ base: "100%", md: "40%", lg: "30%" }}
          minH={{ base: "200px", md: "300px" }}
          maxW={{ base: "100%", md: "50%", lg: "40%" }}
          maxH={{ base: "300px", md: "400px", lg: "500px" }}
          mr={4}
          mt={7}
          mb={2}
        />
      ) : (
        <>
          <Image
            src={`https://gateway.pinata.cloud/ipfs/${land?.landpic}`}
            minW={{ base: "100%", md: "40%", lg: "100%" }}
            minH={{ base: "200px", md: "290px" }}
            maxW={{ base: "100%", md: "50%", lg: "40%" }}
            maxH={{ base: "300px", md: "300px", lg: "370px" }}
            mr={2}
            mb={2}
          />
          <Divider />
        </>
      )}
      <LandInfo land={land}/>

   
    </Flex>
  );
};

export default LandDetails;

