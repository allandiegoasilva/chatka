"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "Como funciona o chat aleatório?",
    answer: "O Chatka conecta você aleatoriamente com outra pessoa que também está procurando conversar. Basta clicar em 'Começar a conversar' e você será pareado com alguém instantaneamente. Se não gostar da conversa, você pode pular para a próxima pessoa.",
  },
  {
    question: "É realmente anônimo?",
    answer: "Sim! Você não precisa criar uma conta ou fornecer informações pessoais. Sua identidade permanece privada. Apenas escolha um nome temporário e comece a conversar.",
  },
  {
    question: "O chat é seguro?",
    answer: "Sim, levamos a segurança muito a sério. Nossa plataforma é moderada e temos sistemas em vigor para detectar e prevenir comportamentos inadequados. Se você encontrar alguém que viole nossas diretrizes, pode reportar facilmente.",
  },
  {
    question: "Posso escolher com quem conversar?",
    answer: "O chat é aleatório, então você não pode escolher especificamente com quem conversar. No entanto, você pode pular quantas vezes quiser até encontrar alguém com quem tenha uma boa conexão.",
  },
  {
    question: "Há algum custo para usar?",
    answer: "Não! O Chatka é completamente gratuito. Você pode usar todas as funcionalidades sem precisar pagar nada.",
  },
  {
    question: "Funciona em dispositivos móveis?",
    answer: "Sim! O Chatka é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode conversar de qualquer lugar, a qualquer hora.",
  },
  {
    question: "Posso compartilhar fotos ou arquivos?",
    answer: "Por questões de segurança e privacidade, o compartilhamento de arquivos e imagens está desabilitado. O foco é na conversa por texto, garantindo uma experiência mais segura para todos.",
  },
  {
    question: "O que fazer se encontrar conteúdo inadequado?",
    answer: "Se você encontrar alguém que esteja se comportando de forma inadequada, use o botão de reportar. Nossa equipe de moderação revisará o caso e tomará as medidas apropriadas. Sua segurança é nossa prioridade.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre como usar o Chatka
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center justify-between p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

