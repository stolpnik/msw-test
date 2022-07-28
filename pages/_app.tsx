import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  const mockStart = require("../mocks");
  mockStart();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box p="1rem">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
