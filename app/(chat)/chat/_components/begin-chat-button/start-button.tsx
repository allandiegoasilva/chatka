"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Video } from "lucide-react";

async function requestPermissions() {
  try {
    // Solicita permissões de câmera e microfone
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Para o stream imediatamente após obter as permissões
    // (você pode remover isso se quiser manter o stream ativo)
    stream.getTracks().forEach((track) => track.stop());

    console.log("Permissões de câmera e microfone concedidas");
    return true;
  } catch (error) {
    console.error("Erro ao solicitar permissões:", error);

    if (error instanceof Error) {
      if (error.name === "NotAllowedError") {
        alert(
          "Permissões negadas. Por favor, permita o acesso à câmera e ao microfone nas configurações do navegador.",
        );
      } else if (error.name === "NotFoundError") {
        alert(
          "Nenhuma câmera ou microfone encontrado. Verifique se os dispositivos estão conectados.",
        );
      } else if (error.name === "NotReadableError") {
        alert(
          "Não foi possível acessar a câmera ou microfone. Eles podem estar sendo usados por outro aplicativo.",
        );
      } else {
        alert(`Erro ao acessar dispositivos de mídia: ${error.message}`);
      }
    }

    return false;
  }
}

export function StartButton() {
  return (
    <>
      <Button
        size="lg"
        onClick={requestPermissions}
        className={cn(
          "w-full md:w-auto px-8 py-6 text-lg font-semibold",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "shadow-lg hover:shadow-xl transition-all duration-300",
          "transform hover:scale-105",
        )}
      >
        <Video className="size-5 mr-2" />
        Iniciar conversa
      </Button>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Clique no botão acima para começar a procurar por alguém para conversar
      </p>
    </>
  );
}
