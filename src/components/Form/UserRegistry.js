import {
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { districtData } from "../utils/districts";

export const Form1 = ({ formData, onChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        User Registration
      </Heading>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"} isRequired>
            First name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="First name"
            value={formData.fname}
            onChange={(e) => {
              onChange({ ...formData, fname: e.target.value });
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="First name"
            value={formData.lname}
            onChange={(e) => {
              onChange({ ...formData, lname: e.target.value });
            }}
          />
        </FormControl>
      </Flex>

      <FormControl mr="5%">
        <FormLabel htmlFor="dob" fontWeight={"normal"} isRequired>
          Date of Birth
        </FormLabel>
        <Input
          type={"date"}
          id="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={(e) => {
            onChange({ ...formData, dob: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mr="5%" isRequired>
        <FormLabel htmlFor="cnic" fontWeight={"normal"}>
          Id Card No
        </FormLabel>
        <Input
          type={"number"}
          id="cnic"
          placeholder="Id Card No"
          value={formData.cnic}
          onChange={(e) => {
            onChange({ ...formData, cnic: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            onChange({ ...formData, email: e.target.value });
          }}
        />
      </FormControl>
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="phone" fontWeight={"normal"}>
          phone number
        </FormLabel>
        <Input
          id="phone"
          type="phone"
          value={formData.phone}
          onChange={(e) => {
            onChange({ ...formData, phone: e.target.value });
          }}
        />
      </FormControl>
    </>
  );
};

export const Form2 = ({ formData, onChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]} isRequired>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          w="full"
          rounded="md"
          value={formData.city}
          onChange={(e) => {
            onChange({ ...formData, city: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="district" fontWeight={"normal"}>
          District
        </FormLabel>

        <Select
          id="district"
          name="district"
          autoComplete=""
          placeholder="Select option"
          value={formData.district}
          onChange={(e) => {
            onChange({ ...formData, district: e.target.value });
          }}
          w={"full"}
          rounded="md"
          h={10}
        >
          {districtData.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>

      <Flex display={{base:"block", sm:"flex"}}>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]} isRequired>
        <FormLabel
          htmlFor="profile"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Profile Pic
        </FormLabel>
        <Input
          type="file"
          name="profile"
          id="profile"
          autoComplete="Profile pic"
          focusBorderColor="brand.400"
          shadow="sm"
          w={{base:"full",sm:"xs"}}
          rounded="md"
          onChange={(e) => {
            onChange({ ...formData, profile: e.target.files[0] });
          }}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]} isRequired>
        <FormLabel
          htmlFor="document"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Frontend and Back Pic of Id card
        </FormLabel>
        <Input
          type="file"
          name="document"
          id="document"
          autoComplete="          Frontend and Back Pic of Id card
"
          focusBorderColor="brand.400"
          shadow="sm"
          w={{base:"full",sm: "sm"}}
          rounded="md"
          onChange={(e) => {
            onChange({ ...formData, document: e.target.files[0] });
          }}
        />
      </FormControl>
      </Flex>
    </>
  );
};
