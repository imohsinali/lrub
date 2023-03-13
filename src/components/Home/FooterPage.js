import { Box, IconButton, Link, Stack, Text } from "@chakra-ui/react";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const FooterPage = () => {
  return (
    <Box
      bg={"rgb(68,88,106)"}
      color="white"
      py={10}
      width={{ base:'100%' }}
    >
      <Stack direction="row" justify="center" mb={5}>
        <IconButton
          as={Link}
          href="https://www.facebook.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          // icon={<FaFacebook />}
          bg="transparent"
          _hover={{ bg: "transparent", color: "blue.500" }}
        />
        <IconButton
          as={Link}
          href="https://twitter.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          // icon={<FaTwitter />}
          bg="transparent"
          _hover={{ bg: "transparent", color: "blue.500" }}
        />
        <IconButton
          as={Link}
          href="https://www.linkedin.com/company/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          // icon={<FaLinkedin />}
          bg="transparent"
          _hover={{ bg: "transparent", color: "blue.500" }}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        fontSize="sm"
      >
        <Link
          href="https://ethereum.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ethereum
        </Link>
        <Text>•</Text>
        <Link
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </Link>
        <Text>•</Text>
        <Link
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </Link>
        <Text>•</Text>
        <Link
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </Link>
      </Stack>
      <Box textAlign="center" fontSize="xs" mt={5}>
        © 2023 My DApp. All rights reserved.
      </Box>
    </Box>
  );
};

export default FooterPage;
