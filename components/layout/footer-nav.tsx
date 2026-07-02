"use client";

import { useState } from "react";
import { Disc3, SlidersHorizontal, Radio, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { key: "mode", label: "Mode", icon: Disc3 },
  { key: "equalizer", label: "Equalizer", icon: SlidersHorizontal },
  { key: "radio", label: "Radio", icon: Radio },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

export function FooterNav() {
  const [active, setActive] = useState<(typeof items)[number]["key"]>("mode");

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="glass-nav pointer-events-auto flex items-center gap-0.5 rounded-full px-1.5 py-1.5 shadow-lg">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className="flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 transition-transform active:scale-95"
            >
              <Icon
                className={cn(
                  "size-[18px]",
                  isActive ? "text-primary-500 dark:text-white" : "text-foreground/50",
                )}
                strokeWidth={1.75}
              />
              <span
                className={cn(
                  "text-[9px] font-medium",
                  isActive ? "text-primary-500 dark:text-white" : "text-foreground/50",
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
