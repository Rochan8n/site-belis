"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

const stats = [
  { id: "s1", end: 150, prefix: "+", suffix: "", label: "Projetos", color: "text-coral" },
  { id: "s2", end: 80,  prefix: "+", suffix: "", label: "Clientes", color: "text-mantis" },
  { id: "s3", end: 5,   prefix: "", suffix: "",  label: "Anos",     color: "text-cream" },
  { id: "s4", end: 500, prefix: "+", suffix: "", label: "Vídeos",   color: "text-blue" },
];

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;

        // Uses a proxy object for GSAP so we mutate the DOM directly, 
        // bypassing React state updates and ensuring crisp 60fps performance
        const proxy = { val: 0 };
        
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              val: stat.end,
              duration: 2.5,
              ease: "power3.out",
              onUpdate: () => {
                el.innerText = `${stat.prefix}${Math.floor(proxy.val)}${stat.suffix}`;
              }
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 sm:py-32 relative z-20">
      {/* Glass panel over the body gradient */}
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {stats.map((stat, i) => (
            <div key={stat.id} className="flex flex-col border-l-2 border-cream/15 pl-6">
              <span 
                ref={(el) => { numberRefs.current[i] = el; }}
                className={`text-6xl sm:text-7xl lg:text-8xl font-heading font-black tracking-tighter tabular-nums ${stat.color}`}
              >
                0
              </span>
              <span className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase font-bold mt-2 text-cream/60">
                {stat.label}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
