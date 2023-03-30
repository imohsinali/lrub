
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


export default  function Admin(){
   const router=useRouter()
  const [pkr, setPkr] = useState(null);
  const [matic, setMatic] = useState(null);




  useEffect(() => {
    async function fetchData() {
      try {
        // const url=   ""
      const {data} = await axios.get("/api/matic");
        setPkr(data.PkrUsd)
        setMatic(data.MaticUsd)
      } catch (error) {
        console.error(error);
        setPkr(null);
        setMatic(null)
      }
    }
    fetchData();
  }, []);

  console.log(pkr,matic)

// console.log("hww", (eth.value/data.value)*1000000);
// let pkrtomatic = matic.last_price_usd/(data?.value / usd?.value); ;
// console.log(pkrtomatic)



  return (
      <SidebarWithHeader>
        {/* <Photo/> */}

      </SidebarWithHeader>

  );
}





