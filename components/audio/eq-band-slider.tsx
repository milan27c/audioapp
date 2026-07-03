"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TRACK_HEIGHT = 168;
const CAP_HEIGHT = 16;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function EqBandSlider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const startYRef = useRef(0);
  const startValueRef = useRef(0);

  const toTop = (v: number) => ((max - v) / (max - min)) * TRACK_HEIGHT;
  const centerTop = toTop(0);
  const valueTop = toTop(value);
  const isBoosted = value > 0;
  const isCut = value < 0;

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    startYRef.current = e.clientY;
    startValueRef.current = value;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const deltaY = startYRef.current - e.clientY;
    const deltaValue = (deltaY / TRACK_HEIGHT) * (max - min);
    onChange(Math.round(clamp(startValueRef.current + deltaValue, min, max)));
  }

  function handlePointerUp() {
    draggingRef.current = false;
    setIsDragging(false);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex w-9 touch-none items-center justify-center select-none"
        style={{ height: TRACK_HEIGHT }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Groove the cap rides in — recessed channel look */}
        <div
          className="absolute inset-y-0 w-2 rounded-full bg-black/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-black/40"
        />

        {/* Filled portion from the 0dB center to the current value */}
        <motion.div
          className={cn(
            "absolute w-2 rounded-full",
            isBoosted && "bg-gradient-to-t from-primary-600 to-neon-magenta",
            isCut && "bg-gradient-to-b from-primary-600 to-primary-800",
            !isBoosted && !isCut && "bg-primary-600/40",
          )}
          style={{
            boxShadow: isBoosted
              ? "0 0 10px 1px color-mix(in srgb, var(--color-neon-magenta) 60%, transparent)"
              : isCut
                ? "0 0 8px 1px color-mix(in srgb, var(--color-primary-500) 45%, transparent)"
                : undefined,
          }}
          initial={false}
          animate={{
            top: Math.min(centerTop, valueTop),
            height: Math.abs(valueTop - centerTop),
          }}
          transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* 0dB reference notch */}
        <div
          className="absolute h-[2px] w-4 -translate-x-1/2 rounded-full bg-white/25"
          style={{ top: centerTop, left: "50%" }}
        />

        {/* Fader cap — beveled 3D mixing-console style */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none active:cursor-grabbing"
          style={{ left: "50%", width: 28, height: CAP_HEIGHT }}
          initial={false}
          animate={{ top: valueTop, scale: isDragging ? 1.08 : 1 }}
          transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className={cn(
              "relative size-full rounded-[5px] border border-black/40",
              "bg-gradient-to-b from-primary-300 via-primary-500 to-primary-700",
              "shadow-[0_2px_4px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_2px_rgba(0,0,0,0.35)]",
              isDragging && "glow-magenta",
            )}
          >
            {/* center grip line */}
            <div className="absolute inset-x-1.5 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-black/30" />
            <div className="absolute inset-x-1.5 top-1/2 h-px -translate-y-[3px] rounded-full bg-white/25" />
          </div>
        </motion.div>
      </div>

      <span
        className={cn(
          "text-[10px] tabular-nums",
          value !== 0 ? "font-semibold text-primary-400" : "text-white/45",
        )}
      >
        {label}
      </span>
    </div>
  );
}
