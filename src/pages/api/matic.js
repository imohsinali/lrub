import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://coincodex.com/api/coincodex/get_coin/matic"
    );
    const matic = response.data.last_price_usd;
    console.log(matic);

    res.status(200).json({ matic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
