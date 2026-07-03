import { AmbientPaletteProvider } from "@/components/layout/ambient-context";
import { AmbientLayer } from "@/components/layout/ambient-layer";
import { PlaybackAmbientSync } from "@/components/layout/playback-ambient-sync";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 items-center justify-center bg-background sm:bg-zinc-200 sm:p-6 sm:dark:bg-zinc-950">
      <div className="relative h-dvh w-full min-w-0 sm:h-[min(92dvh,900px)] sm:w-auto sm:aspect-[1206/2622] sm:rounded-[3.25rem] sm:border-[6px] sm:border-zinc-900 sm:bg-zinc-900 sm:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] sm:dark:border-zinc-800">
        <div className="relative flex h-full w-full transform-gpu flex-col overflow-hidden bg-background sm:rounded-[2.75rem]">
          <AmbientPaletteProvider>
            <PlaybackAmbientSync />
            <AmbientLayer />
            <div className="absolute top-3 left-1/2 z-20 hidden h-8 w-28 -translate-x-1/2 rounded-full bg-zinc-900 sm:block" />
            <div className="relative z-10 hidden items-center justify-between px-7 pt-3 text-xs font-semibold text-foreground sm:flex">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
                  <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
                  <rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
                  <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path
                    d="M8 10.5C8.6 10.5 9.1 10.05 9.1 9.4C9.1 8.75 8.6 8.3 8 8.3C7.4 8.3 6.9 8.75 6.9 9.4C6.9 10.05 7.4 10.5 8 10.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 7.2C5.8 6.4 6.85 6 8 6C9.15 6 10.2 6.4 11 7.2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.5 4.5C4.05 3 6 2.2 8 2.2C10 2.2 11.95 3 13.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" />
                  <rect x="2" y="2" width="17" height="8" rx="1" fill="currentColor" />
                  <rect x="21.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pt-[env(safe-area-inset-top)] pb-[100px] sm:pt-6">
              {children}
            </div>
          </AmbientPaletteProvider>
        </div>
      </div>
    </div>
  );
}
