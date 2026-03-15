"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { VideoScrubHero } from "./VideoScrubHero";

export function HeroSection() {
  return (
    <div className="bg-transparent">
      <VideoScrubHero />
      <Cases />
    </div>
  );
}

const Cases = () => (
  <section id="cases" className="mx-auto max-w-5xl px-4 sm:px-6 py-24 sm:py-48 text-cream">
    <motion.h2
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-12 sm:mb-20 text-3xl sm:text-4xl font-black uppercase text-cream font-heading"
    >
      O Que Entregamos
    </motion.h2>

    <CaseItem title="Vídeo Institucional"         category="Narrativa de Marca"    result="Construímos histórias que vendem" />
    <CaseItem title="Campanha de Lançamento"       category="Vendas · Conversão"    result="Do roteiro ao resultado mensurável" />
    <CaseItem title="Conteúdo Premium Recorrente"  category="Consistência Visual"   result="Presença que converte todo mês" />
    <CaseItem title="Identidade em Motion"         category="Branding Audiovisual"  result="Marca que move pessoas" />
    <CaseItem title="Funil de Vendas Visual"       category="Performance Digital"   result="Cada frame trabalha pela venda" />
    <CaseItem title="Showreel de Marca"            category="Percepção Premium"     result="Sua empresa no auge da imagem" />

    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8"
    >
      <a href="/contato" className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-3 px-8 py-4 border border-coral text-coral font-sans font-bold uppercase tracking-widest text-sm group hover:bg-coral hover:text-navy transition-colors duration-300">
        Iniciar Projeto <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </a>
      <a href="/portfolio" className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-cream/40 hover:text-cream transition-colors self-center sm:self-auto">
        Ver Portfolio
      </a>
    </motion.div>
  </section>
);

interface CaseItemProps {
  title: string;
  category: string;
  result: string;
}

const CaseItem = ({ title, category, result }: CaseItemProps) => (
  <motion.div
    initial={{ y: 48, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeInOut", duration: 0.75 }}
    className="mb-7 sm:mb-9 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-cream/10 px-0 sm:px-3 pb-7 sm:pb-9 group cursor-default gap-1 sm:gap-0"
  >
    <div>
      <p className="text-lg sm:text-xl text-cream font-heading font-bold group-hover:text-coral transition-colors duration-300">
        {title}
      </p>
      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-cream/40 mt-0.5">
        {category}
      </p>
    </div>
    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-cream/40 sm:text-right sm:max-w-[200px]">
      <p>{result}</p>
      <FiMapPin className="shrink-0 text-coral hidden sm:block" />
    </div>
  </motion.div>
);
