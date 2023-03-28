import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

import  {districtData} from '../utils/districts'
export const Form1 = ({ formData, onChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Land Inpector
      </Heading>

      <Flex>
        <FormControl mr="5%" mt="2%" isRequired>
          <FormLabel htmlFor="first-name" fontWeight={"normal"} >
            First name
          </FormLabel>
          <Input
            id="first-name"
            value={formData.fname}
            onChange={(e) => {
              onChange({ ...formData, fname: e.target.value });
            }}
          />
        </FormControl>

        <FormControl mt="2%">
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            value={formData.lname}
            onChange={(e) => {
              onChange({ ...formData, lname: e.target.value });
            }}
          />
        </FormControl>
      </Flex>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="waddress" fontWeight={"normal"}>
          Wallet Address
        </FormLabel>
        <Input
          id="waddress"
          value={formData.waddress}
          onChange={(e) => {
            onChange({ ...formData, waddress: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="cnic" fontWeight={"normal"}>
          Id Card No
        </FormLabel>
        <Input
          type={"number"}
          id="cnic"
          value={formData.cnic}
          onChange={(e) => {
            onChange({ ...formData, cnic: e.target.value });
          }}
        />
      </FormControl>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="dob" fontWeight={"normal"}>
          Date of Birth
        </FormLabel>
        <Input
          type={"date"}
          id="dob"
          value={formData.dob}
          onChange={(e) => {
            onChange({ ...formData, dob: e.target.value });
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
        Add Land Inpector
      </Heading>

      <FormControl mt="2%" mr="5%" isRequired>
        <FormLabel htmlFor="phone" fontWeight={"normal"}>
          Contact No
        </FormLabel>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => {
            onChange({ ...formData, phone: e.target.value });
          }}
        />
      </FormControl>
      <FormControl mt="2%" mr="5%" isRequired>
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

      <FormControl mt="2%" mr="5%" isRequired>
        <FormLabel htmlFor="desgination" fontWeight={"normal"}>
          Desgination
        </FormLabel>
        <Input
          id="desgination"
          type="string"
          value={formData.desgination}
          onChange={(e) => {
            onChange({ ...formData, desgination: e.target.value });
          }}
        />
      </FormControl>

      <Flex justifyContent={"space-evenly"}>
        <FormControl mr="5%" mt="2%" isRequired>
          <FormLabel htmlFor="city" fontWeight={"normal"}>
            City
          </FormLabel>
          <Input
            id="city"
            type="string"
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
            size="sm"
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
      </Flex>
    </>
  );
};


    // function addLandInspector(address _addr, bytes32 _name, bytes32 _dob, uint _cinc, bytes32 _designation, bytes32 _city,bytes32 _district ,bytes32  _email,uint _phone)

    // lname: "",
    // fname: "",
    // waddress:"",
    // cnic:'',
    // dob: "",
    // phone:'',
    // email: "",
    // city: "",
    // district:"",
    // desgination: "",