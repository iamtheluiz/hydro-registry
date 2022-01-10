import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import { FaGithub } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <Flex maxW="container.md" w="full" p="2" direction="row" justify="space-between">
      <ChakraLink
        href='https://github.com/iamtheluiz'
        isExternal
      >
        <HStack spacing="1">
          <FaGithub size={24} />
          <Text ml="1">Luiz Gustavo</Text>
        </HStack>
      </ChakraLink>
      <HStack spacing="3">
        <ChakraLink as={Link} to="/map">Mapa</ChakraLink>
        <ChakraLink as={Link} to="/list">Lista</ChakraLink>
        <ChakraLink as={Link} to="/about">Sobre</ChakraLink>
      </HStack>
    </Flex>
  );
}