import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  HStack,
  VStack,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { SelectedPosition, useMarker } from "../contexts/marker";

// Firebase
import { storage } from "../services/firebase";
import {
  ref as storageRef,
  uploadBytes as uploadBytesStorage
} from "firebase/storage";

// Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { CoverInput } from "./CoverInput";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { mapIcons } from "../styles/mapIcons";
import { LatLng, Map } from "leaflet";

interface NewMarkerFormProps {
  showTitle?: boolean;
  showMap?: boolean;
}

export const NewMarkerForm: React.FC<NewMarkerFormProps> = ({
  showTitle = true, showMap = false
}) => {
  const initialPosition = [-24.1819477, -46.7920167];
  const [selectedCover, setSelectedCover] = useState<File>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { selectedPosition, addNewMarker, setSelectedPosition } = useMarker();

  function whenCreated(map: Map) {
    map.on('click', (event: { latlng: LatLng}) => {
      const { lat, lng } = event.latlng;

      setSelectedPosition((prevState: SelectedPosition) => {
        const newState: SelectedPosition = {
          ...prevState,
          position: [lat, lng]
        }

        return newState;
      });
    })
  }

  function handleGetCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;

      setSelectedPosition({
        ...selectedPosition,
        position: [latitude, longitude]
      });
    });
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value: type } = event.currentTarget;

    setSelectedPosition({
      ...selectedPosition,
      type
    });
  }

  function handleResetForm() {
    setSelectedCover(undefined);
    setName("");
    setDescription("");
    setLocation("");
    setSelectedPosition({
      position: null,
      type: "blue"
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
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
      p="28px"
      color="gray.600"
      mt="2"
      bg="white"
      rounded="md"
    >
      <form id="MarkerForm" onSubmit={handleSubmit}>
        <VStack spacing="2">
          {showTitle && (
            <Text
              w="full"
              fontSize="3xl"
              color="gray.700"
              mb="2"
              textAlign="left"
            >
              Cadastro
            </Text>
          )}
          <CoverInput cover={selectedCover} setCover={setSelectedCover} />
          <FormControl isRequired>
            <FormLabel fontSize="sm" htmlFor="name">Nome da Marcação</FormLabel>
            <Input
              id="name"
              placeholder="Ex: Hidrante de Coluna - Bombeiros"
              color="gray.600"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm" htmlFor="type">Tipo</FormLabel>
            <Select
              id="type"
              cursor="pointer"
              color="gray.600"
              onChange={handleSelectChange}
              value={selectedPosition.type}
              required
            >
              <option value="blue" disabled>Selecione um Tipo</option>
              <option value="hidrante de coluna">Hidrante de Coluna</option>
              <option value="registro">Registro</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm" htmlFor="description">Descrição</FormLabel>
            <Textarea
              id="description"
              placeholder="Ex: Hidrante presente nos fundos do quartel dos bombeiros."
              color="gray.600"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm">Posição</FormLabel>
            {showMap && (
              <MapContainer
                center={{
                  lat: initialPosition[0],
                  lng: initialPosition[1],
                }}
                zoom={13}
                zoomControl={false}
                whenCreated={whenCreated}
                style={{ height: 300, borderRadius: "0.375rem" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {(selectedPosition.position !== undefined && selectedPosition.position !== null) && (
                  <Marker
                    key={`${selectedPosition!.position[0]}-${selectedPosition!.position[1]}`}
                    icon={mapIcons[selectedPosition.type]}
                    position={selectedPosition.position}
                  />
                )}
              </MapContainer>
            )}
            <HStack mt="2">
              <Input
                placeholder="Latitude"
                color="gray.700"
                value={selectedPosition?.position === null ? "" : selectedPosition?.position[0]}
                required
                disabled
              />
              <Input
                placeholder="Longitude"
                color="gray.700"
                value={selectedPosition?.position === null ? "" : selectedPosition?.position[1]}
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
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm" htmlFor="location">Localização</FormLabel>
            <Input
              id="location"
              placeholder="Ex: Avenida Ruy Barbosa, nº 000"
              color="black"
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              required
            />
          </FormControl>
          
          <HStack w="full" pt="4">
            <Button
              type="reset"
              colorScheme="gray"
              color="gray.800"
              w="full"
              onClick={handleResetForm}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              color="white"
              w="full"
              disabled={selectedPosition.position === null || name === "" || description === "" || location === "" || selectedPosition.type === "blue"}
            >
              Confirmar
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}