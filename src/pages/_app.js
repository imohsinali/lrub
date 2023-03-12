// import '@/styles/globals.css'
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "../components/chakra/theme";
import Layout from "@/components/Layouts/Layout";
import { ContextProvider } from '../components/context/context';

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
        <ChakraBaseProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraBaseProvider>
    </ContextProvider>
  );
}
// theme = { theme };