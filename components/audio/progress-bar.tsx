"use client";

import type { CSSProperties } from "react";
import { formatTime } from "@/lib/utils";

export function ProgressBar({
  elapsed,
  duration,
  onSeek,
}: {
  elapsed: number;
  duration: number;
  onSeek: (time: number) => void;
}) {
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-xs tabular-nums text-foreground/50">
        {formatTime(elapsed)}
      </span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={elapsed}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Seek track position"
        className="progress-range w-full"
        style={{ "--progress": `${progress}%` } as CSSProperties}
      />
      <span className="shrink-0 text-xs tabular-nums text-foreground/50">
        {formatTime(duration)}
      </span>
    </div>
  );
}
