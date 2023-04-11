import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Flex,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { timeStamp } from "../utils/timeStamp";

const Profiledetail = ({ stream, user, title }) => {
    const router = useRouter();

  const videoRef = useRef(null);
  const [capturePic, setCapturePic] = useState(null);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    if (router.pathname !== "/Inspector/TransferOwnership/Transfer"){
      return () => {
        stopStream();
      };
    }
  }, [stream]);

  const handleCapture = () => {
    if (isCapturing) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef?.current.videoWidth;
      canvas.height = videoRef?.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef?.current, 0, 0);
      setCapturePic(canvas.toDataURL());
    }
  };

  const stopStream = () => {
    if (videoRef?.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };
          console.log('pah', router.pathname);

  useEffect(() => {
          console.log(router.pathname);

    if (router.pathname !== "/Inspector/TransferOwnership/Transfer") {
      console.log(router.pathname)
      stopStream();
    }
  }, [router.pathname]);

  return (
    <Flex
      borderWidth="2px"
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
          <Image src={"/images/verified.png"} width={20} height={15} alt={""} />
        </Flex>
      </Flex>
      <Container width={300} alignItems="center">
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
        <Flex justifyContent={"center"} alignItems="center">
          <Button justifyContent={"center"} onClick={handleCapture}>
            Take Picture
          </Button>
        </Flex>
      </Container>
      <Divider />
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
            `${user?.verfiedby.slice(0, 10)}\n${user?.verfiedby.slice(
              10
            )}`}{" "}
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
    </Flex>
  );
};

export default Profiledetail;
