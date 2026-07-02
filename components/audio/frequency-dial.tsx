"use client";

import { useMemo, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RadioStation } from "@/lib/mock-data";

const PX_PER_MHZ = 40;
const MINOR_STEP = 0.1;
const SNAP_THRESHOLD = 0.15;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function FrequencyDial({
  frequency,
  onFrequencyChange,
  stations,
  min,
  max,
}: {
  frequency: number;
  onFrequencyChange: (freq: number) => void;
  stations: RadioStation[];
  min: number;
  max: number;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startFreqRef = useRef(0);

  const ticks = useMemo(() => {
    const list: { freq: number; isMajor: boolean; station?: RadioStation }[] = [];
    const steps = Math.round((max - min) / MINOR_STEP);
    for (let i = 0; i <= steps; i++) {
      const freq = +(min + i * MINOR_STEP).toFixed(1);
      list.push({
        freq,
        isMajor: Number.isInteger(freq),
        station: stations.find((s) => Math.abs(s.frequency - freq) < 0.05),
      });
    }
    return list;
  }, [min, max, stations]);

  const position = (freq: number) => (freq - min) * PX_PER_MHZ;

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startFreqRef.current = frequency;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const deltaPx = e.clientX - startXRef.current;
    const next = clamp(startFreqRef.current - deltaPx / PX_PER_MHZ, min, max);
    onFrequencyChange(+next.toFixed(2));
  }

  function handlePointerUp() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);

    const nearestStation = stations.reduce<RadioStation | null>((closest, station) => {
      const distance = Math.abs(station.frequency - frequency);
      if (distance > SNAP_THRESHOLD) return closest;
      if (!closest || distance < Math.abs(closest.frequency - frequency)) return station;
      return closest;
    }, null);

    onFrequencyChange(nearestStation ? nearestStation.frequency : +frequency.toFixed(1));
  }

  return (
    <div
      className="relative h-24 w-full touch-none select-none overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.div
        className="absolute top-0 left-1/2 h-full"
        animate={{ x: -position(frequency) }}
        transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
      >
        {ticks.map(({ freq, isMajor, station }) => {
          const isActive = !!station && Math.abs(freq - frequency) < 0.05;
          return (
            <div
              key={freq}
              className="absolute bottom-6 flex -translate-x-1/2 flex-col-reverse items-center"
              style={{ left: position(freq) }}
            >
              <div
                className={cn(
                  "w-[2px] rounded-full",
                  station ? "bg-primary-500" : "bg-foreground/25",
                  isActive && "glow-primary",
                )}
                style={{ height: station ? 32 : isMajor ? 20 : 10 }}
              />
              {isMajor && (
                <span className="mb-1 text-[10px] tabular-nums text-foreground/40">
                  {Math.round(freq)}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>

      <div className="glow-primary pointer-events-none absolute top-0 bottom-6 left-1/2 w-[2px] -translate-x-1/2 bg-primary-500" />
      <div className="glow-primary pointer-events-none absolute bottom-5 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-primary-500" />
    </div>
  );
}
