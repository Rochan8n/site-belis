"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

/**
 * Cada serviço tem:
 *  – glow1Color / glow1Pos: blob topo-direito
 *  – glow2Color / glow2Pos: blob base-esquerda
 *  – cardBorder / cardGlow / accentColor: estilos do card
 * O bgRef fica fixo em preto (#050508).
 * Os blobs ficam DENTRO da cena — fazem fade automaticamente
 * com o autoAlpha da cena no GSAP timeline.
 */
const services = [
  {
    id: "01",
    title: "Vídeos\nInstitucionais",
    bgTitle: "INSTITUCIONAL",
    description:
      "Narrativas cinematográficas que traduzem a alma da sua marca. Convertemos sua história em um espetáculo visual que prende a atenção do primeiro ao último segundo.",
    callouts: ["Cinema de verdade", "Cada frame importa"],
    // Gradient spheres desta cena
    glow1Color: "#00804C",   // Book Green — topo direito
    glow2Color: "#001F3F",   // Midnight Mirage — base esquerda
    glow3Color: "#74C365",   // Mantis — sotaque central
    cardBorder: "rgba(0, 128, 76, 0.4)",
    cardGlow: "rgba(0, 128, 76, 0.10)",
    accentColor: "#74C365",
    textColor: "#F6F7ED",
  },
  {
    id: "02",
    title: "Reels &\nShort Content",
    bgTitle: "REELS",
    description:
      "Conteúdo vertical que para o scroll. Criamos peças magnéticas otimizadas para Instagram, TikTok e Shorts que viralizam e convertem seguidores em clientes.",
    callouts: ["Viral por design", "Scroll-stopping"],
    glow1Color: "#74C365",   // Mantis — topo direito
    glow2Color: "#00804C",   // Book Green — base esquerda
    glow3Color: "#001F3F",   // Midnight — sotaque
    cardBorder: "rgba(116, 195, 101, 0.45)",
    cardGlow: "rgba(116, 195, 101, 0.08)",
    accentColor: "#74C365",
    textColor: "#F6F7ED",
  },
  {
    id: "03",
    title: "Vídeos\nYouTube",
    bgTitle: "YOUTUBE",
    description:
      "Conteúdo estratégico que retém audiência e posiciona sua marca como autoridade. Do roteiro à entrega, produção completa com foco em retenção e crescimento orgânico.",
    callouts: ["Retenção máxima", "Conteúdo estratégico"],
    glow1Color: "#1E488F",   // Nuit Blanche — topo direito
    glow2Color: "#74C365",   // Mantis — base esquerda
    glow3Color: "#001F3F",   // Midnight — sotaque
    cardBorder: "rgba(30, 72, 143, 0.45)",
    cardGlow: "rgba(30, 72, 143, 0.12)",
    accentColor: "#74C365",
    textColor: "#F6F7ED",
  },
  {
    id: "04",
    title: "Fotografia\nCorporativa",
    bgTitle: "FOTOGRAFIA",
    description:
      "A imagem é o primeiro gatilho de desejo. Capturamos a essência do seu produto com iluminação dramática, direção de arte impecável e tratamento de alto nível.",
    callouts: ["Primeiro gatilho", "Direção de arte"],
    glow1Color: "#74C365",   // Mantis — topo direito
    glow2Color: "#1E488F",   // Nuit Blanche — base esquerda
    glow3Color: "#00804C",   // Book Green — sotaque
    cardBorder: "rgba(116, 195, 101, 0.35)",
    cardGlow: "rgba(116, 195, 101, 0.07)",
    accentColor: "#74C365",
    textColor: "#F6F7ED",
  },
];

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const calloutsLeftRef = useRef<(HTMLDivElement | null)[]>([]);
  const calloutsRightRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── DESKTOP ───
      mm.add("(min-width: 768px)", () => {
        const totalScenes = services.length;
        const scrollLength = totalScenes * 100;

        scenesRef.current.forEach((scene) => {
          if (scene) gsap.set(scene, { autoAlpha: 0 });
        });
        bgTextsRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0, y: 60 });
        });
        cardsRef.current.forEach((el) => {
          if (el)
            gsap.set(el, {
              autoAlpha: 0,
              rotateX: 45,
              rotateY: -15,
              scale: 0.75,
              y: 150,
              transformOrigin: "center bottom",
            });
        });
        calloutsLeftRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0, x: -80 });
        });
        calloutsRightRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0, x: 80 });
        });
        numbersRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0, scale: 0.8 });
        });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollLength}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        services.forEach((_, i) => {
          const sceneStart = i / totalScenes;
          const dur = 1 / totalScenes;

          const scene     = scenesRef.current[i];
          const bgText    = bgTextsRef.current[i];
          const card      = cardsRef.current[i];
          const calloutL  = calloutsLeftRef.current[i];
          const calloutR  = calloutsRightRef.current[i];
          const number    = numbersRef.current[i];

          if (!scene || !bgText || !card || !calloutL || !calloutR || !number) return;

          // ── ENTER ──
          masterTl.to(scene, { autoAlpha: 1, duration: dur * 0.01, ease: "none" }, sceneStart);

          masterTl.to(bgText,  { autoAlpha: 0.06, y: 0,  duration: dur * 0.25, ease: "power2.out" }, sceneStart + dur * 0.05);
          masterTl.to(card,    { autoAlpha: 1, rotateX: 0, rotateY: 0, scale: 1, y: 0, duration: dur * 0.45, ease: "power1.out" }, sceneStart + dur * 0.05);
          masterTl.to(number,  { autoAlpha: 0.15, scale: 1, duration: dur * 0.2, ease: "power2.out" }, sceneStart + dur * 0.15);
          masterTl.to(calloutL, { autoAlpha: 1, x: 0, duration: dur * 0.2, ease: "power3.out" }, sceneStart + dur * 0.35);
          masterTl.to(calloutR, { autoAlpha: 1, x: 0, duration: dur * 0.2, ease: "power3.out" }, sceneStart + dur * 0.42);

          // ── EXIT (except last) ──
          if (i < totalScenes - 1) {
            const fadeStart = sceneStart + dur * 0.85;
            masterTl.to([bgText, card, calloutL, calloutR, number], { autoAlpha: 0, duration: dur * 0.14, ease: "power2.in" }, fadeStart);
            masterTl.to(card,  { scale: 0.92, y: -40, duration: dur * 0.14, ease: "power2.in" }, fadeStart);
            masterTl.to(scene, { autoAlpha: 0, duration: dur * 0.01, ease: "none" }, sceneStart + dur * 0.99);
          }
        });
      });

      // ─── MOBILE ───
      mm.add("(max-width: 767px)", () => {
        scenesRef.current.forEach((scene) => {
          if (scene) gsap.set(scene, { autoAlpha: 1 });
        });
        bgTextsRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0.05, y: 0 });
        });
        numbersRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0.08, scale: 1 });
        });
        calloutsLeftRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1, x: 0 });
        });
        calloutsRightRef.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1, x: 0 });
        });

        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, { clearProps: "all" });
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" } }
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-auto md:h-screen md:overflow-hidden"
    >
      {/* Base sempre preta — os glows ficam dentro de cada cena */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ backgroundColor: "#050508" }}
      />

      {/* Scenes */}
      {services.map((service, index) => (
        <div
          key={service.id}
          ref={(el) => { scenesRef.current[index] = el; }}
          className="relative w-full h-screen md:absolute md:inset-0 md:h-full flex items-center justify-center overflow-hidden"
          style={{ zIndex: index + 1, color: service.textColor }}
        >
          {/* ── Gradient sphere 1 — topo direito ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "65vw",
              height: "65vw",
              borderRadius: "100%",
              filter: "blur(100px)",
              background: `radial-gradient(circle, ${service.glow1Color} 0%, transparent 68%)`,
              top: "-18%",
              right: "-8%",
              opacity: 0.65,
              pointerEvents: "none",
            }}
          />

          {/* ── Gradient sphere 2 — base esquerda ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "75vw",
              height: "75vw",
              borderRadius: "100%",
              filter: "blur(120px)",
              background: `radial-gradient(circle, ${service.glow2Color} 0%, transparent 65%)`,
              bottom: "-20%",
              left: "-10%",
              opacity: service.glow2Color === "#001F3F" ? 0.9 : 0.6,
              pointerEvents: "none",
            }}
          />

          {/* ── Gradient sphere 3 — sotaque central ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "45vw",
              height: "45vw",
              borderRadius: "100%",
              filter: "blur(85px)",
              background: `radial-gradient(circle, ${service.glow3Color} 0%, transparent 65%)`,
              top: "30%",
              left: "25%",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          />

          {/* Background massive text */}
          <div
            ref={(el) => { bgTextsRef.current[index] = el; }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          >
            <span className="text-[15vw] font-heading font-black uppercase leading-none tracking-tighter whitespace-nowrap text-current">
              {service.bgTitle}
            </span>
          </div>

          {/* Number - bottom left */}
          <div
            ref={(el) => { numbersRef.current[index] = el; }}
            className="absolute bottom-12 left-12 pointer-events-none select-none"
          >
            <span className="text-[180px] font-heading font-black leading-none tracking-tighter text-current">
              {service.id}
            </span>
          </div>

          {/* Center: Card */}
          <div className="perspective-container relative z-10 w-full max-w-2xl mx-auto px-6">
            <div
              ref={(el) => { cardsRef.current[index] = el; }}
              className="service-card-3d relative p-10 md:p-14 rounded-sm border-2"
              style={{
                borderColor: service.cardBorder,
                background: `radial-gradient(circle at top left, ${service.cardGlow}, transparent 80%)`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight leading-[0.9] whitespace-pre-line">
                {service.title}
              </h2>

              <div
                className="w-full h-[2px] my-6 md:my-8"
                style={{ backgroundColor: service.accentColor, opacity: 0.5 }}
              />

              <p className="text-lg md:text-xl font-sans font-light leading-relaxed opacity-80 max-w-lg">
                {service.description}
              </p>
            </div>
          </div>

          {/* Left callout */}
          <div
            ref={(el) => { calloutsLeftRef.current[index] = el; }}
            className="absolute left-8 md:left-16 top-1/4"
          >
            <div
              className="px-5 py-3 rounded-lg border text-sm md:text-base font-heading font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ borderColor: service.cardBorder, background: service.cardGlow }}
            >
              {service.callouts[0]}
            </div>
          </div>

          {/* Right callout */}
          <div
            ref={(el) => { calloutsRightRef.current[index] = el; }}
            className="absolute right-8 md:right-16 bottom-1/4"
          >
            <div
              className="px-5 py-3 rounded-lg border text-sm md:text-base font-heading font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ borderColor: service.cardBorder, background: service.cardGlow }}
            >
              {service.callouts[1]}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
