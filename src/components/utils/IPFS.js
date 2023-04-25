import axios from "axios";

const fileHash = async (file) => {
  const fileData = new FormData();
  fileData.append("file", file);

  const resFile = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: fileData,
    headers: {
      pinata_api_key: `5abf2908f3ff2e9eea2b`,
      pinata_secret_api_key: `c8a7bb3ff88dacea157eb7bbbc568b7907d7fec683b08922c8bda1837c0357a0



`,
      "Content-Type": "multipart/form-data",
    },
  });

  const fileHash = resFile.data.IpfsHash;

  return fileHash;
};

export default fileHash;
