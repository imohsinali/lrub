import { useRouter } from "next/router";

const { Flex, Icon } = require("@chakra-ui/react");


const NavItem = ({ icon, children,src, ...rest }) => {
  const router= useRouter()
  console.log('mas', router.asPath,src)
  
  return (
    // <Link href="/" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      _active={{
        bg: "green.400",
        color: "white",
      }}
      _visited={{
        bg: "green.400",
        color: "white",
      }}
        bg={router.asPath==src?"green.400":''} 
        // color= "white"
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          _activeLink={{
            bg: "green.400",
            color: "white",
          }}
          as={icon}
        />
      )}
      {children
    
      }
    </Flex>
    // </Link>
  );
};

export default NavItem