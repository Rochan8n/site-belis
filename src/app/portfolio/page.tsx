import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";


export const metadata: Metadata = {
  title: "Arquivo - Belis Agency",
  description: "Nosso arquivo brutal de exploração de engenharia visual, com dados violentos de conversão.",
  openGraph: {
    title: "Arquivo - Belis Agency",
    description: "Nosso arquivo brutal de exploração de engenharia visual, com dados violentos de conversão.",
    url: "https://belisagency.com/portfolio",
    type: "website",
    locale: "pt_BR",
    siteName: "Belis Agency",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Belis Agency — Produtora Audiovisual e Agência Digital" }],
  },
  alternates: { canonical: "https://belisagency.com/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-navy overflow-hidden">
      <PortfolioHero />
      <PortfolioGrid />

    </main>
  );
}
