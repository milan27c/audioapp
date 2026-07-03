"use client";

import { ListMusic, SkipBack, Play, Pause, SkipForward, Shuffle } from "lucide-react";

export function TransportControls({
  playing,
  onTogglePlay,
  onPrevious,
  onNext,
}: {
  playing: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-2">
      <button
        type="button"
        aria-label="Queue"
        className="knob-btn flex size-9 items-center justify-center rounded-full transition-transform"
      >
        <ListMusic className="size-[17px]" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrevious}
        className="knob-btn flex size-12 items-center justify-center rounded-full transition-transform"
      >
        <SkipBack className="size-6" strokeWidth={1.75} fill="currentColor" />
      </button>

      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={onTogglePlay}
        className="knob-btn-primary flex size-16 items-center justify-center rounded-full transition-transform"
      >
        {playing ? (
          <Pause className="size-7" strokeWidth={1.75} fill="currentColor" />
        ) : (
          <Play className="ml-0.5 size-7" strokeWidth={1.75} fill="currentColor" />
        )}
      </button>

      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className="knob-btn flex size-12 items-center justify-center rounded-full transition-transform"
      >
        <SkipForward className="size-6" strokeWidth={1.75} fill="currentColor" />
      </button>

      <button
        type="button"
        aria-label="Shuffle"
        className="knob-btn flex size-9 items-center justify-center rounded-full transition-transform"
      >
        <Shuffle className="size-[17px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}
