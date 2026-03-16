import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WhyBelis } from "@/components/home/WhyBelis";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
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
      <WhyBelis />
      <ClientLogos />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </main>
  );
}
