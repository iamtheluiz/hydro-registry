import { Flex, Button, Text } from "@chakra-ui/react";

export const Home = () => (
  <Flex align="center" justify="center" direction="column" textAlign="center" fontSize="xl" minH="100vh">
    <Text fontSize="4xl">Hello</Text>
    <Button
      bg="custom.200"
      color="white"
      _hover={{ filter: "brightness(0.9)" }}
      _active={{ filter: "brightness(0.8)" }}
    >
      Boas vindas
    </Button>
  </Flex>
)
