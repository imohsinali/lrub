import { useState } from "react";
import { Box, Button, FormControl, Input, Stack } from "@chakra-ui/react";

const FilterCard = ({ transactions, setTransaction }) => {
  const [address, setAddress] = useState("");

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleApplyFilter = () => {
    const filter = transactions?.filter((tx) => tx.from == address);
    console.log(filter);
    setTransaction(filter);
  };

  const handleCancel = () => {
    setAddress("");
    // Handle cancel event
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} backgroundColor={"white"}>
      <form>
        <Stack spacing={4}>
          <FormControl>
            <Input
              placeholder="Search by Address eg.0x12"
              value={address}
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

export default FilterCard;
