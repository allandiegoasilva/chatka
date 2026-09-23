export const locales = ["pt", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export const localeHtml: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export const messages = {
  pt: {
    nav: {
      faq: "FAQ",
      chat: "Chat",
      menu: "Menu",
      how: "Como funciona",
    },
    hero: {
      title: "Fala com um estranho. Agora.",
      subtitle:
        "Vídeo aleatório e chat de texto. Sem conta, sem e-mail, sem perfil.",
      cta: "Entrar no chat",
      note: "Câmera e microfone ficam só no seu navegador.",
    },
    preview: {
      you: "Você",
      searching: "Procurando...",
      next: "Próximo",
      message: "E aí, de onde você é?",
    },
    how: {
      title: "Três passos.",
      steps: [
        {
          title: "Libera a câmera",
          description: "Entra e autoriza vídeo e microfone.",
        },
        {
          title: "Espera o match",
          description: "A fila junta você com outra pessoa online.",
        },
        {
          title: "Conversa ou passa",
          description: "Se não rolar, aperta próximo.",
        },
      ],
    },
    features: {
      title: "Do jeito que tem que ser",
      items: [
        {
          title: "Vídeo e texto",
          description: "A pessoa na frente. O chat do lado.",
        },
        {
          title: "Próximo, sem drama",
          description: "Um clique e a conversa acaba. Outra começa.",
        },
        {
          title: "Anônimo",
          description: "Sem conta. Sem nome real. Sem rastro.",
        },
      ],
    },
    cta: {
      title: "Pronto quando você estiver.",
      button: "Entrar no chat",
    },
    seo: {
      title: "Chat anônimo sem login.",
      body: "Chatka é um chat aleatório de vídeo e texto, tipo Omegle, Omeagle, Chatroulette e OmeTV: anonymous chat without login, random video chat, talk to strangers. Sem cadastro, sem e-mail, sem perfil. Entra, libera a câmera e conversa com um estranho do mundo todo.",
    },
    faq: {
      title: "Perguntas",
      items: [
        {
          question: "Como funciona?",
          answer:
            "Entra, libera câmera e microfone, e a gente te junta com outra pessoa na fila. Se não rolar, aperta próximo.",
        },
        {
          question: "Precisa de conta ou login?",
          answer:
            "Não. É anonymous chat without login: você entra anônimo, sem cadastro, sem e-mail e sem perfil.",
        },
        {
          question: "É tipo Omegle ou Omeagle?",
          answer:
            "Sim. Chatka é uma alternativa ao Omegle, Omeagle, Chatroulette e OmeTV: videochat aleatório com estranhos, grátis e sem login.",
        },
        {
          question: "É grátis?",
          answer: "Sim. Random video chat gratuito, no browser.",
        },
        {
          question: "Dá para usar no celular?",
          answer: "Sim. Abre no navegador e começa o chat aleatório.",
        },
      ],
    },
    connect: {
      title: "Chatka",
      subtitle: "Vídeo aleatório. Sem conta.",
      online: "online",
      gender: "Gênero",
      genderPlaceholder: "Selecionar",
      male: "Homem",
      female: "Mulher",
      other: "Outro",
      matchType: "Tipo de match",
      world: "Mundo",
      country: "País",
      countryLabel: "País",
      countryPlaceholder: "Selecionar país",
      countrySearch: "Buscar país",
      countryEmpty: "Nenhum país encontrado.",
      start: "Iniciar",
      requesting: "Pedindo acesso...",
      requestAgain: "Solicitar permissões novamente",
      denied:
        "Câmera e microfone bloqueados. Libera o acesso no navegador e tenta de novo.",
      insecure:
        "Neste endereço o celular bloqueia a câmera. Abre em HTTPS ou no localhost.",
      missing: "Nenhuma câmera ou microfone encontrado.",
      busy: "A câmera ou o microfone já está em uso em outro app.",
      unknown: "Não deu para acessar a câmera ou o microfone.",
      disconnectedTitle: "Conexão perdida",
      disconnectedDescription:
        "O servidor desconectou. Tenta de novo.",
      closeAlert: "Fechar alerta",
    },
    waiting: {
      title: "Procurando alguém...",
      hint: "Na fila. A conexão começa quando alguém entrar.",
      blocked:
        "O navegador bloqueou o acesso. Libera câmera e microfone e tenta de novo.",
      camera: "Aguardando acesso à câmera...",
    },
    chat: {
      next: "Próximo",
      placeholder: "Digite sua mensagem...",
      send: "Enviar",
      empty: "Envie uma mensagem para começar o chat.",
      any: "Todos",
      filters: "Filtros",
    },
    notFound: {
      title: "Página não encontrada",
      description: "Essa página não existe.",
      back: "Voltar",
    },
  },
  en: {
    nav: {
      faq: "FAQ",
      chat: "Chat",
      menu: "Menu",
      how: "How it works",
    },
    hero: {
      title: "Talk to a stranger. Now.",
      subtitle: "Random video and text chat. No account, no email, no profile.",
      cta: "Start chatting",
      note: "Camera and mic stay in your browser.",
    },
    preview: {
      you: "You",
      searching: "Looking...",
      next: "Next",
      message: "Hey, where are you from?",
    },
    how: {
      title: "Three steps.",
      steps: [
        {
          title: "Allow the camera",
          description: "Join and grant video and microphone access.",
        },
        {
          title: "Wait for a match",
          description: "The queue pairs you with someone online.",
        },
        {
          title: "Talk or skip",
          description: "If it is not a fit, hit next.",
        },
      ],
    },
    features: {
      title: "Just the product",
      items: [
        {
          title: "Video and text",
          description: "The person in front. Chat on the side.",
        },
        {
          title: "Next, no drama",
          description: "One click ends it. Another one starts.",
        },
        {
          title: "Anonymous",
          description: "No account. No real name. No trail.",
        },
      ],
    },
    cta: {
      title: "Ready when you are.",
      button: "Start chatting",
    },
    seo: {
      title: "Anonymous chat without login.",
      body: "Chatka is a random video and text chat, like Omegle, Omeagle, Chatroulette and OmeTV: anonymous chat without login, talk to strangers, no signup. Open the browser, allow the camera, and meet someone from anywhere.",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "How does it work?",
          answer:
            "Join, allow camera and mic, and we pair you with someone in the queue. If it is not a fit, hit next.",
        },
        {
          question: "Do I need an account or login?",
          answer:
            "No. This is anonymous chat without login: no account, no email, no profile.",
        },
        {
          question: "Is it like Omegle or Omeagle?",
          answer:
            "Yes. Chatka is an Omegle, Omeagle, Chatroulette and OmeTV alternative: free random video chat with strangers, no signup.",
        },
        {
          question: "Is it free?",
          answer: "Yes. Free random video chat in the browser.",
        },
        {
          question: "Does it work on mobile?",
          answer: "Yes. Open it in the browser and start a random chat.",
        },
      ],
    },
    connect: {
      title: "Chatka",
      subtitle: "Random video. No account.",
      online: "online",
      gender: "Gender",
      genderPlaceholder: "Select",
      male: "Male",
      female: "Female",
      other: "Other",
      matchType: "Match type",
      world: "World",
      country: "Country",
      countryLabel: "Country",
      countryPlaceholder: "Select a country",
      countrySearch: "Search country",
      countryEmpty: "No country found.",
      start: "Start",
      requesting: "Asking for access...",
      requestAgain: "Request permissions again",
      denied:
        "Camera and microphone are blocked. Allow access in the browser and try again.",
      insecure:
        "The phone blocks the camera on this address. Open it with HTTPS or localhost.",
      missing: "No camera or microphone found.",
      busy: "The camera or microphone is already in use.",
      unknown: "Could not access the camera or microphone.",
      disconnectedTitle: "Connection lost",
      disconnectedDescription: "The server disconnected. Try again.",
      closeAlert: "Close alert",
    },
    waiting: {
      title: "Looking for someone...",
      hint: "In the queue. The call starts when someone joins.",
      blocked:
        "The browser blocked access. Allow camera and microphone and try again.",
      camera: "Waiting for camera access...",
    },
    chat: {
      next: "Next",
      placeholder: "Type a message...",
      send: "Send",
      empty: "Send a message to start the chat.",
      any: "Anyone",
      filters: "Filters",
    },
    notFound: {
      title: "Page not found",
      description: "This page does not exist.",
      back: "Back",
    },
  },
  es: {
    nav: {
      faq: "FAQ",
      chat: "Chat",
      menu: "Menú",
      how: "Cómo funciona",
    },
    hero: {
      title: "Habla con un extraño. Ahora.",
      subtitle:
        "Video aleatorio y chat de texto. Sin cuenta, sin correo, sin perfil.",
      cta: "Entrar al chat",
      note: "Cámara y micrófono se quedan en tu navegador.",
    },
    preview: {
      you: "Tú",
      searching: "Buscando...",
      next: "Siguiente",
      message: "Oye, ¿de dónde eres?",
    },
    how: {
      title: "Tres pasos.",
      steps: [
        {
          title: "Activa la cámara",
          description: "Entra y autoriza video y micrófono.",
        },
        {
          title: "Espera el match",
          description: "La fila te junta con otra persona en línea.",
        },
        {
          title: "Habla o pasa",
          description: "Si no va, toca siguiente.",
        },
      ],
    },
    features: {
      title: "Así de simple",
      items: [
        {
          title: "Video y texto",
          description: "La persona al frente. El chat al lado.",
        },
        {
          title: "Siguiente, sin drama",
          description: "Un clic termina. Otro empieza.",
        },
        {
          title: "Anónimo",
          description: "Sin cuenta. Sin nombre real. Sin rastro.",
        },
      ],
    },
    cta: {
      title: "Listo cuando tú lo estés.",
      button: "Entrar al chat",
    },
    seo: {
      title: "Chat anónimo sin registro.",
      body: "Chatka es un videochat aleatorio de video y texto, como Omegle, Omeagle, Chatroulette y OmeTV: anonymous chat without login, chat sin cuenta, hablar con extraños. Entras, das la cámara y hablas con alguien de cualquier país.",
    },
    faq: {
      title: "Preguntas",
      items: [
        {
          question: "¿Cómo funciona?",
          answer:
            "Entras, das cámara y micrófono, y te juntamos con otra persona en la fila. Si no va, toca siguiente.",
        },
        {
          question: "¿Necesito cuenta o login?",
          answer:
            "No. Es anonymous chat without login: entras anónimo, sin registro, sin correo y sin perfil.",
        },
        {
          question: "¿Es como Omegle u Omeagle?",
          answer:
            "Sí. Chatka es una alternativa a Omegle, Omeagle, Chatroulette y OmeTV: videochat aleatorio gratis, sin login.",
        },
        {
          question: "¿Es gratis?",
          answer: "Sí. Random video chat gratis en el navegador.",
        },
        {
          question: "¿Funciona en el celular?",
          answer: "Sí. Ábrelo en el navegador y empieza el chat aleatorio.",
        },
      ],
    },
    connect: {
      title: "Chatka",
      subtitle: "Video aleatorio. Sin cuenta.",
      online: "en línea",
      gender: "Género",
      genderPlaceholder: "Seleccionar",
      male: "Hombre",
      female: "Mujer",
      other: "Otro",
      matchType: "Tipo de match",
      world: "Mundo",
      country: "País",
      countryLabel: "País",
      countryPlaceholder: "Seleccionar país",
      countrySearch: "Buscar país",
      countryEmpty: "No se encontró ningún país.",
      start: "Empezar",
      requesting: "Pidiendo acceso...",
      requestAgain: "Solicitar permisos otra vez",
      denied:
        "Cámara y micrófono bloqueados. Actívalos en el navegador e inténtalo de nuevo.",
      insecure:
        "En esta dirección el celular bloquea la cámara. Ábrelo con HTTPS o en localhost.",
      missing: "No se encontró cámara o micrófono.",
      busy: "La cámara o el micrófono ya están en uso.",
      unknown: "No se pudo acceder a la cámara o al micrófono.",
      disconnectedTitle: "Conexión perdida",
      disconnectedDescription: "El servidor se desconectó. Inténtalo de nuevo.",
      closeAlert: "Cerrar aviso",
    },
    waiting: {
      title: "Buscando a alguien...",
      hint: "En la fila. La conexión empieza cuando alguien entra.",
      blocked:
        "El navegador bloqueó el acceso. Activa cámara y micrófono e inténtalo de nuevo.",
      camera: "Esperando acceso a la cámara...",
    },
    chat: {
      next: "Siguiente",
      placeholder: "Escribe un mensaje...",
      send: "Enviar",
      empty: "Envía un mensaje para empezar el chat.",
      any: "Todos",
      filters: "Filtros",
    },
    notFound: {
      title: "Página no encontrada",
      description: "Esta página no existe.",
      back: "Volver",
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];
