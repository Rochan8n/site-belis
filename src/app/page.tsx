import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WhyBelis } from "@/components/home/WhyBelis";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { HowItWorks } from "@/components/home/HowItWorks";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Belis Agency | Produtora Audiovisual que Vende",
  description: "Produtora audiovisual especializada em vídeos que vendem. Institucional, reels, campanhas e cobertura de eventos para empresas que querem resultado.",
};

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <HeroSection />
      <ServicesShowcase />

      <section className="w-full pt-12 pb-24 flex justify-center relative z-20 px-6 sm:px-12 lg:px-24">
        {/* Soft blending glow connecting the sections */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] sm:w-[800px] h-[300px] bg-coral/5 blur-[100px] rounded-full pointer-events-none" />
        
        <Link 
          href="/portfolio"
          className="group relative flex items-center justify-between w-full sm:w-[500px] border border-cream/20 bg-transparent p-6 sm:p-8 outline-none transition-colors duration-500 overflow-hidden cursor-pointer md:cursor-none z-10"
          data-magnetic
          data-magnetic-text="GO!"
        >
          <div className="absolute inset-0 bg-coral origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
          
          <div className="relative z-10 flex flex-col items-start gap-1.5 text-left">
            <span className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-coral group-hover:text-navy/60 transition-colors duration-500">
              Nosso Portfólio
            </span>
            <span className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tighter text-cream group-hover:text-navy transition-colors duration-500 whitespace-nowrap">
              PROJETOS
            </span>
          </div>
          
          <div className="relative z-10 flex items-center justify-center p-3 sm:p-4 rounded-full border border-cream/20 group-hover:border-navy/20 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-navy text-cream group-hover:text-coral ml-4">
             <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </Link>
      </section>

      <WhyBelis />
      <HowItWorks />
      <ClientLogos />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </main>
  );
}
