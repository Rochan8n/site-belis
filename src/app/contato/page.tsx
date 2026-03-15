"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";
import { ContactForm } from "@/components/contato/ContactForm";
import { ContactInfo } from "@/components/contato/ContactInfo";

export default function ContatoPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".char-hero-contact", 
        { yPercent: 120, opacity: 0, rotateX: -45 }, 
        { 
          yPercent: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.03, 
          duration: 1.2, 
          ease: "power4.out" 
        }
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  const text = "VAMOS CONSTRUIR O SEU IMPÉRIO DIGITAL.";

  return (
    <main className="w-full min-h-screen bg-navy overflow-hidden pt-36 pb-24 sm:pt-48 sm:pb-32 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Massive SplitText Title */}
        <h1 ref={titleRef} className="text-5xl sm:text-7xl lg:text-[100px] font-heading font-black text-cream uppercase tracking-tight leading-[0.9] max-w-5xl mb-24 sm:mb-32 flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-2">
          {text.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-4 sm:-mb-4">
              <span className="char-hero-contact inline-block origin-top will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Split Layout: Form (Left) & Info (Right on desktop, bottom on mobile) */}
        <div className="flex flex-col md:flex-row gap-20 lg:gap-32 w-full">
          
          <div className="w-full md:w-3/5">
            <ContactForm />
          </div>

          <div className="w-full md:w-2/5 border-t border-cream/10 md:border-t-0 md:border-l pt-12 md:pt-0 md:pl-16 lg:pl-20">
            <ContactInfo />
          </div>

        </div>

      </div>
    </main>
  );
}
