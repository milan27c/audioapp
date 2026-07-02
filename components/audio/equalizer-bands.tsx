"use client";

import { EqBandSlider } from "@/components/audio/eq-band-slider";
import type { EqBand } from "@/lib/mock-data";

const TRACK_HEIGHT = 168;

export function EqualizerBands({
  bands,
  min,
  max,
  onChange,
}: {
  bands: EqBand[];
  min: number;
  max: number;
  onChange: (index: number, value: number) => void;
}) {
  return (
    <div className="glass relative flex justify-between rounded-3xl px-3 py-6">
      <div
        className="pointer-events-none absolute inset-x-4 border-t border-dashed border-foreground/25"
        style={{ top: `calc(1.5rem + ${TRACK_HEIGHT / 2}px)` }}
      />

      {bands.map((band, i) => (
        <EqBandSlider
          key={band.label}
          label={band.label}
          value={band.value}
          min={min}
          max={max}
          onChange={(value) => onChange(i, value)}
        />
      ))}
    </div>
  );
}
