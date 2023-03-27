import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const AnimatedImage = styled(Image)`
  animation: ${moveUpDown} 2s ease-in-out infinite;
`;

function AirbnbCard() {
  

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt={{ base: "180", sm: "125" }}
    >
      <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        height="50%"
      >
        <Image
          src={'/images/About-Us-Banner.jpg'}
          alt={'Image'}
          width={1500}
          height={100}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <Flex width={{base:200,md:400, xl:600}}>
            <AnimatedImage src={"/images/land2.png"} width={600} height={600} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default AirbnbCard;
