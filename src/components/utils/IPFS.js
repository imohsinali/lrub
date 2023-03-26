import axios from "axios";

const fileHash = async (file) => {
  const fileData = new FormData();
  fileData.append("file", file);

  const resFile = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: fileData,
    headers: {
      pinata_api_key: `7cef58394b1f0a591f15`,
      pinata_secret_api_key: `54098153be2dc5cc4dc335c06b91cbe1dc5dbae086263a764708f16eeee76ad4

`,
      "Content-Type": "multipart/form-data",
    },
  });

  const fileHash = resFile.data.IpfsHash;

  return fileHash;
};

export default fileHash;
