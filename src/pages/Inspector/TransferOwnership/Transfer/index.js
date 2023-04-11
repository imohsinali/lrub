import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import * as React from "react";

import { useState, useRef, useContext } from "react";
import { useEffect } from "react";
import Profiledetail from "@/components/Cards/profileDetails";
import { Flex } from "@chakra-ui/react";
import { Web3Context } from "@/components/context/web3Model";

const TableWithPagination = () => {
  const [camera1, setCamera1] = useState(null);
  const [camera2, setCamera2] = useState(null);
  const [camera3, setCamera3] = useState(null);
  const [landdata, setlanddata] = useState();
  const [seller, setseller] = useState();
  const [buyer, setbuyer] = useState();

  // const [landtoTransfer,setlandTotransfer]=useState()

  const { users, land } = useContext(Web3Context);

  useEffect(() => {
    const landdata = JSON.parse(localStorage?.getItem("Transfer"));
    const landtotransfer = land?.filter((la) => la.id == landdata?.id);
    const seller = users?.filter((user) => user.address == landdata.seller);
    const buyer = users?.filter((user) => user.address == landdata.buyer);
    // setlanddata(...landtotransfer);
    if (seller && buyer) {
      setseller(...seller);
      setbuyer(...buyer);
    }
  }, [users, land]);
  console.log("ise", buyer, seller, landdata);

  useEffect(() => {
    const getCameraStreams = async () => {
      try {
        const stream1 = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setCamera1(stream1);

        const stream2 = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setCamera2(stream2);

        const stream3 = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setCamera3(stream3);
      } catch (err) {
        console.error(err);
      }
    };

    getCameraStreams();
  }, []);

  return (
    // <ProtectedRoute>
    <SidebarWithHeader bgColor={"#F7FAFC"}>
      <Flex
        justifyContent={"space-between"}
        width="100%"
        wrap={{ base: "wrap", sm: "nowrap" }}
      >
        {seller && (
          <Profiledetail stream={camera1} user={seller} title={"Seller info"} />
        )}
        {buyer && (
          <Profiledetail stream={camera2} user={buyer} title={"Buyer info"} />
        )}
      </Flex>
    </SidebarWithHeader>
  );
};

export default TableWithPagination;
