import React, { createContext, useContext, useState, ReactNode } from "react";
import { Markers } from "@/models/Markers"; 
import { AnteriorMarkers, PosteriorMarkers, LateralRightMarkers, LateralLeftMarkers } from "@/assets/protocolMarkers";
import { KeySite } from "@/models/enums";

export type MarkersContextType = {
  markers: Markers[];
  markCaptured: (keySite: KeySite, captured?: boolean) => void;
  resetMarkers: () => void;
  checkAllCaptured: () => boolean;
};

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

type MarkersProviderProps = {
  children: ReactNode;
};

export const MarkersProvider: React.FC<MarkersProviderProps> = ({ children }) => {
  // Merge all fixed marker arrays into one initial state.
  const initialMarkers: Markers[] = [
    ...AnteriorMarkers,
    ...PosteriorMarkers,
    ...LateralRightMarkers,
    ...LateralLeftMarkers,
  ];

  const [markers, setMarkers] = useState<Markers[]>(initialMarkers);

  // Mark a specific marker as captured (or not)
  const markCaptured = (keySite: KeySite, captured: boolean = true) => {
    setMarkers(prev =>
      prev.map(marker =>
        marker.keySite === keySite ? { ...marker, isDone: captured } : marker
      )
    );
  };

  // Reset markers to the original fixed list.
  const resetMarkers = () => {
    setMarkers(initialMarkers);
  };

  const checkAllCaptured = () => {
    return markers.every(marker => marker.isDone);
  };

  

  return (
    <MarkersContext.Provider value={{ markers, markCaptured, resetMarkers, checkAllCaptured }}>
      {children}
    </MarkersContext.Provider>
  );
};

export const useMarkers = (): MarkersContextType => {
  const context = useContext(MarkersContext);
  if (!context) {
    throw new Error("useMarkers must be used within a MarkersProvider");
  }
  return context;
};