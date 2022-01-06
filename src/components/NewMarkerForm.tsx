import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  IconButton,
  Input,
  Select,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useMarker } from "../contexts/marker";
import { getCurrentPosition } from "../utils/getCurrentPosition";

// Firebase
import { storage } from "../services/firebase";
import {
  ref as storageRef,
  uploadBytes as uploadBytesStorage
} from "firebase/storage";

// Icons
import { FaMapMarkerAlt, FaImage } from "react-icons/fa";

export const NewMarkerForm: React.FC =() => {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");

  const [selectedCover, setSelectedCover] = useState<File>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { selectedPosition, addNewMarker, setSelectedPosition } = useMarker();

  function handleGetCurrentPosition() {
    const position = getCurrentPosition();

    if (position === null) return;

    setSelectedPosition({
      ...selectedPosition,
      position
    });
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files === null) return;

    const cover = files[0];
    const coverUrl = URL.createObjectURL(cover);

    setCoverPreviewUrl(coverUrl);
    setSelectedCover(cover);
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value: type } = event.currentTarget;

    setSelectedPosition({
      ...selectedPosition,
      type
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { position, type } = selectedPosition;

    if (position === null || selectedCover === undefined) {
      return;
    }

    const date = new Date();

    // Upload image to storage
    const coverUrl = `images/${date.getTime()}_${selectedCover.name}`;
    const coversCollection = storageRef(storage, coverUrl);

    await uploadBytesStorage(coversCollection, selectedCover);

    addNewMarker({
      name,
      description,
      cover: coverUrl,
      location,
      coverUpdatedAt: date,
      position,
      type
    });

    // Reset values
    setSelectedPosition({
      position: null,
      type: "blue"
    });
  }

  return (
    <Box
      p='28px'
      color='white'
      mt='2'
      bg='white'
      rounded='md'
      shadow='md'
    >
      <form id="MarkerForm" onSubmit={handleSubmit}>
        <VStack spacing="2">
          <Text w="full" fontSize="3xl" color="gray.700" mb="2" textAlign="left">Cadastro</Text>
          <label htmlFor="cover" style={{ width: "100%" }}>
            <Flex
              w="full"
              h="48"
              cursor="pointer"
              direction="column"
              justify="center"
              align="center"
              border="1px"
              borderColor="inherit"
              borderRadius="md"
              backgroundImage={coverPreviewUrl}
              backgroundSize="100% auto"
              backgroundPosition="50% 50%"
            >
              {coverPreviewUrl === '' && (
                <>
                  <FaImage color="#718096" size={32} />
                  <Text color="gray.500">Selecione uma imagem</Text>
                </>
              )}
            </Flex>
            <input
              type="file"
              name="cover"
              accept="image/*"
              id="cover"
              style={{ display: "none" }}
              onChange={handleCoverChange}
            />
          </label>
          <Input
            placeholder='Nome'
            color='black'
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
          <Select
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
          <Textarea
            placeholder='Descrição'
            color='black'
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            required
          />
          <HStack>
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
              aria-label="Pressione para marcar sua posição"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<FaMapMarkerAlt color="white" />}
              onClick={handleGetCurrentPosition}
            />
          </HStack>
          <Input
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
            _hover={{ filter: "brightness(0.9)" }}
            _active={{ filter: "brightness(0.8)" }}
            disabled={selectedPosition.position === null || name === "" || description === "" || location === "" || selectedPosition.type === "blue"}
          >
            Confirmar
          </Button>
        </VStack>
      </form>
    </Box>
  )
}