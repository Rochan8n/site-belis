"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap-init";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { TransitionLink } from "./TransitionLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { lenis } = useSmoothScroll();
  const lastScrollY = useRef(0);

  // Hide/show on scroll using Lenis events (since Lenis hijacks native scroll)
  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll, direction }: { scroll: number; direction: number }) => {
      // Always show when near the top
      if (scroll <= 50) {
        setHidden(false);
        lastScrollY.current = scroll;
        return;
      }

      // direction: 1 = down, -1 = up
      if (direction === 1) {
        setHidden(true);
      } else if (direction === -1) {
        setHidden(false);
      }

      lastScrollY.current = scroll;
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  // Mobile drawer animation
  useEffect(() => {
    if (!drawerRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.to(drawerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        drawerRef.current.querySelectorAll(".mobile-link"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08, delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(drawerRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.4,
        ease: "power4.inOut",
      });
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav
        data-navbar
        className="fixed top-0 left-0 w-full z-[999] backdrop-blur-xl border-b border-cream/10"
        style={{
          background: "rgba(5, 5, 8, 0.80)",
          transform: hidden ? "translateY(-100%)" : "translateY(0%)",
          transition: "transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 h-24 flex items-center justify-between">
          <TransitionLink href="/" className="text-2xl font-heading font-black text-cream uppercase tracking-widest outline-none">
            Belis<span className="text-coral">.</span>
          </TransitionLink>

          {/* Desktop links */}
          <ul className="hidden sm:flex items-center gap-10 font-sans text-xs font-semibold tracking-[0.2em] transform translate-y-[2px] uppercase text-cream/70">
            {links.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="hover:text-coral transition-colors duration-300 outline-none">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger / close */}
          <button
            className="sm:hidden relative w-10 h-10 flex items-center justify-center outline-none z-[1001]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className="absolute w-7 h-[2px] bg-cream transition-all duration-300 ease-out"
              style={{
                transform: open ? "rotate(45deg)" : "translateY(-5px)",
              }}
            />
            <span
              className="absolute h-[2px] bg-cream transition-all duration-300 ease-out"
              style={{
                width: open ? "1.75rem" : "1.25rem",
                transform: open ? "rotate(-45deg)" : "translateY(5px)",
                marginLeft: open ? "0" : "auto",
                right: open ? "auto" : "0.25rem",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-0 z-[998] flex flex-col items-center justify-center sm:hidden"
        style={{
          background: "rgba(5, 5, 8, 0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          clipPath: "inset(0% 0% 100% 0%)",
        }}
      >
        <ul className="flex flex-col items-center gap-8">
          {links.map((l) => (
            <li key={l.href} className="mobile-link">
              <TransitionLink
                href={l.href}
                onClick={close}
                className="text-3xl font-heading font-black uppercase tracking-wider text-cream hover:text-coral transition-colors duration-300 outline-none"
              >
                {l.label}
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* CTA no drawer */}
        <div className="mobile-link mt-12">
          <a
            href="https://wa.me/5511973138895"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex items-center gap-2 px-8 py-3 bg-coral text-navy font-sans font-bold text-sm rounded-full uppercase tracking-wider hover:shadow-[0_0_30px_rgba(116,195,101,0.3)] transition-all duration-300"
          >
            Iniciar Projeto
          </a>
        </div>
      </div>
    </>
  );
}
