"use client";

import { AmbientBackground } from "@/components/audio/ambient-background";
import { useAmbientPalette } from "@/components/layout/ambient-context";

export function AmbientLayer() {
  const { palette, speed } = useAmbientPalette();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[50%] overflow-hidden"
      style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
    >
      <AmbientBackground colors={palette} speed={speed} />
    </div>
  );
}
