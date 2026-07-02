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
        className="flex size-10 items-center justify-center rounded-full text-foreground/70 transition-transform active:scale-90"
      >
        <ListMusic className="size-[19px]" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrevious}
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-transform active:scale-90"
      >
        <SkipBack className="size-6" strokeWidth={1.75} fill="currentColor" />
      </button>

      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={onTogglePlay}
        className="glow-primary flex size-16 items-center justify-center rounded-full bg-primary-500 text-primary-50 transition-transform active:scale-90"
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
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-transform active:scale-90"
      >
        <SkipForward className="size-6" strokeWidth={1.75} fill="currentColor" />
      </button>

      <button
        type="button"
        aria-label="Shuffle"
        className="flex size-10 items-center justify-center rounded-full text-foreground/70 transition-transform active:scale-90"
      >
        <Shuffle className="size-[19px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}
