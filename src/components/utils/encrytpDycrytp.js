import crypto from "crypto";

// A secret key that will be used for encryption and decryption
const secretKey = "my-secret-keyasldfasldkflaskf;dasdfajs'fdkaskdlfasmldkfa;sdkfm;asdlf,;asldfasd,f;as,df;asl";

// Function to encrypt the data
export function encryptData(data) {
  if (data) {
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    let encrypted = cipher.update(data, "utf-8", "hex");
    encrypted += cipher.final("hex");
    console.log(data, encryptData);
    return encrypted;
  } else {
    return "";
  }
}

// Function to decrypt the data
export function decryptData(data) {
  if (data) {
    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decrypted = decipher.update(data, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } else return "";
}
