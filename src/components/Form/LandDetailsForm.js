import { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  Flex,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { Form3 } from "./AddLand";
import { Web3Context } from "../context/web3Model";
import fileHash from "../utils/IPFS";

export default function LandDetailsForm({ landid }) {
  const { contract, matic } = useContext(Web3Context);

  const [area, setArea] = useState("");
  const [numberOfPlots, setNumberOfPlots] = useState("");
  const [chnageOption, setOption] = useState({
    proxy: false,
    plotingB: false,
    priceB: false,
    picB: false,
    coordB: false,
  });
  console.log("asas", landid);
  const [loading, setLoading] = useState(false);
  const [address, setAdress] = useState("");
  const toast = useToast();

  const handleProxy = async (proxy) => {
    try {
      if (address && proxy) {
        setLoading(true);
        const proxyadd = await contract.AndandRemoveProxyOwner(
          landid,
          address,
          proxy
        );
        await proxyadd.wait();
        toast({
          title: "Add Susscesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
      }

      if (address && !proxy) {
        setLoading(true);
        const proxyadd = await contract.AndandRemoveProxyOwner(
          landid,
          address,
          proxy
        );
        await proxyadd.wait();
        toast({
          title: "remove Susscesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error, landid);

      toast({
        title: "Something went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handlePlotingSubmit = async (event) => {
    console.log("asd", area, landid, numberOfPlots);
    event.preventDefault();
    setLoading(true);

    try {
      const plotting = await contract.subplot(
        landid,
        Number(area),
        Number(numberOfPlots)
      );
      await plotting.wait();
      toast({
        title: "Plotting Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error, landid);

      toast({
        title: "Something went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const [image, setImage] = useState("");

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    console.log(image);
    setLoading(true);

    try {
      const imageHash = await fileHash(image);

      const chnageImage = await contract.changeDetails(
        landid,
        false,
        false,
        true,
        false,
        false,
        0,
        imageHash,
        ""
      );
      await chnageImage.wait();
      toast({
        title: "Image Changed Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error, landid);

      toast({
        title: "Something went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const [price, setPrice] = useState("");

  const handlePriceSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const landprice = Math.round(matic * price);
    try {
      const plotting = await contract.changeDetails(
        landid,
        false,
        true,
        false,
        false,
        false,
        Number(landprice),
        "",
        ""
      );
      await plotting.wait();
      toast({
        title: "Price Changed Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error, landid);

      toast({
        title: "Something went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const [formData, setFormData] = useState({
    coord: "",
    zoom: "",
  });

  const handleCoordSubmit = async () => {
    setLoading(true);

    const temCoord = formData.coord.map((point) => point.join(",")).join(";");
    const allLatiLongi = temCoord + "/" + formData.zoom;
    console.log(allLatiLongi);
    try {
      const plotting = await contract.changeDetails(
        landid,
        false,
        false,
        false,
        true,
        false,
        0,
        "",
        allLatiLongi
      );
      await plotting.wait();
      toast({
        title: "Coordinates Changed Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error, landid);

      toast({
        title: "Something went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Box margin="auto">
      <Heading
        textAlign={"center"}
        fontSize={{ base: "1rem", sm: "2rem" }}
        as="h5"
        mt={3}
        marginBottom="1rem"
      >
        Change Land Details of Land {landid}
      </Heading>

      <Flex
        justifyContent={"space-evenly"}
        direction={{ base: "column", sm: "row" }}
        gap={4}
      >
        <Button
          colorScheme="twitter"
          minW={100}
          p={2}
          leftIcon={
            <Image
              src={"/images/plotting.png"}
              bgColor={"green"}
              width={70}
              height={50}
              alt=""
            />
          }
          onClick={() =>
            setOption({
              proxy: true,
              plotingB: false,
              picB: false,
              coordB: false,
              priceB: false,
            })
          }
        >
          Proxy Owner
        </Button>
        <Button
          colorScheme="twitter"
          minW={100}
          p={2}
          leftIcon={
            <Image
              src={"/images/plotting.png"}
              bgColor={"green"}
              width={70}
              height={50}
              alt=""
            />
          }
          onClick={() =>
            setOption({
              plotingB: true,
              picB: false,
              coordB: false,
              priceB: false,
            })
          }
        >
          Ploting
        </Button>
        <Button
          colorScheme="twitter"
          p={2}
          leftIcon={
            <Image
              src={"/images/price.png"}
              bgColor={"green"}
              width={40}
              height={40}
              alt=""
            />
          }
          onClick={() =>
            setOption({
              plotingB: false,
              priceB: true,
              picB: false,
              coordB: false,
            })
          }
        >
          {" "}
          Price
        </Button>
        <Button
          colorScheme="twitter"
          p={2}
          leftIcon={
            <Image
              src={"/images/feed.png"}
              bgColor={"green"}
              width={40}
              height={40}
              allLatiLongi
              alt=""
            />
          }
          onClick={() =>
            setOption({
              plotingB: false,
              priceB: false,
              picB: true,
              coordB: false,
            })
          }
        >
          {" "}
          Picture
        </Button>

        <Button
          colorScheme="twitter"
          p={2}
          leftIcon={
            <Image
              src={"/images/measure.png"}
              bgColor={"green"}
              width={40}
              height={40}
              alt=""
            />
          }
          onClick={() =>
            setOption({
              plotingB: false,
              priceB: false,
              picB: false,
              coordB: true,
            })
          }
        >
          {" "}
          Dimensions
        </Button>
      </Flex>

      {chnageOption.proxy && (
        <Box>
          <Text
            fontSize={{ base: "1rem", sm: "1.5rem" }}
            marginBottom="0.2rem"
            mt={2}
          >
            Add ProxyOwner
          </Text>
          <Flex
            borderWidth="2px"
            borderColor="blue"
            alignItems={"center"}
            justifyContent="center"
          >
            <Box
              width={{ base: 700, xl: 600, sm: 800, md: 800 }}
              alignSelf="center"
              as="form"
            >
              <FormControl marginBottom="1rem" isRequired>
                <FormLabel htmlFor="address">Wallet Address:</FormLabel>
                <Input
                  id="address"
                  placeholder="Enter Wallet Address"
                  size={"lg"}
                  type="string"
                  value={address}
                  onChange={(event) => setAdress(event.target.value)}
                />
              </FormControl>
              <Flex mb={2} gap={2}>
                <Button
                  onClick={() => handleProxy(true)}
                  marginTop="0.1rem"
                  variant={"outline"}
                  isLoading={loading}
                >
                  Add Proxy
                </Button>

                <Button
                  onClick={() => handleProxy(false)}
                  marginTop="0.1rem"
                  variant={"outline"}
                  isLoading={loading}
                >
                  Remove Proxy
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
      {chnageOption.plotingB && (
        <Box>
          <Text
            fontSize={{ base: "1rem", sm: "1.5rem" }}
            marginBottom="0.2rem"
            mt={2}
          >
            Ploting the Land
          </Text>
          <Flex
            borderWidth="2px"
            borderColor="blue"
            alignItems={"center"}
            justifyContent="center"
          >
            <Box
              onSubmit={handlePlotingSubmit}
              width={{ base: 700, xl: 600, sm: 800, md: 800 }}
              alignSelf="center"
              as="form"
            >
              <FormControl marginBottom="1rem">
                <FormLabel htmlFor="area">Enter Area:</FormLabel>
                <Input
                  id="area"
                  placeholder="Enter area"
                  size={"lg"}
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                />
              </FormControl>
              <FormControl marginBottom="1rem">
                <FormLabel htmlFor="numberOfPlots">Number of Plots:</FormLabel>
                <Input
                  id="numberOfPlots"
                  placeholder="Enter number of plots"
                  size={"lg"}
                  value={numberOfPlots}
                  onChange={(event) => setNumberOfPlots(event.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                marginTop="0.1rem"
                variant={"outline"}
                isLoading={loading}
              >
                Save
              </Button>
            </Box>
          </Flex>
        </Box>
      )}

      {chnageOption.priceB && (
        <Box>
          <Text
            marginBottom="0.2rem"
            mt={2}
            fontSize={{ base: "1rem", sm: "1.5rem" }}
          >
            Change the Price of Land
          </Text>
          <Flex
            borderWidth="2px"
            borderColor="blue"
            alignItems={"center"}
            justifyContent="center"
          >
            <Box
              onSubmit={handlePriceSubmit}
              as="form"
              width={{ base: 700, xl: 600, sm: 800, md: 800 }}
              alignSelf="center"
            >
              <FormControl marginBottom="1rem">
                <Input
                  id="price"
                  placeholder="Enter price"
                  size="lg"
                  w="full"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </FormControl>

              <Button
                type="submit"
                marginTop="0.1rem"
                variant={"outline"}
                isLoading={loading}
              >
                Save
              </Button>
            </Box>
          </Flex>
        </Box>
      )}

      {chnageOption.picB && (
        <Box>
          <Text
            fontSize={{ base: "1rem", sm: "1.5rem" }}
            marginBottom="0.2rem"
            mt={2}
          >
            Change the Image of Land
          </Text>
          <Flex
            borderWidth="2px"
            borderColor="blue"
            alignItems={"center"}
            justifyContent="center"
          >
            <Box
              onSubmit={handleImageSubmit}
              width={{ base: 700, xl: 600, sm: 800, md: 800 }}
              alignSelf="center"
              as="form"
            >
              <FormControl marginTop="1rem">
                <Input
                  id="image"
                  size={"lg"}
                  type="file"
                  onChange={(event) => setImage(event.target.files[0])}
                />
              </FormControl>

              <Button
                type="submit"
                marginTop="0.1rem"
                variant={"outline"}
                isLoading={loading}
              >
                Save
              </Button>
            </Box>
          </Flex>
        </Box>
      )}

      {chnageOption.coordB && (
        <Box>
          <Text
            fontSize={{ base: "1rem", sm: "1.5rem" }}
            marginBottom="0.2rem"
            mt={2}
          >
            Change the Coordinate of Land
          </Text>
          <Flex
            borderWidth="2px"
            borderColor="blue"
            alignItems={"center"}
            justifyContent="center"
          >
            <Form3
              formData={formData}
              onChange={setFormData}
              mapzoom={chnageOption.coordB}
            />
          </Flex>
          <Button
            type="submit"
            marginTop="0.1rem"
            variant={"outline"}
            isLoading={loading}
            onClick={handleCoordSubmit}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}
