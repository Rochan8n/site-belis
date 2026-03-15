import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "Arquivo - Belis Agency",
  description: "Nosso arquivo brutal de exploração de engenharia visual, com dados violentos de conversão.",
};

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-navy overflow-hidden">
      <PortfolioHero />
      <PortfolioGrid />
      <CTASection />
    </main>
  );
}
