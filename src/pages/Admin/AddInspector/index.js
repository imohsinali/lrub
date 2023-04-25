import { Web3Context } from "@/components/context/web3Model";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";
import { districtData } from "@/components/utils/districts";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

export default function ChangeAdmin() {
  const { contract } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleChnageAdmin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      setLoading(true);
      await contract.changeContractOwner(formData.get("address"), {
        gasLimit: 1000000,
      });
      toast({
        title: "Changed Susscesfully",
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
    <ProtectedRoute>
      <SidebarWithHeader>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="calc(100vh - 4rem)"
          bg={useColorModeValue("gray.50", "gray.800")}
        marginTop={{base:"5",sm:-25}}
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
              <InputGroup width={'full'}>
                <InputLeftAddon children="0x" />
                <Input
                width={'full'}
                  type="text"
                  placeholder="Enter wallet address"
                  name="address"
                />
              </InputGroup>
            </FormControl>

            <FormControl  isRequired flex={0.2}>
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
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}
