import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

const PORTFOLIO_TITLE = "Portfólio — Cases de Produção Audiovisual";
const PORTFOLIO_DESCRIPTION =
  "Vídeos institucionais, reels, campanhas e coberturas de eventos produzidos pela Belis Agency. +150 projetos com direção criativa dedicada e resultados mensuráveis.";

export const metadata: Metadata = {
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
  openGraph: {
    title: `${PORTFOLIO_TITLE} | Belis Agency`,
    description: PORTFOLIO_DESCRIPTION,
    url: "https://belis.agency/portfolio",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Portfólio Belis Agency — cases audiovisuais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_TITLE} | Belis Agency`,
    description: PORTFOLIO_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  alternates: { canonical: "https://belis.agency/portfolio" },
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://belis.agency" },
        { "@type": "ListItem", position: 2, name: "Portfólio", item: "https://belis.agency/portfolio" },
      ],
    },
    {
      "@type": "CollectionPage",
      name: PORTFOLIO_TITLE,
      url: "https://belis.agency/portfolio",
      description: PORTFOLIO_DESCRIPTION,
      isPartOf: { "@id": "https://belis.agency/#website" },
      about: { "@id": "https://belis.agency/#organization" },
    },
  ],
};

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-navy overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <PortfolioHero />
      <PortfolioGrid />
    </main>
  );
}
