import { AuthContext } from "@/components/context/User";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";

const Index = () => {
    const { auth} = useContext(AuthContext);
console.log('masdoasd', auth);
  

  return (
    <div>
      <>
        <AdminNavbar/>
        <Box p={4}>Admin Content Goes Here</Box>
      </>
    </div>
  );
};

export default  Index;
