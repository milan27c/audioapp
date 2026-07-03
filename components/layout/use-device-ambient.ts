"use client";

import { useEffect } from "react";
import { useAmbientPalette } from "@/components/layout/ambient-context";

// Deep, dark shades of our own primary/neon tokens (primary-950/900/800/700 +
// neon-magenta) — the fixed device-control background shared by every screen
// that isn't a live playback view (Mode, Equalizer, Light, Link, Settings).
export const DEVICE_PALETTE = ["#1C0818", "#310E29", "#431339", "#57184A", "#EE2BC7"];
export const DEVICE_SPEED = 2.5;

/**
 * Pins the ambient background to the fixed device palette while mounted, and
 * locks it so PlaybackAmbientSync can't overwrite it with the current song's
 * (or radio's) colors. Releases the lock on unmount.
 */
export function useDeviceAmbient() {
  const { setPalette, setSpeed, setLocked } = useAmbientPalette();

  useEffect(() => {
    setPalette(DEVICE_PALETTE);
    setSpeed(DEVICE_SPEED);
    setLocked(true);
    return () => setLocked(false);
  }, [setPalette, setSpeed, setLocked]);
}
