"use client";

import { useEffect, useRef, useState } from "react";
import { NowPlayingHeader } from "@/components/audio/now-playing-header";
import { RotaryDial } from "@/components/audio/rotary-dial";
import { ProgressBar } from "@/components/audio/progress-bar";
import { TransportControls } from "@/components/audio/transport-controls";
import { useAmbientPalette } from "@/components/layout/ambient-context";
import { extractPalette } from "@/lib/extract-palette";
import { currentTrack, deviceStatus } from "@/lib/mock-data";

export function NowPlayingScreen() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(currentTrack.duration);
  const [playing, setPlaying] = useState(false);
  const { setPalette } = useAmbientPalette();

  useEffect(() => {
    let cancelled = false;
    extractPalette(currentTrack.artwork).then((colors) => {
      if (!cancelled) setPalette(colors);
    });
    return () => {
      cancelled = true;
    };
  }, [setPalette]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setElapsed(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setElapsed(time);
  };

  const progress = duration > 0 ? elapsed / duration : 0;

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

      <NowPlayingHeader deviceName={deviceStatus.name} connection={deviceStatus.connection} />

      <div className="mt-4 flex justify-center">
        <RotaryDial
          artwork={currentTrack.artwork}
          alt={currentTrack.album}
          progress={progress}
          playing={playing}
        />
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <h1 className="text-lg font-semibold text-foreground">{currentTrack.title}</h1>
        <p className="text-sm text-foreground/60">{currentTrack.artist}</p>
      </div>

      <div className="mt-6">
        <ProgressBar elapsed={elapsed} duration={duration} onSeek={handleSeek} />
      </div>

      <div className="mt-5">
        <TransportControls playing={playing} onTogglePlay={togglePlay} />
      </div>
    </div>
  );
}
