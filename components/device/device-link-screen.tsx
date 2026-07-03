"use client";

import { useState } from "react";
import Image from "next/image";
import { Bluetooth, BatteryFull, RefreshCw, Link2, Unlink } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { deviceStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bluetooth;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between px-1 py-2.5">
      <span className="flex items-center gap-2.5 text-sm text-white/60">
        <Icon className="size-4" strokeWidth={1.75} />
        {label}
      </span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function DeviceLinkScreen() {
  const [linked, setLinked] = useState(true);

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <AppBar />

      <div className="mt-4 flex flex-1 flex-col items-center">
        {/* Product image, centered, with a neon glow behind it when linked */}
        <div className="relative flex items-center justify-center">
          {linked && (
            <div className="absolute size-52 rounded-full bg-primary-500/30 blur-[64px]" />
          )}
          <Image
            src="/images/product.png"
            alt={deviceStatus.name}
            width={220}
            height={425}
            priority
            className={cn(
              "relative h-64 w-auto object-contain transition duration-500",
              !linked && "opacity-40 grayscale",
            )}
          />
        </div>

        {/* Connection status pill */}
        <div
          className={cn(
            "mt-6 flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
            linked ? "bg-success/15 text-success" : "bg-foreground/10 text-foreground/50",
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full",
              linked ? "bg-success" : "bg-foreground/40",
            )}
          />
          {linked ? "Connected" : "Not Connected"}
        </div>

        <h1 className="mt-3 text-xl font-semibold text-foreground">{deviceStatus.name}</h1>
        <p className="text-sm text-foreground/50">JBL PartyBox · Bluetooth Speaker</p>

        {/* Device details — only meaningful while linked */}
        {linked && (
          <div className="panel-3d mt-6 w-full max-w-xs divide-y divide-white/5 rounded-2xl px-4 py-1 text-white">
            <InfoRow icon={Bluetooth} label="Connection" value="Bluetooth" />
            <InfoRow icon={BatteryFull} label="Battery" value={`${deviceStatus.battery}%`} />
            <InfoRow icon={RefreshCw} label="Firmware" value="v2.4.1" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setLinked((v) => !v)}
          className={cn(
            "mt-8 flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-transform active:scale-95",
            linked ? "knob-btn" : "knob-btn-primary",
          )}
        >
          {linked ? (
            <>
              <Unlink className="size-[18px]" strokeWidth={1.75} />
              Unlink Device
            </>
          ) : (
            <>
              <Link2 className="size-[18px]" strokeWidth={1.75} />
              Link Device
            </>
          )}
        </button>
      </div>
    </div>
  );
}
