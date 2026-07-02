import { MobileShell } from "@/components/layout/mobile-shell";
import { FooterNav } from "@/components/layout/footer-nav";

export default function SettingsPage() {
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-24 text-center">
        <p className="text-sm font-medium text-foreground/50">Settings — coming soon</p>
      </div>
      <FooterNav />
    </MobileShell>
  );
}
