import Layout from "@/components/Layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      const protectedRoutes = ["/inspector", "/inspector/1", "/inspector/2"]; // Add any protected routes here
      if (protectedRoutes.includes(url)) {
        router.push("/");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
      return <Layout/>;
};

export default Home;
