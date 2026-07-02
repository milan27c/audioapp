import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";
import { RadioScreen } from "@/components/audio/radio-screen";

export default function RadioPage() {
  return (
    <MobileShell>
      <RadioScreen />
      <FooterNav />
    </MobileShell>
  );
}
