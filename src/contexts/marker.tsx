import React, { createContext, useContext, useEffect, useState } from "react";

// Firebase
import { database, storage } from "../services/firebase";
import {
  ref as databaseRef,
  push as databasePush,
  remove as databaseRemove,
  onValue as databaseOnValue,
} from "firebase/database";
import {
  deleteObject as storageDelete,
  ref as storageRef
} from "firebase/storage";

export type MarkerTypeEnum = 'registro' | 'hidrante de coluna' | 'blue' | string;

export type Marker = {
  id?: string;
  name: string;
  type: MarkerTypeEnum;
  description: string;
  cover: string;
  coverUpdatedAt: Date;
  position: [number, number];
  location: string;
  extra?: string;
}

type FirebaseMarker = {
  [key: string]: Marker
}

export type SelectedPosition = {
  position: [number, number] | null;
  type: MarkerTypeEnum;
}

interface MarkerContextProps {
  selectedMarker: Marker;
  setSelectedMarker: (marker: Marker) => void;
  selectedPosition: SelectedPosition;
  setSelectedPosition: React.Dispatch<React.SetStateAction<SelectedPosition>>;
  markers: Marker[];
  setMarkers: (markers: Marker[]) => void;
  addNewMarker: (marker: Marker) => void;
  deleteMarker: (marker: Marker) => void;
}

const MarkerContext = createContext<MarkerContextProps | null>(null);

export const MarkerProvider: React.FC = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState<Marker>({} as Marker);
  const [selectedPosition, setSelectedPosition] = useState<SelectedPosition>({
    position: null,
    type: "blue"
  } as SelectedPosition);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const markerRef = databaseRef(database, 'markers');

    databaseOnValue(markerRef, (snapshot) => {
      const data: FirebaseMarker = snapshot.val();

      const parsedMarkers = Object.entries(data ?? {}).map(([key, value]) => {
        return {
          id: key,
          ...value
        }
      });

      if (data !== null) {
        setMarkers(parsedMarkers);
      }
    })
  }, []);

  async function addNewMarker(marker: Marker) {
    const markerRef = databaseRef(database, 'markers');

    await databasePush(markerRef, marker);
    setMarkers([
      ...markers,
      marker
    ]);
  }

  async function deleteMarker(marker: Marker) {
    // Remove marker from database
    const markerRef = databaseRef(database, `markers/${marker.id}`);
    await databaseRemove(markerRef);

    // Remove cover from storage
    const coverRef = storageRef(storage, marker.cover);
    await storageDelete(coverRef);
  
    const newMarkerList = markers.filter((value) => value !== marker);
    setMarkers(newMarkerList);
  }

  return (
    <MarkerContext.Provider value={{
      selectedMarker,
      setSelectedMarker,
      selectedPosition,
      setSelectedPosition,
      markers,
      setMarkers,
      addNewMarker,
      deleteMarker
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
