import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Bodoni_Moda, Bungee, Caveat, Cinzel, Cormorant_Garamond, Dancing_Script, Montserrat, Orbitron, Oswald, Pacifico, Playfair_Display, Quicksand, Righteous, Satisfy, Syne } from "next/font/google";
import { VisualLanding } from "@/components/visual/VisualLanding";
import { VISUAL_IMAGE_VERSION } from "@/components/visual/visualContent";
import { SITE_URL } from "@/config/site";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: "500", variable: "--font-sign-serif", preload: false, display: "swap" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400", variable: "--font-sign-script", preload: false, display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-sign-condensed", preload: false, display: "swap" });
const righteous = Righteous({ subsets: ["latin"], weight: "400", variable: "--font-sign-retro", preload: false, display: "swap" });
const syne = Syne({ subsets: ["latin"], weight: "700", variable: "--font-sign-geometric", preload: false, display: "swap" });
const bungee = Bungee({ subsets: ["latin"], weight: "400", variable: "--font-sign-display", preload: false, display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-sign-hand", preload: false, display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "600", variable: "--font-sign-elegant", preload: false, display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "600", variable: "--font-sign-editorial", preload: false, display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "600", variable: "--font-sign-roman", preload: false, display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "600", variable: "--font-sign-modern", preload: false, display: "swap" });
const quicksand = Quicksand({ subsets: ["latin"], weight: "600", variable: "--font-sign-rounded", preload: false, display: "swap" });
const oswald = Oswald({ subsets: ["latin"], weight: "600", variable: "--font-sign-compact", preload: false, display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-sign-impact", preload: false, display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: "600", variable: "--font-sign-artisan", preload: false, display: "swap" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: "600", variable: "--font-sign-calligraphy", preload: false, display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], weight: "500", variable: "--font-sign-future", preload: false, display: "swap" });
const TITLE = "Comunicação Visual: Letras Caixa e Fachadas em SP";
const DESCRIPTION = "Letras caixa, logos em relevo e letreiros com efeito neon feitos para sua marca. Criação e produção em São Paulo, com envio para todo o Brasil. Peça seu orçamento.";
const URL = `${SITE_URL}/comunicacao-visual`;
const IMAGE = `/images/comunicacao-visual/og-comunicacao-visual.jpg?v=${VISUAL_IMAGE_VERSION}`;

export const viewport: Viewport = { themeColor: "#e9e5da", colorScheme: "light" };
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: `${TITLE} | Belis`, description: DESCRIPTION, url: URL, type: "website", siteName: "Belis Agency", locale: "pt_BR", images: [{ url: IMAGE, width: 1200, height: 630, alt: "Estudo ilustrativo de letras caixa e acabamentos personalizados Belis" }] },
  twitter: { card: "summary_large_image", title: `${TITLE} | Belis`, description: DESCRIPTION, images: [IMAGE] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage", "@id": `${URL}#webpage`, url: URL, name: TITLE, description: DESCRIPTION, inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${URL}#service` },
      breadcrumb: { "@id": `${URL}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${IMAGE}`, caption: "Estudo ilustrativo de letras e acabamentos" },
    },
    {
      "@type": "Service", "@id": `${URL}#service`, name: "Comunicação visual personalizada", url: URL, description: DESCRIPTION,
      serviceType: ["Letras caixa", "Letras para fachada", "Logos em relevo", "Letreiros personalizados", "Letreiros com efeito neon"],
      provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "Country", name: "Brasil" },
    },
    {
      "@type": "BreadcrumbList", "@id": `${URL}#breadcrumb`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Belis", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Comunicação visual", item: URL }],
    },
  ],
};

export default function ComunicacaoVisualPage() {
  return (
    <div className={[bodoni, satisfy, bebas, righteous, syne, bungee, pacifico, cormorant, playfair, cinzel, montserrat, quicksand, oswald, anton, caveat, dancing, orbitron].map((font) => font.variable).join(" ")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <VisualLanding />
    </div>
  );
}
