import fileHash from "@/components/utils/IPFS";
// import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";


export const handleSubmit = async (setLoading, formData, e) => {
    // const {contract} =useContext(Web3Context)
    // const toast=useToast()

try{
  e.preventDefault();
  const { fname, lname, dob, cnic, city, document, profile,email } = formData;
  const dobDate = new Date(dob);

  const cnicRegex = /^\d{13}$/; // CNIC regex
  const nameRegex = /^[a-zA-Z]+$/; // Name regex
  if (!nameRegex.test(fname)) {
    alert("Name should only contain letters");
    return;
  }

  if (fname.length <= 2) {
    alert("Name should be more than 3 characters");
    return;
  }
  if (lname) {
    if (!nameRegex.test(lname)) {
      alert("Name should only contain letters");
      return;
    }

    if (lname.length <= 2) {
      alert("Name should be more than 3 characters");
      return;
    }
  }

  if (
    isNaN(dobDate.getTime()) ||
    dobDate.getDate() != dobDate.getDate() ||
    dobDate.getMonth() != dobDate.getMonth() ||
    dobDate.getFullYear() < 1900
  ) {
    alert("Please enter a valid date of birth (dd/mm/yyyy)");
    return;
  }

  // Check that the date of birth is not in the future
  if (dobDate.getTime() > Date.now()) {
    alert("Date of birth should not be in the future");
    return;
  }

  if (!cnicRegex.test(cnic)) {
    alert("CNIC should be a 13-digit number");
    return;
  }



  if (!nameRegex.test(city)) {
    alert("City should only contain letters");
    return;
  }

  if (city.length <= 2) {
    alert("City should be more than 3 characters");
    return;
  }
  

  const imgeHash = await fileHash(profile);
  const docHash = await fileHash(document);
  
        setLoading(true);
          const name=fname+'|'+ lname
          const transaction = await contract.registerUser(
          stringToBytes32(name),
          stringToBytes32(dob),
          stringToBytes32(city),
          cnic,
          stringToBytes32(docHash),
          stringToBytes32(imgeHash),
          stringToBytes32(email),
          { gasLimit: 1000000 }
        );
        console.log("maos");
        await transaction.wait();
        console.log("maos 2");
        setLoading(false)
        toast({
          title: "Registered Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        setLoading(false);

        // toast({
        //   title: "Something went wrong",
        //   status: "error",
        //   duration: 2000,
        //   isClosable: true,
        // });
      }
    }




//   console.log("main", imgeHash);



function stringToBytes32(str) {
  return ethers.utils.formatBytes32String(str);
}