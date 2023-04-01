import { Flex, SimpleGrid } from "@chakra-ui/react";
import Card from "./HeroSection";

const CardGrid = () => {
  const cards = [
    {
      id: 4,
      title: "Trust",
      description:
        "Our dapp provides a trusted and secure land registry solution powered by blockchain technology.",
      image: "/images/trust .png",
    },
    {
      id: 5,
      title: "Transparency",
      description:
        "We ensure complete transparency in all land registry transactions through blockchain technology.",
      image: "/images/transparency.png",
    },
    {
      id: 6,
      title: "Efficiency",
      description:
        "TOur dapp streamlines the land registry process, making it faster and more efficient.",
      image: "/images/efficient.png",
    },
    {
      id: 7,
      title: "Convenience",

      description:
        " Our dapp offers a convenient and accessible land registry solution, available anytime, anywhere.",
      image: "/images/tap.png",
    },
  ];

  return (
    <Flex
      justifyContent={'space-evenly'}
      wrap={'wrap'}
      width={{ base: 400, md: 810, sm: 700, xl: 1600 }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          image={card.image}
          description={card.description}
        />
      ))}
    </Flex>
  );
};

export default CardGrid;
