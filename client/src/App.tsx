import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "./styles/theme";

import { ApplicationProvider } from "./contexts";
import { ApplicationRoutes } from "./routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApplicationProvider>
      <ApplicationRoutes />
    </ApplicationProvider>
  </ChakraProvider>
);