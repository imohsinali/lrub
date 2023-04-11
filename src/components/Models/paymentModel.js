import { ArrowDownIcon } from "@chakra-ui/icons";
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
  Divider,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/web3Model";

export default function PaymentModel({ isOpen, setOpen }) {
  const { contract, landId, pkr } = useContext(Web3Context);
  const [paymentland, setPaymentLand] = useState();

  useEffect(() => {
    const paymentland = JSON.parse(localStorage?.getItem("Paymentland"));
    setPaymentLand(paymentland);
  }, []);
  console.log("pawe", paymentland);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //   const landdata = land?.filter((la) => la.id == landId);

  const MakeAPayment = async (address, req, value) => {
    console.log(
      "pau",
      address,
      req,
      ethers.utils.parseEther(Math.round(value).toString())
    );

    try {
      setLoading(true);
     let a=0
      // function (address payable _receiver, uint _requestId) public payable {
      await contract.makePayment(address, req, {
        value: ethers.utils.parseEther(Math.round(value/10**18).toString()),
      });
      toast({
        title: "Verified Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setOpen(false);
      setLoading(false);
    } catch (error) {
        console.log(error);

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
        <ModalHeader textAlign={"center"} fontSize={"1.5rem"}>
          Confrim Payment
        </ModalHeader>
        <ModalBody textAlign={"center"}>
          <Text>{paymentland?.buyerId}</Text>
          <ArrowDownIcon />
          <Text>{paymentland?.sellerId}</Text>
          <Divider />
          <Text fontSize={"1.4rem"}>Amount in PKR</Text>
          <Text>{paymentland?.landPrice}</Text>

          <Text fontSize={"1.4rem"}>Amount in MATIC</Text>
        </ModalBody>
        <Divider />
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
            onClick={() =>
              MakeAPayment(
                paymentland?.sellerId,
                paymentland?.reqId,
                paymentland?.landPrice
              )
            }
            isLoading={loading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
