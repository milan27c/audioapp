"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const SIZE = 264;
const CENTER = SIZE / 2;
const TICK_RADIUS = 125;
const PROGRESS_RADIUS = 109;
const ARTWORK_RADIUS = 91;
const TICK_COUNT = 72;

// Deterministic pseudo-random per tick index — integer-only hash (no trig,
// which can differ by a ULP between server/browser JS engines and trip
// React hydration) so server and client always agree.
function seededRandom(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Ticks must stay within the gap between the tick ring and the progress
// arc (TICK_RADIUS - PROGRESS_RADIUS) or the vibration peaks spike through
// the arc into the artwork.
const TICK_GAP = TICK_RADIUS - PROGRESS_RADIUS;

const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => {
  const base = 4 + seededRandom(i) * 4; // resting length: 4–8px
  const peak = Math.min(base + 3 + seededRandom(i + 100) * 5, TICK_GAP - 2); // vibrating peak, capped
  const duration = 0.5 + seededRandom(i + 200) * 0.7;
  const delay = seededRandom(i + 300) * 0.6;
  return { base, peak, duration, delay };
});

export function RotaryDial({
  artwork,
  alt,
  progress,
  playing,
}: {
  artwork: string;
  alt: string;
  progress: number;
  playing: boolean;
}) {
  const circumference = 2 * Math.PI * PROGRESS_RADIUS;
  const dashOffset = circumference * (1 - progress);
  const angle = progress * 360 - 90;
  const knobX = CENTER + PROGRESS_RADIUS * Math.cos((angle * Math.PI) / 180);
  const knobY = CENTER + PROGRESS_RADIUS * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0"
      >
        <g>
          {TICKS.map(({ base, peak, duration, delay }, i) => {
            const tickAngle = (i / TICK_COUNT) * 360;
            const isActive = tickAngle <= progress * 360;
            const y1 = CENTER - TICK_RADIUS;
            return (
              <motion.line
                key={i}
                x1={CENTER}
                y1={y1}
                x2={CENTER}
                initial={false}
                animate={{
                  y2: playing ? [y1 + base, y1 + peak, y1 + base] : y1 + base,
                }}
                transition={
                  playing
                    ? { duration, delay, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.3 }
                }
                stroke={isActive ? "var(--color-primary-400)" : "currentColor"}
                strokeOpacity={isActive ? 0.85 : 0.18}
                strokeWidth={2.5}
                strokeLinecap="round"
                transform={`rotate(${tickAngle} ${CENTER} ${CENTER})`}
              />
            );
          })}
        </g>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={PROGRESS_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={4}
        />

        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={PROGRESS_RADIUS}
          fill="none"
          stroke="var(--color-foreground)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          className="glow-primary"
        />

        <motion.circle
          cx={knobX}
          cy={knobY}
          r={7}
          fill="var(--color-foreground)"
          className="glow-primary"
          animate={{ scale: playing ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        className="absolute overflow-hidden rounded-full"
        style={{
          width: ARTWORK_RADIUS * 2,
          height: ARTWORK_RADIUS * 2,
          left: CENTER - ARTWORK_RADIUS,
          top: CENTER - ARTWORK_RADIUS,
        }}
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { duration: 24, repeat: Infinity, ease: "linear" }
            : { duration: 0.4 }
        }
      >
        <Image src={artwork} alt={alt} fill sizes="182px" className="object-cover" priority />
      </motion.div>
    </div>
  );
}
