import React, { createContext, useContext, useEffect, useState } from "react";

export type MarkerTypeEnum = 'registro' | 'hidrante de coluna' | 'blue' | string;

export type Marker = {
  name: string;
  type: MarkerTypeEnum;
  description: string;
  cover: string;
  coverUpdatedAt: Date;
  position: [number, number];
  location: string;
  extra?: string;
}

interface MarkerContextProps {
  selectedMarker: Marker;
  setSelectedMarker: (marker: Marker) => void;
  newMarker: Marker | null;
  setNewMarker: (marker: Marker | null) => void;
  selectedPosition: [number, number] | null;
  setSelectedPosition: (position: [number, number] | null) => void;
  markers: Marker[];
  setMarkers: (markers: Marker[]) => void;
  addNewMarker: (marker: Marker) => void;
}

const MarkerContext = createContext<MarkerContextProps | null>(null);

export const MarkerProvider: React.FC = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState<Marker>({} as Marker);
  const [newMarker, setNewMarker] = useState<Marker | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([
    {
      name: 'Hidrante de Coluna - Rua Samambaia',
      type: 'hidrante de coluna',
      description: 'Hidrante de coluna funcional dentro dos parametros exigidos.',
      cover: 'https://www.bucka.com.br/wp-content/uploads/2017/10/Como-funciona-um-hidrante-1.jpg',
      coverUpdatedAt: new Date(),
      position: [-24.166623, -46.760676],
      location: 'Rua Samambaia, número 125'
    },
    {
      name: 'Registro de Gaveta - Hospital',
      type: 'registro',
      description: 'Registro muito louco atrás do hospital.',
      cover: 'https://www.araras.sp.gov.br/im/images/auto/14926_saema_registro.jpg',
      coverUpdatedAt: new Date(),
      position: [-24.180183, -46.783818],
      location: 'Rua Dom José Gaspar da Silva, número 103'
    }
  ]);

  useEffect(() => {
    if (selectedPosition) {
      if (newMarker === null) {
        setNewMarker({
          name: '',
          cover: '',
          coverUpdatedAt: new Date(),
          description: '',
          location: '',
          position: selectedPosition,
          type: 'blue'
        });
      } else {
        setNewMarker({
          ...newMarker,
          position: selectedPosition,
        })
      }
    }
  }, [selectedPosition])

  function addNewMarker(marker: Marker) {
    setMarkers([
      ...markers,
      marker
    ]);
  }

  return (
    <MarkerContext.Provider value={{
      selectedMarker,
      setSelectedMarker,
      newMarker,
      setNewMarker,
      selectedPosition,
      setSelectedPosition,
      markers,
      setMarkers,
      addNewMarker
    }}>
      {children}
    </MarkerContext.Provider>
  )
}

export function useMarker(): MarkerContextProps {
  const context = useContext(MarkerContext);

  if (!context) {
    throw new Error("useMarker must be used within a MarkerProvider");
  }

  return context;
}
