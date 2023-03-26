import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";


export default  function Admin(){

  return (
    <ProtectedRoute>
      <SidebarWithHeader>
        {/* <Photo/> */}
      </SidebarWithHeader>
    </ProtectedRoute>
  );
}

