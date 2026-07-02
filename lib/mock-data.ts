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
