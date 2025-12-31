import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { LocalVideoChat } from "./local-video-chat";
import { RemoteVideoChat } from "./remote-video-chat";

export function Chat() {
  return (
    <main
      className={cn("min-h-screen grid lg:grid-cols-[1fr_auto] p-10 gap-5")}
    >
      {/* Vídeo Layout */}
      <div className="grid grid-cols-2 grid-rows-[1fr_auto]">
        <div className="col-span-1 flex flex-1 w-full h-full border border-r rounded-l-xl">
          <LocalVideoChat />
        </div>
        <div className="col-span-1 flex flex-1 w-full h-full border border-l rounded-r-xl">
          <RemoteVideoChat />
        </div>

        {/* NextButton */}
        <div
          className={cn(
            "col-span-2 min-h-16 flex w-full",
            "flex items-center justify-end",
          )}
        >
          <Button variant="outline">
            Próximo <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
      {/* Chat */}
      <div
        className={cn(
          "w-full flex flex-col rounded-xl p-4",
          "bg-neutral-900 border rounded-xl p-5",
          "lg:min-w-md",
        )}
      ></div>
    </main>
  );
}
