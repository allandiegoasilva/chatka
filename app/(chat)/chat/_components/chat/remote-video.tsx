"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function RemoteVideo() {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center",
        "bg-neutral-800 z-10",
        "text-muted-foreground",
      )}
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Efeito de brilho animado */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Ícone de loading */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-primary/5 p-6 rounded-full">
            <Loader2 className="size-12 text-primary animate-spin" strokeWidth={1.5} />
          </div>
        </div>

        {/* Texto de carregamento */}
        <div className="relative flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-foreground">
            Aguardando conexão...
          </p>
          <p className="text-xs text-muted-foreground">
            Conectando com o usuário remoto
          </p>
        </div>
      </div>
    </div>
  );
}


