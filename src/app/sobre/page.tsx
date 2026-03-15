import { AboutHero } from "@/components/sobre/AboutHero";
import { Timeline } from "@/components/sobre/Timeline";
import { ValuesSection } from "@/components/sobre/ValuesSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "Sobre a Agência - Belis Agency",
  description: "Nós não seguimos tendências. Nós as criamos. Conheça a história e os valores implacáveis da Belis Agency.",
};

export default function SobrePage() {
  return (
    <main className="w-full min-h-screen bg-navy overflow-hidden">
      <AboutHero />
      <Timeline />
      <ValuesSection />
      <CTASection />
    </main>
  );
}
