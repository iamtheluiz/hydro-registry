import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, IconButton, useDisclosure, Flex, Stack, Checkbox, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LatLng, Map as MapType } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";

import {
  useMarker,
  SelectedPosition,
  Marker as MarkerType
} from "../contexts/marker";

// Icons
import { FaLayerGroup, FaPlus } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

// Styles
import { mapIcons } from "../styles/mapIcons";

// Components
import { MarkerModal } from "../components/MarkerModal";
import { SideSlide } from "../components/SideSlide";
import { MarkerForm } from "../components/MarkerForm";
import { FaX } from "react-icons/fa6";
import { MapFilter } from "../types/map";
import { HTMLCheckboxElement } from "../types/inputs";

function SetMarkerOnClick({ placeMarker }: { placeMarker: (latlng: LatLng) => void }) {
  useMapEvent('click', (e: { latlng: LatLng }) => {
    placeMarker(e.latlng)
  })

  return null
}

export const Map = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [
    initialPosition,
    setInitialPosition
  ] = useState<[number, number] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mapLayersFilter, setMapLayersFilter] = useState<MapFilter[]>([
    {
      id: "hidrante de coluna",
      label: "Hidrante de Coluna",
      icon: null,
      checked: true
    },
    {
      id: "registro",
      label: "Registro",
      icon: null,
      checked: true
    },
  ])

  const {
    markers,
    selectedMarker,
    setSelectedMarker,
    selectedPosition,
    setSelectedPosition
  } = useMarker();
  const slideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    isOpen: createMarkerSlideIsOpen,
    onToggle: toggleCreateMarkerSlide,
  } = useDisclosure();

  // Get initial position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;

        setInitialPosition([latitude, longitude]);
      },
      () => {
        setInitialPosition([-24.1819477, -46.7920167]);
      }
    );
  }, []);

  // Info modal
  useEffect(() => {
    if (!modalIsOpen) {
      setSelectedMarker({} as MarkerType);
    }
  }, [modalIsOpen]);

  // Create new marker slide
  useEffect(() => {
    if (selectedPosition.position === null && createMarkerSlideIsOpen) {
      // Close slide
      toggleCreateMarkerSlide();
    }
  }, [selectedPosition]);

  function placeMarker(latlng: LatLng) {
    const { lat, lng } = latlng;

    setSelectedPosition((prevState: SelectedPosition) => {
      const newState: SelectedPosition = {
        ...prevState,
        position: [lat, lng]
      }

      return newState;
    })

    if (!createMarkerSlideIsOpen) {
      toggleCreateMarkerSlide()
    }
  }

  function handleMapLayerFilterSelection(e: ChangeEvent<HTMLCheckboxElement>, filter: MapFilter) {
    const serializedMapLayerFilters = mapLayersFilter.map(filterItem => {
      if (filterItem.id === filter.id) {
        return {
          ...filterItem,
          checked: e.target.checked
        }
      }
      return filterItem
    })

    setMapLayersFilter(serializedMapLayerFilters)
  }

  function handleNavigateToList() {
    navigate('/list');
  }

  return (
    <>
      {selectedMarker.id && (
        <MarkerModal
          marker={selectedMarker}
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
        />
      )}
      <Box w="full">
        <SideSlide
          isOpen={createMarkerSlideIsOpen}
          onToggle={toggleCreateMarkerSlide}
          ref={slideRef}
        >
          <MarkerForm scrollTopRef={slideRef.current} />
        </SideSlide>
        <Flex direction="column" alignItems="end" gap="2" zIndex="999" position="absolute" right="2" top="2">
          <IconButton
            colorScheme="blue"
            aria-label="Pressione para marcar uma região"
            fontSize="lg"
            variant="solid"
            w="10"
            icon={<FaPlus color="white" />}
            onClick={toggleCreateMarkerSlide}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Pressione para ver a lista de marcações"
            fontSize="lg"
            variant="solid"
            w="10"
            icon={<BsFillGridFill color="white" />}
            onClick={handleNavigateToList}
          />
          <Box
            transition="all 0.2s ease-in-out"
            height={isOpen ? 'full' : '10'}
            width={isOpen ? 'full' : '10'}
            minH="10"
            minW="10"
            borderRadius="md"
            padding={isOpen ? "4" : "0"}
            overflow={"hidden"}
            backgroundColor="#fff"
            cursor={!isOpen ? "pointer" : "default"}
            position="relative"
          >
            <IconButton
              display={isOpen ? "none" : "flex"}
              colorScheme="gray"
              backgroundColor="white"
              aria-label="Pressione para ver a lista de filtros"
              fontSize="lg"
              variant="solid"
              w="10"
              icon={<FaLayerGroup color="b9b9b9" />}
              onClick={() => setIsOpen(true)}
            />
            <FaX
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                cursor: "pointer",
                display: isOpen ? "flex" : "none"
              }}
              color="b9b9b9"
              onClick={() => setIsOpen(false)}
            />
            <Flex direction="column" justify="start" alignItems="start" display={isOpen ? "flex" : "none"}>
              <Text as="b">Filtros</Text>
              <Stack spacing={2} paddingTop={1} direction="column">
                {mapLayersFilter.map(filter => (
                  <Checkbox
                    key={filter.id}
                    checked={filter.checked}
                    defaultChecked={filter.checked}
                    onChange={event => handleMapLayerFilterSelection(event, filter)}
                  >
                    {filter.label}
                  </Checkbox>
                ))}
              </Stack>
            </Flex>
          </Box>
        </Flex>
        {initialPosition !== null && (
          <MapContainer
            center={{
              lat: initialPosition[0],
              lng: initialPosition[1]
            }}
            zoom={13}
            zoomControl={false}
            style={{ height: "100vh" }}
          >
            <SetMarkerOnClick placeMarker={placeMarker} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.filter(marker => mapLayersFilter.filter(f => f.checked).map(f => f.id).includes(marker.type)).map(marker => (
              <Marker
                key={`${marker.position[0]}-${marker.position[1]}`}
                icon={mapIcons[marker.type]}
                position={marker.position}
                eventHandlers={{
                  click: () => {
                    setSelectedMarker(marker);
                    setModalIsOpen(true);
                  }
                }}
              />
            ))}
            {(selectedPosition.position !== undefined && selectedPosition.position !== null) && (
              <Marker
                key={`${selectedPosition!.position[0]}-${selectedPosition!.position[1]}`}
                icon={mapIcons[selectedPosition.type]}
                position={selectedPosition.position}
                eventHandlers={{
                  click: () => {
                    setSelectedPosition({
                      position: null,
                      type: "blue"
                    });
                    createMarkerSlideIsOpen && toggleCreateMarkerSlide();
                  }
                }}
              />
            )}
          </MapContainer>
        )}
      </Box>
    </>
  )
}