"use client";

import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { UserGender } from "@/backend/user/enum/user-gender.enum";
import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { Video } from "lucide-react";
import { useState } from "react";

type LocationData = {
  countryCode: string | null;
  state: string | null;
  ip: string | null;
};

async function getUserLocation(): Promise<LocationData> {
  try {
    // Tenta usar a API do ipapi.co (gratuita, sem necessidade de chave)
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    return {
      countryCode: data.country_code || data.country || null,
      state: data.region || data.region_code || null,
      ip: data.ip || null,
    };
  } catch (error) {
    console.error("Erro ao obter localização:", error);
    // Fallback: tenta usar ip-api.com
    try {
      const fallbackResponse = await fetch("http://ip-api.com/json/");
      const fallbackData = await fallbackResponse.json();

      return {
        countryCode: fallbackData.countryCode || fallbackData.country || null,
        state: fallbackData.regionName || fallbackData.region || null,
        ip: fallbackData.query || fallbackData.ip || null,
      };
    } catch (fallbackError) {
      console.error("Erro no fallback de localização:", fallbackError);
      return {
        countryCode: null,
        state: null,
        ip: null,
      };
    }
  }
}

export function StartButton() {
  const { changeChat, localStream } = useChat();
  const [gender, setGender] = useState<UserGender | null>(null);

  async function requestPermissions() {
    if (!gender) {
      alert("Por favor, selecione um gênero antes de iniciar a conversa.");
      return false;
    }

    try {
      // Obtém a localização do usuário
      const location = await getUserLocation();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Define o stream local no contexto do chat e atualiza o status
      // O stream deve permanecer ativo para ser usado no componente de vídeo
      if (localStream) {
        localStream.current = stream;
      }

      // Envia evento para entrar na fila com gênero e localização
      const socket = getSocket();
      if (socket?.connected) {
        await userSaveAction({
          gender,
          countryCode: location.countryCode,
          state: location.state,
          ip: location.ip,
        });

        socket.emit("queue:join");
      }

      changeChat({
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
      <div className="w-full md:w-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-end sm:items-end">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <label
              htmlFor="gender-select"
              className="text-sm font-medium text-foreground"
            >
              Selecione seu gênero
            </label>
            <select
              id="gender-select"
              value={gender || ""}
              onChange={(e) => setGender(e.target.value as UserGender | null)}
              className={cn(
                "h-14 rounded-md border px-4 py-2 text-base shadow-xs",
                "bg-card text-card-foreground",
                "dark:bg-card dark:text-card-foreground",
                "border-input focus-visible:border-ring",
                "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "transition-[color,box-shadow] outline-none",
                "w-full sm:w-auto min-w-[180px]",
                "cursor-pointer",
              )}
            >
              <option value="">Selecione o gênero</option>
              <option value={UserGender.MALE}>Homem</option>
              <option value={UserGender.FEMALE}>Mulher</option>
              <option value={UserGender.COUPLE}>Casal</option>
            </select>
          </div>
          <Button
            size="lg"
            onClick={requestPermissions}
            disabled={!gender}
            className={cn(
              "w-full sm:w-auto px-8 h-14 text-lg font-semibold",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              !gender && "opacity-50 cursor-not-allowed",
            )}
          >
            <Video className="size-5 mr-2" />
            Iniciar conversa
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Selecione seu gênero e clique no botão acima para começar a procurar por
        alguém para conversar
      </p>
    </>
  );
}
