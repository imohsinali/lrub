import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import Card from "@/components/Home/HeroSection";
import JoinCard from "@/components/Home/JoinCard";
import LandingPage from "@/components/Home/LandMarket";
import Pagination from "@/components/utils/pagination";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Join from '../../../components/Home/Join'
const Inpector = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ''
      ?.slice(indexOfFirstPost, indexOfLastPost)
      const handlePageClick = (p) => {
        setCurrentPage(p);
        console.log(p);
      };
        const [scrollY, setScrollY] = useState(0);
        const [showPagination,setShowPagination]=useState(false)
useEffect(() => {
  const handleScroll = () => {
    const isAtEnd =
      window.scrollY + window.innerHeight >= document.body.offsetHeight;
      console.log('wind',window.innerHeight)
    if (isAtEnd) {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

        console.log(showPagination)

  return (
    <SidebarWithHeader>
      <Flex mt={20}>
        <LandingPage />
      </Flex>
      <Flex mt={20} backgroundColor={"red"} >
    { showPagination&& <Pagination handlePageClick={handlePageClick} page={currentPage} />}
      </Flex>
    </SidebarWithHeader>
  );
};

export default Inpector;
