import React, { ChangeEvent } from "react";
import { Box, Button, HStack, IconButton, Input, Select, Slide, Text, Textarea } from "@chakra-ui/react";

// Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { useMarker } from "../contexts/marker";

interface CreateMarkerSlideProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CreateMarkerSlide: React.FC<CreateMarkerSlideProps> = ({ isOpen, onToggle }) => {
  const { newMarker, setNewMarker, addNewMarker, setSelectedPosition } = useMarker();

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget;

    if (newMarker) {
      setNewMarker({
        ...newMarker,
        type: value
      });
    }
  }

  function handleAddMarker() {
    if (newMarker) {
      addNewMarker(newMarker);
      setSelectedPosition(null);
      setNewMarker(null);
      onToggle();
    }
  }

  if (newMarker === null) {
    return <></>;
  }

  return (
    <Slide
      direction='right'
      in={isOpen}
      style={{ zIndex: 1000, maxWidth: 460, backgroundColor: "#00000070" }}
    >
      <Box
        p='28px'
        color='white'
        m='2'
        mt='14'
        bg='white'
        rounded='md'
        shadow='md'
      >
        <Text fontSize="3xl" color="gray.700" mb="2">Cadastro</Text>
        <Input
          placeholder='Nome'
          color='black'
          value={newMarker.name}
          onChange={(event) => setNewMarker({ ...newMarker, name: event.currentTarget.value})}
        />
        <Input
          placeholder='Imagem'
          color='black'
          mt='2'
          value={newMarker.cover}
          onChange={(event) => setNewMarker({ ...newMarker, cover: event.currentTarget.value})}
        />
        <Textarea
          placeholder='Descrição'
          color='black'
          mt='2'
          value={newMarker.description}
          onChange={(event) => setNewMarker({ ...newMarker, description: event.currentTarget.value})}
        />
        <HStack mt='2'>
          <Input
            placeholder='Lat'
            color='black'
            value={newMarker?.position === null ? '' : newMarker?.position[0]}
            disabled
          />
          <Input
            placeholder='Long'
            color='black'
            value={newMarker?.position === null ? '' : newMarker?.position[1]}
            disabled
          />
          <IconButton
            bg="blue.400"
            aria-label="Pressione para marcar uma região"
            size="md"
            fontSize="lg"
            variant="solid"
            icon={<FaMapMarkerAlt color="white" />}
          />
        </HStack>
        <Select
          mt='2'
          cursor="pointer"
          color="gray.700"
          defaultValue='blue'
          onChange={handleSelectChange}
          value={newMarker.type}
        >
          <option value='blue' disabled>Tipo de Marcação</option>
          <option value='hidrante de coluna'>Hidrante de Coluna</option>
          <option value='registro'>Registro</option>
        </Select>
        <Input
          mt='2'
          placeholder='Localização'
          color='black'
          value={newMarker.location}
          onChange={(event) => setNewMarker({ ...newMarker, location: event.currentTarget.value})}
        />
        
        <Button
          bg="blue.400"
          color="white"
          w="full"
          mt="2"
          _hover={{ filter: "brightness(0.9)" }}
          _active={{ filter: "brightness(0.8)" }}
          onClick={handleAddMarker}
        >
          Confirmar
        </Button>
      </Box>
    </Slide>
  )
}