import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Context } from '../context/context'
import BannerCarousel from '../Home/Banner'
import { Box, Flex, Text } from '@chakra-ui/react';
import HeroSection from '../Home/HeroSection';
import CardGrid from '../Home/Grid';
import Join from '../Home/Join';
import Banner1 from '../Home/Banner1';
import FooterPage from '../Home/FooterPage';
const images = [
  // "/images/googlelogo.png",
  // "/images/banner1.jpg",
  "/images/banner6.avif",
  "/images/banner5.avif",

  // "https://images.deepai.org/art-image/92f8d649137e4ed4b98804698dee4500/photovoltaic-homepage-a6deb5-thumb.jpg",
  "/images/About-Us-Banner.jpg",
];

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
        <BannerCarousel images={images} />
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
          backgroundColor={"gray.100"}
          pb={10}
          pt={10}
          mt={-10}
          zIndex={1}
          opacity={5}
          
        >
          <Text fontSize={"4rem"} align={"center"} mb={5}>
            Development Stacks
          </Text>
          <Flex
            justifyContent={"center"}
            direction="row"
            width={{ base: 400, md: 810, sm: 100, xl: 1700 }}
            overflow={"hidden"}
          >
            <Banner1 />
          </Flex>
        </Flex>
        <FooterPage/>
        {/* Rest of your home page content */}
      </Flex>
      {/* <main>{children}</main> */}
    </Flex>
  );
}