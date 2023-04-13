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
      pinata_api_key: `7cef58394b1f0a591f15`,
      pinata_secret_api_key: `54098153be2dc5cc4dc335c06b91cbe1dc5dbae086263a764708f16eeee76ad4

`,
      "Content-Type": "multipart/form-data",
    },
  });
  const ImgHash = resFile.data.IpfsHash;
  return ImgHash;
};

export default pdfHash;
