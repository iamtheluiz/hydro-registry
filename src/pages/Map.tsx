import { useEffect, useState } from "react";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LatLng, Map as MapType } from 'leaflet';
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { Marker as MarkerType, useMarker } from "../contexts/marker";

// Icons
import { FaPlus } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

// Styles
import "leaflet/dist/leaflet.css";  // Map Style
import { mapIcons } from "../styles/mapIcons";

// Components
import { MarkerModal } from "../components/MarkerModal";
import { CreateMarkerSlide } from "../components/CreateMarkerSlide";

export const Map = () => {
  const initialPosition = { lat: -24.1819477, lng: -46.7920167 };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { markers, selectedMarker, setSelectedMarker, newMarker, setNewMarker, selectedPosition, setSelectedPosition } = useMarker();
  const navigate = useNavigate();

  const {
    isOpen: createMarkerSlideIsOpen,
    onToggle: toggleCreateMarkerSlide
  } = useDisclosure();

  useEffect(() => {
    if (!modalIsOpen) {
      setSelectedMarker({} as MarkerType);
    }
  }, [modalIsOpen]);

  function whenCreated(map: MapType) {
    map.on('click', (event: { latlng: LatLng}) => {
      const { lat, lng } = event.latlng;
      setSelectedPosition([lat, lng]);
      toggleCreateMarkerSlide();
    })
  }

  function handleOpenCreateMarkerSlide() {
    if (newMarker !== null) {
      toggleCreateMarkerSlide();
    } else {
      alert('Selecione um ponto no mapa para adicionar uma nova marcação!')
    }
  }
  
  function handleNavigateToList() {
    navigate('/list');
  }

  return (
    <Box w="full">
      {selectedMarker.cover && (
        <MarkerModal
          marker={selectedMarker}
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
        />
      )}
      <IconButton
        zIndex="1001"
        position="absolute"
        top="2"
        right="2"
        bg="blue.400"
        colorScheme="blue"
        aria-label="Pressione para marcar uma região"
        size="md"
        fontSize="lg"
        variant="solid"
        icon={<FaPlus color="white" />}
        onClick={handleOpenCreateMarkerSlide}
      />
      <IconButton
        zIndex="999"
        position="absolute"
        top="14"
        right="2"
        bg="blue.400"
        colorScheme="blue"
        aria-label="Pressione para marcar uma região"
        size="md"
        fontSize="lg"
        variant="solid"
        icon={<BsFillGridFill color="white" />}
        onClick={handleNavigateToList}
      />
      <CreateMarkerSlide isOpen={createMarkerSlideIsOpen} onToggle={toggleCreateMarkerSlide} />
      <MapContainer
        center={initialPosition}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh" }}
        whenCreated={whenCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(marker => (
          <Marker
            key={`${marker.position[0]}-${marker.position[1]}`}
            icon={mapIcons[marker.type]}
            position={marker.position}
            eventHandlers={{ click: () => { setSelectedMarker(marker); setModalIsOpen(true); }}}
          />
        ))}
        {(selectedPosition !== null && newMarker !== null) && (
          <Marker
            key={`${newMarker!.position[0]}-${newMarker!.position[1]}`}
            icon={mapIcons[newMarker.type]}
            position={selectedPosition}
            eventHandlers={{ click: () => {
              setNewMarker(null);
              setSelectedPosition(null);
              toggleCreateMarkerSlide();
            }}}
          />
        )}
      </MapContainer>
    </Box>
  )
}