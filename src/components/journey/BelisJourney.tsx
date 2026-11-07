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
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SITE_LINKS } from "@/config/site";
import styles from "./journey.module.css";

const destinations: Record<number, string> = {
  2: "/portfolio",
  3: "/websites",
  4: "/sistemas",
};

const lastStation = STATION_COUNT - 1;
const menuLinks = SITE_LINKS.filter(({ href }) => href !== "/");

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function BelisJourney() {
  const router = useRouter();
  const blobRef = useRef<BelisBlobHandle>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const timers = useRef<number[]>([]);
  const [locked, setLocked] = useState(false);
  const hud = useJourneyDirector(blobRef, locked);

  const scrollToStation = useCallback((station: number) => {
    window.scrollTo({
      top: station * getJourneyViewportHeight(),
      behavior: scrollBehavior(),
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

  // Settle leve: só encaixa se já estiver perto do pico (~18% da viewport).
  useEffect(() => {
    let settleTimer = 0;
    const settle = () => {
      if (locked) return;
      const vh = getJourneyViewportHeight();
      const progress = window.scrollY / vh;
      if (progress >= lastStation) return;
      const nearest = Math.max(0, Math.round(progress));
      const distance = Math.abs(progress - nearest);
      if (distance < 0.02 || distance > 0.18) return;
      window.scrollTo({
        top: nearest * vh,
        behavior: scrollBehavior(),
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

  return (
    <main className={`${styles.journey} ${locked ? styles.locked : ""}`}>
      <div className={styles.spacers} aria-hidden="true">
        {Array.from({ length: STATION_COUNT }, (_, index) => (
          <div className={styles.spacer} key={index} />
        ))}
      </div>

      <div className={styles.stage} data-journey-stage>
        <header className={styles.hudTop}>
          <span className={styles.homeClock} aria-hidden="true">{hud.date} · {hud.time}</span>
          <button
            type="button"
            className={styles.homeBrand}
            onClick={() => scrollToStation(0)}
            aria-label="Voltar ao início"
          >
            BELIS <i>®</i>
          </button>
          <details
            ref={menuRef}
            className={styles.homeMenu}
            data-home-menu
            onBlur={({ currentTarget, relatedTarget }) => {
              if (relatedTarget && !currentTarget.contains(relatedTarget)) currentTarget.open = false;
            }}
            onKeyDown={(event) => {
              if (event.key !== "Escape" || !event.currentTarget.open) return;
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }}
          >
            <summary>Menu <span aria-hidden="true">≡</span></summary>
            <nav aria-label="Navegação principal">
              {menuLinks.map(({ href, label }) => (
                <TransitionLink key={href} href={href} prefetch={false} onClick={() => {
                  if (menuRef.current) menuRef.current.open = false;
                }}>
                  {label}
                </TransitionLink>
              ))}
            </nav>
          </details>
        </header>
        <div className={styles.background} />
        <div className={styles.grid} aria-hidden="true" />

        <button
          className={styles.blobButton}
          type="button"
          onClick={activateCurrent}
          aria-label={hud.active === lastStation
            ? "Falar com a Belis pelo WhatsApp"
            : hud.active < 2
              ? `Avançar para ${sections[hud.active + 1].label}`
              : `Entrar em ${sections[hud.active].label}`}
        >
          <BlobBeltHUD hidden={locked} station={hud.active}>
            <BelisBlob
              ref={blobRef}
              className={styles.blob}
              poster="/belis-blob-poster.avif"
            />
          </BlobBeltHUD>
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
          <HeroStation />
          <GuideStation onContinue={() => scrollToStation(2)} />
          {trials.map((trial) => (
            <TrialStation
              key={trial.station}
              trial={trial}
              onEnter={() => enterAndNavigate(trial.href)}
            />
          ))}
          <ContactStation loadImages={hud.active >= 4} />
        </div>

      </div>
    </main>
  );
}
