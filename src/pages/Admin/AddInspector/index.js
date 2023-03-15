import { Box, Flex, Heading, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Histogram, LabelList, AreaChart, Area } from "recharts";

const Dashboard = () => {
  const data = [
    { year: "2020", land: 100, people: 80, verified: 70, transferred: 50 },
    { year: "2021", land: 150, people: 120, verified: 90, transferred: 100 },
  ];

  const verifiedData = [
    { name: "Verified", value: 160 },
    { name: "Unverified", value: 40 },
  ];

  const landData = [
    { name: "Transferred", value: 100 },
    { name: "Not Transferred", value: 50 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF00FF"];

  return (
    <Flex direction="column" maxW="7xl" mx="auto" p="6">
      <Heading mb="6">Dashboard</Heading>
      <SimpleGrid columns={[1, 2, 3]} gap={6}>
        <Stat bg="purple.100" p="4" borderRadius="md">
          <StatLabel>Total Land Inspectors</StatLabel>
          <StatNumber>50</StatNumber>
        </Stat>
        <Stat bg="orange.100" p="4" borderRadius="md">
          <StatLabel>Total Lands Registered This Year</StatLabel>
          <StatNumber>200</StatNumber>
        </Stat>
        <Stat bg="teal.100" p="4" borderRadius="md">
          <StatLabel>Total Lands Transferred Last Year</StatLabel>
          <StatNumber>100</StatNumber>
        </Stat>
      </SimpleGrid>
      <Heading my="6">Charts</Heading>
      <SimpleGrid columns={[1, 2, 3]} gap={6}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="verified" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="transferred" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="verified" fill="#8884d8">
              <LabelList dataKey="verified" position="top" />
            </Bar>
              <Bar dataKey="transferred" fill="#82ca9d">
          <LabelList dataKey="transferred" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="verified" stroke="#8884d8" />
          <Line type="monotone" dataKey="transferred" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
    <Box>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="verified" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="transferred" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  </SimpleGrid>
</Flex>

  )}

export default Dashboard