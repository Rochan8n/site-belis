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

export const acts = [
  "ATO I · PARTIDA",
  "ATO II · INICIAÇÃO",
  "ATO II · INICIAÇÃO",
  "ATO II · INICIAÇÃO",
  "ATO II · INICIAÇÃO",
  "ATO III · RETORNO",
] as const;

export const looks: readonly BelisBlobLook[] = [
  { amp: 0.06, freq: 1.2, spin: 0.12, solid: 1, wire: 0, points: 0, colA: "#DBDEE6", colB: "#74C365", base: "#0B0C10", fadeCol: "#0A0A0C" },
  { amp: 0.12, freq: 1.35, spin: 0.16, solid: 1, wire: 0, points: 0, colA: "#E6E9EE", colB: "#74C365", base: "#0B0C10", fadeCol: "#0B0B0D" },
  { amp: 0.17, freq: 1.45, spin: 0.2, solid: 1, wire: 0, points: 0, colA: "#C9CCD4", colB: "#74C365", base: "#0C0D11", fadeCol: "#E9E5DA" },
  { amp: 0.2, freq: 1.7, spin: 0.22, solid: 0, wire: 0.9, points: 0, colA: "#5B5F31", colB: "#74C365", base: "#101013", fadeCol: "#E5E2D5" },
  { amp: 0.18, freq: 1.55, spin: 0.22, solid: 0, wire: 0.95, points: 0, colA: "#EFE9D8", colB: "#74C365", base: "#101013", fadeCol: "#0B0B0D" },
  { amp: 0.08, freq: 1.25, spin: 0.34, solid: 1, wire: 0, points: 0, colA: "#DBDEE6", colB: "#74C365", base: "#0B0C10", fadeCol: "#0A0A0C" },
];

export const sections = [
  { index: 0, label: "O Chamado", act: "Act I · Partida" },
  { index: 1, label: "O Guia", act: "Act II · Iniciação" },
  { index: 2, label: "Studio", act: "A Visibilidade" },
  { index: 3, label: "Web", act: "A Conversão" },
  { index: 4, label: "Systems", act: "A Escala" },
  { index: 5, label: "O Retorno", act: "Act III · Retorno" },
] as const;

export const markers = [
  { station: 1, number: "", name: "O GUIA", className: "marker-guide", bulge: [0, 1] },
  { station: 2, number: "01", name: "STUDIO", className: "marker-studio", bulge: [1, 0] },
  { station: 3, number: "02", name: "WEB", className: "marker-web", bulge: [1, -0.4] },
  { station: 4, number: "03", name: "SYSTEMS", className: "marker-systems", bulge: [-1, -0.3] },
  { station: 5, number: "", name: "O RETORNO", className: "marker-return", bulge: [-1, 0.2] },
] as const;

export const trials = [
  {
    station: 2, number: "01", name: "STUDIO", trial: "A VISIBILIDADE",
    title: "De invisível a inesquecível.", before: "marca que ninguém lembra", after: "autoridade que fecha contrato",
    description: "Direção criativa e acabamento cinema-grade transformam sua marca no nome que o mercado cita.",
    noteTitle: "PIPELINE", noteLines: ["ROTEIRO · CAPTAÇÃO · PÓS", "CINEMA-GRADE — 16:9 · 9:16"], href: "/portfolio", theme: "paper",
  },
  {
    station: 3, number: "02", name: "WEB", trial: "A CONVERSÃO",
    title: "De vitrine a máquina.", before: "site que só enfeita", after: "página que vende sozinha",
    description: "O vídeo abre a porta; a página fecha o negócio. Performance e UX no mesmo padrão do que filmamos.",
    noteTitle: "STACK", noteLines: ["DISCOVERY · DESIGN · BUILD", "MEDIDO, NÃO PROMETIDO"], href: "/websites", theme: "paper",
  },
  {
    station: 4, number: "03", name: "SYSTEMS", trial: "A ESCALA",
    title: "De refém a dono.", before: "operação presa em planilhas", after: "sistema que escala sem você",
    description: "Do micro-SaaS ao ERP: software sob medida, do conceito ao deploy.",
    noteTitle: "CORE", noteLines: ["AUTH · BILLING · DADOS", "SOB MEDIDA — SEM LICENÇAS"], href: "/sistemas", theme: "dark",
  },
] as const;

export const studioStats = [
  ["150+", "PROJETOS ENTREGUES"], ["07D", "PRIMEIRA VERSÃO"], ["01", "GUIA ÚNICO"],
] as const;

export const importantProjects = ["Krrom Construtora", "Laticínios Latco", "Salles Nogueira Advogados", "Kofar Metalúrgica"] as const;

export const proofs = [
  { name: "Dra. Barbara Goldoni", role: "Cirurgiã", image: "/images/barbara.jpg", youtubeId: "PQzI3UtDaao" },
  { name: "Dr. Thiago Barbosa", role: "Advogado", image: "/images/thiago.jpg", youtubeId: "hVu5yhGCVmk" },
  { name: "Dra. Ana Carolina", role: "Médica", image: "/images/ana carolina.jpg", youtubeId: "JoY-feXnk9c" },
] as const;
