import { UserInfo } from "@/components/Cards/profileDetails";
import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Container, Flex } from "@chakra-ui/react";
import { useContext } from "react";

const Profile = () => {
  const { currentUser } = useContext(Web3Context);

  return (
    <SidebarWithHeader>
      <Container
        mt={20}
        width={{
          base: "100%",
          md: 1000,
        }}
        justifyContent="center"
        alignItems={"center"}
        maxW={800}
        boxShadow={"lg"}
        p={10}
      >
        <UserInfo
          user={currentUser ? currentUser[0] : currentUser}
          role={"user"}
        />
      </Container>
    </SidebarWithHeader>
  );
};

export default Profile;
