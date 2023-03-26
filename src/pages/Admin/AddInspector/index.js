import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";
import { ethers } from "ethers";
import { Web3Context } from "@/components/context/web3Model";
function AddLandInspector() {
  const { contract} = useContext(Web3Context);
  const [loading ,setLoading]=useState(false)

  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from submitting and refreshing the page
    const formData = new FormData(event.target);
    console.log(formData);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const walletAddress = formData.get("wallet");
    const dob = formData.get("dob");
    const cnic = Number(formData.get("cnic"));
    const city = formData.get("city");
    const desg = formData.get("desg");
    const name = firstName + " " + lastName;
    if (firstName && walletAddress && dob && cnic && city && desg) {
      try {
        console.log({
          firstName,
          lastName,
          walletAddress,
          dob,
          cnic,
          city,
          desg,
          name,
        });
        setLoading(true);

        const transaction = await contract.addLandInspector(
          walletAddress,
          stringToBytes32(name),
          stringToBytes32(dob),
          cnic,
          stringToBytes32(desg),
          stringToBytes32(city),
          { gasLimit: 1000000 }
        );
        console.log("maos");
        await transaction.wait();
        console.log("maos 2");
        setLoading(false)
        toast({
          title: "LandInspector Added",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        setLoading(false);

        toast({
          title: "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }

    // do something with the form data, such as sending it to a server or updating state
  };
  function stringToBytes32(str) {
    return ethers.utils.formatBytes32String(str);
  }

  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          marginTop={10}
        >
          <Stack spacing={4} mx={"auto"} maxW={"xl"} py={6} px={2}>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"} textAlign={"center"}>
                Add Land Inspector
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={6}
              as="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" name="firstName" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" name="lastName" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="wallet" isRequired>
                  <FormLabel>wallet address</FormLabel>
                  <Input type="string" name="wallet" />
                </FormControl>
                <FormControl id="dob" isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" name="dob" />
                </FormControl>
                <FormControl id="cnic" isRequired>
                  <FormLabel>Cnic</FormLabel>
                  <Input type="number" name="cnic" />
                </FormControl>
                <FormControl id="city" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input type="text" name="city" />
                </FormControl>
                <FormControl id="desg" isRequired>
                  <FormLabel>Designation</FormLabel>
                  <Input type="text" name="desg" />
                </FormControl>

                <Stack spacing={4}>
                  <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Add Inspector
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}

export default AddLandInspector;

// address addr;
//     bytes32 name;
//     bytes32 dob;
//     uint cnic;
//     bytes32 city;
//     bytes32 designation;
