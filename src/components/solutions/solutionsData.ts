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

export const webAudiences = [
  {
    name: "Empresas que já filmam com a Belis",
    description:
      "O vídeo abre a porta; a página fecha o negócio. Mesmo padrão visual, mesma direção.",
  },
  {
    name: "Marcas com site que não vende",
    description:
      "Bonito no desktop, morto no celular, sem CTA claro. A gente reconstrói para converter.",
  },
  {
    name: "Lançamentos e campanhas",
    description:
      "Landing rápida, mensurável e alinhada ao criativo — pronta para tráfego pago.",
  },
] as const satisfies readonly SolutionItem[];

export const systemAudiences = [
  {
    name: "Empresas que já filmam com a Belis",
    description:
      "Depois da autoridade e da conversão, o sistema sustenta a operação. Um parceiro do roteiro ao deploy.",
  },
  {
    name: "Negócios presos em planilhas",
    description:
      "Quando o Excel vira gargalo, um sistema interno sob medida devolve as horas da equipe.",
  },
  {
    name: "Fundadores com uma ideia de produto",
    description:
      "Do conceito ao MVP com auth, billing e dashboard — pronto para os primeiros usuários.",
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

export const WEB_HERO_SUBCOPY =
  "O vídeo gera atenção. A página transforma atenção em lead. Mesma direção criativa, construída para converter.";

export const SYS_HERO_SUBCOPY =
  "Quando a operação trava em planilha, o crescimento trava junto. Software sob medida — do conceito ao deploy.";

export const WEB_CTA_HEADING = "Sua próxima página começa com uma conversa.";
export const SYS_CTA_HEADING = "Seu próximo sistema começa com uma conversa.";

export const WEB_CTA_LABEL = "Falar sobre meu site";
export const SYS_CTA_LABEL = "Falar sobre meu sistema";
export const HERO_CTA_LABEL = "Pedir orçamento";

const wa = (text: string) =>
  `https://wa.me/5511973138895?text=${encodeURIComponent(text)}`;

export const WEB_WHATSAPP_HREF = wa(
  "Olá! Quero um website / landing page com a Belis.",
);
export const SYS_WHATSAPP_HREF = wa(
  "Olá! Quero um sistema / software com a Belis.",
);

export const INSTAGRAM_HREF = "https://www.instagram.com/belisvideo/";
export const EMAIL_HREF = "mailto:Lucas@belis.agency";
