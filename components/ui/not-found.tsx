import { Home, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

type Props = {
  title?: string;
  description?: string;
};

export function NotFound({
  title = "Página não encontrada",
  description = "Ops! A página que você está procurando não existe ou foi movida.",
}: Props) {
  return (
    <div className="flex w-full min-h-[60vh] justify-center items-center p-6 relative">
      <div className="flex flex-col items-center text-center max-w-2xl w-full gap-8">
        {/* Número 404 com efeito visual */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse" />
          <h1 className="relative text-9xl font-black text-transparent bg-clip-text bg-linear-to-br from-primary via-primary/80 to-primary/60 select-none">
            404
          </h1>
        </div>

        {/* Ícone decorativo */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-muted/50 p-6 rounded-full border-2 border-primary/20">
            <SearchX className="size-16 text-primary/60" strokeWidth={1.5} />
          </div>
        </div>

        {/* Conteúdo textual */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Botão de ação */}
        <Button
          asChild
          size="lg"
          className="group gap-2 min-w-[180px] shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Link href="/">
            <Home className="size-5 group-hover:scale-110 transition-transform" />
            Voltar para o início
          </Link>
        </Button>

        {/* Elementos decorativos */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </div>
  );
}
