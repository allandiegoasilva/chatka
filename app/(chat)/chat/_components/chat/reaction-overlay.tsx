"use client";

import { isReactionType, type ReactionType } from "@/lib/reactions";
import { getSocket } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { Flame, Heart, Laugh, PartyPopper, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

type Particle = {
  id: string;
  type: ReactionType;
  left: number;
  drift: number;
  delay: number;
  duration: number;
  size: number;
};

const icons = {
  heart: Heart,
  laugh: Laugh,
  fire: Flame,
  like: ThumbsUp,
  party: PartyPopper,
};

const tones = {
  heart: "text-rose-400 fill-rose-400",
  laugh: "text-amber-300",
  fire: "text-orange-400 fill-orange-400",
  like: "text-sky-400 fill-sky-400",
  party: "text-violet-300",
};

function burst(type: ReactionType): Particle[] {
  return Array.from({ length: 6 }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random()}`,
    type,
    left: 18 + Math.random() * 64,
    drift: Math.random() * 80 - 40,
    delay: Math.random() * 0.18,
    duration: 1.4 + Math.random() * 0.7,
    size: 18 + Math.random() * 14,
  }));
}

export function ReactionOverlay() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    function add(type: ReactionType) {
      const next = burst(type);
      setParticles((current) => [...current, ...next]);
      window.setTimeout(() => {
        setParticles((current) =>
          current.filter((item) => !next.some((created) => created.id === item.id)),
        );
      }, 2400);
    }

    function onLocal(event: Event) {
      const type = (event as CustomEvent<ReactionType>).detail;
      if (isReactionType(type)) {
        add(type);
      }
    }

    function onRemote(payload: { reaction?: string }) {
      if (isReactionType(payload?.reaction)) {
        add(payload.reaction);
      }
    }

    const socket = getSocket();
    window.addEventListener("chat:reaction", onLocal);
    socket?.on("chat:reaction", onRemote);

    return () => {
      window.removeEventListener("chat:reaction", onLocal);
      socket?.off("chat:reaction", onRemote);
    };
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {particles.map((particle) => {
        const Icon = icons[particle.type];
        return (
          <span
            key={particle.id}
            className="absolute bottom-10 animate-reaction-float"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              ["--reaction-drift" as string]: `${particle.drift}px`,
            }}
          >
            <Icon
              className={cn(tones[particle.type])}
              style={{ width: particle.size, height: particle.size }}
              strokeWidth={2}
            />
          </span>
        );
      })}
    </div>
  );
}
