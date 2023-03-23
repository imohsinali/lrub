// import '@/styles/globals.css'
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "../components/chakra/theme";
import { ContextProvider } from '../components/context/context';

import { AuthProvider } from "@/components/context/User";


export default function App({ Component, pageProps}) {
  


  return (
    <ContextProvider>
      <AuthProvider >
        <ChakraBaseProvider theme={theme}>
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </ChakraBaseProvider>
      </AuthProvider>
    </ContextProvider>
  );
}
// theme = { theme };