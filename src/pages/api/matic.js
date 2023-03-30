import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://coincodex.com/api/coincodex/get_coin/matic"
    );
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/exchange_rates"
    );
    const MaticUsd = response.data.last_price_usd;
    const PkrUsd = data.rates.pkr.value / data.rates.usd.value;

    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .status(200)
      .json({ MaticUsd, PkrUsd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
