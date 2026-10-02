/**
 * TATTOO PORTFOLIO & STUDIO DATA
 * Brand: WM Tattoo Studio (@wm_tattoo_studio)
 * Location: Goiânia – GO
 * Specialties: Preto e Cinza (Pr e Br), Tatuagem Feminina, Cobertura (Cover-up)
 * Recognition: Tatuador Premiado 🏆
 * Motto: "A imaginação é mais importante que o conhecimento"
 */

export const ARTIST_INFO = {
  name: "WM Tattoo Studio",
  codeName: "WM TATTOO",
  displayName: "WM Tattoo Studio",
  tagline: "Tatuador Premiado 🏆 • Especialista Preto & Cinza",
  specialties: "Preto e Cinza • Tatuagem Feminina • Cobertura",
  motto: "A imaginação é mais importante que o conhecimento",
  experienceYears: "Premiado",
  whatsappNumber: "5562999999999", // Can be customized with studio phone
  instagramHandle: "@wm_tattoo_studio",
  instagramUrl: "https://www.instagram.com/wm_tattoo_studio/#",
  studioName: "WM Tattoo Studio",
  location: "Goiânia – GO",
  fullLocation: "Goiânia – GO (Atendimento Exclusivo)",
  biosafetyText: "100% dos materiais descartáveis e esterilizados em autoclave hospitalar. Tintas homologadas pela Anvisa.",
  shortBio: "Tatuador premiado especializado em Preto e Cinza, Tatuagens Femininas e Coberturas de alta complexidade em Goiânia-GO. Arte autoral e rigor técnico para eternizar sua história na pele.",
  fullBio: `Bem-vindo ao **WM Tattoo Studio** (@wm_tattoo_studio), sediado em **Goiânia – GO**. 

Com premiações em convenções e dedicação integral à arte na pele, meu trabalho se fundamenta na máxima de que *"A imaginação é mais importante que o conhecimento"*. Cada projeto nasce de um estudo minucioso da anatomia, combinando contraste, textura e fluidez visual.

**Principais Especialidades:**
- **Preto e Cinza (Pr e Br / Black & Grey):** Realismo, mitologia, guerreiros orientais e sombreados suaves com contraste profundo.
- **Tatuagens Femininas & Delicadas:** Composições anatômicas, asas, botânicas e linhas de caimento perfeito.
- **Cobertura & Restauração (Cover-up):** Planejamento estratégico de camuflagem e transformação de tatuagens antigas em novas obras.

Atendimento personalizado com hora marcada, garantindo privacidade, conforto e biossegurança 100% de padrão hospitalar.`
};

export const TATTOO_CATEGORIES = [
  { id: 'all', label: 'Todos os Trabalhos' },
  { id: 'blackandgrey', label: 'Preto & Cinza (Pr e Br)' },
  { id: 'feminine', label: 'Tatuagem Feminina' },
  { id: 'samurai', label: 'Guerreiros & Oriental' },
  { id: 'coverup', label: 'Cobertura & Projetos' }
];

export const TATTOO_WORKS = [
  {
    id: 'wm-samurai-temple',
    title: 'Guerreiro Samurai & Templo Oriental',
    category: 'samurai',
    categoryLabel: 'Preto & Cinza // Oriental',
    image: '/tattoos/wm-samurai-temple.png',
    location: 'Braço & Ombro (Fechamento)',
    technique: 'Preto e Cinza com alto contraste, gradientes de sombra e iluminação lunar',
    duration: 'Sessão Completa (4h)',
    painLevel: 'Moderado (3/5)',
    description: 'Composição oriental em Preto e Cinza apresentando guerreiro samurai sob a lua cheia com templo japonês tradicional ao fundo. Trabalho focado em profundidade atmosférica, textura nas vestes e fluidez anatômica no deltóide.',
    tags: ['Samurai', 'Preto e Cinza', 'Oriental', 'Fechamento de Braço', 'Pagoda'],
    featured: true
  },
  {
    id: 'wm-catrina-rose',
    title: 'Catrina & Rosa com Taça',
    category: 'blackandgrey',
    categoryLabel: 'Preto & Cinza // Realismo',
    image: '/tattoos/wm-catrina-rose.png',
    location: 'Canela / Perna',
    technique: 'Realismo sombreado, degradê suave (Grey Wash) e detalhes de flor e taça',
    duration: '3h30m',
    painLevel: 'Moderado (3/5)',
    description: 'Retrato de Catrina estilizada com maquiagem temática, rosa detalhada no topo e taça de cocktail. Sombreados suaves e transições limpas que conferem volume e durabilidade à arte.',
    tags: ['Catrina', 'Preto e Cinza', 'Rosa', 'Canela', 'Sombreado'],
    featured: true
  },
  {
    id: 'wm-poseidon-ship',
    title: 'Poseidon & Caravela em Tempestade',
    category: 'blackandgrey',
    categoryLabel: 'Preto & Cinza // Mitologia',
    image: '/tattoos/wm-poseidon-ship.png',
    location: 'Perna / Panturrilha',
    technique: 'Contraste denso, textura de fios e ondas com técnica de Grey Wash profundo',
    duration: '4h00m',
    painLevel: 'Moderado (3/5)',
    description: 'Imponente retrato do Deus dos Mares Poseidon com olhar penetrante e barba fluida, integrando um navio de época navegando sobre o mar tempestuoso na base da composição.',
    tags: ['Poseidon', 'Mitologia', 'Navio', 'Preto e Cinza', 'Perna'],
    featured: true
  },
  {
    id: 'wm-feminine-wings',
    title: 'Asas de Fada & Borboleta',
    category: 'feminine',
    categoryLabel: 'Tatuagem Feminina',
    image: '/tattoos/wm-feminine-wings.png',
    location: 'Costas (Escápulas)',
    technique: 'Sombreado translúcido, textura orgânica e simetria anatômica impecável',
    duration: '2h30m',
    painLevel: 'Leve a Moderado (2/5)',
    description: 'Composição feminina de asas etéreas de fada/borboleta nas costas, valorizando as linhas da coluna e a anatomia das escápulas com suavidade de traço e sombreado aveludado.',
    tags: ['Feminina', 'Asas', 'Costas', 'Delicada', 'Simetria'],
    featured: true
  },
  {
    id: 'wm-ronin-warrior',
    title: 'Ronin Samurai em Guarda',
    category: 'samurai',
    categoryLabel: 'Preto & Cinza // Guerreiro',
    image: '/tattoos/wm-ronin-warrior.png',
    location: 'Antebraço',
    technique: 'Linhas expressivas, armadura segmentada e sombreado de fumaça',
    duration: '3h00m',
    painLevel: 'Leve (2/5)',
    description: 'Guerreiro Ronin em posição de guarda com armadura tradicional de samurai e expressão marcante. Encaixe perfeito no antebraço com degradê dinâmico de fundo.',
    tags: ['Ronin', 'Samurai', 'Preto e Cinza', 'Antebraço', 'Guerreiro'],
    featured: true
  },
  {
    id: 'wm-valkyrie-eagle',
    title: 'Valquíria & Adereço de Águia',
    category: 'blackandgrey',
    categoryLabel: 'Preto & Cinza // Realismo',
    image: '/tattoos/wm-valkyrie-eagle.png',
    location: 'Braço / Antebraço',
    technique: 'Realismo sombreado, textura de penas e Grey Wash suave',
    duration: '3h30m',
    painLevel: 'Moderado (3/5)',
    description: 'Semblante feminino expressivo em realismo com adereço de cabeça em formato de águia detalhada e crânio na base. Trabalho técnico com transições suaves de sombras e contraste limpo.',
    tags: ['Valquíria', 'Águia', 'Preto e Cinza', 'Realismo', 'Braço'],
    featured: true
  }
];

export const SPECIALTY_SECTORS = [
  {
    id: 'black-and-grey',
    title: 'Preto & Cinza (Black & Grey)',
    badge: 'ESPECIALIDADE PRINCIPAL',
    tagline: 'Realismo, Mitologia e Profundidade',
    desc: 'O domínio do preto e cinza (pr e br) com técnicas avançadas de Grey Wash, contrastes sólidos e degradês suaves. Ideal para samurais, deuses mitológicos, retratos e fechamentos de membros.',
    points: [
      'Degradês suaves de sombra sem cortes bruscos',
      'Contraste calibrado para não desbotar ou virar borrão',
      'Estudo de luz, sombra e volume tridimensional na pele'
    ],
    highlight: 'Especialista'
  },
  {
    id: 'feminine',
    title: 'Tatuagem Feminina',
    badge: 'ESTÉTICA & FLUÍDEZ',
    tagline: 'Asas, Botânica e Linhas Anatômicas',
    desc: 'Projetos pensados para valorizar as curvas e proporções do corpo feminino, como asas de fada nas costas, botânicas delicadas, frases e composições harmônicas.',
    points: [
      'Caimento anatômico sob medida para o corpo',
      'Sombreados translúcidos e leves',
      'Elegância atemporal e cicatrização delicada'
    ],
    highlight: 'Destaque'
  },
  {
    id: 'cover-up',
    title: 'Cobertura & Restauração',
    badge: 'ALTA COMPLEXIDADE',
    tagline: 'Cover-Up Estratégico e Revitalização',
    desc: 'Transformação de tatuagens antigas, desgastadas ou indesejadas através de planejamento inteligente de sombras escuras, texturas e novas sobreposições artísticas.',
    points: [
      'Avaliação prévia minuciosa do pigmento antigo',
      'Uso estratégico de texturas e sombras para camuflagem total',
      'Sem necessidade de laser na maioria dos casos avaliados'
    ],
    highlight: 'Sob Análise'
  },
  {
    id: 'authorial',
    title: 'Projetos Autorais & Premiações',
    badge: 'TATUADOR PREMIADO 🏆',
    tagline: 'Arte Exclusiva Sob Medida',
    desc: 'Criação de desenhos do zero para quem busca uma peça única e marcante. A união entre imaginação artística, precisão cirúrgica e reconhecimento em convenções.',
    points: [
      'Desenho 100% autoral exclusivo para você',
      'Reconhecimento técnico e troféus em convenções',
      'Harmonia total com a musculatura e tamanho'
    ],
    highlight: 'Exclusivo'
  }
];

export const FAQ_ITEMS = [
  {
    question: "Como funciona para fazer um orçamento no WM Tattoo Studio?",
    answer: "Você pode usar nosso simulador ou chamar direto no WhatsApp. Basta nos enviar sua ideia ou referência, o tamanho aproximado em centímetros e a região do corpo. O orçamento é respondido rapidamente com valores e datas disponíveis na agenda em Goiânia – GO."
  },
  {
    question: "Como funciona a cobertura (Cover-Up) de uma tatuagem antiga?",
    answer: "Para fazer uma cobertura, analisamos a tonalidade e densidade do pigmento antigo. Criamos um projeto estratégico em Preto e Cinza ou com texturas que sobrepõem perfeitamente o desenho anterior, transformando-o em uma arte totalmente nova."
  },
  {
    question: "Por que o Preto e Cinza (Pr e Br) do estúdio tem tanta durabilidade?",
    answer: "Utilizamos pigmentos homologados pela Anvisa com diluição correta (Grey Wash) e aplicação na profundidade exata da derme. Isso impede que os tons claros sumam e garante que as sombras escuras permaneçam nítidas ao longo dos anos."
  },
  {
    question: "Quais são os protocolos de biossegurança do estúdio?",
    answer: "100% dos materiais em contato com o cliente (agulhas, luvas, biqueiras, plástico filme e protetores de máquina) são descartáveis e abertos na sua presença. O estúdio segue rigorosamente as normas da Vigilância Sanitária e Anvisa."
  },
  {
    question: "Onde fica localizado o estúdio em Goiânia?",
    answer: "O WM Tattoo Studio fica localizado em Goiânia – GO, com atendimento exclusivo e reservado mediante agendamento prévio com hora marcada."
  }
];

export const AFTERCARE_STEPS = [
  {
    step: "01",
    title: "Filme Protetor Inicial",
    desc: "Mantenha a película de proteção pelo período orientado pelo tatuador para blindar a pele contra bactérias e atritos nas primeiras horas."
  },
  {
    step: "02",
    title: "Higiene Suave",
    desc: "Lave com água corrente e sabonete neutro ou antibacteriano. Seque apenas com toques suaves de papel toalha limpo, sem esfregar."
  },
  {
    step: "03",
    title: "Hidratação & Pomada",
    desc: "Aplique uma camada bem fina da pomada pós-tatuagem recomendada 2 a 3 vezes ao dia. Camadas finas deixam a derme respirar e cicatrizar melhor."
  },
  {
    step: "04",
    title: "Preservação do Preto e Cinza",
    desc: "Evite sol direto, mar, piscina e sauna nos primeiros 25 dias. Jamais puxe as casquinhas para não comprometer os degradês de sombra."
  }
];
