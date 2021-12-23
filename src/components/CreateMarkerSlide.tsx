import React, { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, HStack, IconButton, Input, Select, Slide, Text, Textarea } from "@chakra-ui/react";

// Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker, useMarker } from "../contexts/marker";

interface CreateMarkerSlideProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CreateMarkerSlide: React.FC<CreateMarkerSlideProps> = ({ isOpen, onToggle }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [location, setLocation] = useState("");

  const { selectedPosition, addNewMarker, setSelectedPosition } = useMarker();

  function handleGetCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;

        setSelectedPosition({
          ...selectedPosition,
          position: [latitude, longitude]
        });
      });
    }
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value: type } = event.currentTarget;

    setSelectedPosition({
      ...selectedPosition,
      type
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { position, type } = selectedPosition;

    if (position === null) {
      return;
    }

    addNewMarker({
      name,
      description,
      cover,
      location,
      coverUpdatedAt: new Date(),
      position,
      type
    });
    setSelectedPosition({
      position: null,
      type: "blue"
    });
    onToggle();
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
        <form onSubmit={handleSubmit}>
          <Text fontSize="3xl" color="gray.700" mb="2">Cadastro</Text>
          <Input
            placeholder='Nome'
            color='black'
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
          <Input
            placeholder='Imagem'
            color='black'
            mt='2'
            value={cover}
            onChange={(event) => setCover(event.currentTarget.value)}
            required
          />
          <Textarea
            placeholder='Descrição'
            color='black'
            mt='2'
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            required
          />
          <HStack mt='2'>
            <Input
              placeholder='Lat'
              color='black'
              value={selectedPosition?.position === null ? '' : selectedPosition?.position[0]}
              required
              disabled
            />
            <Input
              placeholder='Long'
              color='black'
              value={selectedPosition?.position === null ? '' : selectedPosition?.position[1]}
              required
              disabled
            />
            <IconButton
              bg="blue.400"
              aria-label="Pressione para marcar uma região"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<FaMapMarkerAlt color="white" />}
              onClick={handleGetCurrentLocation}
            />
          </HStack>
          <Select
            mt='2'
            cursor="pointer"
            color="gray.700"
            defaultValue='blue'
            onChange={handleSelectChange}
            value={selectedPosition.type}
            required
          >
            <option value='blue' disabled>Tipo de Marcação</option>
            <option value='hidrante de coluna'>Hidrante de Coluna</option>
            <option value='registro'>Registro</option>
          </Select>
          <Input
            mt='2'
            placeholder='Localização'
            color='black'
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
            required
          />
          
          <Button
            type="submit"
            bg="blue.400"
            color="white"
            w="full"
            mt="2"
            _hover={{ filter: "brightness(0.9)" }}
            _active={{ filter: "brightness(0.8)" }}
            disabled={selectedPosition.position === null || name === "" || description === "" || location === "" || cover === "" || selectedPosition.type === "blue"}
          >
            Confirmar
          </Button>
        </form>
      </Box>
    </Slide>
  )
}