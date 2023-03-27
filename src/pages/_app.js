import '@/styles/globals.css'
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "../components/chakra/theme";
import { ContextProvider } from '../components/context/context';

import { AuthProvider } from "@/components/context/User";
import Web3Provider from "@/components/context/web3Model";

export default function App({ Component, pageProps}) {
  


  return (
    <ContextProvider>
      <AuthProvider>
        {" "}
        <Web3Provider>
          <ChakraBaseProvider theme={theme}>
            {/* <Layout> */}
            <Component {...pageProps} />
            {/* </Layout> */}
          </ChakraBaseProvider>
          {" "}
        </Web3Provider>
      </AuthProvider>
    </ContextProvider>
  );
}
// theme = { theme };