export function getJsonLD() {
  const siteUrl = process.env.SITE_URL || "https://chatka.com";
  const currentYear = new Date().getFullYear();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}#webapp`,
        name: "Chatka",
        applicationCategory: "CommunicationApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        description:
          "Conecte-se com pessoas aleatórias do mundo inteiro através de videochat e chat de texto! Chatka é uma plataforma de chat aleatório onde você pode conversar com estranhos via vídeo e mensagens.",
        url: siteUrl,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
        releaseNotes: "Plataforma de videochat aleatório com chat de texto",
        featureList: [
          "Videochat aleatório",
          "Chat de texto em tempo real",
          "Conexão com pessoas do mundo todo",
          "Interface moderna e intuitiva",
          "Gratuito e sem cadastro",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1000",
          bestRating: "5",
          worstRating: "1",
        },
        screenshot: `${siteUrl}/og-image.jpg`,
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        license: "https://opensource.org/licenses/MIT",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Chatka",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          // Adicione suas redes sociais aqui
          // "https://twitter.com/chatka",
          // "https://facebook.com/chatka",
          // "https://instagram.com/chatka",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          availableLanguage: ["Portuguese", "English"],
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service`,
        name: "Videochat Aleatório",
        description:
          "Serviço de videochat aleatório que conecta usuários de todo o mundo para conversas de vídeo e texto em tempo real.",
        provider: {
          "@id": `${siteUrl}#organization`,
        },
        areaServed: "Worldwide",
        serviceType: "Video Chat Service",
        category: "Communication Service",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: siteUrl,
          serviceType: "Online",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}#software`,
        name: "Chatka",
        applicationCategory: "CommunicationApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1000",
        },
        description:
          "Plataforma de videochat aleatório para conectar pessoas do mundo todo através de vídeo e chat de texto.",
        url: siteUrl,
        downloadUrl: siteUrl,
        softwareVersion: "1.0",
        releaseNotes: "Versão inicial da plataforma de videochat aleatório",
        featureList: [
          "Videochat em tempo real",
          "Chat de texto",
          "Matchmaking aleatório",
          "Interface responsiva",
          "Sem necessidade de cadastro",
        ],
        screenshot: `${siteUrl}/screenshot.jpg`,
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Chatka",
        description:
          "Conecte-se com pessoas aleatórias do mundo inteiro através de videochat e chat de texto!",
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
        inLanguage: "pt-BR",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Chat",
            item: `${siteUrl}/chat`,
          },
        ],
      },
    ],
  };
}

export function getJsonLDString() {
  return JSON.stringify(getJsonLD(), null, 2);
}
