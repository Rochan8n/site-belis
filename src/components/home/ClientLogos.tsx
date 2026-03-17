"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";

const logos = [
  { src: "https://belis.agency/wp-content/uploads/2023/02/1-1.webp",  alt: "Cliente 1" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/2-1.webp",  alt: "Cliente 2" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/3-1.webp",  alt: "Cliente 3" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/6-1.webp",  alt: "Cliente 4" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/8-1.webp",  alt: "Cliente 5" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/9.webp",    alt: "Cliente 6" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/10.webp",   alt: "Cliente 7" },
  { src: "https://belis.agency/wp-content/uploads/2023/02/14.webp",   alt: "Cliente 8" },
];

// Duplicate for seamless loop
const track = [...logos, ...logos];

export function ClientLogos() {
  return (
    <section className="w-full py-[34px] sm:py-[44px] relative z-20 overflow-hidden border-y border-cream/5">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-[10px] sm:text-xs font-sans font-bold tracking-[0.3em] uppercase text-cream/30 mb-10 sm:mb-12"
      >
        Marcas que confiam na Belis
      </motion.p>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 sm:gap-6 animate-marquee whitespace-nowrap">
          {track.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-[100px] sm:h-[120px] w-[280px] sm:w-[360px] relative opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, 360px"
                />
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
