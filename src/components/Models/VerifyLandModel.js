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
  Container,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import LandInfo from "../Cards/LandInfo";
import { Web3Context } from "../context/web3Model";

export default function VerifyLandModel({ isOpen, setOpen,land }) {
  const { contract, landId,pkr } = useContext(Web3Context);
  console.log('land', land)
  const [loading, setLoading] = useState(false);
  const toast = useToast();



  const landdata = land?.filter((la) =>la.id== landId);

  
  const verifyLand = async (id) => {
    try {
      setLoading(true);
      await contract.verifyLand(id);
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

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay w={"110%"} h={"110%"} />
      <ModalContent m={{ base: 10, sm: 10 }} ml={{ base: "", sm: "40%" }}>
        <ModalHeader>
          <Flex alignItems={"center"}>
            <Avatar
              alignSelf={"flex-start"}
              // src={`https://gateway.pinata.cloud/ipfs/${userdata[0]?.profilepic}`}
            />
            <Text ml={20}>
              LandDetail id:{landdata[0].id}{" "}
              {landdata[0].isLandVerified ? "veriifed" : "none"}{" "}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Container>
            <LandInfo land={landdata[0]} pkr={pkr} user={"inspector"} />
          </Container>
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
            backgroundColor={"green"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            mr={3}
            colorScheme="blue"
            onClick={() => verifyLand(landdata[0].id)}
            isDisabled={landdata[0]?.isLandVerified}
            isLoading={loading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
