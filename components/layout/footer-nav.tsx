"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disc3, SlidersHorizontal, Lightbulb, Link2 } from "lucide-react";
import { MiniPlayer } from "@/components/audio/mini-player";
import { cn } from "@/lib/utils";

const items = [
  { key: "mode", label: "Mode", icon: Disc3, href: "/" },
  { key: "equalizer", label: "Equalizer", icon: SlidersHorizontal, href: "/equalizer" },
  { key: "light", label: "Light", icon: Lightbulb, href: "/light" },
  { key: "link", label: "Link", icon: Link2, href: "/link" },
] as const;

export function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <MiniPlayer />
      <div className="panel-3d pointer-events-auto flex items-center gap-2 rounded-full px-3 py-1.5">
        {items.map(({ key, label, icon: Icon, href }) => {
          const isActive = key === "mode" ? pathname === "/" || pathname === "/track" : pathname === href;
          return (
            <Link
              key={key}
              href={href}
              className="flex flex-col items-center gap-1 rounded-full px-2.5 py-1 transition-transform active:scale-95"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full",
                  isActive ? "knob-btn ring-2 ring-primary-500" : "text-white/50",
                )}
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-primary-400" : "text-white/50",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
