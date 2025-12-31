"use client";

import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Video } from "lucide-react";

export function StartButton() {
  const { changeChat } = useChat();

  async function requestPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Define o stream local no contexto do chat e atualiza o status
      // O stream deve permanecer ativo para ser usado no componente de vídeo
      changeChat({ 
        localStream: stream,
        status: ChatStatus.WAITING,
      });

      return true;
    } catch (error) {
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
