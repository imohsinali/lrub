import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import * as React from "react";

import { useState, useRef, useContext } from "react";
import { useEffect } from "react";
import Profiledetail from "@/components/Cards/profileDetails";
import { Button, Container, Flex, Text, useToast } from "@chakra-ui/react";
import { Web3Context } from "@/components/context/web3Model";
import LandDetails from "@/components/Cards/landDetails";
import { useRouter } from "next/router";
import MakePdf from "@/components/utils/pdfDocument";
import pdfHash from "@/components/utils/pdfHash";
import Link from "next/link";
import getCameraStreams from "@/components/utils/cameraStream";

const TableWithPagination = () => {
  const { contract } = useContext(Web3Context);
  const [camera1, setCamera1] = useState(null);
  const [camera2, setCamera2] = useState(null);
  const [camera3, setCamera3] = useState(null);
  const [landdata, setlanddata] = useState();
  const [reqId, setReqId] = useState();
  const [seller, setseller] = useState();
  const [buyer, setbuyer] = useState();
  const [witness, setWitnessAdress] = useState();
  const [imgbSeller, setByteSeller] = useState([]);
  const [imgbBuyer, setByteBuyer] = useState([]);
  const [imgbWitness, setByteWitness] = useState([]);
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const { users, land, account } = useContext(Web3Context);
  const toast = useToast();

  useEffect(() => {
    const landdata = JSON.parse(localStorage?.getItem("Transfer"));
    const landtotransfer = land?.filter((la) => la.id == landdata?.id);
    const seller = users?.filter((user) => user.address == landdata.seller);
    const buyer = users?.filter((user) => user.address == landdata.buyer);
    if (seller && buyer && landtotransfer) {
      setseller(...seller);
      setbuyer(...buyer);
      setlanddata(...landtotransfer);
      setReqId(landdata.reqId);
    }
  }, [users, land]);

  useEffect(() => {
    getCameraStreams(setCamera1, setCamera2, setCamera3);
  }, [!imgbBuyer && !imgbSeller && !imgbWitness]);

  const handleTransfer = async (id) => {
    setCamera3(null);
    setCamera2(null);
    setCamera1(null);
    try {
      setLoading(true);

      const pp = await MakePdf(
        imgbSeller,
        imgbBuyer,
        imgbWitness,
        witness,
        seller,
        buyer,
        account,
        landdata
      );

      const url1 = await pdfHash(pp);
      setDoc(url1);
      console.log("id", witness?.address, id, url1);

      const trasferd = await contract.transferOwnership(
        id,
        url1,
        witness?.address
      );
      await trasferd.wait();

      setLoading(false);
      toast({
        title: "Transferd Susscesfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  return (
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      <Flex
        justifyContent={"space-between"}
        width="100%"
        wrap={{ base: "wrap", sm: "nowrap" }}
      >
        {seller && (
          <Profiledetail
            setBytes={setByteSeller}
            stream={camera1}
            user={seller}
            title={"Seller info"}
          />
        )}
        {buyer && (
          <Profiledetail
            setBytes={setByteBuyer}
            stream={camera2}
            user={buyer}
            title={"Buyer info"}
          />
        )}
      </Flex>

      <Flex
        justifyContent={"space-between"}
        width="100%"
        wrap={{ base: "wrap", sm: "nowrap" }}
      >
        {
          <Profiledetail
            setBytes={setByteWitness}
            stream={camera3}
            title={"Witness info"}
            user={setWitnessAdress}
          />
        }

        <Flex mt={12} width={"100%"}>
          {landdata && <LandDetails land={landdata} user={"inspector"} />}
        </Flex>
      </Flex>
      <Flex alignItems={"center"} justifyContent="center" mt={5}>
        <Flex direction={"column"}>
          {doc && (
            <Button>
              <Link
                href={`https://gateway.pinata.cloud/ipfs/${doc}`}
                target="_blank"
              >
                View Documnt
              </Link>
            </Button>
          )}
          <Button
            color={"green"}
            padding={5}
            fontSize={"1.2rem"}
            onClick={() => handleTransfer(reqId)}
            isLoading={loading}
          >
            Transfer
          </Button>
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
