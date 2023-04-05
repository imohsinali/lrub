import LandCard from "@/components/Cards/LandCard";
import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
const Myland = () => {
  const { land, setLandId } = useContext(Web3Context);
  console.log("user", land);

  return (
    <SidebarWithHeader>
      <Flex mt={20}>
        <LandCard data={land} />
      </Flex>
      <Flex mt={20} backgroundColor={"red"}></Flex>
    </SidebarWithHeader>
  );
};

export default Myland;
