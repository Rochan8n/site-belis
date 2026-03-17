"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Krrom Construtora",
    tags: ["Institucional", "Marketing", "Website"],
    image: "/images/portfolio/krrom.png",
    result: "/* SUBSTITUIR PELO DADO REAL — ex: +340% engajamento no Instagram */",
  },
  {
    id: 2,
    title: "Laticínios Latco",
    tags: ["Institucional"],
    image: "/images/portfolio/latco.jpg",
    result: "/* SUBSTITUIR PELO DADO REAL — ex: Vídeo usado em 12 feiras nacionais */",
  },
  {
    id: 3,
    title: "Salles Nogueira Advogados",
    tags: ["Institucional", "Reels"],
    image: "/images/portfolio/salles-nogueira.png",
    result: "/* SUBSTITUIR PELO DADO REAL — ex: 2x mais leads pelo site */",
  },
  {
    id: 4,
    title: "Kofar Metalúrgica",
    tags: ["Vendas", "Institucional"],
    image: "/images/portfolio/kofar.png",
    result: "/* SUBSTITUIR PELO DADO REAL — ex: +R$200k em contratos */",
  },
];

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-24 sm:pt-32 pb-12 sm:pb-16 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">

        {/* Header */}
        <div className="mb-16 sm:mb-20 text-center">
          <span className="portfolio-header inline-block text-xs font-sans font-bold tracking-[0.3em] uppercase text-cream/40 border border-cream/10 rounded-full px-5 py-2 mb-6">
            Projetos
          </span>
          <h2 className="portfolio-header text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-cream leading-tight">
            Projetos Que{" "}<span className="text-coral">Geraram Resultado</span>
          </h2>
          <p className="portfolio-header max-w-2xl mx-auto mt-5 text-cream/50 font-sans font-light text-base sm:text-lg leading-relaxed">
            Resultados tangíveis em diversos setores. Conheça os projetos que transformaram a percepção de marca e o faturamento dos nossos clientes. O próximo case pode ser o seu.
          </p>
        </div>

        {/* Projects Grid — 2 columns */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <Link 
            href="/portfolio"
            className="group relative flex items-center justify-between w-full sm:w-[500px] border border-cream/20 bg-transparent p-6 sm:p-8 outline-none transition-colors duration-500 overflow-hidden cursor-pointer md:cursor-none"
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
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <div className="project-card group relative cursor-pointer">
      {/* Image Container */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy/50"
        style={{
          border: "1px solid rgba(45,212,191,0.25)",
          boxShadow:
            "0 0 18px 2px rgba(45,212,191,0.12), 0 0 60px 8px rgba(45,212,191,0.06)",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Arrow button */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-coral/90 backdrop-blur-sm flex items-center justify-center text-navy transition-all duration-300 group-hover:bg-coral group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(116,195,101,0.4)]">
            <FiArrowUpRight className="text-lg sm:text-xl" />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <div className="mt-5">
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-cream tracking-tight">
          {project.title}
        </h3>
        {project.result && !project.result.startsWith("/*") && (
          <p className="text-sm font-sans font-medium text-coral mt-2">
            {project.result}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-sans font-medium text-cream/50 border border-cream/10 rounded-full px-4 py-1.5 transition-colors duration-300 hover:border-cream/25 hover:text-cream/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
