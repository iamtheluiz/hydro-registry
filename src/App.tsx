import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "./styles/theme";

import { ApplicationRoutes } from "./routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApplicationRoutes />
  </ChakraProvider>
);