import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Marker } from "../contexts/marker";

// Components
import { Header } from "../components/Header";
import { MarkerForm } from "../components/MarkerForm";

export const EditMarker: React.FC = () => {
  const { state } = useLocation() as { state: { marker: Marker } };

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
          marker={state.marker}
        />
      </Box>
    </Flex>
  )
}