import SidebarWithHeader from "@/components/Dashbord/Dashboard";
import ProtectedRoute from "@/components/protected/protectedRoute";
import Photo from '../../components/utils/photo'


export default  function Admin(){

  return (
    <ProtectedRoute>
      <SidebarWithHeader>
              <Photo/>

        </SidebarWithHeader> 
    </ProtectedRoute>
  );
}