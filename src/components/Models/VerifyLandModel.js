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

export default function VerifyLandModel({ isOpen, setOpen,land }) {
  const { contract, landId } = useContext(Web3Context);
  console.log('land', land)
  const [loading, setLoading] = useState(false);
  const toast = useToast();



  const landdata = land?.filter((la) =>la.id== landId);
  console.log("moas", landdata[0],landId);

  // let verifydate = new Date(landdata[0]?.registerdate * 1000); // convert seconds to milliseconds
  // const date = new Date(verifydate.toUTCString());

  // verifydate = date.toUTCString();
  // const options = { hour12: true };
  // verifydate = date.toLocaleString("GMT", options);
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
      <ModalContent m={{ base: 200, sm: 100 }} ml={{ base: "", sm: "40%" }}>
        <ModalHeader>
          <Flex alignItems={"center"}>
            <Avatar
              alignSelf={"flex-start"}
              // src={`https://gateway.pinata.cloud/ipfs/${userdata[0]?.profilepic}`}
            />
            <Text ml={20}>
              LandDetail id:{landdata[0].id} {landdata[0].isLandVerified?"veriifed":'none' }{" "}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <p>
            Document:
            {
              <Button variant={"link"}>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${landdata[0]?.document}`}
                  target="_blank"
                >
                  View the details
                </a>
              </Button>
            }
          </p>
          <p>
            {land[0]?.isLandVerified ? "Verified Date" : "Regsitered Date"}:
            {/* {verifydate} */}
          </p>
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
            // isDisabled={userdata[0]?.isUserVerified}
            isLoading={loading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
