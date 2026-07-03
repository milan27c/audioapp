"use client";

import { useState, type CSSProperties } from "react";
import { Power } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { JblLightPreview } from "@/components/audio/jbl-light-preview";
import { lightColors, lightModes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export type LightMode = (typeof lightModes)[number];

export function LightScreen() {
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(70);
  const [color, setColor] = useState(lightColors[0].value);
  const [mode, setMode] = useState<LightMode>(lightModes[0]);

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <AppBar />

      <div className="mt-6 flex justify-center">
        <JblLightPreview isOn={isOn} color={color} mode={mode} brightness={brightness} />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <button
          type="button"
          aria-label={isOn ? "Turn off lights" : "Turn on lights"}
          onClick={() => setIsOn((o) => !o)}
          className={cn(
            "flex size-16 items-center justify-center rounded-full transition-transform active:scale-90",
            isOn ? "knob-btn-primary" : "knob-btn",
          )}
        >
          <Power className="size-7" strokeWidth={1.75} />
        </button>
        <p className="mt-2 text-sm font-medium text-foreground/60">
          {isOn ? "Lights On" : "Lights Off"}
        </p>
      </div>

      <div className={cn("mt-8 flex flex-col gap-8", !isOn && "pointer-events-none opacity-40")}>
        <div>
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold tracking-wide text-foreground/40 uppercase">
              Brightness
            </h2>
            <span className="text-xs tabular-nums text-foreground/50">{brightness}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            aria-label="Brightness"
            className="progress-range mt-3 w-full"
            style={{ "--progress": `${brightness}%` } as CSSProperties}
          />
        </div>

        <div>
          <h2 className="px-1 text-xs font-semibold tracking-wide text-foreground/40 uppercase">
            Color
          </h2>
          <div className={cn("mt-3 flex flex-wrap gap-3 px-1", mode === "Rainbow" && "opacity-40")}>
            {lightColors.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-label={`Set color ${c.name}`}
                onClick={() => setColor(c.value)}
                disabled={mode === "Rainbow"}
                className={cn(
                  "size-9 rounded-full border border-black/30 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform",
                  color === c.value && mode !== "Rainbow"
                    ? "scale-110 ring-2 ring-primary-500 ring-offset-2 ring-offset-background"
                    : "active:scale-90",
                )}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="px-1 text-xs font-semibold tracking-wide text-foreground/40 uppercase">
            Effect
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 px-1">
            {lightModes.map((m) => {
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-transform active:scale-95",
                    isActive ? "knob-btn-primary" : "knob-btn",
                  )}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
