import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WhyBelis } from "@/components/home/WhyBelis";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { HowItWorks } from "@/components/home/HowItWorks";

export const metadata: Metadata = {
  title: "Belis Agency | Produtora Audiovisual que Vende",
  description: "Produtora audiovisual especializada em vídeos que vendem. Institucional, reels, campanhas e cobertura de eventos para empresas que querem resultado.",
};

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <HeroSection />
      <ServicesShowcase />
      <WhyBelis />
      <HowItWorks />
      <ClientLogos />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </main>
  );
}
