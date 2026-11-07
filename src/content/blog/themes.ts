import type { BlogTheme } from "./types";

export const BLOG_THEMES: Record<BlogTheme, {
  label: string;
  title: string;
  description: string;
  servicePath: string;
  serviceLabel: string;
  accent: string;
}> = {
  "engenharia-reversa": {
    label: "Engenharia reversa",
    title: "Da peça que falta ao projeto que resolve",
    description: "Guias para recuperar peças fora de linha, contratar escaneamento 3D e avaliar materiais, protótipos e dispositivos para sua operação.",
    servicePath: "/engenharia-reversa",
    serviceLabel: "Avaliar um projeto de engenharia reversa",
    accent: "#a6c6a2",
  },
  "comunicacao-visual": {
    label: "Comunicação visual",
    title: "Sua marca ganha forma. Comece pela escolha certa.",
    description: "Compare letras caixa, iluminação e materiais. Planeje letreiros para fachadas e recepções e prepare seu logo para um orçamento sob medida.",
    servicePath: "/comunicacao-visual",
    serviceLabel: "Explorar letras e letreiros personalizados",
    accent: "#dec393",
  },
  audiovisual: {
    label: "Audiovisual",
    title: "Vídeos e cobertura de eventos para empresas",
    description: "Guias para contratar vídeos institucionais e cobertura audiovisual: briefing, escopo, orçamento, formatos e entregas para sua empresa.",
    servicePath: "/portfolio",
    serviceLabel: "Conhecer o portfólio audiovisual",
    accent: "#74c365",
  },
  sites: {
    label: "Sites e conversão",
    title: "Sites e landing pages: escolhas que geram oportunidades",
    description: "Compare sites e landing pages, entenda o orçamento e prepare conteúdo, experiência e medição antes de investir na presença digital da sua empresa.",
    servicePath: "/websites",
    serviceLabel: "Conhecer projetos de websites",
    accent: "#c3caef",
  },
  sistemas: {
    label: "Sistemas e automação",
    title: "Software e automação para organizar sua operação",
    description: "Guias para escolher software pronto ou sob medida, identificar gargalos e planejar automações com critérios de custo, manutenção e uso real.",
    servicePath: "/sistemas",
    serviceLabel: "Conhecer soluções de software",
    accent: "#e6ba7a",
  },
};

export const BLOG_THEME_IDS = Object.keys(BLOG_THEMES) as BlogTheme[];

export function isBlogTheme(value: string): value is BlogTheme {
  return Object.prototype.hasOwnProperty.call(BLOG_THEMES, value);
}

export function themePath(theme: BlogTheme): string {
  return `/blog/temas/${theme}`;
}
