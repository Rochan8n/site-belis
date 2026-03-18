"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-init";
import clsx from "clsx";

const projectTypes = [
  "Produção mensal de Reels",
  "Vídeo Institucional",
  "Vídeo para Youtube",
  "Foto",
  "Produção TikTok Shops",
  "Outros"
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedType, setSelectedType] = useState(projectTypes[0]);

  useEffect(() => {
    if (!formRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-element", 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%"
          }
        }
      );
    }, formRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <form ref={formRef} className="w-full flex-col flex gap-10" onSubmit={(e) => e.preventDefault()}>
      
      {/* Name */}
      <div className="form-element flex flex-col relative group">
        <label htmlFor="name" className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-cream/50 mb-2 transition-colors duration-300 group-focus-within:text-coral">
          Nome Completo
        </label>
        <input 
          type="text" 
          id="name" 
          required 
          className="w-full bg-transparent border-b border-cream/20 py-3 text-lg font-sans text-cream outline-none transition-colors duration-300 focus:border-coral placeholder:text-cream/20"
          placeholder="Seu nome"
        />
      </div>

      {/* Email */}
      <div className="form-element flex flex-col relative group">
        <label htmlFor="email" className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-cream/50 mb-2 transition-colors duration-300 group-focus-within:text-coral">
          E-mail Corporativo
        </label>
        <input 
          type="email" 
          id="email" 
          required 
          className="w-full bg-transparent border-b border-cream/20 py-3 text-lg font-sans text-cream outline-none transition-colors duration-300 focus:border-coral placeholder:text-cream/20"
          placeholder="seu@email.com"
        />
      </div>

      {/* Empresa */}
      <div className="form-element flex flex-col relative group">
        <label htmlFor="company" className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-cream/50 mb-2 transition-colors duration-300 group-focus-within:text-coral">
          Empresa
        </label>
        <input 
          type="text" 
          id="company" 
          required 
          className="w-full bg-transparent border-b border-cream/20 py-3 text-lg font-sans text-cream outline-none transition-colors duration-300 focus:border-coral placeholder:text-cream/20"
          placeholder="Nome da sua marca"
        />
      </div>

      {/* Mensagem */}
      <div className="form-element flex flex-col relative group">
        <label htmlFor="message" className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-cream/50 mb-2 transition-colors duration-300 group-focus-within:text-coral">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full bg-transparent border-b border-cream/20 py-3 text-lg font-sans text-cream outline-none transition-colors duration-300 focus:border-coral placeholder:text-cream/20 resize-none"
          placeholder="Conte um pouco sobre o seu projeto..."
        />
      </div>

      {/* Tipo de Projeto (Styled Radio Buttons) */}
      <div className="form-element flex flex-col mt-4">
        <label className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-cream/50 mb-6 transition-colors duration-300">
          Tipo de Projeto
        </label>
        <div className="flex flex-wrap gap-4">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={clsx(
                "px-6 py-3 rounded-full border text-xs sm:text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 outline-none cursor-pointer md:cursor-none",
                selectedType === type
                  ? "bg-coral border-coral text-navy"
                  : "bg-transparent border-cream/20 text-cream/60 hover:border-cream/50 hover:text-cream"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-element mt-8">
        <button
          type="submit"
          data-magnetic
          data-magnetic-text="SEND"
          className="group relative px-10 sm:px-14 py-6 sm:py-7 overflow-hidden rounded-full bg-coral text-navy font-sans font-bold uppercase tracking-[0.2em] text-sm outline-none cursor-pointer md:cursor-none transition-transform hover:scale-105 duration-300 w-full sm:w-auto"
        >
          <span className="relative z-10 pointer-events-none transition-colors duration-500 group-hover:text-cream">ENVIAR MENSAGEM</span>
          <div className="absolute inset-0 bg-navy transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100 z-0 rounded-full"></div>
        </button>
      </div>

    </form>
  );
}
