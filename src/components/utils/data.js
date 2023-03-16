import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import { useState, useEffect } from "react";

const API_KEY = "H73q9ydKgLvyHoHJwhqG8VLPOloYpaPl";
const API_URL = `https://api.apilayer.com/exchangerates_data/convert?apikey=${API_KEY}`;

function AddLandInspector() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(null);

  const handle = () => {
    async function fetchConversionRate() {
      const url = `${API_URL}&from=${from}&to=${to}&amount=${amount}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setResult(data.result);
    }
    fetchConversionRate();
  };

  return (
    <div>
      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <p>Result: {result}</p>
      <button onClick={() => handle()}>get </button>
    </div>
  );
}

// export default () => {
//   return <SidebarWithHeader children={"Hkajskas"} />;
// };
