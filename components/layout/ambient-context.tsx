"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AmbientPaletteValue = {
  palette: string[];
  setPalette: (colors: string[]) => void;
  speed: number;
  setSpeed: (speed: number) => void;
};

const AmbientPaletteContext = createContext<AmbientPaletteValue | null>(null);

export function AmbientPaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPalette] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1);
  return (
    <AmbientPaletteContext.Provider value={{ palette, setPalette, speed, setSpeed }}>
      {children}
    </AmbientPaletteContext.Provider>
  );
}

export function useAmbientPalette() {
  const ctx = useContext(AmbientPaletteContext);
  if (!ctx) throw new Error("useAmbientPalette must be used within AmbientPaletteProvider");
  return ctx;
}
