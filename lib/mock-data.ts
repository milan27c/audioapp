export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  artwork: string;
  src: string;
};

// Served from /public so it's same-origin — required for the Web Audio EQ
// graph to process (and still hear) the audio; a cross-origin source without
// CORS headers would be muted once routed through Web Audio.
//
// Audio for "Dai Dai" is a royalty-free instrumental placeholder, not the
// actual commercial Shakira recording — mock/demo data only, not for
// distribution.
export const songs: Track[] = [
  {
    id: "2",
    title: "Dai Dai",
    artist: "Shakira",
    album: "FIFA World Cup 2026",
    genre: "Pop",
    duration: 205,
    artwork:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80&auto=format&fit=crop",
    src: "/audio/dai-dai.mp3",
  },
  {
    id: "1",
    title: "Woke up to neon skies",
    artist: "Electric blue",
    album: "The city hums a secret",
    genre: "Hip Hop",
    duration: 372,
    artwork:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80&auto=format&fit=crop",
    src: "/audio/song.mp3",
  },
];

export const currentTrack: Track = songs[0];

export const deviceStatus = {
  name: "AB-828",
  connection: "bluetooth" as const,
};

export type RadioStation = {
  frequency: number;
  name: string;
};

export const FM_MIN = 88.0;
export const FM_MAX = 108.0;

export const radioStations: RadioStation[] = [
  { frequency: 88.5, name: "Coastal Waves" },
  { frequency: 90.3, name: "Retro Replay" },
  { frequency: 92.7, name: "City Beats FM" },
  { frequency: 95.1, name: "Deep Focus" },
  { frequency: 97.8, name: "Night Drive" },
  { frequency: 101.2, name: "Indie Airwaves" },
  { frequency: 104.5, name: "Groove Garden" },
  { frequency: 107.9, name: "The Vault" },
];

export const defaultFavoriteFrequencies = [92.7, 95.1, 101.2, 104.5];

export const radioStreamSrc = "/audio/radio.mp3";

export type EqBand = {
  label: string;
  /** Center frequency in Hz — drives the Web Audio biquad filter. */
  frequency: number;
  /** Gain in dB (EQ_MIN_DB..EQ_MAX_DB). */
  value: number;
};

export const EQ_MIN_DB = -12;
export const EQ_MAX_DB = 12;

export const defaultEqBands: EqBand[] = [
  { label: "30 Hz", frequency: 30, value: 0 },
  { label: "63 Hz", frequency: 63, value: 4 },
  { label: "180 Hz", frequency: 180, value: -3 },
  { label: "460 Hz", frequency: 460, value: 1 },
  { label: "1 kHz", frequency: 1000, value: 8 },
  { label: "2 kHz", frequency: 2000, value: 3 },
  { label: "5 kHz", frequency: 5000, value: -1 },
  { label: "15 kHz", frequency: 15000, value: -1 },
];

export const eqFrequencies = defaultEqBands.map((b) => b.frequency);

export type EqPreset = {
  name: string;
  values: number[];
};

export const eqPresets: EqPreset[] = [
  { name: "Rock", values: [4, 3, -2, -1, 2, 4, 5, 5] },
  { name: "Rap", values: [6, 5, 2, 0, -1, 1, 3, 4] },
  { name: "Jazz", values: [2, 1, 0, 2, -1, -1, 1, 2] },
  { name: "Hip Hop", values: [7, 6, 1, -1, 0, 2, 3, 3] },
  { name: "Pop", values: [1, 2, 3, 4, 3, 1, 1, 2] },
  { name: "Classical", values: [3, 2, 1, 0, 0, 1, 2, 3] },
];
