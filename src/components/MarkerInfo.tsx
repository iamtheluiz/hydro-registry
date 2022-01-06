import React, { useState } from "react"
import { Badge, Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Marker as MarkerType, useMarker } from "../contexts/marker"

// Components
import { DeleteWarningDialog } from "./DeleteWarningDialog";

// Icons
import { FaMapPin, FaRoute, FaTrash } from "react-icons/fa";

// Styles
import { mapIcons } from "../styles/mapIcons";

interface OnClickCenterMarkerProps {
  position: [number, number];
}

interface MarkerInfoProps {
  marker: MarkerType;
}

const OnClickCenterMarker: React.FC<OnClickCenterMarkerProps> = ({
  position, children
}) => {
  const map = useMap();

  function handleCenterMarker() {
    map.setView({ lat: position[0], lng: position[1] }, 38, {
      animate: true,
    });
  }

  return (
    <div onClick={handleCenterMarker}>
      {children}
    </div>
  )
}

export const MarkerInfo: React.FC<MarkerInfoProps> =({ marker }) => {
  const [showDeleteWarningDialog, setShowDeleteWarningDialog] = useState(false);
  const { deleteMarker } = useMarker();

  function handleGoToMarker() {
    window.open(`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${marker.position[0]},${marker.position[1]}`)
  }

  return (
    <>
      {showDeleteWarningDialog && (
        <DeleteWarningDialog
          isOpen={showDeleteWarningDialog}
          setIsOpen={setShowDeleteWarningDialog}
          name={marker.name}
          onConfirm={() => deleteMarker(marker)}
        />
      )}
      <Flex maxW='sm' h="full" direction="column" borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <MapContainer
          zoom={38}
          zoomControl={false}
          style={{ height: "240px", width: "100%" }}
          center={marker.position}
          position="relative"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <OnClickCenterMarker position={marker.position}>
            <Marker
              key={`${marker!.position[0]}-${marker!.position[1]}`}
              icon={mapIcons[marker.type]}
              position={marker.position}
            />
          </OnClickCenterMarker>
          <OnClickCenterMarker position={marker.position}>
            <IconButton
              zIndex="500"
              position="absolute"
              top="2"
              right="2"
              bg="blue.400"
              colorScheme="blue"
              aria-label="Centralizar mapa"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<FaMapPin color="white" />}
            />
          </OnClickCenterMarker>
        </MapContainer>

        <Flex p='6' direction="column" flex="1">
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='blue'>
              {marker.type}
            </Badge>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {marker.name}
          </Box>

          <Box>{marker.description}</Box>

          <Flex as='span' color='gray.600' fontSize='sm' flex="1" align="flex-end">{marker.location}</Flex>
          
          <HStack direction="row" justify="flex-end" align="flex-end" mt="2" spacing="1.5">
            <IconButton
              zIndex="1001"
              bg="blue.400"
              colorScheme="blue"
              aria-label="Pressione para marcar uma região"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<FaRoute color="white" />}
              onClick={() => handleGoToMarker()}
            />
            <IconButton
              zIndex="1001"
              bg="red.400"
              colorScheme="red"
              aria-label="Pressione para marcar uma região"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<FaTrash color="white" />}
              onClick={() => setShowDeleteWarningDialog(true)}
            />
          </HStack>
        </Flex>
      </Flex>
    </>
  )
}