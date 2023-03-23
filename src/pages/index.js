import Layout from "@/components/Home/Layout";
import { ethers } from "ethers";
import Head from "next/head";

const Home = () => {
      const hexString =
        "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";
        console.log(ethers?.utils?.parseBytes32String(hexString));

  
      return <Layout/>;
};

export default Home;
