"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import styles from "./visual.module.css";

export function HeroShowcase() {
  const scene = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = scene.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`);
    element.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -4}deg`);
  };

  const reset = () => {
    scene.current?.style.setProperty("--tilt-x", "0deg");
    scene.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <figure className={styles.heroFigure}>
      <div ref={scene} className={styles.heroScene} onPointerMove={move} onPointerLeave={reset}>
        <div className={styles.heroImage}>
          <Image
            src="/images/comunicacao-visual/letra-r-luz-azul.png"
            alt="Letra R com frente preta texturizada, volume e iluminação azul nas bordas"
            width={1600}
            height={1200}
            sizes="(max-width: 760px) 100vw, 62vw"
            preload
          />
        </div>
        <span className={styles.materialNote}>Volume e luz que destacam cada traço.</span>
      </div>
      <figcaption>Letra caixa com iluminação azul e acabamento texturizado.</figcaption>
    </figure>
  );
}
