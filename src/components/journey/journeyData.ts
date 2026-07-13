import type { BelisBlobLook } from "@/types/custom-elements";

export const STATION_COUNT = 6;

export const backgrounds = [
  "#0A0A0C",
  "#0B0B0D",
  "#E9E5DA",
  "#E5E2D5",
  "#0B0B0D",
  "#0A0A0C",
] as const;

export const inks = [
  "#EFECE2",
  "#EFECE2",
  "#16161A",
  "#16161A",
  "#EFECE2",
  "#EFECE2",
] as const;

/** Labels quietos no HUD — arco interno, sem nomenclatura de monomito */
export const acts = [
  "INÍCIO",
  "PARCEIRO",
  "STUDIO",
  "WEB",
  "SYSTEMS",
  "CONTATO",
] as const;

export const looks: readonly BelisBlobLook[] = [
  // 0 Início — mercury sólido no escuro (ref foto 1)
  { amp: 0.36, freq: 0.95, spin: 0.10, solid: 1, wire: 0, points: 0, colA: "#F4F6F8", colB: "#74C365", base: "#040405", fadeCol: "#0A0A0C" },
  // 1 Parceiro — mercury mais agitado / iridescente
  { amp: 0.44, freq: 1.12, spin: 0.14, solid: 1, wire: 0, points: 0, colA: "#EAEFF2", colB: "#5FAF52", base: "#020203", fadeCol: "#0B0B0D" },
  // 2 Studio — mercury no paper (ref foto 2)
  { amp: 0.55, freq: 1.05, spin: 0.09, solid: 1, wire: 0, points: 0, colA: "#FFFFFF", colB: "#6BB85C", base: "#010101", fadeCol: "#E9E5DA" },
  // 3 Web — wireframe oliva denso no paper (ref foto 3)
  { amp: 0.50, freq: 1.35, spin: 0.20, solid: 0, wire: 1, points: 0, colA: "#7A7648", colB: "#C2B86E", base: "#080809", fadeCol: "#E5E2D5" },
  // 4 Systems — mesh cream no escuro (ref foto 4)
  { amp: 0.52, freq: 1.20, spin: 0.18, solid: 0, wire: 0.45, points: 0.85, colA: "#F2EBDA", colB: "#D8CDA8", base: "#0C0C10", fadeCol: "#0B0B0D" },
  // 5 Contato — point cloud verde suave
  { amp: 0.24, freq: 0.72, spin: 0.05, solid: 0.2, wire: 0, points: 0.9, colA: "#9FE38C", colB: "#EFECE2", base: "#0E140C", fadeCol: "#0A0A0C" },
];

export const sections = [
  { index: 0, label: "Início", act: "Início" },
  { index: 1, label: "Parceiro", act: "Parceiro" },
  { index: 2, label: "Studio", act: "Visibilidade" },
  { index: 3, label: "Web", act: "Conversão" },
  { index: 4, label: "Systems", act: "Escala" },
  { index: 5, label: "Contato", act: "Contato" },
] as const;

export const markers = [
  { station: 1, number: "", name: "BELIS", className: "marker-guide", bulge: [0, 1] },
  { station: 2, number: "01", name: "STUDIO", className: "marker-studio", bulge: [1, 0.2] },
  { station: 3, number: "02", name: "WEB", className: "marker-web", bulge: [1, 0] },
  { station: 4, number: "03", name: "SYSTEMS", className: "marker-systems", bulge: [1, -0.2] },
  { station: 5, number: "", name: "CONTATO", className: "marker-return", bulge: [1, -0.4] },
] as const;

export const trials = [
  {
    station: 2,
    number: "01",
    name: "STUDIO",
    focus: "VISIBILIDADE",
    title: "De invisível a inesquecível.",
    before: "marca que ninguém lembra",
    after: "autoridade que fecha contrato",
    description:
      "Empresas crescem quando conseguem comunicar a qualidade que já entregam. Construímos uma primeira impressão que gera confiança e torna sua marca lembrada.",
    noteTitle: "PROCESSO",
    noteLines: ["ESTRATÉGIA · CAPTAÇÃO · EDIÇÃO", "UMA MARCA MAIS CLARA E MEMORÁVEL"],
    href: "/portfolio",
    cta: "CONHECER PROJETOS AUDIOVISUAIS",
    theme: "paper",
  },
  {
    station: 3,
    number: "02",
    name: "WEB",
    focus: "CONVERSÃO",
    title: "Seu site deveria trabalhar todos os dias.",
    before: "site que apenas apresenta",
    after: "ativo que atrai e converte",
    description:
      "Criamos sites preparados para SEO, GEO, AEO, performance, conversão e arquitetura semântica.",
    noteTitle: "FUNDAÇÃO",
    noteLines: ["CONTEÚDO · EXPERIÊNCIA · TECNOLOGIA", "RÁPIDO, CLARO E MENSURÁVEL"],
    href: "/websites",
    cta: "CONHECER PROJETOS WEB",
    theme: "paper",
  },
  {
    station: 4,
    number: "03",
    name: "SYSTEMS",
    focus: "ESCALA",
    title: "Software é a continuidade da transformação.",
    before: "gargalos limitando a operação",
    after: "estrutura pronta para escalar",
    description: "Criamos ferramentas sob medida para eliminar gargalos e preparar empresas para crescer com controle.",
    noteTitle: "OPERAÇÃO",
    noteLines: ["PROCESSOS · AUTOMAÇÃO · DADOS", "SOB MEDIDA PARA SUA EMPRESA"],
    href: "/sistemas",
    cta: "CONHECER SOLUÇÕES SOB MEDIDA",
    theme: "dark",
  },
] as const;

export const studioStats = [
  ["150+", "PROJETOS ENTREGUES"],
  ["07D", "PRIMEIRA VERSÃO"],
  ["01", "PARCEIRO DO FRAME AO SISTEMA"],
] as const;

export const proofs = [
  { name: "Dra. Barbara Goldoni", role: "Cirurgiã", image: "/images/barbara.jpg", youtubeId: "PQzI3UtDaao", imagePosition: "center 28%" },
  { name: "Dr. Thiago Barbosa", role: "Advogado", image: "/images/thiago.jpg", youtubeId: "hVu5yhGCVmk" },
  { name: "Dra. Ana Carolina", role: "Médica", image: "/images/ana carolina.jpg", youtubeId: "JoY-feXnk9c", imagePosition: "center 30%" },
] as const;
