"use client";

import Link from "next/link";
import { Music2, Radio as RadioIcon } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { useDeviceAmbient } from "@/components/layout/use-device-ambient";

export function ModeScreen() {
  useDeviceAmbient();

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <AppBar />

      <div className="mt-12 flex flex-col items-center gap-12">
        <Link
          href="/track"
          className="knob-btn flex size-44 shrink-0 flex-col items-center justify-center gap-2 rounded-full active:scale-95"
        >
          <Music2 className="size-9" strokeWidth={1.5} />
          <span className="text-sm font-semibold">Music Tracks</span>
        </Link>

        <Link
          href="/radio"
          className="knob-btn flex size-44 shrink-0 flex-col items-center justify-center gap-2 rounded-full active:scale-95"
        >
          <RadioIcon className="size-9" strokeWidth={1.5} />
          <span className="text-sm font-semibold">Radio</span>
        </Link>
      </div>
    </div>
  );
}
