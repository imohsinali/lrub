import SellLand from "@/components/Cards/SellLand";
import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
const Myland = () => {

  return (
    <SidebarWithHeader>
      <Flex mt={20}>
        <SellLand />
      </Flex>
      <Flex mt={20} backgroundColor={"red"}></Flex>
    </SidebarWithHeader>
  );
};

export default Myland;
