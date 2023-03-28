import React, { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Form1, Form2 } from "@/components/Form/AddInspector";
import { useRouter } from "next/router";
import { Web3Context } from "@/components/context/web3Model";
import { ethers } from "ethers";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
const UserRegistration = () => {
  const { contract, account } = useContext(Web3Context);

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lname: "",
    fname: "",
    waddress: "",
    cnic: "",
    dob: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    desgination: "",
  });
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const { fname, lname, dob, cnic, city, desgination, email,district,phone,waddress } =
        formData;

      const dobDate = new Date(dob);

      const cnicRegex = /^\d{13}$/; // CNIC regex
      const nameRegex = /^[a-zA-Z]+$/; // Name regex
      if (!nameRegex.test(fname)) {
        alert("Name should only contain letters");
        return;
      }

      if (fname.length <= 2) {
        alert("Name should be more than 3 characters");
        return;
      }
      if (lname) {
        if (!nameRegex.test(lname)) {
          alert("Name should only contain letters");
          return;
        }

        if (lname.length <= 2) {
          alert("Name should be more than 3 characters");
          return;
        }
      }

      if (
        isNaN(dobDate.getTime()) ||
        dobDate.getDate() != dobDate.getDate() ||
        dobDate.getMonth() != dobDate.getMonth() ||
        dobDate.getFullYear() < 1900
      ) {
        alert("Please enter a valid date of birth (dd/mm/yyyy)");
        return;
      }

      // Check that the date of birth is not in the future
      if (dobDate.getTime() > Date.now()) {
        alert("Date of birth should not be in the future");
        return;
      }

      if (!cnicRegex.test(cnic)) {
        alert("CNIC should be a 13-digit number");
        return;
      }

      if (!nameRegex.test(city)) {
        alert("City should only contain letters");
        return;
      }

      if (city.length <= 2) {
        alert("City should be more than 3 characters");
        return;
      }
      setLoading(true);
      const name = fname + "|" + lname;
          // function addLandInspector(address _addr, bytes32 _name, bytes32 _dob, uint _cinc, bytes32 _designation, bytes32 _city,bytes32 _district ,bytes32  _email,uint _phone) public returns (bool) {

     await contract.addLandInspector(
       waddress,
       stringToBytes32(name),
       stringToBytes32(dob),
       Number(cnic),
       stringToBytes32(desgination),
       stringToBytes32(city),
       stringToBytes32(district),
       stringToBytes32(email),
       Number(phone),
       { gasLimit: 1000000 }
     );


      setLoading(false);
      toast({
        title: "Registered Successfully",
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
  };

  function stringToBytes32(str) {
    return ethers.utils.formatBytes32String(str);
  }

  const router = useRouter();
  return (
    <SidebarWithHeader bg={"red"}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
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
        {step === 1 ? (
          <Form1 formData={formData} onChange={setFormData} />
        ) : step === 2 ? (
          <Form2 formData={formData} onChange={setFormData} />
        ) : (
          ""
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 50);
                }}
                colorScheme="teal"
                variant="outline"
                w="7rem"
                isDisabled={step == 1 ? true : false}
                mr="5%"
              >
                Back
              </Button>

              <Button
                w="7rem"
                isDisabled={step === 2}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 2) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 50);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            <Button
              isLoading={loading}
              type="submit"
              colorScheme="teal"
              variant="outline"
              w="7rem"
              ml="5%"
              isDisabled={step < 2}
              _hover={{
                variant: "solid",
              }}
            >
              Submit
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>
    </SidebarWithHeader>
  );
};

export default UserRegistration;
