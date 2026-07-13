"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./siteChrome.module.css";

const routeMeta: Record<string, { index: string; label: string }> = {
  "/portfolio": { index: "001", label: "STUDIO" },
  "/websites": { index: "002", label: "WEB" },
  "/sistemas": { index: "003", label: "SYSTEMS" },
  "/sobre": { index: "004", label: "SOBRE" },
  "/contato": { index: "005", label: "CONTATO" },
};

export function PageHud() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const meta = routeMeta[pathname] ?? { index: "000", label: "BELIS" };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <div className={styles.pageHud} aria-hidden="true">
      <div className={styles.viewportCorners}><i /><i /><i /><i /></div>
      <div className={styles.sideReadout}>BELIS / DIGITAL GROWTH SYSTEM</div>
      <footer className={styles.hudFooter}>
        <span>23.5505° S</span>
        <div>
          <span>{meta.index} / 005</span>
          <i><b style={{ width: `${progress * 100}%` }} /></i>
          <span>{meta.label}</span>
        </div>
        <span>SÃO PAULO · BR</span>
      </footer>
    </div>
  );
}
