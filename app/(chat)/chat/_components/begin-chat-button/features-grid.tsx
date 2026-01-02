import { Globe, Shield, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    label: "Conexão Aleatória",
  },
  {
    icon: Zap,
    label: "Instantâneo",
  },
  {
    icon: Shield,
    label: "Seguro e Privado",
  },
  {
    icon: Globe,
    label: "Vídeo HD",
  },
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.label}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors border border-transparent hover:border-primary/20"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="size-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground text-center">
              {feature.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}




