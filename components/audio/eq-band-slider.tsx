"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";

const TRACK_HEIGHT = 168;

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
        <div className="absolute inset-y-0 w-[3px] rounded-full bg-foreground/15" />

        <motion.div
          className="glow-primary absolute w-[3px] rounded-full bg-primary-500"
          initial={false}
          animate={{
            top: Math.min(centerTop, valueTop),
            height: Math.abs(valueTop - centerTop),
          }}
          transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        />

        <div
          className="absolute size-1.5 -translate-x-1/2 rounded-full bg-foreground/30"
          style={{ top: centerTop, left: "50%" }}
        />

        <motion.div
          className="glow-primary absolute -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-primary-500 active:cursor-grabbing"
          style={{ left: "50%", width: 18, height: 18 }}
          initial={false}
          animate={{ top: valueTop }}
          transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
          whileTap={{ scale: 1.15 }}
        />
      </div>

      <span className="text-[10px] tabular-nums text-foreground/50">{label}</span>
    </div>
  );
}
