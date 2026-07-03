"use client";

import { useState } from "react";
import { EqualizerBands } from "@/components/audio/equalizer-bands";
import { EQ_MIN_DB, EQ_MAX_DB, type EqBand } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const LABELS = ["Bass", "Treble", "Sub"];

const PRESETS: { name: string; values: number[] }[] = [
  { name: "Flat", values: [0, 0, 0] },
  { name: "Warm", values: [6, -2, 4] },
  { name: "Deep", values: [9, 0, 11] },
  { name: "Punch", values: [7, 5, 5] },
];

const DEFAULT = PRESETS[1];

export function BassPanel() {
  const [bands, setBands] = useState<EqBand[]>(
    LABELS.map((label, i) => ({ label, frequency: 0, value: DEFAULT.values[i] })),
  );
  const [activePreset, setActivePreset] = useState<string | null>(DEFAULT.name);

  function updateBand(index: number, value: number) {
    setActivePreset(null);
    setBands((prev) => prev.map((b, i) => (i === index ? { ...b, value } : b)));
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setActivePreset(preset.name);
    setBands((prev) => prev.map((b, i) => ({ ...b, value: preset.values[i] ?? b.value })));
  }

  return (
    <>
      <div className="mt-8">
        <EqualizerBands bands={bands} min={EQ_MIN_DB} max={EQ_MAX_DB} onChange={updateBand} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => applyPreset(preset)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-transform active:scale-95",
              activePreset === preset.name ? "knob-btn-primary" : "knob-btn",
            )}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </>
  );
}
