"use client";

import { useEffect, useState } from "react";
import { usePlayback } from "@/components/layout/playback-context";
import { useAmbientPalette } from "@/components/layout/ambient-context";
import { extractPalette } from "@/lib/extract-palette";

// Shades pulled from the app's own primary/neon tokens (primary-400,
// primary-500, neon-magenta, accent-pink) so the radio's ambient glow reads
// as "our brand" rather than an arbitrary palette.
const RADIO_PALETTE = ["#A66699", "#80246D", "#EE2BC7", "#F53D99"];
const RADIO_SPEED = 2;
const SONG_SPEED = 1;

/**
 * Drives the ambient background from what's actually playing globally,
 * rather than each screen picking its own fixed palette. Song → colors
 * extracted from the current song's artwork (re-extracted whenever the
 * song changes — e.g. hitting next/previous); radio → the brand palette at
 * a faster cycle. Applied on every screen so the background always matches
 * reality.
 */
export function PlaybackAmbientSync() {
  const { source, currentSong } = usePlayback();
  const { setPalette, setSpeed } = useAmbientPalette();
  const [songPalette, setSongPalette] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    extractPalette(currentSong.artwork).then((colors) => {
      if (!cancelled) setSongPalette(colors);
    });
    return () => {
      cancelled = true;
    };
  }, [currentSong.artwork]);

  useEffect(() => {
    if (source?.kind === "radio") {
      setPalette(RADIO_PALETTE);
      setSpeed(RADIO_SPEED);
    } else {
      setPalette(songPalette);
      setSpeed(SONG_SPEED);
    }
  }, [source, songPalette, setPalette, setSpeed]);

  return null;
}
