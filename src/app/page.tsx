import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { StatsCounter } from "@/components/home/StatsCounter";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Belis Agency | Impacto Digital",
  description: "Produtora Audiovisual e Agência Digital High-Ticket quebrando padrões com estéticas premium.",
};

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-x-clip">
      <HeroSection />
      <ServicesShowcase />
      <StatsCounter />
      <PortfolioPreview />
      <CTASection />
    </main>
  );
}
