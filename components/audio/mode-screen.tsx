"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Music2, Radio as RadioIcon } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { useAmbientPalette } from "@/components/layout/ambient-context";

// Deep, dark shades of our own primary/neon tokens (primary-950/800/700 +
// neon-magenta) — deliberately darker than the vivid song/radio palettes,
// but still saturated enough to read as neon. Fixed for the Mode screen:
// never swapped for the currently playing track/station's colors.
const MODE_PALETTE = ["#1C0818", "#310E29", "#431339", "#57184A", "#EE2BC7"];
const MODE_SPEED = 2.5;

export function ModeScreen() {
  const { setPalette, setSpeed, setLocked } = useAmbientPalette();

  useEffect(() => {
    setPalette(MODE_PALETTE);
    setSpeed(MODE_SPEED);
    setLocked(true);
    return () => setLocked(false);
  }, [setPalette, setSpeed, setLocked]);

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <AppBar />

      <div className="mt-12 flex flex-col items-center gap-12">
        <Link
          href="/track"
          className="knob-btn flex size-44 shrink-0 flex-col items-center justify-center gap-2 rounded-full active:scale-95"
        >
          <Music2 className="size-9" strokeWidth={1.5} />
          <span className="text-sm font-semibold">Music Tracks</span>
        </Link>

        <Link
          href="/radio"
          className="knob-btn flex size-44 shrink-0 flex-col items-center justify-center gap-2 rounded-full active:scale-95"
        >
          <RadioIcon className="size-9" strokeWidth={1.5} />
          <span className="text-sm font-semibold">Radio</span>
        </Link>
      </div>
    </div>
  );
}
