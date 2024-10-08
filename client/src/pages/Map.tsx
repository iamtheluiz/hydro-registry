import { useEffect, useRef, useState } from "react";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LatLng, Map as MapType } from 'leaflet';
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import {
  useMarker,
  SelectedPosition,
  Marker as MarkerType
} from "../contexts/marker";

// Icons
import { FaPlus } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

// Styles
import { mapIcons } from "../styles/mapIcons";

// Components
import { MarkerModal } from "../components/MarkerModal";
import { SideSlide } from "../components/SideSlide";
import { MarkerForm } from "../components/MarkerForm";

export const Map = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [
    initialPosition,
    setInitialPosition
  ] = useState<[number, number] | null>(null);

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
      function(position) {
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

  function whenCreated(map: MapType) {
    map.on('click', (event: { latlng: LatLng}) => {
      const { lat, lng } = event.latlng;

      setSelectedPosition((prevState: SelectedPosition) => {
        const newState: SelectedPosition = {
          ...prevState,
          position: [lat, lng]
        }

        return newState;
      })
      toggleCreateMarkerSlide();
    })
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
        <IconButton
          zIndex="999"
          position="absolute"
          top="2"
          right="2"
          colorScheme="blue"
          aria-label="Pressione para marcar uma região"
          fontSize="lg"
          variant="solid"
          icon={<FaPlus color="white" />}
          onClick={toggleCreateMarkerSlide}
        />
        <IconButton
          zIndex="999"
          position="absolute"
          top="14"
          right="2"
          colorScheme="blue"
          aria-label="Pressione para ver a lista de marcações"
          fontSize="lg"
          variant="solid"
          icon={<BsFillGridFill color="white" />}
          onClick={handleNavigateToList}
        />
        {initialPosition !== null && (
          <MapContainer
            center={{
              lat: initialPosition[0],
              lng: initialPosition[1]
            }}
            zoom={13}
            zoomControl={false}
            style={{ height: "100vh" }}
            whenCreated={whenCreated}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
              url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            />
            {markers.map(marker => (
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
                eventHandlers={{ click: () => {
                  setSelectedPosition({
                    position: null,
                    type: "blue"
                  });
                  createMarkerSlideIsOpen && toggleCreateMarkerSlide();
                }}}
              />
            )}
          </MapContainer>
        )}
      </Box>
    </>
  )
}