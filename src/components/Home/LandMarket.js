import { Box, Flex, Text, Image } from "@chakra-ui/react";

const Card = ({ title, description, icon }) => (
  <Box
    h={390}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    p="10"
    m="2"
    width={330}
    transition="transform .2s"
    _hover={{ transform: "scale(1.05)" }}
  >
    <Image src={icon} boxSize="10" color="purple.500" mb="4" alt="image" />
    <Text fontSize="xl" fontWeight="semibold" mb="2">
      {title}
    </Text>
    <Text color="gray.600" display={{}}>
      {description}
    </Text>
  </Box>
);

const cardsData = [
  {
    title: "Install MetaMask",
    description:
      "First, you need to install the MetaMask extension in your browser.",
    icon: "/images/meta.png",
  },
  {
    title: "Register your account",
    description:
      "Once you have MetaMask installed, you can register for an account on our dapp.",
    icon: "/images/register.png",
  },
  {
    title: "Verify your account",
    description:
      "After registration, a land inspector will verify your account before you can add land or make transactions.",
    icon: "/images/verified.png",
  },
  {
    title: "Add and verify your land",
    description:
      "You can add your land to the registry and have it verified by a land inspector to ensure its authenticity.",
    icon: "/images/verifiedland.png",
  },
  {
    title: "Buy and sell land",
    description:
      "Once your land is verified, you can buy and sell land with other users on our dapp.",
    icon: "/images/sell.png",
  },
  {
    title: "Create subplots",
    description:
      "You can also create subplots of your land and manage them on our dapp.",
    icon: "/images/for-sale.png",
  },
  {
    title: "Make offers and bids",
    description:
      "You can make offers for other users' land or accept bids on your own land.",
    icon: "/images/bid.png",
  },
  {
    title: "Transfer ownership",
    description:
      "Once a transaction is completed, the land inspector will transfer the ownership of the land to the buyer.",
    icon: "/images/ownership.png",
  },
  {
    title: "Install MetaMask",
    description:
      "First, you need to install the MetaMask extension in your browser.",
    icon: "/images/meta.png",
  },
  {
    title: "Register your account",
    description:
      "Once you have MetaMask installed, you can register for an account on our dapp.",
    icon: "/images/register.png",
  },
  {
    title: "Verify your account",
    description:
      "After registration, a land inspector will verify your account before you can add land or make transactions.",
    icon: "/images/verified.png",
  },
  {
    title: "Add and verify your land",
    description:
      "You can add your land to the registry and have it verified by a land inspector to ensure its authenticity.",
    icon: "/images/verifiedland.png",
  },
  {
    title: "Buy and sell land",
    description:
      "Once your land is verified, you can buy and sell land with other users on our dapp.",
    icon: "/images/sell.png",
  },
  {
    title: "Create subplots",
    description:
      "You can also create subplots of your land and manage them on our dapp.",
    icon: "/images/for-sale.png",
  },
  {
    title: "Make offers and bids",
    description:
      "You can make offers for other users' land or accept bids on your own land.",
    icon: "/images/bid.png",
  },
  {
    title: "Transfer ownership",
    description:
      "Once a transaction is completed, the land inspector will transfer the ownership of the land to the buyer.",
    icon: "/images/ownership.png",
  },
];

const LandingPage = () => {
  return (
    <Flex wrap={"wrap"} alignItems={"center"} justifyContent={"space-evenly"}>
      {cardsData.map((card) => (
        <Card
          key={card.title}
          {...card}
          transition="transform .2s"
          _hover={{ transform: "scale(1.05)" }}
        />
      ))}
    </Flex>
  );
};

export default LandingPage;
