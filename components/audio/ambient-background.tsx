"use client";

import { motion, useReducedMotion } from "framer-motion";

const FALLBACK_PALETTE = ["#80246D", "#EE2BC7", "#310E29"];

const BLOB_LAYOUT = [
  { size: 320, left: "-10%", top: "-15%", duration: 14 },
  { size: 300, left: "45%", top: "-10%", duration: 18 },
  { size: 300, left: "10%", top: "20%", duration: 16 },
  { size: 260, left: "60%", top: "25%", duration: 20 },
];

function rotate<T>(arr: T[], n: number) {
  const i = n % arr.length;
  return [...arr.slice(i), ...arr.slice(0, i)];
}

export function AmbientBackground({ colors }: { colors: string[] }) {
  const reducedMotion = useReducedMotion();
  const palette = colors.length >= 2 ? colors : FALLBACK_PALETTE;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOB_LAYOUT.map((blob, i) => {
        const sequence = rotate(palette, i);
        const colorLoop = [...sequence, sequence[0]];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-55 blur-[65px] dark:opacity-80"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.left,
              top: blob.top,
            }}
            animate={
              reducedMotion
                ? { backgroundColor: sequence[0] }
                : {
                    backgroundColor: colorLoop,
                    x: [0, 30, -24, 0],
                    y: [0, -24, 20, 0],
                    scale: [1, 1.15, 0.92, 1],
                  }
            }
            transition={{
              backgroundColor: {
                duration: (blob.duration * 1.6) / 3,
                repeat: Infinity,
                ease: "linear",
              },
              default: { duration: blob.duration, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}
    </div>
  );
}
