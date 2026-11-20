"use client";

import { useSyncExternalStore } from "react";
import { isNovemberOfferActive } from "@/components/visual/NovemberOffer";
import styles from "./web.module.css";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
}
const serverSnapshot = () => false;

export function WebNovemberOffer() {
  const active = useSyncExternalStore(subscribe, isNovemberOfferActive, serverSnapshot);
  if (!active) return null;
  return <aside className={styles.novemberOffer} aria-label="Oferta de novembro">
    <strong>Novembro: 30% de desconto no seu novo site.</strong>
    <span>Na criação de sites e landing pages contratados até <time dateTime="2026-11-30">30/11/2026</time>. Desconto sobre o desenvolvimento, discriminado na proposta. Domínio, hospedagem e serviços de terceiros à parte.</span>
  </aside>;
}
