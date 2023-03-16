import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Context } from '../context/context'
import BannerCarousel from '../Home/Banner'
import { Box, Flex, Text } from '@chakra-ui/react';
import HeroSection from '../Home/HeroSection';
import CardGrid from '../Home/Grid';
import Join from '../Home/Join';
import Banner1 from '../Home/Banner1';
import Footer from '../Home/Footer';


export default function Layout({children}) {
  console.log(Context)
  return (
    <Flex direction={"column"} justifyContent="center">
      <Navbar />
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <BannerCarousel />
        <Flex justifyContent={"center"} direction="column">
          <Text fontSize={"4rem"} align={"center"}>
            Key Fetures
          </Text>
          <CardGrid />
        </Flex>
        <Flex
          justifyContent={"center"}
          direction="column"
          backgroundColor={"white"}
          zIndex={2}
        >
          <Text fontSize={"4rem"} align={"center"}>
            How To Join.?
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
          <Text fontSize={{base:"2rem", sm: "4rem"}} align={"center"} mb={5} >
            Development Stacks
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
        <Footer />
        {/* Rest of your home page content */}
      </Flex>
      <main>{children}</main>
    </Flex>
  );
}