/* Curated assets + figures for the WEB studio page.
   Photos pulled from the existing portfolio shoot library. */

export const stripPhotos = [
  "/images/portfolio/fotos/DSC00466.jpg",
  "/images/portfolio/fotos/DSC00714.jpg",
  "/images/portfolio/fotos/DSC00836.jpg",
  "/images/portfolio/fotos/DSC01534.jpg",
  "/images/portfolio/fotos/DSC03992.jpg",
  "/images/portfolio/fotos/DSC08434.jpg",
] as const;

export const workPhotos = [
  "/images/portfolio/krrom.webp",
  "/images/portfolio/latco.webp",
  "/images/portfolio/salles-nogueira.webp",
] as const;

export const figures = [
  ["150+", "Sites e landing pages entregues"],
  ["07D", "Da estratégia à primeira versão no ar"],
  ["98", "Pontuação média de performance (Lighthouse)"],
] as const;

/** Deterministic bar heights (%) — no Math.random, stable across renders. */
export const perfBars = [
  34, 52, 41, 68, 57, 79, 63, 88, 72, 94, 81, 100,
] as const;
