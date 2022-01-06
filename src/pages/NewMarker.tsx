import { Flex, Box } from "@chakra-ui/react";

// Components
import { Header } from "../components/Header";
import { NewMarkerForm } from "../components/NewMarkerForm"

export const NewMarker = () => {
  return (
    <Flex align="center" p="4" direction="column">
      <Header
        title="Nova Marcação"
        subtitle="Cadastre um ponto no mapa"
      />
      <Box maxW="lg" w="full">
        <NewMarkerForm
          showTitle={false}
          showMap
        />
      </Box>
    </Flex>
  )
}