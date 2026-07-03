"use client";

import { useState, type CSSProperties } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

const EFFECTS = ["Normal", "Karaoke", "Studio", "Speech"];

function MicSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold tracking-wide text-foreground/40 uppercase">{label}</h2>
        <span className="text-xs tabular-nums text-foreground/50">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="progress-range mt-3 w-full"
        style={{ "--progress": `${value}%` } as CSSProperties}
      />
    </div>
  );
}

export function MicPanel() {
  const [on, setOn] = useState(true);
  const [volume, setVolume] = useState(70);
  const [echo, setEcho] = useState(30);
  const [reverb, setReverb] = useState(20);
  const [effect, setEffect] = useState(EFFECTS[0]);

  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          aria-label={on ? "Mute microphone" : "Unmute microphone"}
          onClick={() => setOn((o) => !o)}
          className={cn(
            "flex size-16 items-center justify-center rounded-full transition-transform active:scale-90",
            on ? "knob-btn-primary" : "knob-btn",
          )}
        >
          {on ? (
            <Mic className="size-7" strokeWidth={1.75} />
          ) : (
            <MicOff className="size-7" strokeWidth={1.75} />
          )}
        </button>
        <p className="mt-2 text-sm font-medium text-foreground/60">
          {on ? "Microphone On" : "Microphone Muted"}
        </p>
      </div>

      <div className={cn("mt-8 flex flex-col gap-8", !on && "pointer-events-none opacity-40")}>
        <MicSlider label="Mic Volume" value={volume} onChange={setVolume} />
        <MicSlider label="Echo" value={echo} onChange={setEcho} />
        <MicSlider label="Reverb" value={reverb} onChange={setReverb} />

        <div>
          <h2 className="px-1 text-xs font-semibold tracking-wide text-foreground/40 uppercase">
            Voice Effect
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 px-1">
            {EFFECTS.map((e) => (
              <button
                key={e}
                type="button"
                aria-pressed={effect === e}
                onClick={() => setEffect(e)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-transform active:scale-95",
                  effect === e ? "knob-btn-primary" : "knob-btn",
                )}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
