
import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import ProtectedRoute from "@/components/protected/protectedRoute";
const ProtectedRoute = dynamic(() => import("../../components/protected/protectedRoute"), { ssr: false });


export default  function Admin(){
const admin=false
const router=useRouter()


  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        {/* <Photo/> */}
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}

