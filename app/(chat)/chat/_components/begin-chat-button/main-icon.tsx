import { Video } from "lucide-react";

export function MainIcon() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="relative bg-primary/10 p-6 rounded-full">
        <Video className="size-16 text-primary" strokeWidth={1.5} />
      </div>
    </div>
  );
}




