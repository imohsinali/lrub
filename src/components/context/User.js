// src/context/auth-context.js
import React from "react";
import crypto from "crypto";

// A secret key that will be used for encryption and decryption
const secretKey = "my-secret-key";

// Function to encrypt the data
function encryptData(data) {
  if(data)
  {  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  console.log(data,encryptData)
  return encrypted;
}
else
{
  return ''
}
}

// Function to decrypt the data
function decryptData(data) {
  if(data){
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;}
  else
  return ''
}

// Example usage



const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = React.useState('');

    React.useEffect(() => {
      const token = window.localStorage.getItem("token");
      const decryptedData = decryptData(token);

      if (token) {
        setAuthState({ decryptedData });
      }
    }, []);


  const setUserAuthInfo = ( data ) => {
      const encryptedData = encryptData(data.token);

       localStorage.setItem("token", encryptedData);
      const token=localStorage.getItem('token')

    setAuthState({
      token,
    });
  };

  

  return (
    <Provider
      value={{
        auth,
        decryptData,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, AuthProvider };

