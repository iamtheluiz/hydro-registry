import { useNavigate } from "react-router-dom";

import { useMarker } from "../contexts/marker";

// Icons
import { FaMapMarkedAlt } from "react-icons/fa";

// Styles
import "leaflet/dist/leaflet.css";  // Map Style

// Components
import { MarkerInfo } from "../components/MarkerInfo";
import { Flex, SimpleGrid , IconButton, Text } from "@chakra-ui/react";

export const List = () => {
  const { markers } = useMarker();
  const navigate = useNavigate();

  function handleNavigateToMap() {
    navigate('/map');
  }

  return (
    <Flex align="center" p="4" direction="column">
      <Flex maxW="container.md" w="full" direction="row">
        <Flex direction="column" flex="1">
          <Text fontSize="3xl" fontWeight="medium">Marcações</Text>
          <Text>{markers.length} Pontos registrados</Text>
        </Flex>
        <Flex align="center">
          <IconButton
            zIndex="1001"
            bg="blue.400"
            colorScheme="blue"
            aria-label="Pressione para marcar uma região"
            size="md"
            fontSize="lg"
            variant="solid"
            icon={<FaMapMarkedAlt color="white" />}
            onClick={handleNavigateToMap}
          />
        </Flex>
      </Flex>
      {markers.length === 0 && (
        <Flex
          w="full"
          p="4"
          align="center"
          justify="center"
          maxW="container.md"
          border="2px"
          borderColor="gray.300"
          borderRadius="md"
          mt="4"
        >
          <Text color="gray.500">Não existem marcações cadastradas!</Text>
        </Flex>
      )}
      <SimpleGrid columns={[1, null, 2]} spacing="1rem" alignItems="center" p="4" mt="2" maxW="container.md">
        {markers.map(marker => (
          <MarkerInfo
            key={`${marker.position[0]}-${marker.position[1]}`}
            marker={marker}
          />
        ))}
      </SimpleGrid >
    </Flex>
  )
}