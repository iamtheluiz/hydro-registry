import { Flex, Heading, VStack, Link as ChakraLink, Text } from "@chakra-ui/react";

// Components
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const About = () => {
  return (
    <Flex
      align="center"
      p="4"
      direction="column"
      minH="100vh"
    >
      <Header
        title="Sobre"
        subtitle="Informações sobre o site"
      />
      <Flex w="full" maxW="container.md" direction="column" mt="2" mb="2">
        <VStack w="full" justify="flex-start" align="flex-start" mt="4" mb="2">
          <Heading size="md">Ícones</Heading>
          <Text>
            Icons made by&nbsp;
            <ChakraLink href="https://www.freepik.com">Freepik</ChakraLink>
            &nbsp;from&nbsp;
            <ChakraLink href="https://www.flaticon.com/">www.flaticon.com</ChakraLink>
          </Text>
        </VStack>
        <VStack w="full" justify="flex-start" align="flex-start" mt="2" mb="4">
          <Heading size="md">Banner</Heading>
          <Text>
            Banner made by&nbsp;
            <ChakraLink href="https://undraw.co/">unDraw</ChakraLink>
          </Text>
        </VStack>
      </Flex>
      <Footer />
    </Flex>
  )
}