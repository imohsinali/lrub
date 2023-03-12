// import '@/styles/globals.css'
import { ChakraBaseProvider } from '@chakra-ui/react'
import {theme} from '../chakra/theme'
import Layout from '@/components/Layouts/Layout'
import { RecoilRoot } from 'recoil'
import { ContextProvider } from "@/context/context";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
    <RecoilRoot>
      <ChakraBaseProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraBaseProvider>
    </RecoilRoot>
    </ContextProvider>
  );
}
