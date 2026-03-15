"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide and show navbar based on scroll direction
      const showAnim = gsap.from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.4,
        ease: "power3.out",
      }).progress(1);

      ScrollTrigger.create({
        start: "top top-=-50", // Start after scrolling 50px down
        onUpdate: (self) => {
          if (self.direction === -1) {
            // Scrolling up -> Show Navbar
            showAnim.play();
          } else if (self.direction === 1) {
            // Scrolling down -> Hide Navbar
            showAnim.reverse();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[999] backdrop-blur-xl border-b border-cream/10"
      style={{ background: "rgba(5, 5, 8, 0.80)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 h-24 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-black text-cream uppercase tracking-widest outline-none">
          Belis<span className="text-coral">.</span>
        </Link>
        
        <ul className="hidden sm:flex items-center gap-10 font-sans text-xs font-semibold tracking-[0.2em] transform translate-y-[2px] uppercase text-cream/70">
          <li>
            <Link href="/" className="hover:text-coral transition-colors duration-300 outline-none">Home</Link>
          </li>
          <li>
            <Link href="/portfolio" className="hover:text-coral transition-colors duration-300 outline-none">Portfólio</Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:text-coral transition-colors duration-300 outline-none">Sobre</Link>
          </li>
          <li>
            <Link href="/contato" className="hover:text-coral transition-colors duration-300 outline-none">Contato</Link>
          </li>
        </ul>
        
        {/* Mobile Menu Trigger Placeholder */}
        <button className="sm:hidden flex flex-col gap-[6px] outline-none">
          <span className="w-8 h-[2px] bg-cream block"></span>
          <span className="w-6 h-[2px] bg-cream block ml-auto"></span>
        </button>
      </div>
    </nav>
  );
}
