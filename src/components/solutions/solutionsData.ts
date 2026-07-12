export type SolutionItem = {
  readonly name: string;
  readonly description: string;
};

export type ProcessStep = SolutionItem & {
  readonly index: string;
};

export const webItems = [
  {
    name: "Landing pages de alta conversão",
    description:
      "Uma página, um objetivo. Estrutura, copy e velocidade desenhadas para transformar visita em contato.",
  },
  {
    name: "Sites institucionais / brand sites",
    description:
      "A presença digital no mesmo nível do vídeo que apresenta a sua marca.",
  },
  {
    name: "Ecossistemas digitais",
    description:
      "Performance, velocidade e UX tratados como requisito, não como promessa.",
  },
] as const satisfies readonly SolutionItem[];

export const sysItems = [
  {
    name: "Micro-SaaS / MVPs",
    description:
      "Valide a ideia e chegue ao primeiro cliente pagante sem queimar orçamento.",
  },
  {
    name: "SaaS completo",
    description:
      "Autenticação, billing e dashboard prontos para crescer com o produto.",
  },
  {
    name: "ERP & sistemas internos",
    description: "Operação sob medida, sem pagar por licenças que não usa.",
  },
  {
    name: "Portais do cliente",
    description: "Autoatendimento que reduz suporte e aumenta retenção.",
  },
  {
    name: "Dashboards & automações",
    description: "Seus dados e rotinas trabalhando enquanto você dorme.",
  },
  {
    name: "Integrações",
    description: "CRM, WhatsApp, pagamentos e APIs conversando entre si.",
  },
] as const satisfies readonly SolutionItem[];

const companiesAudience = {
  name: "Empresas que já filmam com a Belis",
  description:
    "O vídeo abre a porta; a página e o sistema fecham e escalam o negócio. Um parceiro só, do roteiro ao deploy.",
} as const;

export const webAudiences = [companiesAudience] as const satisfies readonly SolutionItem[];

export const systemAudiences = [
  companiesAudience,
  {
    name: "Negócios presos em planilhas",
    description:
      "Quando o Excel vira gargalo, um sistema interno sob medida devolve as horas da sua equipe.",
  },
  {
    name: "Fundadores com uma ideia de produto",
    description:
      "Do conceito ao MVP funcional com auth, billing e dashboard — pronto para os primeiros usuários.",
  },
] as const satisfies readonly SolutionItem[];

export const processSteps = [
  {
    index: "01",
    name: "Discovery",
    description:
      "Entendemos o negócio, o gargalo e o resultado esperado. Escopo claro antes de qualquer linha de código.",
  },
  {
    index: "02",
    name: "Prototype",
    description:
      "Protótipo navegável para validar fluxo e visual antes de construir. Você aprova vendo, não imaginando.",
  },
  {
    index: "03",
    name: "Build",
    description:
      "Sprints semanais com entregas visíveis e comunicação direta — sem intermediários.",
  },
  {
    index: "04",
    name: "Launch",
    description:
      "Deploy, monitoramento e evolução contínua. O lançamento é o começo, não o fim.",
  },
] as const satisfies readonly ProcessStep[];

export const qualityItems = [
  {
    name: "Performance de verdade",
    description:
      "Carregamento rápido e Core Web Vitals no verde — porque página lenta não converte.",
  },
  {
    name: "Mobile-first",
    description: "A maioria dos seus clientes chega pelo celular. É onde começamos.",
  },
  {
    name: "Código que dura",
    description:
      "Stack moderna e manutenível: seu sistema cresce sem precisar ser reescrito.",
  },
  {
    name: "Segurança & dados",
    description:
      "Autenticação, permissões e backups tratados como fundação, não como extra.",
  },
] as const satisfies readonly SolutionItem[];

export const STACK_LINE =
  "Next.js · React · Tailwind · Node · PostgreSQL · integrações via API";

export const HERO_SUBCOPY =
  "A mesma direção dedicada que produz o seu vídeo agora projeta a página que converte e o software que sustenta a operação.";

export const CTA_HEADING = "Seu próximo sistema começa com uma conversa.";

export const WHATSAPP_HREF =
  "https://wa.me/5511973138895?text=Ol%C3%A1!%20Quero%20um%20website%20ou%20sistema%20com%20a%20Belis.";

export const INSTAGRAM_HREF = "https://www.instagram.com/belisvideo/";
export const EMAIL_HREF = "mailto:Lucas@belis.agency";
