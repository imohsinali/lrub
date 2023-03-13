import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

function AirbnbCard() {
  const property = {
    imageUrl: "/images/About-Us-Banner.jpg",
    imageAlt: "Rear view of modern home with pool",
    
  };

  return (          

    <Flex justifyContent={'center'} alignItems={'center'}  
    width={{base:"100%"}}
    mt={{
      base: "180",sm:"125"
    }}
    
    >
    <Box  borderWidth="1px" borderRadius="lg" overflow="hidden"  height={'50%'} >
      <Image src={property.imageUrl} alt={property.imageAlt} width={1700} height={100}  />

        

        
    </Box>
    
</Flex>
  );
}

 export default AirbnbCard
