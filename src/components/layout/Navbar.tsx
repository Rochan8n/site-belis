"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import styles from "./siteChrome.module.css";

const links = [
  { href: "/", label: "Início", code: "00" },
  { href: "/portfolio", label: "Studio", code: "01" },
  { href: "/websites", label: "Web", code: "02" },
  { href: "/sistemas", label: "Systems", code: "03" },
  { href: "/sobre", label: "Sobre", code: "04" },
  { href: "/contato", label: "Contato", code: "05" },
] as const;

const routeLabels: Record<string, string> = {
  "/portfolio": "Studio",
  "/websites": "Web",
  "/sistemas": "Systems",
  "/sobre": "Sobre",
  "/contato": "Contato",
};

function formatClock(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDate(date: Date) {
  return date
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    .replace(".", "")
    .toUpperCase();
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const routeLabel = routeLabels[pathname] ?? "Belis";

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    const initial = window.setTimeout(updateClock, 0);
    const clock = window.setInterval(updateClock, 30_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const pageCode = useMemo(
    () => links.find((link) => link.href === pathname)?.code ?? "--",
    [pathname],
  );

  return (
    <>
      <header className={styles.hudHeader} data-navbar>
        <span className={styles.headerMeta}>
          {now ? formatDate(now) : "-- ---"} · PÁG. {pageCode}
        </span>
        <TransitionLink href="/" className={styles.headerBrand} aria-label="Belis — início">
          BELIS <i>®</i>
        </TransitionLink>
        <button
          type="button"
          className={styles.menuTrigger}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          <span>{open ? "Fechar" : "Menu"}</span>
          <i aria-hidden="true"><b /><b /></i>
        </button>
        <span className={styles.headerRoute}>{routeLabel} · {now ? formatClock(now) : "--:--"}</span>
      </header>

      <div
        id="site-navigation"
        className={`${styles.menuPanel} ${open ? styles.menuPanelOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.menuGrid} aria-hidden="true" />
        <div className={styles.menuCorners} aria-hidden="true"><i /><i /><i /><i /></div>

        <div className={styles.menuIntro}>
          <span>MAPA / 006 ROTAS</span>
          <span>SELECIONE DESTINO</span>
        </div>

        <nav className={styles.menuNav} aria-label="Navegação principal">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${styles.menuLink} ${active ? styles.menuLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? 0 : -1}
              >
                <span>{link.code}</span>
                <strong>{link.label}</strong>
                <i aria-hidden="true">↗</i>
              </TransitionLink>
            );
          })}
        </nav>

        <div className={styles.menuFooter}>
          <span>23.5505° S · 46.6333° W</span>
          <a
            href="https://wa.me/5511973138895"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
          >
            INICIAR PROJETO ↗
          </a>
          <span>SÃO PAULO · BR · 2026</span>
        </div>
      </div>
    </>
  );
}
