import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ContactProvider } from "../contexts/contactcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContactProvider>
      <ChakraProvider>
        <Box className={inter.className}>
          <ToastContainer />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </ContactProvider>
  );
}
