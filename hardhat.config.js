require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {};

// const goerli_url=process.env.goerli_url
const polygon_url = process.env.polygon_url;
const private_key = process.env.private_key;
// console.warn(goerli_url)
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        runs: 200,
        enabled: true,
      },
    },
    // "https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0x8b5018C3de4e271464809bc3A6a2509e154343D8&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=";

    // etherscan: {
    //   apiKey: "6SPF5NK1C7PGN4VQGDTA7RII7SIUUUSUK5", // replace with your PolygonScan API key
    //   url: "https://api.polygonscan.com/api", // set the PolygonScan API URL
    // },
  },

  networks: {
    MATIC_MUMBAI: {
      url: polygon_url,
      accounts: [private_key],
    },
  },
};
