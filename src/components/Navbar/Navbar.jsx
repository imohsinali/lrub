import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import RightContent from "./RightContent/RightContent";

export default function Navbar() {
  return (
    <Flex
      bg={"rgb(68,88,106)"}
      height={"100px"}
      padding="6px 15px"
      alignItems={"center"}
      justifyContent="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
    >
      <Flex
        align={"center"}
        borderRadius={"50%"}
        width={20}
      >
        <div style={{ borderRadius: "50%", overflow: "hidden" }}>
          <Image src="/images/nlogo.jpg" width={70} height={70} alt="image" />
        </div>
      </Flex>

      <RightContent />
    </Flex>
  );
}
