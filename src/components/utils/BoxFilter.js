import { Box, Flex, Input, Select } from "@chakra-ui/react";

export default function FiltersBox() {
  return (
    <Box bg="gray.200" p="4" borderRadius="md">
      <Flex flexWrap="wrap" alignItems="center">
        <Input placeholder="Search..." mr="4" />
        <Box mr="4">
          <Select placeholder="Filter 1">
            <option value="">All</option>
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
          </Select>
        </Box>
        <Box>
          <Select placeholder="Filter 2">
            <option value="">All</option>
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
          </Select>
        </Box>
      </Flex>
    </Box>
  );
}
