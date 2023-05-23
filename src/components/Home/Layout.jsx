import React from "react";
import Navbar from "./Navbar";
import { Context } from "../context/context";
import BannerCarousel from "./Banner";
import { Box, Flex, Text } from "@chakra-ui/react";
import HeroSection from "./HeroSection";
import CardGrid from "./Grid";
import Join from "./Join";
import Banner1 from "./Banner1";
import Footer from "./Footer";

export default function Layout({ children }) {
  console.log(Context);
  return (
    <Flex direction={"column"} justifyContent="center">
      <Navbar />
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        ml={{ base: "5" }}
      >
        <BannerCarousel />
        <Flex justifyContent={"center"} direction="column">
          <Text
            fontSize={{ base: "2.4rem", sm: "4rem" }}
            fontWeight='bold'
            align={"center"}
            mt={{
              base: "2rem",
              sm: "6rem",
            }}
            mb={{
              base: "0rem",
              sm: "2rem",
            }}
          >
            Key  Features.
          </Text>
          <CardGrid />
        </Flex>
        <Flex
          justifyContent={"center"}
          direction="column"
          backgroundColor={"white"}
          zIndex={2}
        >
          <Text
            fontSize={{ base: "2.4rem", sm: "4rem" }}
            align={"center"}
            mt={{
              base: "2rem",
              sm: "6rem",
            }}
            mb={{
              base: "0rem",
              sm: "2rem",
            }}
            fontWeight='bold'

          >
            How To Join.
          </Text>
          <Join />
        </Flex>
        <Flex
          justifyContent={"center"}
          direction="column"
          // backgroundColor={"gray.100"}
          pb={10}
          pt={10}
          mt={-10}
          zIndex={1}
          opacity={5}
          color={{ base: "red", med: "green", sm: "yellow", xl: "blue" }}
          width={{ base: 400, sm: 100, md: 810, xl: "95%" }}
          overflow={"hidden"}
          
        >
          <Text
            fontSize={{ base: "2.4rem", sm: "4rem" }}
            align={"center"}
            mt={{
              base: "2rem",
              sm: "6rem",
            }}
            mb={{
              base: "0rem",
              sm: "2rem",
            }}
            fontWeight='bold'

          >
            Development Stacks.
          </Text>
          <Flex
            justifyContent={"center"}
            direction="row"
            // color={{ base: "red", med: "green", sm: "yellow", xl: "blue" }}
            //  width={{ base: 400, sm: 100, md: 810, xl: '100%' }}
            // overflow={"hidden"}
          >
            <Banner1 />
          </Flex>
        </Flex>
        <Flex width={{ base: "113%", sm: "100%" }} bg="gray.500"> 
          <Footer />
        </Flex>
        {/* Rest of your home page content */}
      </Flex>
      <main>{children}</main>
    </Flex>
  );
}
