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
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { Web3Context } from "../context/web3Model";

export default function BuyLandModel({ isOpen, setOpen, land }) {
  const { contract, landId, users, matic, pkr } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [inPkr, setPkr] = useState(true);
  const [inPkr1, setPkr1] = useState(true);
  const [data, setdata] = useState(0);

  const toast = useToast();

  const landdata = land?.filter((la) => la.id == landId);
  const seller = users?.filter(
    (user) => user.address == landdata[0].ownerAddress
  );
  const sendOffer = async (_landId, _bidPrice) => {
    const landPricematic = _bidPrice * matic;
    const integerPart = Math.floor(landPricematic * 10 ** 18).toString();

    const value = ethers.BigNumber.from(integerPart);

    try {
      setLoading(true);

      const offer = await contract.requestforBuyWithBid(Number(_landId), value);
      await offer.wait();

      toast({
        title: "Offered Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      setOpen(false);
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
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} >
      <ModalOverlay w={"110%"} h={"110%"} />
      <ModalContent m={{ base: 200, sm: 50 }} ml={{ base: "", sm: "40%" }} mt={{base:"200",sm:"40"}} overflow={"hidden"} >
        <ModalCloseButton />

        <ModalHeader mt={{ base: "4", sm: "2" }}>
          <Flex alignItems={"center"}>
            <Avatar
              alignSelf={"flex-start"}
              src={`https://gateway.pinata.cloud/ipfs/${seller[0]?.profilepic}`}
            />
            <Text ml={20}>land id:{landdata[0].id} </Text>
          </Flex>
          <Divider mt={2} />
        </ModalHeader>

        <ModalBody>
          <Button
            fontWeight={"semibold"}
            variant={"unstyled"}
            onClick={() => setPkr(!inPkr)}
          >
            Base Price{inPkr ? " PKR" : " Matic"}:
            {Math.round(landdata[0]?.landPrice * pkr)}
          </Button>
          <Flex mt={2} justifyContent="center" align={"center"}>
            <FormControl display={"flex"}>
              <FormLabel
                width={"40%"}
                htmlFor="offer-price"
                fontWeight={"semibold"}
              >
                Offer Price :
              </FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  id="price"
                  placeholder="Enter offer price"
                  borderRadius={"10px"}
                  value={data}
                  onChange={(e) => {
                    setdata(e.target.value);
                  }}
                />
                <InputRightAddon children="PKR" />
              </InputGroup>
            </FormControl>
          </Flex>
          <Button
            fontWeight={"semibold"}
            variant={"unstyled"}
            onClick={() => setPkr1(!inPkr1)}
          >
            Offered Price{inPkr1 ? " PKR" : " Matic"}:{data}
          </Button>
        </ModalBody>
        <Divider mt={2} />

        <ModalFooter>
          <Button
            backgroundColor={"blue.500"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            onClick={() => setOpen(false)}
            mr={3}
          >
            cancel
          </Button>
          <Button
            backgroundColor={"green"}
            borderRadius={15}
            p={{ base: 2, md: 5 }}
            fontSize={{ base: 10, md: 14 }}
            mr={3}
            colorScheme="blue"
            onClick={() => sendOffer(landdata[0]?.id, data)}
            // isDisabled={userdata[0]?.isUserVerified}
            isLoading={loading}
          >
            Send offer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
