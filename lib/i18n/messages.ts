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
      terms: "Termos",
    },
    hero: {
      title: "Fala com um estranho. Agora.",
      subtitle:
        "Anonymous chat without login. Vídeo aleatório e chat de texto, sem conta, sem e-mail, sem perfil. Chat naturista +18.",
      cta: "Entrar no chat",
      note: "Só maiores de 18. Câmera e microfone ficam no seu navegador.",
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
          title: "Naturista",
          description:
            "Espaço para quem vive o naturismo. Corpo livre, sem julgamento.",
        },
        {
          title: "Anônimo e +18",
          description: "Sem conta. Sem nome real. Só adulto.",
        },
        {
          title: "Moedas, em breve",
          description:
            "Vai dar para doar uma grana, mandar um presentinho e transacionar dentro do chat.",
        },
      ],
    },
    cta: {
      title: "Pronto quando você estiver.",
      button: "Entrar no chat",
    },
    seo: {
      title: "Chat anônimo sem login.",
      body: "Chatka é um chat aleatório de vídeo e texto, tipo Omegle, Omeagle, Chatroulette e OmeTV: anonymous chat without login, random video chat, talk to strangers. Sem cadastro, sem e-mail, sem perfil. Também é um chat naturista +18. Entra, libera a câmera e conversa com um estranho do mundo todo.",
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
          question: "É um chat naturista?",
          answer:
            "Sim. O Chatka é para naturistas e naturalistas maiores de 18 anos. Corpo livre, respeito e sem menor de idade.",
        },
        {
          question: "É tipo Omegle ou Omeagle?",
          answer:
            "Sim, no formato. Chatka é uma alternativa ao Omegle, Omeagle, Chatroulette e OmeTV, feita para o público naturista: videochat aleatório, grátis e sem login.",
        },
        {
          question: "É grátis?",
          answer: "Sim. Random video chat gratuito, no browser.",
        },
        {
          question: "Dá para usar no celular?",
          answer: "Sim. Abre no navegador e começa o chat aleatório.",
        },
        {
          question: "Menor de 18 anos pode usar?",
          answer:
            "Não. O Chatka é só para maiores de 18 anos. Criança e adolescente não podem entrar.",
        },
        {
          question: "Vai ter moedas ou doação?",
          answer:
            "Sim. Em breve você vai poder comprar moedas e doar uma grana para quem estiver no chat.",
        },
      ],
    },
    connect: {
      title: "Chatka",
      subtitle: "Chat naturista. +18. Sem conta.",
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
      ageConfirm: "Tenho 18 anos ou mais",
      termsConfirm: "Li e concordo com os",
      termsLink: "Termos de uso",
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
    terms: {
      title: "Termos de uso",
      updated: "Atualizado em 23 de setembro de 2026",
      intro:
        "Ao usar o Chatka, você confirma que leu e aceita estes termos. Se não concordar, não use o serviço.",
      sections: [
        {
          title: "1. Idade mínima",
          body: "O Chatka é exclusivo para pessoas com 18 anos ou mais. Menores de idade são proibidos. Ao entrar, você declara que é maior de 18 anos. Se identificarmos uso por criança ou adolescente, a sessão é encerrada.",
        },
        {
          title: "2. O que é o Chatka",
          body: "O Chatka é um chat aleatório de vídeo e texto para naturistas e naturalistas, sem conta e sem login. Só maiores de 18 anos. Você pode ser conectado a qualquer pessoa adulta da comunidade. Não há garantia de com quem você vai falar.",
        },
        {
          title: "3. Conduta",
          body: "É proibido assédio, ameaça, conteúdo ilegal, exploração sexual, e qualquer material envolvendo menores. Não grave, transmita nem publique a imagem de outra pessoa sem consentimento. Se alguém pedir para parar, pare.",
        },
        {
          title: "4. Câmera e microfone",
          body: "O acesso à câmera e ao microfone acontece só no seu navegador e só depois da sua autorização. Você pode revogar a permissão a qualquer momento nas configurações do navegador.",
        },
        {
          title: "5. Anonimato e dados",
          body: "Não pedimos nome real, e-mail nem senha. Podemos guardar o mínimo necessário para operar o match, como preferências, país aproximado e estado da sessão. Não vendemos seus dados.",
        },
        {
          title: "6. Encerramento",
          body: "Podemos encerrar uma sessão ou restringir o acesso se houver violação destes termos ou risco para outras pessoas. Você pode sair a qualquer momento fechando a página ou apertando próximo.",
        },
        {
          title: "7. Responsabilidade",
          body: "O Chatka é oferecido como está. Conversas com estranhos envolvem risco. Não nos responsabilizamos por o que outros usuários dizem ou fazem. Se algo for ilegal, denuncie às autoridades competentes.",
        },
      ],
    },
  },
  en: {
    nav: {
      faq: "FAQ",
      chat: "Chat",
      menu: "Menu",
      how: "How it works",
      terms: "Terms",
    },
    hero: {
      title: "Talk to a stranger. Now.",
      subtitle:
        "Anonymous chat without login. Random video and text chat. No account, no email, no profile. Naturist chat, 18+.",
      cta: "Start chatting",
      note: "Adults only. Camera and mic stay in your browser.",
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
          title: "Naturist",
          description:
            "A space for people who live naturism. Free body, no judgment.",
        },
        {
          title: "Anonymous and 18+",
          description: "No account. No real name. Adults only.",
        },
        {
          title: "Coins, coming soon",
          description:
            "You will be able to tip, donate, and transact inside the chat.",
        },
      ],
    },
    cta: {
      title: "Ready when you are.",
      button: "Start chatting",
    },
    seo: {
      title: "Anonymous chat without login.",
      body: "Chatka is a random video and text chat, like Omegle, Omeagle, Chatroulette and OmeTV: anonymous chat without login, talk to strangers, no signup. It is also a naturist chat for adults 18+. Open the browser, allow the camera, and meet someone from anywhere.",
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
          question: "Is this a naturist chat?",
          answer:
            "Yes. Chatka is for naturists 18 and older. Free body, respect, and no minors.",
        },
        {
          question: "Is it like Omegle or Omeagle?",
          answer:
            "Yes, in format. Chatka is an Omegle, Omeagle, Chatroulette and OmeTV alternative built for the naturist community: random video chat, free, no signup.",
        },
        {
          question: "Is it free?",
          answer: "Yes. Free random video chat in the browser.",
        },
        {
          question: "Does it work on mobile?",
          answer: "Yes. Open it in the browser and start a random chat.",
        },
        {
          question: "Can people under 18 use it?",
          answer:
            "No. Chatka is only for adults 18 and older. Children and teenagers are not allowed.",
        },
        {
          question: "Will there be coins or donations?",
          answer:
            "Yes. Soon you will be able to buy coins and tip people in the chat.",
        },
      ],
    },
    connect: {
      title: "Chatka",
      subtitle: "Naturist chat. 18+. No account.",
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
      ageConfirm: "I am 18 years or older",
      termsConfirm: "I have read and agree to the",
      termsLink: "Terms of use",
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
    terms: {
      title: "Terms of use",
      updated: "Updated on September 23, 2026",
      intro:
        "By using Chatka, you confirm that you have read and accept these terms. If you do not agree, do not use the service.",
      sections: [
        {
          title: "1. Minimum age",
          body: "Chatka is only for people 18 years or older. Minors are not allowed. By joining, you state that you are 18 or older. If we identify use by a child or teenager, the session is ended.",
        },
        {
          title: "2. What Chatka is",
          body: "Chatka is a random video and text chat for naturists, with no account and no login. Adults 18 and older only. You may be paired with any adult in the community. There is no guarantee of who you will meet.",
        },
        {
          title: "3. Conduct",
          body: "Harassment, threats, illegal content, sexual exploitation, and any material involving minors are forbidden. Do not record, stream, or publish another person's image without consent. If someone asks you to stop, stop.",
        },
        {
          title: "4. Camera and microphone",
          body: "Camera and microphone access happens only in your browser and only after you allow it. You can revoke permission at any time in the browser settings.",
        },
        {
          title: "5. Anonymity and data",
          body: "We do not ask for a real name, email, or password. We may keep the minimum needed to run matching, such as preferences, approximate country, and session state. We do not sell your data.",
        },
        {
          title: "6. Termination",
          body: "We may end a session or restrict access if these terms are broken or if other people are at risk. You can leave at any time by closing the page or hitting next.",
        },
        {
          title: "7. Liability",
          body: "Chatka is provided as is. Talking to strangers involves risk. We are not responsible for what other users say or do. If something is illegal, report it to the competent authorities.",
        },
      ],
    },
  },
  es: {
    nav: {
      faq: "FAQ",
      chat: "Chat",
      menu: "Menú",
      how: "Cómo funciona",
      terms: "Términos",
    },
    hero: {
      title: "Habla con un extraño. Ahora.",
      subtitle:
        "Anonymous chat without login. Video aleatorio y chat de texto. Sin cuenta, sin correo, sin perfil. Chat naturista +18.",
      cta: "Entrar al chat",
      note: "Solo mayores de 18. Cámara y micrófono se quedan en tu navegador.",
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
          title: "Naturista",
          description:
            "Un espacio para quien vive el naturismo. Cuerpo libre, sin juicio.",
        },
        {
          title: "Anónimo y +18",
          description: "Sin cuenta. Sin nombre real. Solo adultos.",
        },
        {
          title: "Monedas, pronto",
          description:
            "Vas a poder donar, enviar un regalo y transaccionar dentro del chat.",
        },
      ],
    },
    cta: {
      title: "Listo cuando tú lo estés.",
      button: "Entrar al chat",
    },
    seo: {
      title: "Chat anónimo sin registro.",
      body: "Chatka es un videochat aleatorio de video y texto, como Omegle, Omeagle, Chatroulette y OmeTV: anonymous chat without login, chat sin cuenta, hablar con extraños. También es un chat naturista +18. Entras, das la cámara y hablas con alguien de cualquier país.",
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
          question: "¿Es un chat naturista?",
          answer:
            "Sí. Chatka es para naturistas mayores de 18 años. Cuerpo libre, respeto y sin menores.",
        },
        {
          question: "¿Es como Omegle u Omeagle?",
          answer:
            "Sí, en el formato. Chatka es una alternativa a Omegle, Omeagle, Chatroulette y OmeTV hecha para el público naturista: videochat aleatorio, gratis y sin login.",
        },
        {
          question: "¿Es gratis?",
          answer: "Sí. Random video chat gratis en el navegador.",
        },
        {
          question: "¿Funciona en el celular?",
          answer: "Sí. Ábrelo en el navegador y empieza el chat aleatorio.",
        },
        {
          question: "¿Pueden usarlo menores de 18?",
          answer:
            "No. Chatka es solo para mayores de 18 años. Niños y adolescentes no pueden entrar.",
        },
        {
          question: "¿Habrá monedas o donaciones?",
          answer:
            "Sí. Pronto vas a poder comprar monedas y donar una propina a quien esté en el chat.",
        },
      ],
    },
    connect: {
      title: "Chatka",
      subtitle: "Chat naturista. +18. Sin cuenta.",
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
      ageConfirm: "Tengo 18 años o más",
      termsConfirm: "Leí y acepto los",
      termsLink: "Términos de uso",
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
    terms: {
      title: "Términos de uso",
      updated: "Actualizado el 23 de septiembre de 2026",
      intro:
        "Al usar Chatka, confirmas que leíste y aceptas estos términos. Si no estás de acuerdo, no uses el servicio.",
      sections: [
        {
          title: "1. Edad mínima",
          body: "Chatka es solo para personas de 18 años o más. Los menores no pueden usarlo. Al entrar, declaras que tienes 18 años o más. Si identificamos uso por un niño o adolescente, la sesión se cierra.",
        },
        {
          title: "2. Qué es Chatka",
          body: "Chatka es un chat aleatorio de video y texto para naturistas, sin cuenta y sin login. Solo mayores de 18 años. Puedes ser conectado con cualquier persona adulta de la comunidad. No hay garantía de con quién vas a hablar.",
        },
        {
          title: "3. Conducta",
          body: "Están prohibidos el acoso, las amenazas, el contenido ilegal, la explotación sexual y cualquier material que involucre menores. No grabes, transmitas ni publiques la imagen de otra persona sin consentimiento. Si alguien te pide que pares, para.",
        },
        {
          title: "4. Cámara y micrófono",
          body: "El acceso a la cámara y al micrófono ocurre solo en tu navegador y solo después de tu autorización. Puedes revocar el permiso en cualquier momento en la configuración del navegador.",
        },
        {
          title: "5. Anonimato y datos",
          body: "No pedimos nombre real, correo ni contraseña. Podemos guardar lo mínimo para operar el match, como preferencias, país aproximado y estado de la sesión. No vendemos tus datos.",
        },
        {
          title: "6. Cierre",
          body: "Podemos cerrar una sesión o restringir el acceso si se violan estos términos o si hay riesgo para otras personas. Puedes salir en cualquier momento cerrando la página o tocando siguiente.",
        },
        {
          title: "7. Responsabilidad",
          body: "Chatka se ofrece tal como está. Hablar con extraños implica riesgo. No nos hacemos responsables de lo que otros usuarios digan o hagan. Si algo es ilegal, denúncialo a las autoridades competentes.",
        },
      ],
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];
