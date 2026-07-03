"use client";

import Link from "next/link";
import { ChevronLeft, Bluetooth, Usb, BatteryFull, Settings } from "lucide-react";
import { deviceStatus } from "@/lib/mock-data";

/**
 * The single app bar used on every screen: device name + connection + battery
 * centered, a Settings link on the right, and (on sub-pages) a Back link on
 * the left. Pass `back` with the href to show the back button.
 */
export function AppBar({ back }: { back?: string }) {
  const ConnectionIcon = deviceStatus.connection === "bluetooth" ? Bluetooth : Usb;

  return (
    <header className="relative flex items-center pt-[calc(env(safe-area-inset-top)+0.5rem)]">
      {back ? (
        <Link
          href={back}
          aria-label="Back"
          className="knob-btn flex size-10 shrink-0 items-center justify-center rounded-full transition-transform"
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} />
        </Link>
      ) : (
        <div aria-hidden className="size-10 shrink-0" />
      )}

      <div className="flex flex-1 items-center justify-center gap-2 text-foreground">
        <span className="text-sm font-medium">{deviceStatus.name}</span>
        <ConnectionIcon className="size-3.5" strokeWidth={1.75} />
        <span className="flex items-center gap-1 text-sm text-foreground/60">
          <BatteryFull className="size-4" strokeWidth={1.75} fill="currentColor" />
          {deviceStatus.battery}%
        </span>
      </div>

      <Link
        href="/settings"
        aria-label="Settings"
        className="knob-btn flex size-10 shrink-0 items-center justify-center rounded-full transition-transform"
      >
        <Settings className="size-[18px]" strokeWidth={1.75} />
      </Link>
    </header>
  );
}
