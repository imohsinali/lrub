import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Web3Context } from "../context/web3Model";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const {contract,account}=useContext(Web3Context)

  
  //  console.log('i am protedt',Admin)
  //  console.log(router)
  //  if(false)
  //  {
  //   console.log("i am not")
  //   router.push('/')
  //  }

    

  return <>{children}</>;
};

export default ProtectedRoute;
