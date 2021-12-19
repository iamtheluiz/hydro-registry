import ReactDOMServer  from 'react-dom/server';
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Leaflet from 'leaflet';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Marker as MarkerType, useMarker } from "../contexts/marker";

// Icons
import { FaMapMarkerAlt } from "react-icons/fa";

// Styles
import "leaflet/dist/leaflet.css";  // Map Style
import { themeObject } from "../styles/theme";

// Components
import { MarkerModal } from "../components/MarkerModal";

const icon = Leaflet.divIcon({
  html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color={themeObject.colors.custom[500]} />),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const Map = () => {
  const initialPosition = { lat: -24.1819477, lng: -46.7920167 };

  const { markers } = useMarker();

  const [selectedMarker, setSelectedMarker] = useState<MarkerType>({} as MarkerType);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!modalIsOpen) {
      setSelectedMarker({} as MarkerType);
    }
  }, [modalIsOpen]);

  return (
    <Box w="full">
      {selectedMarker.cover && (
        <MarkerModal
          marker={selectedMarker}
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
        />
      )}
      <MapContainer
        center={initialPosition}
        zoom={13}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(marker => (
          <Marker
            icon={icon}
            position={marker.position}
            eventHandlers={{ click: () => { setSelectedMarker(marker); setModalIsOpen(true); }}}
          />
        ))}
      </MapContainer>
    </Box>
  )
}