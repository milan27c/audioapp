"use client";

import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { AppBar } from "@/components/layout/app-bar";
import { cn } from "@/lib/utils";

export function SettingsScreen() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <AppBar back="/" />

      <div className="mt-8">
        <h1 className="mb-4 px-1 text-lg font-semibold text-foreground">Settings</h1>

        <h2 className="px-1 text-xs font-semibold tracking-wide text-foreground/40 uppercase">
          Appearance
        </h2>

        <div className="glass mt-3 flex items-center justify-between rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
              <Moon className="size-[18px]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-foreground/50">{isDark ? "On" : "Off"}</p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors",
              isDark ? "bg-primary-500" : "bg-foreground/15",
            )}
          >
            <span
              className={cn(
                "size-5 rounded-full bg-white shadow transition-transform",
                isDark && "translate-x-5",
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
