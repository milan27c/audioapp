"use client";

import { cn } from "@/lib/utils";
import type { EqPreset } from "@/lib/mock-data";

export function EqPresets({
  presets,
  activePreset,
  onSelectPreset,
}: {
  presets: EqPreset[];
  activePreset: string | null;
  onSelectPreset: (preset: EqPreset) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {presets.map((preset) => {
        const isActive = preset.name === activePreset;
        return (
          <button
            key={preset.name}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-transform active:scale-95",
              isActive ? "knob-btn-primary" : "knob-btn",
            )}
          >
            {preset.name}
          </button>
        );
      })}
    </div>
  );
}
