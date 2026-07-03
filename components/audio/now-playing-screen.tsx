"use client";

import { AppBar } from "@/components/layout/app-bar";
import { RotaryDial } from "@/components/audio/rotary-dial";
import { ProgressBar } from "@/components/audio/progress-bar";
import { TransportControls } from "@/components/audio/transport-controls";
import { usePlayback } from "@/components/layout/playback-context";

export function NowPlayingScreen() {
  const {
    source,
    currentSong,
    playing,
    elapsed,
    duration,
    playSong,
    togglePlay,
    seek,
    nextSong,
    prevSong,
  } = usePlayback();

  const isActiveSource = source?.kind === "song";
  const displayElapsed = isActiveSource ? elapsed : 0;
  const displayDuration = isActiveSource && duration > 0 ? duration : currentSong.duration;
  const displayPlaying = isActiveSource && playing;

  function togglePlayPause() {
    if (isActiveSource) {
      togglePlay();
    } else {
      playSong();
    }
  }

  function handleSeek(time: number) {
    if (!isActiveSource) playSong();
    seek(time);
  }

  const progress = displayDuration > 0 ? displayElapsed / displayDuration : 0;

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <AppBar back="/" />

      <div className="mt-4 flex justify-center">
        <RotaryDial
          artwork={currentSong.artwork}
          alt={currentSong.album}
          progress={progress}
          playing={displayPlaying}
        />
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <h1 className="text-lg font-semibold text-foreground">{currentSong.title}</h1>
        <p className="text-sm text-foreground/60">{currentSong.artist}</p>
      </div>

      <div className="mt-6">
        <ProgressBar elapsed={displayElapsed} duration={displayDuration} onSeek={handleSeek} />
      </div>

      <div className="mt-5">
        <TransportControls
          playing={displayPlaying}
          onTogglePlay={togglePlayPause}
          onPrevious={prevSong}
          onNext={nextSong}
        />
      </div>
    </div>
  );
}
