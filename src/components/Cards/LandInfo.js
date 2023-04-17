import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { timeStamp } from "../utils/timeStamp";

const LandInfo = ({ land,pkr,user }) => {
    console.log("ueererr",user)
  return (
    <Flex flexDirection="column" flex={1}>
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
        {Math.round(land?.landPrice * pkr)} Pkr
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
          `\n${land.ownerAddress.slice(0, 10)}\n${land.ownerAddress.slice(10)}`}
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
        {land?.isLandVerified ? timeStamp(land?.timestamp) : "Not verified yet"}
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

        <Button variant={"link"}>
          {land?.isUserVerified || user == "inspector" ? (
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
  );
};


export default LandInfo