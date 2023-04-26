import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Web3Context } from "../context/web3Model";

export default function LandInspectorModal({ isOpen, setOpen, landInspector }) {
  const { contract } = useContext(Web3Context);
  const toast = useToast();

  const removeLandInpsector = async (address) => {
    try {
      await contract.removeLandInspector(address);
      toast({
        title: "remove Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} >
      <ModalOverlay w={"110%"} h={"110%"} />
      <ModalContent  ml={{ base: "0", sm: "40%" }}>
        <ModalHeader>Land Inspector Details</ModalHeader>
        <ModalBody>
          <p>Wallet Address: {landInspector?.address}</p>
          <p>Name: {landInspector?.name.split("|").join(" ")}</p>
          <p>CNIC: {landInspector?.cnic}</p>
          <p>Date of Birth: {landInspector?.dob}</p>
          <p>City: {landInspector?.city}</p>
          <p>District: {landInspector?.district}</p>
          <p>Phone:{landInspector?.phone}</p>
          <p>Email:{landInspector?.email}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            backgroundColor={"red"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            onClick={() => setOpen(false)}
            mr={3}
          >
            Cancel
          </Button>
          <Button
            backgroundColor={"green"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            mr={3}
            colorScheme="blue"
            onClick={() => removeLandInpsector(landInspector?.address)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
