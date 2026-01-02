import { cn } from "@/lib/utils";
import { LocalVideoChat } from "./local-video-chat";
import { NextMatchButton } from "./next-match-button";
import { RemoteVideoChat } from "./remote-video-chat";
import TextChat from "./text-chat";

export function Chat() {
  return (
    <main
      className={cn(
        "min-h-screen",
        "flex flex-col lg:grid lg:grid-cols-[1fr_auto]",
        "p-4 sm:p-6 lg:p-10",
        "gap-4 lg:gap-5",
      )}
    >
      {/* Vídeo Layout */}
      <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-2 lg:gap-0">
        <div className="col-span-1 flex flex-1 w-full h-full border border-r rounded-l-xl overflow-hidden">
          <LocalVideoChat />
        </div>
        <div className="col-span-1 flex flex-1 w-full h-full border border-l rounded-r-xl overflow-hidden">
          <RemoteVideoChat />
        </div>

        {/* NextButton */}
        <div
          className={cn(
            "col-span-2 min-h-16 flex w-full",
            "flex items-center justify-end",
            "mt-2 lg:mt-0",
          )}
        >
          <NextMatchButton />
        </div>
      </div>

      {/* TextChat - Responsivo */}
      <div className="w-full lg:w-auto flex items-start justify-center lg:justify-start">
        <TextChat />
      </div>
    </main>
  );
}
