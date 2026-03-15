"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-init";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices or small screens
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches || window.innerWidth < 768) {
      return;
    }
    
    // Make async to avoid react-compiler warnings
    setTimeout(() => {
      setIsVisible(true);
    }, 0);

    const ctx = gsap.context(() => {
      // Early return check to ensure refs exist before GSAP manipulation
      if (!cursorRef.current || !ringRef.current) return;

      // Center the cursors properly without tailwind transforms to prevent conflicts
      gsap.set([cursorRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });

      const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
      const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });
      
      const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.25, ease: "power3.out" });
      const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.25, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToRing(e.clientX);
        yToRing(e.clientY);
      };

      const handleInteractive = (e: MouseEvent) => {
        if (!cursorRef.current || !ringRef.current) return;
        
        const target = e.target as HTMLElement;
        const interactive = target.closest("a, button, [data-magnetic]");
        
        if (interactive) {
          const text = interactive.getAttribute("data-magnetic-text");
          
          gsap.to(cursorRef.current, { scale: 0, duration: 0.2, overwrite: "auto" });
          gsap.to(ringRef.current, { 
            scale: text ? 2.5 : 1.5,
            backgroundColor: text ? "var(--color-coral)" : "var(--color-coral)",
            borderColor: text ? "transparent" : "var(--color-coral)",
            duration: 0.3,
            overwrite: "auto" 
          });
          
          if (text && textRef.current) {
            textRef.current.innerText = text;
            gsap.to(textRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });
          }
        } else {
          gsap.to(cursorRef.current, { scale: 1, duration: 0.2, overwrite: "auto" });
          gsap.to(ringRef.current, { 
            scale: 1, 
            backgroundColor: "transparent",
            borderColor: "rgba(245, 240, 240, 0.4)", // Cream with opacity
            duration: 0.3,
            overwrite: "auto"
          });
          if (textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.2, overwrite: "auto" });
          }
        }
      };

      if (typeof window !== "undefined") {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleInteractive);
        window.addEventListener("mouseout", handleInteractive);
      }

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseover", handleInteractive);
          window.removeEventListener("mouseout", handleInteractive);
        }
      };
    });

    return () => ctx.revert();
  }, [isVisible]); // Only bind GSAP when visible

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-cream rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-12 h-12 border border-cream/40 rounded-full pointer-events-none z-[9998] flex items-center justify-center will-change-transform hidden md:flex mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <span ref={textRef} className="text-[10px] font-sans font-bold text-navy opacity-0 uppercase tracking-widest whitespace-nowrap"></span>
      </div>
    </>
  );
}
