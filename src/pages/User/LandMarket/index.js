import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import Card from "@/components/Home/HeroSection";
import JoinCard from "@/components/Home/JoinCard";
import { Flex } from "@chakra-ui/react";
import Join from '../../../components/Home/Join'
const Inpector = () => {
  return (
    <SidebarWithHeader>
      <Flex mt={20}>
        <Join />
      </Flex>
    </SidebarWithHeader>
  );
};

export default Inpector;
