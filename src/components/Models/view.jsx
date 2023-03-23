
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ethers } from "ethers";
import { Context } from "../context/context";
import { Stack } from "@chakra-ui/react";
import { B32S } from "../utils/B32S";

export default function AllLandInspector() {
  const { contract } = useContext(Context);
  const [inspectors, setInspectors] = useState([]);

  useEffect(() => {
    const viewInspector = async () => {
      const inspectorAddresses = await contract.ReturnAllLandIncpectorList();
      console.log(inspectorAddresses);
      const inpsectors = await Promise.all(
        inspectorAddresses.map(async (address) => {
          const { name, city, dob, designation } =
            await contract.InspectorMapping(address);
          return {
            address,
            name,
            city:B32S(city),
            dob:B32S(dob),
            designation:B32S(designation)
          };
        })
      );
      console.log(inpsectors);
      setInspectors(inpsectors);
    };
    contract && viewInspector();
  }, [contract]);

    const hexString =
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";
   console.log(ethers.u)
  console.log("B2s",B32S(hexString))
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inspectors.slice(indexOfFirstPost, indexOfLastPost);
  const remove = async (id) => {
    const transaction = await contract.removeLandInspector(id, {
      gasLimit: 10000000,
    });
    await transaction.wait();

    console.log("done");
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr className="table-heading">
            <th>#</th>
            <th>Inspector Address</th>
            <th>Name</th>
            <th>City</th>
            <th>Remove</th>
          </tr>
        </thead>
        {currentPosts.map((data, index) => {
          return (
            <tbody>
              <tr key={index} className="table-data">
                <td>{index}</td>
                <td>{data.address}</td>
                <td>{data.name}</td>
                <td>{data.city}</td>
                <td>
                  <button
                    onClick={() => remove(data.address)}
                    className="btn remove-button"
                  >
                    remove
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <Stack spacing={2} className="Pagination"></Stack>
    </div>
  );
}
