import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Web3Context } from "../context/web3Model";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const {contract,account}=useContext(Web3Context)

  useEffect(async () => {
   const Admin = await contract?.isContractOwner(account);
   console.log('i am protedt',Admin)
   console.log(router)
   if(!Admin)
   {
    router.push('/')
   }

    
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
