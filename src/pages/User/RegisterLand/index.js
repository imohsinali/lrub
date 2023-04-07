import SidebarWithHeader from "@/components/Dashbord/Dashboard";

import React, { useContext, useEffect, useState } from "react";
import { Heading, useToast } from "@chakra-ui/react";
import { Form1, Form2, Form3 } from "@/components/Form/AddLand";
import { useRouter } from "next/router";
import { Web3Context } from "@/components/context/web3Model";
import fileHash from "@/components/utils/IPFS";
import { ethers } from "ethers";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
const AddLand = () => {
  const { contract, users, currentUser } = useContext(Web3Context);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    landArea: "",
    landPrice: "",
    landImage: "",
    landDocument: "",
    landPid: "",
    landAddress: "",
    city: "",
    district: "",
    coord: "",
    zoom:''
  });
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form', formData);
          const {
            landArea,
            landPrice,
            landImage,
            landDocument,
            landPid,
            landAddress,
            city,
            district,
            coord,
            zoom
          } = formData;

    try {


      const nameRegex = /^[a-zA-Z]+$/; // Name regex

      if (landAddress.length <= 10) {
        alert("Address should be more than 10 characters");
        return;
      }

      if (city.length <= 2) {
        alert("City should be more than 3 characters");
        return;
      }

      if (!coord) {
        alert("Please Save the Location on Map");
      }
      setLoading(true);
      const imgeHash = await fileHash(landImage);
      const docHash = await fileHash(landDocument);
      const temCoord = coord.map((point) => point.join(",")).join(";");
      const allLatiLongi = temCoord + "/" + zoom;

      // function addLand(uint _area, bytes32 _landAddress,bytes32 _district, uint _landPrice, string memory  _allLatiLongi, uint _propertyPID, string memory  _document, string memory  _landpic) public {

      const transaction = await contract.addLand(
        Number(landArea),
        stringToBytes32(landAddress),
        stringToBytes32(district),
        Number(landPrice),
        allLatiLongi,
        Number(landPid),
        docHash,

        imgeHash,
        { gasLimit: 1000000 }
      );

      await transaction.wait();
      setLoading(false);
      toast({
        title: "Registered Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);

      const temCoord = coord.map((point) => point.join(",")).join(";");
      const allLatiLongi = temCoord + "/" + zoom;
      console.log(allLatiLongi)

      toast({
        title: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // const router = useRouter();

  function stringToBytes32(str) {
    return ethers.utils.formatBytes32String(str);
  }

  return (
    <SidebarWithHeader>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={{ base: 700, xl: 600, sm: 800, md: 800 }}
        p={5}
        m="10px auto"
        mt={20}
        as="form"
        onSubmit={handleSubmit}
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Add Land
        </Heading>
        {step === 1 ? (
          <Form1 formData={formData} onChange={setFormData} />
        ) : step === 2 ? (
          <Form2 formData={formData} onChange={setFormData} />
        ) : (
          <Form3 formData={formData} onChange={setFormData} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="outline"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                isLoading={loading}
                type="submit"
                colorScheme="teal"
                variant="outline"
                w="6rem"
                ml="5%"
                isDisabled={step < 3 || !currentUser[0].isUserVerified}
                _hover={{
                  variant: "solid",
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </SidebarWithHeader>
  );
};

export default AddLand;
