import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { App } from './App'

import './index.css'

import "./services/firebase";

// Map Style
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </StrictMode>,
)
