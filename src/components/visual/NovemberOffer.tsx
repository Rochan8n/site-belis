"use client";

import { useSyncExternalStore } from "react";
import styles from "./visual.module.css";

export function isNovemberOfferActive(now = Date.now()) {
  return now >= Date.parse("2026-11-01T00:00:00-03:00")
    && now < Date.parse("2026-12-01T00:00:00-03:00");
}

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
}

// Check in the browser so a statically built page cannot keep an expired offer.
const serverSnapshot = () => false;

export function NovemberOffer() {
  const active = useSyncExternalStore(subscribe, isNovemberOfferActive, serverSnapshot);
  if (!active) return null;

  return (
    <div className={styles.offer}>
      <strong>Novembro: 30% de desconto</strong>
      <span>Em letras caixa e letreiros sob medida. Até <time dateTime="2026-11-30">30/11/2026</time>.</span>
    </div>
  );
}
