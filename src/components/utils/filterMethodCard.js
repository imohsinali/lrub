import { useState } from "react";
import { Box, Button, FormControl, Input, Stack } from "@chakra-ui/react";

const FilterMethod = ({ transactions, setTransaction }) => {
  const methodP = {
    0x60806040: "Contract Creation",
    0x6910c46d: "Add Inspector",
    0x54f1ebfb: "User Verification",
    0xa6951e1f: "Land Verification",
    0x43e8349a: "Transfer Land",
    0x58051d93: "Subplot",
    0xe749752c: "User Registered",
    0xf98cf07c: "Make Payment",
    0x935400ee: "Request Rejected",
    0x9dec448e: "Buy Request",
    0x4ba1f098: "Request Accepted",
    0x2d7788db: "Change Detail",
    0x314967ac: "Add Land",
  };
  const [method, setMethod] = useState("");

  const handleAddressChange = (event) => {
    setMethod(event.target.value);
  };
  //   <Td>{}</Td>

  const handleApplyFilter = () => {
    const filter = transactions?.filter(
      (tx) => methodP[Number(tx?.methodId)] == method.trim()
    );
    console.log(filter);
    setTransaction(filter);
  };

  const handleCancel = () => {
    setMethod("");
    // Handle cancel event
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} backgroundColor={"white"}>
      <form>
        <Stack spacing={4}>
          <FormControl>
            <Input
              placeholder="Search by Method eg.suplot"
              value={method}
              onChange={handleAddressChange}
            />
          </FormControl>
          <Stack direction="row" spacing={4} justify="flex-end">
            <Button
              type="button"
              colorScheme="blue"
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
            <Button type="button" onClick={handleCancel}>
              Clear
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default FilterMethod;
