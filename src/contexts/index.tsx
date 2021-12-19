import React from "react";
import { MarkerProvider } from "./marker";

export const ApplicationProvider: React.FC = ({ children }) => (
  <MarkerProvider>
    {children}
  </MarkerProvider>
)