import { AuthContext } from "@/components/context/User";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import { Box, InputGroup } from "@chakra-ui/react";
import { useContext } from "react";

const Index = () => {
    const { auth,decryptData} = useContext(AuthContext);
console.log('masdoasd', auth);
       const token = decryptData(auth.token)

if(!token)
{
  return null

}
      else if(token=='Admin')
{

  return (
    <div>
      <>
        <AdminNavbar/>
        <Box p={4}>Admin Content Goes Here</Box>
      </>
    </div>
  )
};}

export default  Index;
