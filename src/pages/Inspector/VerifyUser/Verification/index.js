import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { Button, Container, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import { UserInfo } from "@/components/Cards/profileDetails";

const UserVerification = () => {
  const toast = useToast();

  const { contract } = useContext(Web3Context);
  const router = useRouter();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdetails"));
    setUser(user);
    setRole(user?.role);
  }, []);
   console.log('use',user)
  const verifyuserA = async (id) => {
    console.log("add",id)
    try {
      setLoading(true);
      const verfied = await contract.verifyUserAccepted(id);
      await verfied.wait();
      toast({
        title: "Verified Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      console.log(error)
    }
  };

  const verifyuserR = async (id) => {
    try {
      setLoading(true);
      const reject = await contract.verifyUserRejected(id);
      await reject.wait();
      toast({
        title: "Reject Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  return (
    <SidebarWithHeader>
      <Flex mt={20}>
        <Button
          variant={"link"}
          onClick={() => router.push(`/Inspector/${user?.link}`)}
        >
          Back to {user?.link}
        </Button>
      </Flex>

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
        <UserInfo user={user} role={"user"} />

        <Flex mt={4} gap={4} alignItems={'center'} justifyContent={'center'}>
          <Button
            backgroundColor={"red"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            mr={3}
            colorScheme="blue"
            onClick={() => verifyuserR(user?.address)}
            isDisabled={user?.isUserVerified}
            isLoading={loading}
          >
            Reject
          </Button>
          <Button
            backgroundColor={"green"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            mr={3}
            colorScheme="blue"
            onClick={() => verifyuserA(user?.address)}
            isDisabled={user?.isUserVerified}
            isLoading={loading}
          >
            Confirm
          </Button>
        </Flex>
      </Container>
    </SidebarWithHeader>
  );
};

export default UserVerification;
