import { Flex, Box, Text } from "@chakra-ui/react";
import styles from '../../styles/banner.module.css'
const logos = [
  { name: "Blockchain", image: "/images/blockchain.png" },
  { name: "Ethereum", image: "/images/banner2.jpg" },
  { name: "Hardhat", image: "/images/hard-hat.png" },
  { name: "React", image: "/images/react.png" },
  { name: "Polygon", image: "/images/ipfs.png" },
  { name: "IPFS", image: "/images/blockchain.png" },
  { name: "Comsats", image: "/images/smart-contracts.png" },
];

const Banner1 = () => {

  

  return (
    <>
      {logos.map((logo) => (
        <Flex
          direction={"column"}
          className={styles.logo}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          width={{ base: 300, md: 710, sm: 100, xl: 1000 }}
          key={logo.name}
        >
          <Box
            key={logo.name}
            mx={4}
            w={20}
            h={20}
            bg={`url(${logo.image}) no-repeat center center / contain`}
            className={` ${logo.name === "React" ? styles.react : ""}`}
            overflow={"hidden"}
          />

          <Text>{logo.name}</Text>
        </Flex>
      ))}
    </>
  );
};

export default Banner1;
