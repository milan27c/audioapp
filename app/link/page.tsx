import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";
import { DeviceLinkScreen } from "@/components/device/device-link-screen";

export default function LinkPage() {
  return (
    <MobileShell>
      <DeviceLinkScreen />
      <FooterNav />
    </MobileShell>
  );
}
