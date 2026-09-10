"use client";

import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { useI18n } from "@/lib/i18n/provider";
import { DisconnectionAlert } from "./disconnection-alert";
import { OnlineStatus } from "./online-status";
import { StartButton } from "./start-button";

type Props = {
  showError: boolean;
};

export function BeginChatButton({ showError }: Props) {
  const { t } = useI18n();

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 bg-background">
      <DotPattern
        glow={false}
        className="text-foreground/12 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
      />
      <div className="relative z-10 w-full max-w-sm">
        <div className="absolute right-0 -top-10">
          <LanguageSwitcher />
        </div>
        <div className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur-sm p-6 space-y-6">
          <BorderBeam
            size={80}
            duration={8}
            borderWidth={1}
            colorFrom="oklch(0.586 0.253 17.585)"
            colorTo="oklch(0.645 0.246 16.439)"
          />
          {showError && <DisconnectionAlert />}
          <BlurFade delay={0.04} inView>
            <div className="space-y-3">
              <BrandLogo priority imageClassName="h-14" />
              <p className="text-sm text-muted-foreground">
                {t.connect.subtitle}
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <OnlineStatus />
          </BlurFade>
          <BlurFade delay={0.16} inView>
            <StartButton />
          </BlurFade>
        </div>
      </div>
    </main>
  );
}
