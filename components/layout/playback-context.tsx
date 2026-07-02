"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  songs,
  radioStreamSrc,
  defaultEqBands,
  eqFrequencies,
  type EqBand,
  type Track,
} from "@/lib/mock-data";

export type PlaybackSource = { kind: "song" } | { kind: "radio"; frequency: number };

type PlaybackValue = {
  source: PlaybackSource | null;
  currentSong: Track;
  playing: boolean;
  elapsed: number;
  duration: number;
  eqBands: EqBand[];
  playSong: () => void;
  playRadio: (frequency: number) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  stop: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setEqBand: (index: number, value: number) => void;
  setEqValues: (values: number[]) => void;
};

const PlaybackContext = createContext<PlaybackValue | null>(null);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadedSrcRef = useRef<string | null>(null);

  // Web Audio graph — created once, on the first user-initiated play.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filtersRef = useRef<BiquadFilterNode[]>([]);

  const [source, setSource] = useState<PlaybackSource | null>(null);
  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [eqBands, setEqBands] = useState<EqBand[]>(defaultEqBands);

  const currentSong = songs[songIndex];
  const desiredSrc = source == null ? null : source.kind === "song" ? currentSong.src : radioStreamSrc;

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

  // Build the EQ graph lazily: source → 8 biquad filters in series → output.
  // Must run after a user gesture (AudioContext starts suspended otherwise).
  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioCtxRef.current) return;

    const AudioCtx = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const source = ctx.createMediaElementSource(audio);

    const filters = eqFrequencies.map((freq, i) => {
      const filter = ctx.createBiquadFilter();
      filter.type = i === 0 ? "lowshelf" : i === eqFrequencies.length - 1 ? "highshelf" : "peaking";
      filter.frequency.value = freq;
      filter.Q.value = 1;
      filter.gain.value = defaultEqBands[i].value;
      return filter;
    });

    source.connect(filters[0]);
    for (let i = 0; i < filters.length - 1; i++) filters[i].connect(filters[i + 1]);
    filters[filters.length - 1].connect(ctx.destination);

    audioCtxRef.current = ctx;
    filtersRef.current = filters;
  }, []);

  // Push gain changes to the live filter nodes.
  useEffect(() => {
    const filters = filtersRef.current;
    eqBands.forEach((band, i) => {
      if (filters[i]) filters[i].gain.value = band.value;
    });
  }, [eqBands]);

  // Reload the media only when the actual URL changes — switching songs (or
  // song↔radio) reloads, but retuning radio frequency doesn't, and toggling
  // play/pause on the same source doesn't restart it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !desiredSrc) return;

    if (loadedSrcRef.current !== desiredSrc) {
      loadedSrcRef.current = desiredSrc;
      audio.src = desiredSrc;
      audio.currentTime = 0;
      setElapsed(0);
    }

    if (playing) {
      audioCtxRef.current?.resume();
      audio.play();
    } else {
      audio.pause();
    }
  }, [desiredSrc, playing]);

  const playSong = useCallback(() => {
    ensureAudioGraph();
    setSource({ kind: "song" });
    setPlaying(true);
  }, [ensureAudioGraph]);

  const nextSong = useCallback(() => {
    ensureAudioGraph();
    setSongIndex((i) => (i + 1) % songs.length);
    setSource({ kind: "song" });
    setPlaying(true);
  }, [ensureAudioGraph]);

  const prevSong = useCallback(() => {
    ensureAudioGraph();
    setSongIndex((i) => (i - 1 + songs.length) % songs.length);
    setSource({ kind: "song" });
    setPlaying(true);
  }, [ensureAudioGraph]);

  const playRadio = useCallback(
    (frequency: number) => {
      ensureAudioGraph();
      setSource((prev) =>
        prev?.kind === "radio" && prev.frequency === frequency ? prev : { kind: "radio", frequency },
      );
      setPlaying(true);
    },
    [ensureAudioGraph],
  );

  const togglePlay = useCallback(() => {
    ensureAudioGraph();
    setPlaying((p) => !p);
  }, [ensureAudioGraph]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setElapsed(time);
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    setSource(null);
    loadedSrcRef.current = null;
  }, []);

  const setEqBand = useCallback((index: number, value: number) => {
    setEqBands((prev) => prev.map((band, i) => (i === index ? { ...band, value } : band)));
  }, []);

  const setEqValues = useCallback((values: number[]) => {
    setEqBands((prev) => prev.map((band, i) => ({ ...band, value: values[i] ?? band.value })));
  }, []);

  return (
    <PlaybackContext.Provider
      value={{
        source,
        currentSong,
        playing,
        elapsed,
        duration,
        eqBands,
        playSong,
        playRadio,
        togglePlay,
        seek,
        stop,
        nextSong,
        prevSong,
        setEqBand,
        setEqValues,
      }}
    >
      {/* crossOrigin unset is fine — audio is served same-origin from /public */}
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const ctx = useContext(PlaybackContext);
  if (!ctx) throw new Error("usePlayback must be used within PlaybackProvider");
  return ctx;
}
