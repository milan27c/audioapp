"use client";

import { ChevronLeft, Bluetooth, Usb, Settings2 } from "lucide-react";

type Connection = "bluetooth" | "usb";

export function NowPlayingHeader({
  deviceName,
  connection,
}: {
  deviceName: string;
  connection: Connection;
}) {
  const ConnectionIcon = connection === "bluetooth" ? Bluetooth : Usb;

  return (
    <header className="flex items-center justify-between pt-[calc(env(safe-area-inset-top)+0.5rem)]">
      <button
        type="button"
        aria-label="Back"
        className="flex size-10 items-center justify-center rounded-full glass text-foreground transition-transform active:scale-90"
      >
        <ChevronLeft className="size-5" strokeWidth={1.75} />
      </button>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-medium text-foreground">{deviceName}</span>
        <span className="flex items-center gap-1 text-xs text-primary-500 dark:text-primary-300">
          <ConnectionIcon className="size-3" strokeWidth={1.75} />
          {connection === "bluetooth" ? "Bluetooth" : "USB"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Equalizer settings"
          className="flex size-10 items-center justify-center rounded-full glass text-foreground transition-transform active:scale-90"
        >
          <Settings2 className="size-[18px]" strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
