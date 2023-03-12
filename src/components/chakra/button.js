
export const Button={
    baseStyle: {
        borderRadius: "60px",
        fontSize: "10pt",
        fontWeight: 700,
        _focus: {
          boxShadow: "none",
        },
      },
      sizes: {
        sm: {
          fontSize: "8pt",
        },
        md: {
          fontSize: "10pt",
          // height: "28px",
        },
      },
      variants: {
        solid: {
          color: "white",
          bg: "oragne.500",
          _hover: {
            bg: "blue.400",
          },
        },
        outline: {
          color: "blue.500",
          border: "1px solid",
          borderColor: "blue.500",
        },
        oauth: {
          height: "44px",
          width:'100%',
          border: "0px solid",
          borderColor: "orange.700",
          _hover: {
            bg: "gray.50",
             boxShadow: "sx",

          },
        },
      },
    };