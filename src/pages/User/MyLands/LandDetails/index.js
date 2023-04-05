import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { timeStamp } from "@/components/utils/timeStamp";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const Myland = () => {

    const router =useRouter()
    const [land,setLand]=useState()
    useEffect(() => {
    const land = JSON.parse(localStorage.getItem("landdetails"));
    setLand(land)
        
    }, []);
console.log(land,'aslk')


  return (
    <SidebarWithHeader>
      <Flex mt={20}>
        <Button variant={"link"} onClick={() => router.push("/User/MyLands")}>
          Back to MyLands
        </Button>
      </Flex>

      <Flex
        borderWidth="2px"
        borderColor="blue"
        p={2}
        width="100%"
        mt={7}
        wrap="wrap"
      >
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${land?.landpic}`}
          minW={{ base: "100%", md: "40%", lg: "30%" }}
          minH={{ base: "200px", md: "300px" }}
          maxW={{ base: "100%", md: "50%", lg: "40%" }}
          maxH={{ base: "300px", md: "400px", lg: "500px" }}
          mr={2}
          mb={2}
        />

        <Flex flexDirection="column" flex={1}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Property Details
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Id:{" "}
            </Text>
            {land?.id}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Property ID:{" "}
            </Text>
            {land?.propertyPID}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Area:{" "}
            </Text>
            {land?.landArea} Sqft
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Price:{" "}
            </Text>
            {land?.landPrice}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              District:{" "}
            </Text>
            {land?.district}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Physical Address:{" "}
            </Text>
            {land?.landAddress}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Owner Address:{" "}
            </Text>
            {land?.ownerAddress &&
              `${land.ownerAddress.slice(0, 10)}\n${land.ownerAddress.slice(
                10
              )}`}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Proxy Owner Address:{" "}
            </Text>
            {land?.proxyownerAddress &&
              `${land.proxyownerAddress.slice(
                0,
                10
              )}\n${land.proxyownerAddress.slice(10)}`}
          </Text>

          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Registration Date:{" "}
            </Text>
            {timeStamp(land?.registerdate)}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Verfication Date:{" "}
            </Text>
            {land?.isLandVerified
              ? timeStamp(land?.timestamp)
              : "Not verified yet"}
          </Text>

          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Verified By:{" "}
            </Text>
            {land?.verfiedby &&
              `${land.verfiedby.slice(0, 10)}\n${land.verfiedby.slice(10)}`}
          </Text>
          <Text mb={2} variant="link">
            <Text as="span" fontWeight="bold">
              Document:{" "}
            </Text>
            <Button variant={'link'}>
              {land?.isUserVerified ? (
                <Link
                  href={`https://gateway.pinata.cloud/ipfs/${land?.document}`}
                  target="_blank"
                >
                  View Documnt
                </Link>
              ) : (
                "You are not Verified"
              )}
            </Button>
          </Text>
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Myland;
