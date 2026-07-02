"use client";

import { SlidersHorizontal, Waves, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export type EqTabKey = "equalizer" | "bass" | "mic";

const tabs: { key: EqTabKey; icon: typeof SlidersHorizontal; label: string }[] = [
  { key: "equalizer", icon: SlidersHorizontal, label: "Equalizer" },
  { key: "bass", icon: Waves, label: "Bass" },
  { key: "mic", icon: Mic, label: "Microphone" },
];

export function EqualizerTabs({
  active,
  onChange,
}: {
  active: EqTabKey;
  onChange: (tab: EqTabKey) => void;
}) {
  return (
    <div className="glass inline-flex items-center gap-1 rounded-full px-1.5 py-1.5">
      {tabs.map(({ key, icon: Icon, label }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => onChange(key)}
            className="flex size-10 items-center justify-center rounded-full transition-transform active:scale-90"
          >
            <Icon
              className={cn("size-5", isActive ? "text-primary-500 dark:text-white" : "text-foreground/50")}
              strokeWidth={1.75}
            />
          </button>
        );
      })}
    </div>
  );
}
