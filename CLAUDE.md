@AGENTS.md

# AB-828 Audio Controller — Project Guide

Mobile-first companion web app for controlling a Bluetooth/USB audio device ("AB-828"): playback (USB/TF + Bluetooth), FM radio, an 8-band equalizer with Bass/Treble/Voice tools, and settings. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, lucide-react, and Framer Motion. This is a UI/UX-focused build — mock/static data throughout, no real device or Web Audio integration required.

Read this file before designing or building any screen. Screen-by-screen design (layout, copy, specific flows) is handled separately by the user in follow-up sessions — this file governs branding, tokens, and system-wide conventions so every screen stays consistent.

## Design References

Inspiration screenshots live in the conversation history that produced this file: a purple/violet "AB-828" wireframe set (player, Bluetooth, FM radio, radio station list, equalizer, bass/treble), a red/dark Shazam-style app (onboarding, album grid, now-playing with waveform), a purple circular-dial now-playing screen with glowing rotary ring, and a dark equalizer/tools set (reverb, bass boost, virtualizer, track trimmer, sleep timer). Treat these as tone references for glow/gradient/glass treatment, not literal specs — the final product should read as more polished and modern than the raw wireframes.

## Brand Identity

**Primary color:** `#80246D` (deep magenta-purple). All chrome, active states, glows, and gradients key off this hue (~312° in HSL).

### Color palette

Derived from the primary hue. Use these as Tailwind theme tokens (see Theming below), never hardcode hex values in components.

| Token | Hex | Use |
|---|---|---|
| `primary-50` | `#F9F4F8` | light-mode tinted backgrounds |
| `primary-100` | `#F0E5ED` | light-mode subtle fills |
| `primary-200` | `#DBC2D6` | light-mode borders/dividers |
| `primary-300` | `#C69CBD` | disabled/muted accents |
| `primary-400` | `#A66699` | secondary text on brand surfaces |
| `primary-500` | `#80246D` | **brand base** — primary buttons, active nav icon, key accents |
| `primary-600` | `#6D1F5D` | hover/pressed state |
| `primary-700` | `#57184A` | dark-mode elevated surfaces |
| `primary-800` | `#431339` | dark-mode panels |
| `primary-900` | `#310E29` | dark-mode deep backgrounds |
| `primary-950` | `#1C0818` | dark-mode base background |
| `neon-magenta` | `#EE2BC7` | glow/highlight accent — active slider thumbs, pulse rings, waveform peaks |
| `accent-blue` | `#2BBDEE` | secondary neon accent — used sparingly for contrast (e.g. one EQ band, a toggle, a chart line) — never as the dominant color |
| `accent-pink` | `#F53D99` | tertiary accent — gradient stops, favorite/heart states |
| `success` | `#34B273` | connected/battery-ok/confirmation states |
| `warning` | `#F4A825` | low battery, weak signal |
| `danger` | `#D7424E` | disconnect, delete, errors |

Neon accents (`neon-magenta`, `accent-blue`, `accent-pink`) exist for glow effects and small highlight moments — they are not for large surfaces or body text. The app should feel like "deep purple brand with neon glow accents," not a rainbow.

### Dark mode (default)

Dark mode is the primary, default experience — it's where the neon/glass aesthetic lives.

- Background base: `#150A15` (near-black with a faint purple cast), often with a soft radial gradient of `primary-900` → `primary-950` behind key screens (player, equalizer) to create the glow-from-center look in the reference art.
- Surfaces/cards: `#221122` (surface-1) and `#2F182F` (surface-2) for stacked elevation, both with `backdrop-blur` + ~8–12% white-alpha border for a glass effect.
- Primary text: `#F5EEF3` (off-white, not pure white). Secondary text: `primary-300` (`#C69CBD`) or 60% alpha white.
- Glow effects use `box-shadow`/`filter: drop-shadow` in `primary-500` or `neon-magenta` at low opacity, layered (small tight glow + larger soft glow), never a single hard-edged shadow.

### Light mode

Light mode should feel like the same brand, translated — not an inverted afterthought.

- Background base: `#FCFAFC`, surfaces: `#F7F2F7` and white, both with subtle `primary-100`/`primary-200` borders instead of glass-blur (glassmorphism reads poorly on light backgrounds — use soft elevation/shadow instead).
- Primary text: `#211220` (near-black, purple-tinted). Secondary text: `primary-600`/`primary-700` or 60% alpha black.
- Glows are toned down significantly (smaller radius, lower opacity) — light mode should read as clean and professional, not washed out by neon.
- Active/selected states still use `primary-500`, but neon accents (`neon-magenta`, `accent-blue`) are used more sparingly than in dark mode.

Both modes must pass WCAG AA contrast for body text (4.5:1) and 3:1 for large text/icons. Verify any text placed directly on a gradient or glow.

## Typography

- **UI font:** SF Pro, used exclusively across the entire app — no other typeface (including Geist Sans/Mono) should appear anywhere, including numeric/display contexts like FM frequency (`101.2 MHz`), EQ band values, playback timestamps, sleep-timer countdown, and battery percentage. Use `tabular-nums` on numeric readouts so digits don't jitter as they change.
- Type scale should stay restrained: one large display size for now-playing track titles / big numbers, one heading size for screen titles, one body size, one small/caption size for metadata (artist, band frequency labels, timestamps). Avoid introducing more than 4–5 font sizes app-wide.

## Layout & Navigation

- **Viewport:** designed mobile-first for a phone-sized viewport (~375–430px wide), centered on larger screens with a max-width container — this is a web app, not native, but should look and feel like a phone app in any browser width.
- **Floating footer navigation:** persistent, floating (not edge-to-edge/flush), compact pill bar, glass/blur background at ~95% opacity (frosted, not see-through), containing exactly 4 items: **Mode**, **Equalizer**, **Radio**, **Settings**. Keep the pill's own padding tight (small icon size, small label text) — it should read as a slim tab bar, not a large button row. Active item is indicated by icon + label color only — no background pill/highlight behind the active item. Active color is `primary-500` in light mode and white in dark mode (a plain primary-colored active state reads low-contrast against dark/glowing backgrounds). Icons from `lucide-react`, consistent stroke width (1.5–2px) across the whole app.
- **Mini "now playing" bar:** when a track/station is active, render a compact now-playing bar directly above the footer nav (between page content and nav), showing artwork/icon, track title, and a play/pause control at minimum. It persists across Mode/Equalizer/Radio/Settings navigation and only disappears when nothing is playing. Tapping it should route to the full now-playing screen.
- Safe-area padding (`env(safe-area-inset-*)`) should be respected around the floating footer and mini-player so they don't collide with device home indicators.
- **Screen edge margins:** every screen keeps a consistent 16px (`px-4`) left/right margin from the viewport edge, applied once at the top-level screen container. Child components (header, cards, controls) must not add their own additional horizontal padding on top of it — that stacks and throws off alignment. If a component needs internal breathing room, use padding on an inner element, not the outer edge-aligned one.

## Visual Style

- **Glassmorphism:** frosted/blurred translucent panels (`backdrop-filter: blur(...)` + low-opacity fill + hairline border) for cards, the footer nav, and the mini-player — primarily in dark mode.
- **Neon glow:** used purposefully on the elements that represent "live" state — the play button while playing, the active equalizer band, the rotary/dial artwork ring, waveform peaks, the active footer icon. Glow should pulse subtly (slow, low-amplitude) rather than blink.
- **Gradients:** radial or diagonal gradients built from the primary palette (`primary-900` → `primary-500` → `neon-magenta`, or similar) behind hero elements like the now-playing artwork or equalizer background — soft and dark, never a loud full-saturation gradient across the whole screen.
- **Depth:** favor soft, large-radius, low-opacity shadows/glows over hard drop shadows. Corners should be generously rounded (cards, buttons, sliders) to match the soft/organic reference art rather than sharp/boxy.
- Iconography is line-based (`lucide-react`), not filled, except for small dot/status indicators.

## Motion (Framer Motion)

Framer Motion is the standard for all non-trivial motion. Conventions:

- **Page/screen transitions:** subtle fade + slight vertical slide (8–16px) on route change, ~200–300ms, `ease-out`.
- **Footer nav:** active state is a plain color change on the icon/label (no background pill or glow behind it) — a simple, immediate swap rather than an animated indicator.
- **Play state:** album art / dial rotates or gently pulses while playing, eases to a stop (not an abrupt stop) on pause.
- **Sliders & knobs** (EQ bands, bass/treble, volume): drag should feel physical — use spring transitions, not linear tweens, and animate the connected glow/fill trailing the thumb.
- **Waveforms:** animate bar heights with staggered, small random variance while "playing" to feel alive; freeze in place on pause.
- **Micro-interactions:** buttons/icons get a small scale-down on tap (`whileTap={{ scale: 0.94 }}`) app-wide for tactile feedback.
- Respect `prefers-reduced-motion` — fall back to simple opacity fades, no parallax/scale/rotation, when it's set.

## Components & Icons

- **Base primitives:** shadcn/ui for anything with real interaction logic — sliders, tabs, switches, dialogs/sheets, dropdowns. Install components as needed via the shadcn CLI rather than hand-rolling; then restyle via Tailwind tokens/className to match the neon-glass aesthetic (shadcn's default styling should not be visible in the final UI).
- **Icons:** `lucide-react` exclusively, for consistency of stroke and sizing. Don't mix in another icon set.
- **Domain components** (now-playing card, EQ band slider, rotary dial, waveform, radio dial/tuner, mini-player, floating footer nav) are custom-built on top of shadcn primitives where relevant, and should live under `components/audio/` (see structure below) — not inside `components/ui/` which is reserved for shadcn's generated primitives.

## Theming Implementation

- Use `next-themes` for light/dark mode with a class-based strategy (`class="dark"` on `<html>`), toggled from Settings (`components/settings/settings-screen.tsx`) rather than following system preference. Default to `dark` on first load (`enableSystem={false}`) — dark mode is the primary experience per the Brand Identity section above — but keep the toggle explicit and persistent once the user sets a preference.
- Define the full palette above as CSS variables in `app/globals.css` under `@theme`/`:root` (light values) and `.dark` (dark values), matching the Tailwind v4 `@theme inline` pattern already present in this project — extend it, don't replace the existing `--background`/`--foreground` pattern, just add the brand tokens alongside it.
- Never hardcode hex colors inside component files; always reference the theme tokens (e.g. `bg-primary-500`, `text-primary-300`, `shadow-glow`).

## File Structure Conventions

```
app/                    Next.js App Router routes (one folder per screen/section)
components/ui/          shadcn/ui generated primitives — don't hand-edit style beyond config
components/audio/       Custom domain components (player card, EQ slider, dial, waveform, footer nav, mini-player)
components/layout/      Shell components (mobile frame, floating nav, safe-area wrapper)
lib/                    Utilities, mock data, formatting helpers (e.g. frequency/time formatting)
hooks/                  Custom hooks (e.g. theme, playback mock state)
```

## Code Conventions

- TypeScript everywhere, strict mode (already configured in `tsconfig.json`).
- Functional components only, Tailwind for styling (no CSS modules, no styled-components).
- Keep mock data (tracks, stations, presets) in `lib/mock-data.ts` so screens can be built against realistic content without a backend.
- This project runs on a newer/pre-release Next.js version (16.2.9) — per `AGENTS.md`, check `node_modules/next/dist/docs/` for current APIs before assuming App Router conventions from older Next.js knowledge.
