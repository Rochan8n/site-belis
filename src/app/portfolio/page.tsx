import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import styles from "@/components/portfolio/portfolio.module.css";

const PORTFOLIO_TITLE = "Portfólio Audiovisual | Percepção em Movimento";
const PORTFOLIO_DESCRIPTION =
  "Conheça projetos audiovisuais criados para tornar empresas mais claras, confiáveis e memoráveis. Vídeos institucionais, reels, campanhas e fotografia.";

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
        alt: "Portfólio audiovisual da Belis Agency",
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
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <PortfolioHero />
      <PortfolioGrid />
    </main>
  );
}
