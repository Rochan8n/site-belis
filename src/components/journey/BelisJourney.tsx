"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BelisBlob, type BelisBlobHandle } from "./BelisBlob";
import { markers, sections, STATION_COUNT, trials } from "./journeyData";
import { useJourneyDirector } from "./useJourneyDirector";
import { HeroStation } from "./stations/HeroStation";
import { GuideStation } from "./stations/GuideStation";
import { TrialStation } from "./stations/TrialStation";
import { ContactStation } from "./stations/ContactStation";
import styles from "./journey.module.css";

const destinations: Record<number, string> = { 2: "/portfolio", 3: "/websites", 4: "/sistemas" };

export function BelisJourney() {
  const router = useRouter();
  const blobRef = useRef<BelisBlobHandle>(null);
  const timers = useRef<number[]>([]);
  const [locked, setLocked] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hud = useJourneyDirector(blobRef, locked);

  const scrollToStation = useCallback((station: number) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: station * window.innerHeight, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const enterAndNavigate = useCallback((href: string) => {
    if (locked) return;
    setLocked(true);
    let navigated = false;
    const navigate = () => {
      if (navigated) return;
      navigated = true;
      router.push(href);
    };
    blobRef.current?.enter(navigate, () => setLocked(false));
    timers.current.push(window.setTimeout(navigate, 1400));
    timers.current.push(window.setTimeout(() => setLocked(false), 2200));
  }, [locked, router]);

  const activateCurrent = useCallback(() => {
    if (hud.active < 2) scrollToStation(hud.active + 1);
    else if (destinations[hud.active]) enterAndNavigate(destinations[hud.active]);
    else window.open("https://wa.me/5511973138895", "_blank", "noopener,noreferrer");
  }, [enterAndNavigate, hud.active, scrollToStation]);

  useEffect(() => {
    const pendingTimers = timers.current;
    document.documentElement.classList.add("belis-journey-active");
    return () => {
      document.documentElement.classList.remove("belis-journey-active");
      pendingTimers.forEach(window.clearTimeout);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      const target = (event.target as Element | null)?.closest("button, a, [data-cursor]");
      cursor.dataset.active = target ? "true" : "false";
      cursor.dataset.enter = target?.hasAttribute("data-cursor") ? "true" : "false";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className={`${styles.journey} ${locked ? styles.locked : ""}`}>
      <div className={styles.spacers} aria-hidden="true">
        {Array.from({ length: STATION_COUNT }, (_, index) => <div className={styles.spacer} key={index} />)}
      </div>

      <div className={styles.stage}>
        <div className={styles.background} />
        <div className={styles.grid} aria-hidden="true" />

        <button className={styles.blobButton} data-cursor type="button" onClick={activateCurrent} aria-label={`${hud.active < 2 ? "Avançar para" : hud.active < 5 ? "Entrar em" : "Falar com a Belis sobre"} ${sections[Math.min(hud.active + (hud.active < 2 ? 1 : 0), 5)].label}`}>
          <BelisBlob ref={blobRef} className={styles.blob} />
        </button>
        <div className={styles.cage} aria-hidden="true"><i /><i /><i /><i /><b /><b /><b /><b /></div>

        <nav className={styles.markers} aria-label="Estações da jornada">
          {markers.map((marker) => (
            <button
              key={marker.station}
              className={`${styles.marker} ${styles[marker.className]} ${hud.active === marker.station ? styles.markerActive : ""}`}
              onClick={() => scrollToStation(marker.station)}
              onMouseEnter={() => blobRef.current?.setBulge(marker.bulge[0], marker.bulge[1], 0.32)}
              onMouseLeave={() => blobRef.current?.setBulge(marker.bulge[0], marker.bulge[1], 0)}
              aria-current={hud.active === marker.station ? "step" : undefined}
            >✦ {marker.number} {marker.name}</button>
          ))}
        </nav>

        <div className={styles.stations}>
          <HeroStation onContinue={() => scrollToStation(1)} />
          <GuideStation onContinue={() => scrollToStation(2)} />
          {trials.map((trial) => <TrialStation key={trial.station} trial={trial} onEnter={() => enterAndNavigate(trial.href)} />)}
          <ContactStation />
        </div>

        <header className={styles.hudTop}>
          <span>{hud.date}</span><button onClick={() => scrollToStation(0)} aria-label="Voltar ao início">BELIS <i>®</i></button><span>{hud.time} · 2026</span>
        </header>
        <footer className={styles.hudBottom}>
          <span>ROT. {hud.rotation}°</span>
          <div><span>{String(hud.active + 1).padStart(3, "0")} / 006</span><i><b style={{ width: `${hud.progress * 100}%` }} /></i><span>{hud.act}</span></div>
          <span>SÃO PAULO · BR</span>
        </footer>
        <div className={styles.grain} aria-hidden="true" />
      </div>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true"><span>ENTRAR</span></div>
    </main>
  );
}
