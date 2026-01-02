import { cn } from "@/lib/utils";
import { Background } from "./background";
import { DisconnectionAlert } from "./disconnection-alert";
import { FeaturesGrid } from "./features-grid";
import { HeroSection } from "./hero-section";
import { MainIcon } from "./main-icon";
import { OnlineStatus } from "./online-status";
import { StartButton } from "./start-button";

type Props = {
  showError: boolean;
};

export function BeginChatButton({ showError }: Props) {
  return (
    <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      <Background />

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-3xl">
        <div
          className={cn(
            "w-full flex flex-col items-center justify-center",
            "bg-card/80 backdrop-blur-sm border rounded-2xl p-8 md:p-12",
            "shadow-2xl space-y-8",
          )}
        >
          {showError && <DisconnectionAlert />}
          <OnlineStatus />
          <MainIcon />
          <HeroSection />
          <FeaturesGrid />
          <StartButton />
        </div>
      </div>
    </main>
  );
}
