import SidebarWithHeader from "@/components/Dashbord/Dashboard";

import React, { useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Form1, Form2, Form3 } from "@/components/Form/AddLand";
import { useRouter } from "next/router";
import { Web3Context } from "@/components/context/web3Model";
import fileHash from "@/components/utils/IPFS";
import { ethers } from "ethers";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
const Admin = () => {
  

  return (
    <SidebarWithHeader>
     Admin
    </SidebarWithHeader>
  );
};

export default Admin;
