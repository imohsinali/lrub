import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Web3Context } from "../context/web3Model";
import { timeStamp } from "../utils/timeStamp";

const Profiledetail = ({ setBytes, stream, user, title }) => {
  const router = useRouter();
  const videoRef = useRef(null);

  const { users } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [witness, setWitness] = useState();
  const [capturePic, setCapturePic] = useState(null);
  const [isCapturing, setIsCapturing] = useState(true);
  const toast = useToast();

  const handleWitness = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const witness = users?.filter(
        (user) => user.address == formData.get("address")
      );
      setWitness(witness[0]);
      setLoading(true);
      if (witness[0]) {
        if (title == "Witness info") {
          user(witness[0]);
        }
        toast({
          title: "Witness Found",
          status: "success",
          duration: 2000,
          isClosable: true,
          position:'top'
        });
      } else {
        toast({
          title: "Witness Not found",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleanupFunctions = [];

    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      cleanupFunctions.push(() => {
        stream.getTracks().forEach((track) => track.stop());
      });}
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    }
  }, [stream]);

  const handleCapture = () => {
    if (isCapturing) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef?.current.videoWidth;
      canvas.height = videoRef?.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef?.current, 0, 0);
      setCapturePic(canvas.toDataURL());
      setBytes(canvas.toDataURL("image/png").split(",")[1]);
    }
  };

  
  return (
    <Flex
      borderWidth="0.5px"
      borderColor="blue"
      p={2}
      mt={20}
      mr={3}
      flexDirection={"column"}
      width={"100%"}
    >
      <Flex flexDirection={"column"}>
        <Text fontSize={"1.4rem"} fontWeight="semibold">
          {title}
        </Text>
        <Flex>
          <Text color={"green"} mr={1}>
            {user?.isUserVerified ? "Verified" : ""}
          </Text>
          {user?.isUserVerified && (
            <Image
              src={"/images/verified.png"}
              width={22}
              height={5}
              alt={""}
            />
          )}
        </Flex>
      </Flex>
      <Container mt={6} width={300} alignItems="center">
        <Flex
          borderWidth="2px"
          borderColor="gray"
          width={{ base: "250", sm: "300" }}
          height={250}
        >
          {capturePic && (
            <img src={capturePic} alt="Capture" style={{ maxWidth: "100%" }} />
          )}
          <video
            ref={videoRef}
            style={{
              display: isCapturing && !capturePic ? "block" : "none",
              maxWidth: "100%",
            }}
          ></video>
        </Flex>
        <Flex justifyContent={"center"} alignItems="center" mb={14}>
          <Button justifyContent={"center"} onClick={handleCapture} mt={2}>
            Take Picture
          </Button>
        </Flex>
      </Container>
      <Divider />
      {title == "Witness info" ? (
        <Flex direction={"column"}>
          <Flex
            rounded={"lg"}
            justifyContent="center"
            alignItems={"center"}
            p={10}
            pl={0}
            gap={4}
            width={{ base: "100%" }}
            as="form"
            onSubmit={handleWitness}
            direction="row"
          >
            <FormControl id="address" isRequired>
              <FormLabel>Wallet Address</FormLabel>
              <InputGroup size={"lg"}>
                <InputLeftAddon children="0x" />
                <Input
                  type="text"
                  size={"lg"}
                  placeholder="Enter wallet address"
                  name="address"
                />
              </InputGroup>
            </FormControl>

            <Button
              bg={"blue.400"}
              colorScheme="blue"
              _hover={{ bg: "blue.500" }}
              mt={8}
              w={{ base: "25%", sm: "50%", md: "100px" }}
              mx="auto"
              fontSize={{ base: "0.7rem", md: "1rem" }}
              p={0}
              type="submit"
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>

          <Flex>{witness && <UserInfo user={witness} />}</Flex>
        </Flex>
      ) : (
        <UserInfo user={user} />
      )}
    </Flex>
  );
};

export default Profiledetail;

const UserInfo = ({ user }) => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Wallet Address:{" "}
        </Text>
        {user?.address &&
          `${user?.address.slice(0, 10)}\n${user?.address.slice(10)}`}{" "}
      </Text>

      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Name:{" "}
        </Text>
        {user?.name?.split("|").join(" ")}
      </Text>

      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          ID Card No:{" "}
        </Text>
        {user?.cnic}
      </Text>

      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          District:{" "}
        </Text>
        {user?.district}
      </Text>

      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Registration Date:{" "}
        </Text>
        {timeStamp(user?.registerdate)}
      </Text>
      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Verfication Date:{" "}
        </Text>
        {timeStamp(user?.verifydate)}
      </Text>

      <Text mb={2}>
        <Text as="span" fontWeight="bold">
          Verified By:{" "}
        </Text>
        {user?.verfiedby &&
          `${user?.verfiedby.slice(0, 10)}\n${user?.verfiedby.slice(10)}`}{" "}
      </Text>
      <Text mb={2} variant="link">
        <Text as="span" fontWeight="bold">
          Document:{" "}
        </Text>

        <Button variant={"link"}>
          <Link
            href={`https://gateway.pinata.cloud/ipfs/${user?.document}`}
            target="_blank"
          >
            View Documnt
          </Link>
        </Button>
      </Text>
    </Flex>
  );
};
