import { Flex, Button, Text, Image, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BannerImage from "../assets/undraw_destination.svg";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="container.md"
      maxW="full"
      m="auto"
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      fontSize="xl"
      minH="100vh"
      p="4"
    >
      <Image src={BannerImage} w="96" />
      <VStack spacing="1rem" justify="center" mt="4">
        <Heading>Hydro Register</Heading>
        <Text
          w="full"
          align="center"
        >
          Cadastre os pontos de registros e hidrantes da região em uma plataforma online!
        </Text>
        <Button
          w="28"
          colorScheme="blue"
          _hover={{ filter: "brightness(0.9)" }}
          _active={{ filter: "brightness(0.8)" }}
          onClick={() => navigate('/map')}
        >
          Começar
        </Button>
      </VStack>
    </Flex>
  )
}
