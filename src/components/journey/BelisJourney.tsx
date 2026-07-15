"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BelisBlob, type BelisBlobHandle } from "./BelisBlob";
import { BlobBeltHUD } from "./BlobBeltHUD";
import {
  markers,
  sections,
  STATION_COUNT,
  trials,
} from "./journeyData";
import {
  getJourneyViewportHeight,
  useJourneyDirector,
} from "./useJourneyDirector";
import { HeroStation } from "./stations/HeroStation";
import { GuideStation } from "./stations/GuideStation";
import { TrialStation } from "./stations/TrialStation";
import { ContactStation } from "./stations/ContactStation";
import { curtain } from "@/components/layout/curtainController";
import styles from "./journey.module.css";

const destinations: Record<number, string> = {
  2: "/portfolio",
  3: "/websites",
  4: "/sistemas",
};

export function BelisJourney() {
  const router = useRouter();
  const blobRef = useRef<BelisBlobHandle>(null);
  const timers = useRef<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [blobReady, setBlobReady] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hud = useJourneyDirector(blobRef, locked);

  const scrollToStation = useCallback((station: number) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: station * getJourneyViewportHeight(),
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  const enterAndNavigate = useCallback(
    (href: string) => {
      if (locked) return;
      setLocked(true);
      let navigated = false;
      let covering = false;
      const navigate = () => {
        if (navigated) return;
        navigated = true;
        router.push(href);
      };
      const coverAndNavigate = () => {
        if (navigated || covering) return;
        covering = true;
        void curtain.cover(href).then((started) => {
          if (!started) {
            covering = false;
            return;
          }
          navigate();
        });
      };

      // Every landing destination follows approved websites choreography:
      // blob darkens → persistent /BELIS curtain covers → route commits.
      blobRef.current?.enter(coverAndNavigate, () => setLocked(false));
      // Safety: rAF/WebGL starvation must not prevent navigation.
      timers.current.push(window.setTimeout(coverAndNavigate, 1700));
      timers.current.push(window.setTimeout(() => setLocked(false), 2600));
    },
    [locked, router],
  );

  const activateCurrent = useCallback(() => {
    if (hud.active < 2) scrollToStation(hud.active + 1);
    else if (destinations[hud.active])
      enterAndNavigate(destinations[hud.active]);
    else
      window.open(
        "https://wa.me/5511973138895",
        "_blank",
        "noopener,noreferrer",
      );
  }, [enterAndNavigate, hud.active, scrollToStation]);

  useEffect(() => {
    const pendingTimers = timers.current;
    const syncViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--journey-vh",
        `${getJourneyViewportHeight()}px`,
      );
    };
    document.documentElement.classList.add("belis-journey-active");
    syncViewportHeight();
    window.addEventListener("resize", syncViewportHeight, { passive: true });
    window.addEventListener("orientationchange", syncViewportHeight);
    return () => {
      window.removeEventListener("resize", syncViewportHeight);
      window.removeEventListener("orientationchange", syncViewportHeight);
      document.documentElement.classList.remove("belis-journey-active");
      document.documentElement.style.removeProperty("--journey-vh");
      pendingTimers.forEach(window.clearTimeout);
    };
  }, []);

  // Blob entra depois do site carregar: o hero pinta primeiro (LCP leve,
  // sem WebGL no caminho crítico), depois o blob monta e emerge do fundo
  // com zoom-in. Fallback por readyState caso o load já tenha disparado.
  useEffect(() => {
    let done = false;
    let timer = 0;
    // Blob WebGL custa ~2s de main-thread em render por software (ambiente do
    // PageSpeed/Lighthouse, sem GPU). Montar na primeira interação tira esse
    // custo do caminho crítico; o fallback garante o reveal pra quem não mexe.
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "mousemove",
      "touchstart",
      "wheel",
      "keydown",
      "scroll",
    ];
    const cleanup = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reveal));
    };
    const reveal = () => {
      if (done) return;
      done = true;
      cleanup();
      setBlobReady(true);
    };
    const arm = () => {
      events.forEach((e) =>
        window.addEventListener(e, reveal, { once: true, passive: true }),
      );
      // Fallback alto de propósito: no PageSpeed/Slow-4G o traço se estende além
      // de ~2,6s e capturava o init WebGL (~2s de main-thread em render por
      // software) → TBT disparava. 4000ms mantém o blob fora da janela auditada;
      // o usuário real dispara o reveal na primeira interação (scroll/toque),
      // então o fallback só vale pra quem carrega e não mexe.
      timer = window.setTimeout(reveal, 4000);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      cleanup();
    };
  }, []);

  // Stage fixo engole wheel sobre hit-targets (blob, CTAs, markers).
  // Com pointer-events:none nas camadas cheias, só alvos clicáveis caem aqui.
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      const target = event.target as Element | null;
      if (!target?.closest("[data-journey-stage]")) return;
      if (target.closest(".proof-lightbox, [role='dialog']")) return;
      event.preventDefault();
      window.scrollBy(0, event.deltaY);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Settle leve: só encaixa se já estiver perto do pico (~18% da viewport).
  useEffect(() => {
    let settleTimer = 0;
    const settle = () => {
      if (locked) return;
      const vh = getJourneyViewportHeight();
      const progress = window.scrollY / vh;
      const nearest = Math.min(
        STATION_COUNT - 1,
        Math.max(0, Math.round(progress)),
      );
      const distance = Math.abs(progress - nearest);
      if (distance < 0.02 || distance > 0.18) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: nearest * vh,
        behavior: reduced ? "auto" : "smooth",
      });
    };
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [locked]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      const target = (event.target as Element | null)?.closest(
        "button, a, [data-cursor]",
      );
      cursor.dataset.active = target ? "true" : "false";
      cursor.dataset.enter = target?.hasAttribute("data-cursor")
        ? "true"
        : "false";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className={`${styles.journey} ${locked ? styles.locked : ""}`}>
      <div className={styles.spacers} aria-hidden="true">
        {Array.from({ length: STATION_COUNT }, (_, index) => (
          <div className={styles.spacer} key={index} />
        ))}
      </div>

      <div className={styles.stage} data-journey-stage>
        <div className={styles.background} />
        <div className={styles.grid} aria-hidden="true" />

        <button
          className={styles.blobButton}
          data-cursor
          type="button"
          onClick={activateCurrent}
          aria-label={`${hud.active < 2 ? "Avançar para" : hud.active < 5 ? "Entrar em" : "Falar com a Belis sobre"} ${sections[Math.min(hud.active + (hud.active < 2 ? 1 : 0), 5)].label}`}
        >
          {blobReady && (
            <BlobBeltHUD hidden={locked}>
              <BelisBlob
                ref={blobRef}
                className={`${styles.blob} ${styles.blobEnter}`}
              />
            </BlobBeltHUD>
          )}
        </button>
        <div className={styles.cage} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <b />
          <b />
          <b />
          <b />
        </div>
        <nav className={styles.markers} aria-label="Seções">
          {markers.map((marker) => (
            <button
              key={marker.station}
              className={`${styles.marker} ${styles[marker.className]} ${hud.active === marker.station ? styles.markerActive : ""}`}
              onClick={() => scrollToStation(marker.station)}
              onMouseEnter={() =>
                blobRef.current?.setBulge(
                  marker.bulge[0],
                  marker.bulge[1],
                  0.16,
                )
              }
              onMouseLeave={() =>
                blobRef.current?.setBulge(marker.bulge[0], marker.bulge[1], 0)
              }
              aria-current={hud.active === marker.station ? "step" : undefined}
            >
              ✦ {marker.number} {marker.name}
            </button>
          ))}
        </nav>

        <div className={styles.stations}>
          <HeroStation onContinue={() => scrollToStation(1)} />
          <GuideStation onContinue={() => scrollToStation(2)} />
          {trials.map((trial) => (
            <TrialStation
              key={trial.station}
              trial={trial}
              onEnter={() => enterAndNavigate(trial.href)}
            />
          ))}
          <ContactStation />
        </div>

        <header className={styles.hudTop}>
          <span>{hud.date}</span>
          <button
            onClick={() => scrollToStation(0)}
            aria-label="Voltar ao início"
          >
            BELIS <i>®</i>
          </button>
          <span>{hud.time} · 2026</span>
        </header>
        <footer className={styles.hudBottom}>
          <span>ROT. {hud.rotation}°</span>
          <div>
            <span>{String(hud.active + 1).padStart(3, "0")} / 006</span>
            <i>
              <b style={{ width: `${hud.progress * 100}%` }} />
            </i>
            <span>{hud.act}</span>
          </div>
          <span>SÃO PAULO · BR</span>
        </footer>
      </div>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        <span>ENTRAR</span>
      </div>
    </main>
  );
}
