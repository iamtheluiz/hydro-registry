import { Flex, Box } from "@chakra-ui/react";
import { Footer } from "../components/Footer";

// Components
import { Header } from "../components/Header";
import { MarkerForm } from "../components/MarkerForm"

export const NewMarker = () => {
  return (
    <Flex align="center" p="4" direction="column">
      <Header
        title="Nova Marcação"
        subtitle="Cadastre um ponto no mapa"
      />
      <Box maxW="lg" w="full">
        <MarkerForm
          showTitle={false}
          showMap
        />
      </Box>
      <Footer />
    </Flex>
  )
}