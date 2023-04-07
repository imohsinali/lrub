import { Select } from "@chakra-ui/react";
import { useState } from "react";

export default function CurrencySelect() {
  const [currency, setCurrency] = useState("PKR"); // initial currency value

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value); // update the currency value when user selects a new option
  };

  return (
    <Select value={currency} onChange={handleCurrencyChange} mr={2} maxWidth={28}>
      <option value="PKR">PKR</option>
      <option value="MATIC">MATIC</option>
      <option value="USD">USD</option>
    </Select>
  );
}
