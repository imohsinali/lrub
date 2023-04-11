import React, { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Form1, Form2 } from "@/components/Form/UserRegistry";
import { useRouter } from "next/router";
import { Web3Context } from "@/components/context/web3Model";
import fileHash from "@/components/utils/IPFS";
import { ethers } from "ethers";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
const UserRegistration = () => {
  const { contract, account } = useContext(Web3Context);
   const router=useRouter()
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lname: "",
    fname: "",
    dob: "",
    email: "",
    phone:0,
    cnic: 0,
    city: "",
    district:'',
    profile: "",
    document: "",
  });
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { fname, lname, dob, cnic, city,district, document, profile, email,phone } =
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
      const imgeHash = await fileHash(profile);
      const docHash = await fileHash(document);
      const name = fname + "|" + lname;
      const transaction = await contract.registerUser(
        stringToBytes32(name),
        stringToBytes32(dob),
        stringToBytes32(city),
        stringToBytes32(district),
        Number(cnic),
        docHash,

        imgeHash,
        stringToBytes32(email),
        stringToBytes32(phone),

        { gasLimit: 1000000 }
      );

      await transaction.wait();
      router.push("/");
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

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
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
                  if (step == 1) {
                    router.push("/");
                  }
                  setStep(step - 1);
                  setProgress(progress - 50);
                }}
                colorScheme="teal"
                variant="outline"
                w={step == 1 ? "10rem" : "7rem"}
                mr="5%"
              >
                {step == 1 ? "Back to Homepage" : "Back"}
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
    </>
  );
};

export default UserRegistration;
