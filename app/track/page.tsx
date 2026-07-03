import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";
import { NowPlayingScreen } from "@/components/audio/now-playing-screen";

export default function TrackPage() {
  return (
    <MobileShell>
      <NowPlayingScreen />
      <FooterNav />
    </MobileShell>
  );
}
