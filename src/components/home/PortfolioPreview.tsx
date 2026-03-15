"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";

const projects = [
  {
    id: 1,
    title: "Sprint Ortopedia - Curso TEOT",
    category: "Vídeo Institucional",
    type: "horizontal", // 16:9
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4" // Lightweight placeholder
  },
  {
    id: 2,
    title: "Campanha de Conversão TikTok Shops",
    category: "Reels / Conversão",
    type: "vertical", // 9:16
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 3,
    title: "Isabel Arend",
    category: "Posicionamento e Web",
    type: "horizontal", // 16:9
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add entrance animations for the showcase title 
    const ctx = gsap.context(() => {
      gsap.from(".showcase-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const video = target.querySelector("video");
    const img = target.querySelector("img");
    
    // Performance Guard: Only attach video src when user hovers (Lazy Loading Video)
    if (video) {
       if (!video.getAttribute("src") && video.dataset.src) {
         video.setAttribute("src", video.dataset.src);
       }
       video.play().catch(() => { /* Handle autoplay constraints gently */ });
       gsap.to(video, { opacity: 1, duration: 0.6, ease: "power2.out" });
    }
    if (img) {
       gsap.to(img, { opacity: 0, scale: 1.05, duration: 0.6, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const video = target.querySelector("video");
    const img = target.querySelector("img");
    
    if (video) {
       gsap.to(video, { opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => video.pause() });
    }
    if (img) {
       gsap.to(img, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-24 sm:py-32 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="showcase-header text-5xl sm:text-7xl lg:text-8xl font-heading font-black tracking-tight uppercase text-cream leading-none">
            Showcase<span className="text-coral">.</span>
          </h2>
          <p className="showcase-header max-w-sm text-cream/60 font-sans font-light text-lg sm:text-xl md:pb-3">
            Um vislumbre do estilhaço gerado. Aliamos estética ultra-exclusiva com dados violentos de conversão.
          </p>
        </div>

        {/* Portfólio Grid (Bento/Mosaic layout via Tailwind Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Project 1 - Horizontal */}
          <div 
            className="md:col-span-8 group relative cursor-pointer overflow-hidden bg-navy-light/20 aspect-video md:aspect-auto md:h-[600px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image 
              src={projects[0].image} 
              alt={projects[0].title}
              fill
              className="object-cover origin-center will-change-transform"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            {/* The video element remains muted, paused and headless until hovered */}
            <video 
              data-src={projects[0].video}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              preload="none"
              muted 
              loop 
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
              <span className="text-coral font-sans text-xs font-bold tracking-[0.1em] uppercase block mb-3">{projects[0].category}</span>
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-cream uppercase tracking-tight">{projects[0].title}</h3>
            </div>
          </div>

          {/* Project 2 - Vertical */}
          <div 
            className="md:col-span-4 group relative cursor-pointer overflow-hidden bg-navy-light/20 aspect-[9/16] md:aspect-auto md:h-[600px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image 
              src={projects[1].image} 
              alt={projects[1].title}
              fill
              className="object-cover origin-center will-change-transform"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <video 
              data-src={projects[1].video}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              preload="none"
              muted 
              loop 
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
              <span className="text-blue font-sans text-xs font-bold tracking-[0.1em] uppercase block mb-3">{projects[1].category}</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-cream uppercase tracking-tight leading-none">{projects[1].title}</h3>
            </div>
          </div>

          {/* Project 3 - Horizontal Full Width */}
          <div 
            className="md:col-span-12 group relative cursor-pointer overflow-hidden bg-navy-light/20 aspect-video md:aspect-[21/9]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image 
              src={projects[2].image} 
              alt={projects[2].title}
              fill
              className="object-cover origin-center will-change-transform"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            <video 
              data-src={projects[2].video}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              preload="none"
              muted 
              loop 
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 p-8 sm:p-12 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none w-full md:w-1/2">
              <span className="text-coral font-sans text-xs font-bold tracking-[0.1em] uppercase block mb-3">{projects[2].category}</span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-cream uppercase tracking-tight leading-none">{projects[2].title}</h3>
            </div>
          </div>

        </div>

        {/* Call to action */}
        <div className="mt-20 flex justify-center">
          <button 
            data-magnetic
            className="group relative px-10 py-5 overflow-hidden border border-cream/20 bg-transparent text-cream font-sans font-bold uppercase tracking-widest text-sm outline-none cursor-pointer md:cursor-none"
          >
            <span className="relative z-10 pointer-events-none group-hover:text-navy transition-colors duration-500">Ver todos os projetos</span>
            <div className="absolute inset-0 bg-cream transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100 z-0"></div>
          </button>
        </div>

      </div>
    </section>
  );
}
