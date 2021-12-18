import { ChakraProvider, theme } from "@chakra-ui/react"

import { ApplicationRoutes } from "./routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApplicationRoutes />
  </ChakraProvider>
);