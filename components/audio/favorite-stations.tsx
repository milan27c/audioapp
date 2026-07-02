"use client";

import { cn } from "@/lib/utils";
import type { RadioStation } from "@/lib/mock-data";

export function FavoriteStations({
  frequencies,
  activeFrequency,
  stations,
  onSelect,
}: {
  frequencies: number[];
  activeFrequency: number;
  stations: RadioStation[];
  onSelect: (freq: number) => void;
}) {
  if (frequencies.length === 0) {
    return <p className="text-xs text-foreground/40">No favorites yet — tap the star to save a station.</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {frequencies.map((freq) => {
        const isActive = Math.abs(freq - activeFrequency) < 0.05;
        const station = stations.find((s) => Math.abs(s.frequency - freq) < 0.05);

        return (
          <button
            key={freq}
            type="button"
            onClick={() => onSelect(freq)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-0.5 rounded-2xl px-4 py-2.5 transition-transform active:scale-95",
              isActive ? "glow-primary bg-primary-500 text-primary-50" : "glass text-foreground",
            )}
          >
            <span className="text-sm font-semibold tabular-nums">{freq.toFixed(1)}</span>
            {station && (
              <span className="max-w-16 truncate text-[9px] opacity-70">{station.name}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
