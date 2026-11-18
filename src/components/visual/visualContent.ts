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
    description: "Letras vermelhas e pretas, com volume e contraste sobre um painel claro. Uma possibilidade para destacar o nome da loja.",
    image: "letreiro-vermelho-preto.png", width: 798, height: 604,
    alt: "Letreiro AM Galeria SP com letras vermelhas e pretas em relevo sobre painel branco",
    message: "Olá, Belis! Quero um orçamento de letras caixa para minha fachada. Posso enviar meu logo e a cidade de entrega?",
  },
  {
    id: "logo",
    title: "Luz por trás. Marca em destaque.",
    description: "A iluminação traseira desenha um halo na parede e valoriza o contorno do logo. Um efeito para fachadas e entradas.",
    image: "fachada-luz-quente.png", width: 800, height: 450,
    alt: "Fachada com símbolo circular e letreiro Estetik iluminados por trás em luz quente",
    message: "Olá, Belis! Quero um orçamento de logo e letreiro com iluminação traseira para minha marca.",
  },
  {
    id: "luz",
    title: "Letras com frente iluminada.",
    description: "A luz atravessa a frente da letra, dando destaque ao desenho. Tamanho, cor e intensidade são definidos para o seu projeto.",
    image: "letra-frente-iluminada.png", width: 1024, height: 1024,
    alt: "Letra O com frente branca iluminada, segurada acima de uma bancada com outras letras",
    message: "Olá, Belis! Quero um orçamento de letras com frente iluminada para meu projeto.",
  },
  {
    id: "personalizado",
    title: "Presença também nos interiores.",
    description: "Letras azuis com luz quente mostram como cor e iluminação podem conversar com o ambiente. Para recepções, salas e espaços comerciais.",
    image: "letras-interior-azul.png", width: 1600, height: 738,
    alt: "Ambiente interno com letras B e J azuis e iluminação quente sobre colunas claras",
    message: "Olá, Belis! Quero um orçamento de letras personalizadas para um ambiente interno. Posso mandar uma foto do local?",
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
