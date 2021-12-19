import React from "react"
import {
  Image,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/react";

import { Marker } from "../contexts/marker"

interface MarkerModalProps {
  marker: Marker;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const MarkerModal: React.FC<MarkerModalProps> =({ marker, isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{marker.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" h="100%" direction="column">
            <Text mb="0.2rem">
              <b>Descrição: </b>
              {marker.description}
            </Text>
            <Text mb="1rem">
              <b>Localização: </b>
              {marker.location}
            </Text>
            <Image src={marker.cover} w="full" h="auto" />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={() => setIsOpen(false)}>
            Concluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}