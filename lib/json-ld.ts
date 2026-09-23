import { messages } from "./i18n/messages";
import { seoTerms } from "./seo-terms";

export function getJsonLD() {
  const siteUrl = process.env.SITE_URL || "https://chatka.com";
  const faq = messages.pt.faq.items;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}#webapp`,
        name: "Chatka",
        alternateName: [
          "Chatka Omegle",
          "Chatka Omeagle",
          "Anonymous chat without login",
          "Chat naturista",
        ],
        applicationCategory: "CommunicationApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Anonymous chat without login. Random video chat and text chat with strangers. Omegle, Omeagle, Chatroulette and OmeTV alternative. Chat naturista +18. Sem cadastro.",
        url: siteUrl,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        featureList: [
          "Anonymous chat without login",
          "Random video chat",
          "Talk to strangers",
          "Chat anônimo sem cadastro",
          "Videochat aleatório",
          "Chat anónimo sin registro",
          "Omegle alternative",
          "Chat naturista +18",
          "No signup video chat",
        ],
        keywords: seoTerms.join(", "),
        inLanguage: ["pt-BR", "en", "es"],
        isAccessibleForFree: true,
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
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          availableLanguage: ["Portuguese", "English", "Spanish"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Chatka",
        description:
          "Anonymous chat without login. Chat aleatório de vídeo e texto, alternativa ao Omegle. Chat naturista +18.",
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
        inLanguage: ["pt-BR", "en", "es"],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Chatka",
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
  return JSON.stringify(getJsonLD());
}
