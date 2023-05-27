import { UserInfo } from "@/components/Cards/profileDetails";
import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";
import { districtData } from "@/components/utils/districts";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";

import { useContext, useState } from "react";
export default function ChangeAdmin() {
  const { contract, users,currentUser } = useContext(Web3Context);

  const [loading, setLoading] = useState(false);
  const [inspector,setInspector]=useState()
  const [found,setFound]=useState(false)
  
  const toast = useToast();

  const handleChnageAdmin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const inspector = users?.filter(
        (user) => user.address == formData.get("address")
      );
      setInspector(inspector)
      if (inspector) {
        toast({
          title: "User Found",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setFound(true)
        setLoading(true);
        
      const add=  await contract.addLandInspector(
          formData.get("address"),
          ethers.utils.formatBytes32String( formData.get("district"))
        );
        await add.wait()
        toast({
          title: "Add Susscesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error)
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="calc(100vh - 4rem)"
          bg={useColorModeValue("gray.50", "gray.800")}
          marginTop={{ base: "5", sm: -25 }}
        >
          <Heading mb={8}>Add Land Inspector</Heading>
          <Flex
            display={{ base: "block", md: "flex" }}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            justifyContent="center"
            alignItems={"center"}
            p={10}
            gap={1}
            width={{ base: "100%", md: "800px" }}
            as="form"
            onSubmit={handleChnageAdmin}
          >
            <FormControl id="address" isRequired flex={0.7}>
              <FormLabel>Wallet Address</FormLabel>
              <InputGroup width={"full"}>
                <InputLeftAddon children="0x" />
                <Input
                  width={"full"}
                  type="text"
                  placeholder="Enter wallet address"
                  name="address"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired flex={0.2} id="district">
              <FormLabel htmlFor="district" fontWeight={"normal"}>
                District
              </FormLabel>

              <Select
                id="district"
                name="district"
                autoComplete=""
                placeholder="Select option"
                // value={formData.district}
                // onChange={(e) => {
                //   onChange({ ...formData, district: e.target.value });
                // }}
                size="sm"
                w={"full"}
                rounded="md"
                h={10}
              >
                {districtData.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button
              flex={0.1}
              bg={"blue.400"}
              colorScheme="blue"
              _hover={{ bg: "blue.500" }}
              mt={8}
              w={{ base: "80%", sm: "50%", md: "100px" }}
              mx="auto"
              p={0}
              type="submit"
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
        {found&
        <Container mt={-20} width={{
        base:"100%",md:1000
      }} justifyContent="center" alignItems={"center"} maxW={800} boxShadow={'lg'} p={10}>
        <Text>User Information</Text>

        <UserInfo user={inspector ? inspector[0] : inspector} role={"user"} />
      </Container>}
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}
