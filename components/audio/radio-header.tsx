"use client";

import { Menu, MoreVertical, Search } from "lucide-react";

export function RadioHeader() {
  return (
    <header className="flex items-center gap-2 pt-[calc(env(safe-area-inset-top)+0.5rem)]">
      <button
        type="button"
        aria-label="Menu"
        className="flex size-10 shrink-0 items-center justify-center rounded-full glass text-foreground transition-transform active:scale-90"
      >
        <Menu className="size-[18px]" strokeWidth={1.75} />
      </button>

      <div className="glass flex flex-1 items-center gap-2 rounded-full px-4 py-2.5 text-foreground/50">
        <Search className="size-4 shrink-0" strokeWidth={1.75} />
        <span className="text-sm">Search stations</span>
      </div>

      <button
        type="button"
        aria-label="More options"
        className="flex size-10 shrink-0 items-center justify-center rounded-full glass text-foreground transition-transform active:scale-90"
      >
        <MoreVertical className="size-[18px]" strokeWidth={1.75} />
      </button>
    </header>
  );
}
