import React, { createContext, useContext, useState } from "react";

export type Marker = {
  name: string;
  description: string;
  cover: string;
  coverUpdatedAt: Date;
  position: [number, number];
  location: string;
  extra?: string;
}

interface MarkerContextProps {
  markers: Marker[];
  setMarkers: (markers: Marker[]) => void;
}

const MarkerContext = createContext<MarkerContextProps | null>(null);

export const MarkerProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = useState<Marker[]>([
    {
      name: 'Hidrante de Coluna - Rua Samambaia',
      description: 'Hidrante de coluna funcional dentro dos parametros exigidos.',
      cover: 'https://www.bucka.com.br/wp-content/uploads/2017/10/Como-funciona-um-hidrante-1.jpg',
      coverUpdatedAt: new Date(),
      position: [-24.166623, -46.760676],
      location: 'Rua Samambaia, número 125'
    }
  ]);

  return (
    <MarkerContext.Provider value={{
      markers,
      setMarkers
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
