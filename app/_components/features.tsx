import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Shield, Globe, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MessageCircle,
    title: "Chat Anônimo",
    description: "Converse sem revelar sua identidade. Privacidade e segurança em primeiro lugar.",
  },
  {
    icon: Globe,
    title: "Conecte-se Globalmente",
    description: "Conheça pessoas de diferentes países e culturas ao redor do mundo.",
  },
  {
    icon: Zap,
    title: "Conexão Instantânea",
    description: "Encontre alguém para conversar em segundos. Sem cadastros complicados.",
  },
  {
    icon: Shield,
    title: "Seguro e Moderado",
    description: "Nossa plataforma é monitorada para garantir uma experiência segura para todos.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorativo sutil */}
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/3 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da seção */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Funcionalidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Por que escolher o{" "}
            <span className="text-primary">Chatka?</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Uma experiência de chat única, focada em conexões genuínas e segurança
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    {/* Ícone */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1">
                      <CardTitle className="text-xl sm:text-2xl mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 group">
            <Link href="/chat" className="flex items-center gap-2">
              Começar agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
