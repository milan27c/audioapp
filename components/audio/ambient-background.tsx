"use client";

import { motion, useReducedMotion } from "framer-motion";

const FALLBACK_PALETTE = ["#80246D", "#EE2BC7", "#310E29"];

const BLOB_LAYOUT = [
  { size: 340, left: "-15%", top: "-20%", duration: 11 },
  { size: 320, left: "40%", top: "-15%", duration: 14 },
  { size: 300, left: "10%", top: "15%", duration: 12.5 },
];

function rotate<T>(arr: T[], n: number) {
  const i = n % arr.length;
  return [...arr.slice(i), ...arr.slice(0, i)];
}

export function AmbientBackground({
  colors,
  speed = 1,
}: {
  colors: string[];
  /** Multiplies animation speed — 1 is normal, 2 is twice as fast. */
  speed?: number;
}) {
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
            className="absolute rounded-full opacity-40 blur-[65px] dark:opacity-60"
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
                    x: [0, 50, -40, 15, 0],
                    y: [0, -36, 28, -12, 0],
                    scale: [1, 1.2, 0.88, 1.08, 1],
                  }
            }
            transition={{
              backgroundColor: {
                duration: (blob.duration * 1.6) / 3 / speed,
                repeat: Infinity,
                ease: "linear",
              },
              default: { duration: blob.duration / speed, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}
    </div>
  );
}
