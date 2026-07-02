"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Pause, Cast, Radio as RadioIcon } from "lucide-react";
import { usePlayback } from "@/components/layout/playback-context";
import { radioStations } from "@/lib/mock-data";

function findStation(freq: number) {
  return radioStations.find((s) => Math.abs(s.frequency - freq) < 0.05);
}

export function MiniPlayer() {
  const { source, currentSong, playing, elapsed, duration, togglePlay } = usePlayback();

  if (!source) return null;

  const isSong = source.kind === "song";
  const title = isSong ? currentSong.title : (findStation(source.frequency)?.name ?? "FM Radio");
  const subtitle = isSong ? currentSong.artist : `${source.frequency.toFixed(1)} MHz`;
  const href = isSong ? "/" : "/radio";
  // Radio has no meaningful duration — it's live, so the bar always reads full.
  const progress = isSong ? (duration > 0 ? (elapsed / duration) * 100 : 0) : 100;

  return (
    <div className="glass-nav pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-2xl py-2.5 pr-3 pl-2.5 shadow-lg">
      <Link href={href} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-primary-500">
          {isSong ? (
            <Image src={currentSong.artwork} alt={title} fill sizes="40px" className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <RadioIcon className="size-5 text-primary-50" strokeWidth={1.75} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="min-w-0 truncate text-sm font-medium text-foreground">{title}</p>
            {!isSong && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-success">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                LIVE
              </span>
            )}
          </div>
          <p className="truncate text-xs text-foreground/60">{subtitle}</p>
        </div>
      </Link>

      <button
        type="button"
        aria-label="Cast to device"
        className="flex size-8 shrink-0 items-center justify-center text-foreground/50 transition-transform active:scale-90"
      >
        <Cast className="size-[18px]" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={togglePlay}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-primary-50 transition-transform active:scale-90"
      >
        {playing ? (
          <Pause className="size-4" strokeWidth={1.75} fill="currentColor" />
        ) : (
          <Play className="ml-0.5 size-4" strokeWidth={1.75} fill="currentColor" />
        )}
      </button>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-foreground/10">
        <div className="h-full bg-primary-500 transition-[width]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
