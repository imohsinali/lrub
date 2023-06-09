import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Flex,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Web3Context } from "../context/web3Model";
import shortenEthereumAddress from "../utils/shortenAddress";
import { timeStamp } from "../utils/timeStamp";

export default function VerifyUserModel({ isOpen, setOpen, user }) {
  const { contract, userAddress } = useContext(Web3Context);
  const userdata = user?.filter((u) => u.address == userAddress);
  console.log("moas", userdata[0], userAddress);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  let registerdate = new Date(userdata[0]?.registerdate * 1000); // convert seconds to milliseconds
  const date = new Date(registerdate.toUTCString());

  registerdate = date.toUTCString();
  const options = { hour12: true };
  registerdate = date.toLocaleString("GMT", options);

  const verifyUserA = async (address) => {
    console.log("address", address);
    try {
      setLoading(true);
      const verified = await contract.verifyUserAccepted(address);
      await verified.wait();

      toast({
        title: "Verified Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
      setLoading(false);
    }
  };


  const verifyUserR = async (address) => {
    console.log("address", address);
    try {
      setLoading(true);
      const verified = await contract.verifyUserRejected(address);
      await verified.wait();

      toast({
        title: "reject Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
      setLoading(false);
    }
  };
  console.log("iusrer", user[0]);

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay w={"110%"} h={"110%"} />
      <ModalContent  ml={{ base: "", sm: "40%" }}>
        <ModalHeader>
          <Flex alignItems={"center"}>
            <Avatar
              alignSelf={"flex-start"}
              src={`https://gateway.pinata.cloud/ipfs/${userdata[0]?.profilepic}`}
            />
            <Text ml={20}>User Details</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <p>Wallet Address: {shortenEthereumAddress(userdata[0]?.address)}</p>
          <p>Name: {userdata[0]?.name.split("|").join(" ")}</p>
          <p>CNIC: {userdata[0]?.cnic}</p>
          <p>Date of Birth: {userdata[0]?.dob}</p>
          <p>City: {userdata[0]?.city}</p>
          <p>
            Document:
            {
              <Button variant={"link"}>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${userdata[0]?.document}`}
                  target="_blank"
                >
                  View the details
                </a>
              </Button>
            }
          </p>
          <p>Email:{userdata[0]?.email}</p>
          <p>Register Date: {registerdate}</p>
          {userdata[0]?.isUserVerified && (
            <>
              <p>verfiedby: {shortenEthereumAddress(userdata[0]?.verfiedby)}</p>

              <p>
                Verified Date:
                {timeStamp(userdata[0]?.verifydate)}
              </p>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor={"blue.500"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            onClick={() => setOpen(false)}
            mr={3}
          >
            Cancel
          </Button>

          <Button
            backgroundColor={"red"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            mr={3}
            colorScheme="blue"
            onClick={() => verifyUserR(userAddress)}
            isDisabled={userdata[0]?.isUserVerified}
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
            onClick={() => verifyUserA(userAddress)}
            isDisabled={userdata[0]?.isUserVerified}
            isLoading={loading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
