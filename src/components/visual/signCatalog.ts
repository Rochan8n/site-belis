export const signFonts = [
  { id: "essencial", label: "Essencial", family: "Archivo" },
  { id: "classica", label: "Clássica", family: "Bodoni Moda" },
  { id: "manuscrita", label: "Manuscrita", family: "Satisfy" },
  { id: "marcante", label: "Marcante", family: "Bebas Neue" },
  { id: "retro", label: "Retrô", family: "Righteous" },
  { id: "geometrica", label: "Geométrica", family: "Syne" },
  { id: "criativa", label: "Criativa", family: "Bungee" },
  { id: "assinatura", label: "Assinatura", family: "Pacifico" },
  { id: "elegante", label: "Elegante", family: "Cormorant Garamond" },
  { id: "editorial", label: "Editorial", family: "Playfair Display" },
  { id: "romana", label: "Romana", family: "Cinzel" },
  { id: "moderna", label: "Moderna", family: "Montserrat" },
  { id: "arredondada", label: "Arredondada", family: "Quicksand" },
  { id: "compacta", label: "Compacta", family: "Oswald" },
  { id: "impacto", label: "Impacto", family: "Anton" },
  { id: "artesanal", label: "Artesanal", family: "Caveat" },
  { id: "caligrafica", label: "Caligráfica", family: "Dancing Script" },
  { id: "futurista", label: "Futurista", family: "Orbitron" },
] as const;

// Depth is a screen-space illustration, not a manufacturing dimension.
// Research and construction constraints: docs/comunicacao-visual-efeitos.md.
export const signDesigns = [
  { id: "volume", label: "Letras em relevo", description: "Forma, volume e sombra. Sem luz.", lit: false, sideView: false, depth: 14 },
  { id: "frontal", label: "Luz frontal", description: "A frente da letra ganha luz.", lit: true, sideView: false, depth: 14 },
  { id: "halo", label: "Halo de luz", description: "Luz por trás, desenhando a parede.", lit: true, sideView: false, depth: 14 },
  { id: "dupla", label: "Dupla luz", description: "Frente iluminada e halo ao redor.", lit: true, sideView: false, depth: 14 },
  { id: "neon", label: "Efeito neon", description: "Um contorno de luz para sua marca.", lit: true, sideView: false, depth: 8 },
  { id: "lateral", label: "Lateral translúcida", description: "Frente sólida, luz pelas laterais.", lit: true, sideView: true, depth: 30 },
  { id: "faixa", label: "Faixa de luz", description: "Uma faixa luminosa no meio da lateral.", lit: true, sideView: true, depth: 32 },
  { id: "duasfaixas", label: "Duas faixas de luz", description: "Dois filetes de luz contornam a lateral.", lit: true, sideView: true, depth: 34 },
  { id: "meialateral", label: "Meia lateral de luz", description: "Metade sólida, metade iluminada.", lit: true, sideView: true, depth: 30 },
  { id: "total", label: "Luz por inteiro", description: "Frente e laterais deixam a luz passar.", lit: true, sideView: true, depth: 26 },
  { id: "perfurado", label: "Pontos de luz", description: "Pequenos vazados iluminam a frente.", lit: true, sideView: false, depth: 18 },
  { id: "ripado", label: "Frente ripada", description: "Luz entre frisos, com ritmo e textura.", lit: true, sideView: false, depth: 18 },
  { id: "recuado", label: "Luz emoldurada", description: "Luz ao centro, borda sólida em relevo.", lit: true, sideView: false, depth: 24 },
  { id: "bicolor", label: "Relevo bicolor", description: "Frente e lateral em tons diferentes.", lit: false, sideView: true, depth: 26 },
  { id: "borda", label: "Borda elevada", description: "Uma moldura destaca o desenho da letra.", lit: false, sideView: false, depth: 18 },
] as const;

export const signColors = [
  { id: "verde", label: "Verde", face: "#355e3c", edge: "#203b27", light: "#c3ecbc" },
  { id: "marfim", label: "Marfim", face: "#e9e2cf", edge: "#938d7d", light: "#fff2d4" },
  { id: "grafite", label: "Grafite", face: "#383c40", edge: "#171b20", light: "#e4edf7" },
  { id: "terracota", label: "Terracota", face: "#ad5d47", edge: "#66362c", light: "#ffd0ad" },
  { id: "champagne", label: "Champagne", face: "#bda16c", edge: "#74603d", light: "#ffe3a8" },
  { id: "branco", label: "Branco", face: "#f7f5ee", edge: "#a9aaa2", light: "#fffdf1" },
  { id: "preto", label: "Preto", face: "#202122", edge: "#0f1112", light: "#eef1ee" },
  { id: "cinza", label: "Cinza", face: "#7c8181", edge: "#454b4c", light: "#e4ecec" },
  { id: "prata", label: "Prata", face: "#c5c8c7", edge: "#747d7c", light: "#effbfa" },
  { id: "areia", label: "Areia", face: "#d3bfa0", edge: "#8c785a", light: "#ffecd0" },
  { id: "caramelo", label: "Caramelo", face: "#b47b43", edge: "#6e4929", light: "#ffdda7" },
  { id: "cobre", label: "Cobre", face: "#b76b4a", edge: "#71432e", light: "#ffd1b1" },
  { id: "chocolate", label: "Chocolate", face: "#654337", edge: "#38271f", light: "#e8c7b1" },
  { id: "vinho", label: "Vinho", face: "#742f3f", edge: "#411e29", light: "#f6bac7" },
  { id: "vermelho", label: "Vermelho", face: "#b83c39", edge: "#722927", light: "#ffb7ac" },
  { id: "coral", label: "Coral", face: "#d97b66", edge: "#8d493e", light: "#ffcfb9" },
  { id: "rosaantigo", label: "Rosa antigo", face: "#bf8890", edge: "#79515b", light: "#ffd7dd" },
  { id: "blush", label: "Blush", face: "#e8bfb1", edge: "#9e7d70", light: "#ffe6dc" },
  { id: "lavanda", label: "Lavanda", face: "#a396b7", edge: "#685c7d", light: "#e9dcff" },
  { id: "ameixa", label: "Ameixa", face: "#644961", edge: "#3a293b", light: "#e8c7e3" },
  { id: "marinho", label: "Azul marinho", face: "#243e5c", edge: "#15253c", light: "#b9d8fc" },
  { id: "petroleo", label: "Azul petróleo", face: "#30656b", edge: "#1b3d42", light: "#b9e9eb" },
  { id: "azul", label: "Azul", face: "#487ca5", edge: "#2b4c69", light: "#c3e6ff" },
  { id: "salvia", label: "Sálvia", face: "#9cae98", edge: "#5f735c", light: "#e0f3d9" },
  { id: "oliva", label: "Verde oliva", face: "#7c8151", edge: "#4b5031", light: "#e3e9b5" },
] as const;

export type FontId = typeof signFonts[number]["id"];
export type DesignId = typeof signDesigns[number]["id"];
export type ColorId = typeof signColors[number]["id"];

// Starting points for the visual preview, not manufacturing specifications.
export const signPresets = [
  { id: "recepcao", label: "Recepção discreta", description: "Traço simples, relevo e grafite.", fontId: "moderna", designId: "volume", colorId: "grafite" },
  { id: "fachada", label: "Fachada marcante", description: "Letra alta com luz por trás.", fontId: "marcante", designId: "halo", colorId: "branco" },
  { id: "luz", label: "Letreiro luminoso", description: "Escrita leve com efeito neon.", fontId: "manuscrita", designId: "neon", colorId: "marfim" },
  { id: "delicada", label: "Traço delicado", description: "Letra clássica em terracota.", fontId: "classica", designId: "volume", colorId: "terracota" },
] as const satisfies readonly { id: string; label: string; description: string; fontId: FontId; designId: DesignId; colorId: ColorId }[];

/** Position along the letter's depth, back (0) to front (1). */
export function isTranslucentLayer(design: DesignId, position: number) {
  if (design === "lateral" || design === "total") return position > 0.04 && position < 0.96;
  if (design === "faixa") return position >= 0.36 && position <= 0.64;
  if (design === "duasfaixas") return (position >= 0.16 && position <= 0.3) || (position >= 0.68 && position <= 0.82);
  if (design === "meialateral") return position > 0.04 && position <= 0.52;
  return false;
}

export function specimenContrast(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const brightness = ((value >> 16) * 299 + ((value >> 8) & 255) * 587 + (value & 255) * 114) / 1000;
  return brightness > 155 ? "#273022" : "#eee7d5";
}
