import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";
import { SettingsScreen } from "@/components/settings/settings-screen";

export default function SettingsPage() {
  return (
    <MobileShell>
      <SettingsScreen />
      <FooterNav />
    </MobileShell>
  );
}
