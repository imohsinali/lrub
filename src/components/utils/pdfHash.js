import axios from "axios";

const pdfHash = async (pdfBytes) => {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const formData = new FormData();
  formData.append("file", new Blob([pdfBytes], { type: "application/pdf" }));

  const urlb = URL.createObjectURL(blob);
  console.log("url", urlb);
  const resFile = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
      pinata_api_key: `5abf2908f3ff2e9eea2b`,
      pinata_secret_api_key: `c8a7bb3ff88dacea157eb7bbbc568b7907d7fec683b08922c8bda1837c0357a0



`,
      "Content-Type": "multipart/form-data",
    },
  });
  const ImgHash = resFile.data.IpfsHash;
  return ImgHash;
};

export default pdfHash;
