"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap-init";

const categories = ["Todos", "Vídeos Institucionais", "Reels/TikTok", "Fotografia", "Web Design"];

const projects = [
  {
    id: 1,
    title: "Sprint Ortopedia",
    category: "Vídeos Institucionais",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Campanha TikTok Shops",
    category: "Reels/TikTok",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Editorial Premium",
    category: "Fotografia",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Isabel Arend",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    title: "Manifesto Belis",
    category: "Vídeos Institucionais",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    title: "Lançamento Exclusivo",
    category: "Reels/TikTok",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  }
];

// Project entity representing our visual frame
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardOuterRef = useRef<HTMLDivElement>(null);
  const tiltContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = tiltContainerRef.current;
    const outer = cardOuterRef.current;

    // Safety check and prevent GSAP tilt binding on mobile touch layouts
    if (!card || !outer || typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;

    const ctx = gsap.context(() => {
      // 3D Engine Initialization
      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
      
      gsap.set(outer, { perspective: 1000 });
      gsap.set(card, { transformStyle: "preserve-3d" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = outer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        // Tilt inverse mechanics up to 12 degrees
        xTo(x * 12);
        yTo(-y * 12);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        
        const video = card.querySelector("video");
        const img = card.querySelector("img");
        
        if (video) {
           gsap.to(video, { opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => video.pause() });
        }
        if (img) {
           gsap.to(img, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        }
      };

      const handleMouseEnter = () => {
        const video = card.querySelector("video");
        const img = card.querySelector("img");
        
        if (video) {
           if (!video.getAttribute("src") && video.dataset.src) {
             video.setAttribute("src", video.dataset.src);
           }
           video.play().catch(() => {});
           gsap.to(video, { opacity: 1, duration: 0.6, ease: "power2.out" });
        }
        if (img) {
           gsap.to(img, { opacity: 0, scale: 1.05, duration: 0.6, ease: "power2.out" });
        }
      };

      outer.addEventListener("mousemove", handleMouseMove);
      outer.addEventListener("mouseleave", handleMouseLeave);
      outer.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        outer.removeEventListener("mousemove", handleMouseMove);
        outer.removeEventListener("mouseleave", handleMouseLeave);
        outer.removeEventListener("mouseenter", handleMouseEnter);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full relative col-span-1"
      ref={cardOuterRef}
    >
      <div 
        ref={tiltContainerRef} 
        className="relative group w-full overflow-hidden bg-navy-light/20 cursor-pointer shadow-2xl aspect-[4/5] sm:aspect-video will-change-transform"
      >
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className="object-cover origin-center will-change-transform"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
        <video 
          data-src={project.video}
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          preload="none"
          muted 
          loop 
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
          <span className="text-coral font-sans text-xs font-bold tracking-[0.1em] uppercase block mb-3">{project.category}</span>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-cream uppercase tracking-tight leading-none">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState("Todos");

  const filteredProjects = projects.filter(
    (p) => filter === "Todos" || p.category === filter
  );

  return (
    <section className="w-full pb-32 bg-navy min-h-screen z-10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Sticky Filter Bar */}
        <div className="sticky top-24 z-50 py-6 bg-navy/80 backdrop-blur-lg border-b border-cream/10 mb-12 sm:mb-16 -mx-6 px-6 sm:mx-0 sm:px-0">
          <ul className="flex items-center gap-6 sm:gap-8 overflow-x-auto whitespace-nowrap hide-scrollbar pb-2 sm:pb-0">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setFilter(cat)}
                  className={`font-sans text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-colors outline-none cursor-pointer md:cursor-none ${
                    filter === cat 
                      ? "text-coral font-bold" 
                      : "text-cream/40 hover:text-cream"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Grid powered by Framer Motion popLayout for reflowless reparenting */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full relative">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
