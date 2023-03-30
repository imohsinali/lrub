
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


export default  function Admin(){
   const router=useRouter()
  const [data, setPkr] = useState(0);
  const [usd, setUsd] = useState(0);




  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios.get('https://api.coingecko.com/api/v3/exchange_rates')
        // const url=   ""
      const response = await axios.get("/api/matic");
 


        console.log('jkw', response.data);
        setPkr(data.rates.pkr);
        setUsd(data.rates.usd);
      } catch (error) {
        console.error(error);
        setPkr(null);
      }
    }
    fetchData();
  }, []);

// console.log("hww", (eth.value/data.value)*1000000);
// let pkrtomatic = matic.last_price_usd/(data?.value / usd?.value); ;
// console.log(pkrtomatic)



  return (
      <SidebarWithHeader>
        {/* <Photo/> */}
{
 (!data) ? (
     <div>Error loading data</div>
 ):


    <div>
      <h1>CoinMarketCap Latest Cryptocurrency Listings</h1>
      <ul>
        {/* {data.data.map((crypto) => (
          <li key={crypto.id}>{crypto.name} - {crypto.symbol}</li>
        ))} */}
      </ul>
    </div>
}
      </SidebarWithHeader>

  );
}





