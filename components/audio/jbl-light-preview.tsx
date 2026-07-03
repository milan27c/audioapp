"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LightMode } from "@/components/audio/light-screen";

const RAINBOW_STEP_MS = 90;
const RAINBOW_STEP_DEG = 6;

function hslToHex(h: number) {
  const s = 0.85;
  const l = 0.55;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const EFFECT_ANIMATION: Record<LightMode, { opacity: number[]; duration: number }> = {
  Static: { opacity: [1, 1], duration: 1 },
  Pulse: { opacity: [0.55, 1, 0.55], duration: 2.2 },
  Strobe: { opacity: [1, 0.15, 1], duration: 0.25 },
  Fade: { opacity: [0.22, 1, 0.22], duration: 3.6 },
  Rainbow: { opacity: [0.95, 0.95], duration: 1 },
};

function GlowSpot({
  color,
  opacityKeyframes,
  duration,
  brightness,
  className,
}: {
  color: string;
  opacityKeyframes: number[];
  duration: number;
  brightness: number;
  className: string;
}) {
  const maxOpacity = brightness / 100;
  return (
    <motion.div
      className={className}
      style={{
        background: `radial-gradient(circle, ${color} 0%, ${color}00 72%)`,
      }}
      animate={{ opacity: opacityKeyframes.map((v) => v * maxOpacity) }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function JblLightPreview({
  isOn,
  color,
  mode,
  brightness,
}: {
  isOn: boolean;
  color: string;
  mode: LightMode;
  brightness: number;
}) {
  const [rainbowHue, setRainbowHue] = useState(0);

  useEffect(() => {
    if (!isOn || mode !== "Rainbow") return;
    const id = setInterval(() => {
      setRainbowHue((h) => (h + RAINBOW_STEP_DEG) % 360);
    }, RAINBOW_STEP_MS);
    return () => clearInterval(id);
  }, [isOn, mode]);

  const activeColor = mode === "Rainbow" ? hslToHex(rainbowHue) : color;
  const { opacity, duration } = EFFECT_ANIMATION[mode];

  return (
    <div className="relative mx-auto" style={{ width: 168, aspectRatio: "9 / 13.5" }}>
      <div className="knob-btn relative size-full overflow-hidden rounded-[2.25rem] p-3">
        {/* top vent bar */}
        <div className="absolute top-2.5 left-1/2 h-1.5 w-9 -translate-x-1/2 overflow-hidden rounded-full bg-black/50">
          {isOn && (
            <GlowSpot
              color={activeColor}
              opacityKeyframes={opacity}
              duration={duration}
              brightness={brightness}
              className="absolute inset-0"
            />
          )}
        </div>

        {/* side light strips */}
        <div className="absolute inset-y-6 left-1.5 w-1 overflow-hidden rounded-full bg-black/50">
          {isOn && (
            <GlowSpot
              color={activeColor}
              opacityKeyframes={opacity}
              duration={duration}
              brightness={brightness}
              className="absolute inset-0"
            />
          )}
        </div>
        <div className="absolute inset-y-6 right-1.5 w-1 overflow-hidden rounded-full bg-black/50">
          {isOn && (
            <GlowSpot
              color={activeColor}
              opacityKeyframes={opacity}
              duration={duration}
              brightness={brightness}
              className="absolute inset-0"
            />
          )}
        </div>

        {/* woofers */}
        <div className="relative flex size-full flex-col items-center justify-center gap-1">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="relative flex size-[72px] items-center justify-center rounded-full bg-black/60"
            >
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {isOn && (
                  <GlowSpot
                    color={activeColor}
                    opacityKeyframes={opacity}
                    duration={duration}
                    brightness={brightness}
                    className="absolute -inset-2"
                  />
                )}
              </div>
              <div className="size-[54px] rounded-full bg-[#0e0e10]" />
            </div>
          ))}

          {/* center LED */}
          <div className="absolute size-2 overflow-hidden rounded-sm bg-black/70">
            {isOn && (
              <GlowSpot
                color={activeColor}
                opacityKeyframes={opacity}
                duration={duration}
                brightness={brightness}
                className="absolute -inset-1"
              />
            )}
          </div>
        </div>

        {/* bottom vent bar */}
        <div className="absolute bottom-2.5 left-1/2 h-1.5 w-9 -translate-x-1/2 overflow-hidden rounded-full bg-black/50">
          {isOn && (
            <GlowSpot
              color={activeColor}
              opacityKeyframes={opacity}
              duration={duration}
              brightness={brightness}
              className="absolute inset-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
