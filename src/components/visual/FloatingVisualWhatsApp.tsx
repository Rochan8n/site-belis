"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { WhatsAppLink } from "./WhatsAppLink";
import styles from "./visual.module.css";

export function FloatingVisualWhatsApp() {
  const [studioVisible, setStudioVisible] = useState(false);

  useEffect(() => {
    const studio = document.getElementById("seu-projeto");
    if (!studio) return;
    const observer = new IntersectionObserver(([entry]) => setStudioVisible(entry.isIntersecting));
    observer.observe(studio);
    return () => observer.disconnect();
  }, []);

  // The studio has its own CTA carrying the selected design. Keep it unobstructed.
  if (studioVisible) return null;
  return (
    <WhatsAppLink placement="floating" className={styles.floatingWhatsApp} aria-label="Conversar no WhatsApp sobre comunicação visual">
      <FaWhatsapp size={28} aria-hidden="true" /><span>Seu projeto começa aqui</span>
    </WhatsAppLink>
  );
}
