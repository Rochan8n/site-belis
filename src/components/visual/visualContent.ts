export const VISUAL_PATH = "/comunicacao-visual";
export const VISUAL_WHATSAPP = "5511973138895";
export const VISUAL_IMAGE_VERSION = "20261108";

export function visualWhatsAppUrl(message = "Olá, Belis! Quero criar um projeto de comunicação visual. Podemos conversar sobre a minha ideia?") {
  return `https://wa.me/${VISUAL_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const visualProjects = [
  {
    id: "fachada",
    title: "Letras caixa para sua fachada.",
    description: "Letras que dão volume ao nome da sua loja e ajudam a contar, logo na entrada, o que sua marca tem de especial.",
    image: "fachada-origem",
    alt: "Conceito de fachada ORIGEM com letras caixa serifadas pretas em parede clara",
    message: "Olá, Belis! Vi o conceito de fachada na página de comunicação visual e quero conversar sobre letras caixa para a minha loja.",
  },
  {
    id: "logo",
    title: "Seu logo, em relevo.",
    description: "Símbolos, monogramas e letras feitos para levar a identidade da sua marca à recepção, ao escritório ou ao consultório.",
    image: "logo-vertice",
    alt: "Conceito de logo Vértice em relevo, com símbolo em V e letras claras sobre parede verde em uma recepção",
    message: "Olá, Belis! Quero transformar o logo da minha marca em uma peça em relevo. Vi a referência da recepção na página de comunicação visual.",
  },
  {
    id: "luz",
    title: "Efeito neon para a sua ideia.",
    description: "Uma frase, um nome ou um desenho com efeito de luz. Para criar um ponto de atenção que combina com o seu ambiente.",
    image: "letreiro-boa-energia",
    alt: "Conceito de letreiro manuscrito boa energia com efeito neon em luz quente sobre suporte transparente",
    message: "Olá, Belis! Gostei do letreiro com efeito neon e quero criar uma versão personalizada para o meu espaço.",
  },
  {
    id: "personalizado",
    title: "Letras com a sua personalidade.",
    description: "Traços delicados, formas marcantes ou curvas mais leves. O desenho começa no que faz sentido para você.",
    image: "letras-serena",
    alt: "Conceito de letreiro serena com letras arredondadas claras em fachada de tom terroso",
    message: "Olá, Belis! Quero um letreiro com letras personalizadas para a minha marca. Vi a referência serena na página de comunicação visual.",
  },
] as const;

export const visualFaqs = [
  {
    question: "O que vocês fazem em comunicação visual?",
    answer: "Criamos e produzimos letras caixa, letras para fachadas, logos em relevo e letreiros personalizados, incluindo projetos com efeito neon. O desenho, o tamanho e o acabamento são pensados para a identidade da sua marca e para o espaço onde a peça vai ficar.",
  },
  {
    question: "Vocês atendem fora de São Paulo?",
    answer: "Sim. Estamos em São Paulo e atendemos projetos personalizados de todo o Brasil, com criação, produção e envio das peças. Frete, embalagem e prazo de transporte são combinados no orçamento, conforme o projeto e o destino.",
  },
  {
    question: "Já tenho um logo. Dá para usar?",
    answer: "Sim. Envie seu logo e uma foto do local pelo WhatsApp. Vamos avaliar como adaptar o desenho para uma peça com volume, considerando os detalhes, a leitura à distância e as medidas disponíveis. Se você ainda tem só uma ideia, também podemos começar por ela.",
  },
  {
    question: "O letreiro com efeito neon é neon de vidro?",
    answer: "Não. A proposta é criar um efeito visual semelhante ao neon em uma peça personalizada, sem usar neon de vidro. Formato, cor de luz, alimentação e viabilidade são definidos na avaliação do projeto.",
  },
  {
    question: "As letras podem ficar em uma fachada externa?",
    answer: "Projetamos letras para fachadas, mas precisamos entender as condições do local: exposição ao sol, chuva, altura e superfície de fixação. Essas informações orientam a escolha do material, do acabamento e da montagem. Mande uma foto para avaliarmos seu caso.",
  },
  {
    question: "Vocês fazem a instalação?",
    answer: "Nosso serviço inclui criação, produção e envio. A instalação é combinada à parte, conforme a localização, a superfície e as características do projeto. Alinhamos esse ponto com você antes de fechar o orçamento.",
  },
  {
    question: "Quanto custa e qual é o prazo?",
    answer: "Cada projeto tem um orçamento. O valor e o prazo dependem das dimensões, da quantidade de peças, dos detalhes do desenho, do acabamento e da iluminação. Para começar, envie sua ideia, a cidade de entrega e uma medida aproximada. Não precisa ter tudo definido.",
  },
] as const;
