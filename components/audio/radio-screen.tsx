"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Star } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { FrequencyDial } from "@/components/audio/frequency-dial";
import { FavoriteStations } from "@/components/audio/favorite-stations";
import { usePlayback } from "@/components/layout/playback-context";
import { radioStations, FM_MIN, FM_MAX, defaultFavoriteFrequencies } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const MATCH_EPSILON = 0.05;

function findStation(freq: number) {
  return radioStations.find((s) => Math.abs(s.frequency - freq) < MATCH_EPSILON);
}

export function RadioScreen() {
  const { source, playing, playRadio, togglePlay } = usePlayback();
  const [frequency, setFrequencyState] = useState(
    source?.kind === "radio" ? source.frequency : radioStations[2].frequency,
  );
  const [favorites, setFavorites] = useState<number[]>(defaultFavoriteFrequencies);

  const isActiveSource = source?.kind === "radio";
  const isPlaying = isActiveSource && playing;

  const activeStation = findStation(frequency);
  const isFavorite = favorites.some((f) => Math.abs(f - frequency) < MATCH_EPSILON);
  const sortedStations = [...radioStations].sort((a, b) => a.frequency - b.frequency);

  // Tuning while the radio is the live/playing source updates the stream
  // immediately (like a real dial); otherwise it just moves the display.
  function setFrequency(next: number) {
    setFrequencyState(next);
    if (isActiveSource && playing) playRadio(next);
  }

  function goToStation(direction: 1 | -1) {
    if (direction === 1) {
      const next = sortedStations.find((s) => s.frequency > frequency + MATCH_EPSILON);
      setFrequency(next ? next.frequency : sortedStations[0].frequency);
    } else {
      const reversed = [...sortedStations].reverse();
      const prev = reversed.find((s) => s.frequency < frequency - MATCH_EPSILON);
      setFrequency(prev ? prev.frequency : reversed[0].frequency);
    }
  }

  function toggleFavorite() {
    setFavorites((prev) =>
      isFavorite
        ? prev.filter((f) => Math.abs(f - frequency) >= MATCH_EPSILON)
        : [...prev, +frequency.toFixed(1)].sort((a, b) => a - b),
    );
  }

  function handlePlayToggle() {
    if (isActiveSource) {
      togglePlay();
    } else {
      playRadio(frequency);
    }
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col px-4 pb-24">
      <AppBar back="/" />

      <div className="mt-10 flex flex-col items-center text-center">
        <span className="text-sm font-medium text-foreground/70">
          {activeStation ? activeStation.name : "No Station"}
        </span>

        <div className="mt-3 flex items-center gap-6">
          <button
            type="button"
            aria-label="Previous station"
            onClick={() => goToStation(-1)}
            className="knob-btn flex size-10 items-center justify-center rounded-full transition-transform"
          >
            <ChevronLeft className="size-6" strokeWidth={1.75} />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold tabular-nums text-foreground">
              {frequency.toFixed(1)}
            </span>
            <span className="mt-1 text-xs tracking-widest text-foreground/50">MHz</span>
          </div>

          <button
            type="button"
            aria-label="Next station"
            onClick={() => goToStation(1)}
            className="knob-btn flex size-10 items-center justify-center rounded-full transition-transform"
          >
            <ChevronRight className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={toggleFavorite}
          className="mt-4 flex size-10 items-center justify-center rounded-full glass transition-transform active:scale-90"
        >
          <Star
            className={cn(
              "size-[18px]",
              isFavorite ? "fill-primary-500 text-primary-500" : "text-foreground/50",
            )}
            strokeWidth={1.75}
          />
        </button>
      </div>

      <div className="mt-8">
        <FrequencyDial
          frequency={frequency}
          onFrequencyChange={setFrequency}
          stations={radioStations}
          min={FM_MIN}
          max={FM_MAX}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          aria-label={isPlaying ? "Stop" : "Play"}
          onClick={handlePlayToggle}
          className="knob-btn-primary flex size-16 items-center justify-center rounded-full transition-transform"
        >
          {isPlaying ? (
            <Pause className="size-7" strokeWidth={1.75} fill="currentColor" />
          ) : (
            <Play className="ml-0.5 size-7" strokeWidth={1.75} fill="currentColor" />
          )}
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-foreground">Favorite Stations</h2>
        <div className="mt-3">
          <FavoriteStations
            frequencies={favorites}
            activeFrequency={frequency}
            stations={radioStations}
            onSelect={setFrequency}
          />
        </div>
      </div>
    </div>
  );
}
