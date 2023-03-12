import AuthModel from "@/components/Models/Auth/AuthModel";
import { Context } from "@/components/context/context"; 

// import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
// import { User } from "firebase/auth";
import React from "react";
import AuthButton from "./AuthButton";



const RightContent= () => {
  // const [signOut, loading, error] = useSignOut(auth);
  const handleSignOut=async()=>{
          // const success = await signOut();
          if (true) {
            alert('You are sign out');
          }
  }
  return (
    <>
      <AuthModel />
      <Flex justify={"center"} align={"center"}>
         <AuthButton />
      </Flex>
    </>
  );
};

export default RightContent;
