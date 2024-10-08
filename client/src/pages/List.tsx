import { useMarker } from "../contexts/marker";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

// Components
import { MarkerInfo } from "../components/MarkerInfo";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const List = () => {
  const { markers } = useMarker();

  return (
    <Flex align="center" p="4" direction="column" minH="100vh">
      <Header
        title="Marcações"
        subtitle={`${markers.length} Pontos registrados`}
      />
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
      <SimpleGrid
        w="full"
        maxW="container.md"
        alignItems="center"
        p="4"
        mt="2"
        spacing="1rem"
        columns={[1, null, 2]}
      >
        {markers.map(marker => (
          <MarkerInfo
            key={`${marker.position[0]}-${marker.position[1]}`}
            marker={marker}
          />
        ))}
      </SimpleGrid>
      <Footer />
    </Flex>
  )
}