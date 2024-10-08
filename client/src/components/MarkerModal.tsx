import React, { useEffect, useState } from "react"
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

// Firebase
import { getBlob, getStorage, ref } from "firebase/storage";

interface MarkerModalProps {
  marker: Marker;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const MarkerModal: React.FC<MarkerModalProps> =({
  marker, isOpen, setIsOpen
}) => {
  const [cover, setCover] = useState<Blob>();

  useEffect(() => {
    const storage = getStorage();
    const coverRef = ref(storage, marker.cover);

    getBlob(coverRef)
      .then(blob => {
        setCover(blob);
      })
  }, [marker.cover]);

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
            {cover && (
              <Image src={URL.createObjectURL(cover)} w="full" h="auto" />
            )}
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