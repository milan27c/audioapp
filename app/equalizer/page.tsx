import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";
import { EqualizerScreen } from "@/components/audio/equalizer-screen";

export default function EqualizerPage() {
  return (
    <MobileShell>
      <EqualizerScreen />
      <FooterNav />
    </MobileShell>
  );
}
