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

export const currentTrack: Track = {
  id: "1",
  title: "Woke up to neon skies",
  artist: "Electric blue",
  album: "The city hums a secret",
  genre: "HIP HOP",
  duration: 180,
  artwork:
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80&auto=format&fit=crop",
  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

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
