"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { analyticsEnabled, getAnalyticsConsent, initializeAnalytics, serverAnalyticsConsent, setAnalyticsConsent, subscribeAnalyticsConsent } from "@/lib/analytics-consent";
import styles from "./analyticsConsent.module.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverAnalyticsConsent);
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!ready || consent !== "granted") return;
    const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
    analyticsWindow.gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      page_title: document.title,
      page_referrer: document.referrer ? new URL(document.referrer).origin : "",
    });
  }, [pathname, ready, consent]);

  if (!analyticsEnabled) return null;

  const choose = (value: "granted" | "denied") => {
    setAnalyticsConsent(value);
    setSettingsOpen(false);
  };

  return (
    <>
      {consent === "granted" && <Script
        id="belis-google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onReady={() => {
          initializeAnalytics();
          setReady(true);
        }}
      />}
      {(consent === "unknown" || settingsOpen) ? <section className={styles.panel} aria-label="Preferências de análise de navegação">
        <p>Podemos usar o Google Analytics para entender quais conteúdos e páginas ajudam nossos visitantes? Você pode recusar e continuar navegando.</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => choose("denied")}>Recusar análise</button>
          <button type="button" onClick={() => choose("granted")}>Permitir análise</button>
        </div>
      </section> : <button type="button" className={styles.settings} onClick={() => setSettingsOpen(true)}>Preferências de cookies</button>}
    </>
  );
}
