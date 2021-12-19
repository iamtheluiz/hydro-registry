import { extendTheme } from '@chakra-ui/react';

export const themeObject = {
  colors: {
    custom: {
      100: "#F0EBD8",
      200: "#748CAB",
      300: "#3E5C76",
      400: "#0D1321",
      500: "#1D70A2",
      600: "#2892D7"
    }
  }
}

export const theme = extendTheme(themeObject)