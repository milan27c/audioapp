import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";
import { LightScreen } from "@/components/audio/light-screen";

export default function LightPage() {
  return (
    <MobileShell>
      <LightScreen />
      <FooterNav />
    </MobileShell>
  );
}
