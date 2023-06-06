import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ContactProvider } from "../contexts/contactcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import favIcon from "../assets/images/contact-list-icon.png";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContactProvider>
      <Head>
        <title>Lista de Contatos</title>
        <link rel="shortcut icon" href={favIcon.src} type="image/x-icon" />
      </Head>
      <ChakraProvider>
        <Box className={inter.className}>
          <ToastContainer />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </ContactProvider>
  );
}
