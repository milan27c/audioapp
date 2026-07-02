"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disc3, SlidersHorizontal, Radio, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { key: "mode", label: "Mode", icon: Disc3, href: "/" },
  { key: "equalizer", label: "Equalizer", icon: SlidersHorizontal, href: "/equalizer" },
  { key: "radio", label: "Radio", icon: Radio, href: "/radio" },
  { key: "settings", label: "Settings", icon: Settings, href: "/settings" },
] as const;

export function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="glass-nav pointer-events-auto flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg">
        {items.map(({ key, label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              className="flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 transition-transform active:scale-95"
            >
              <Icon
                className={cn(
                  "size-6",
                  isActive ? "text-primary-500 dark:text-white" : "text-foreground/50",
                )}
                strokeWidth={1.75}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-primary-500 dark:text-white" : "text-foreground/50",
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
