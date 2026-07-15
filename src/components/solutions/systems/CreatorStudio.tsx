"use client";

import { useState, type ComponentType } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Radar,
  Sparkles,
  LayoutGrid,
  FolderOpen,
} from "lucide-react";
import styles from "./systems.module.css";

type Slide = {
  n: string;
  text: string;
  kind: "cover" | "body" | "image" | "stat" | "cta";
};

const SLIDES: Slide[] = [
  { n: "01", text: "A barreira dita o brilho", kind: "cover" },
  { n: "02", text: "90% trata o sintoma errado", kind: "body" },
  { n: "03", text: "Mais ácido ≠ mais resultado", kind: "body" },
  { n: "04", text: "Reparar antes de renovar", kind: "image" },
  { n: "05", text: "TEWL −38% em 4 semanas", kind: "stat" },
  { n: "06", text: "Protocolo em 3 camadas", kind: "body" },
  { n: "07", text: "Avaliação clínica gratuita", kind: "cta" },
];

type NavItem = {
  icon: ComponentType<{ size?: number }>;
  label: string;
  indent?: boolean;
  active?: boolean;
};

const NAV: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: TrendingUp, label: "Trend Hunter" },
  { icon: Radar, label: "Radar de Mercado", indent: true },
  { icon: Sparkles, label: "Raio-X Viral" },
  { icon: LayoutGrid, label: "Carousel Studio", active: true },
  { icon: FolderOpen, label: "Content Vault" },
];

function slideBg(kind: Slide["kind"]) {
  switch (kind) {
    case "cover": return "linear-gradient(160deg,#1a2822 0%,#121a17 100%)";
    case "image": return "linear-gradient(135deg,#3a4a42 0%,#1a2822 100%)";
    case "stat": return "#f4f1ea";
    default: return "#0f1412";
  }
}

export function CreatorStudio() {
  const [active, setActive] = useState(4);

  return (
    <div className={styles.ct}>
      <aside className={styles.ctSidebar}>
        <nav className={styles.ctNav}>
          {NAV.map(({ icon: Icon, label, indent, active: on }) => (
            <div
              key={label}
              className={`${styles.ctNavItem} ${on ? styles.active : ""} ${indent ? styles.ctNavIndent : ""}`}
            >
              {!indent && <Icon size={15} />}
              <span>{label}</span>
              {on && <span className={styles.ctDot} />}
            </div>
          ))}
        </nav>

        <p className={styles.ctWorkspaceLabel}>Workspace</p>
        <div className={styles.ctWorkspace}>
          <span className={styles.ctWsBadge}>CL</span>
          <div>
            <div className={styles.ctWsName}>Clínica Luxe</div>
            <div className={styles.ctWsPlan}>Plano Pro</div>
          </div>
        </div>
      </aside>

      <div className={styles.ctMain}>
        <div className={styles.ctHead}>
          <div>
            <div className={styles.ctEyebrow}>Carousel Studio</div>
            <h4 className={styles.ctHeadTitle}>A barreira da pele dita o brilho, não o produto</h4>
          </div>
          <span className={styles.ctTemplate}>template · Clínica Luxe</span>
        </div>

        <div className={styles.ctSlides}>
          {SLIDES.map((s, i) => (
            <button
              key={s.n}
              type="button"
              aria-label={`Slide ${s.n}: ${s.text}`}
              onClick={() => setActive(i)}
              className={`${styles.ctSlide} ${active === i ? styles.active : ""}`}
              style={{ background: slideBg(s.kind) }}
            >
              <span className={styles.ctSlideInner}>
                <span className={`${styles.ctSlideNum} ${s.kind === "stat" ? styles.dark : ""}`}>{s.n}</span>
                {s.kind === "stat" ? (
                  <span className={styles.ctStat}>
                    <span className={styles.ctStatBig}>−38%</span>
                    <span className={styles.ctStatSub}>TEWL · 4 sem</span>
                  </span>
                ) : s.kind === "cta" ? (
                  <span>
                    <span className={styles.ctSlideText}>{s.text}</span>
                    <span className={styles.ctCtaMini}>agendar →</span>
                  </span>
                ) : (
                  <span>
                    <span className={styles.ctSlideText}>{s.text}</span>
                    <span className={styles.ctSlideRule} />
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.ctPanels}>
          <div className={styles.ctPanel}>
            <p className={styles.ctPanelLabel}>Legenda sugerida</p>
            <p className={styles.ctCaption}>
              Sua pele descama, arde e perde luminosidade, e a resposta provável não é trocar de ativo.
              É reparar a barreira primeiro. Salva pra revisar antes da próxima rotina.{" "}
              <span className={styles.tags}>#dermato #skinbarrier #clinicaestetica</span>
            </p>
          </div>
          <div className={`${styles.ctPanel} ${styles.ctCost}`}>
            <p className={styles.ctPanelLabel}>Custo</p>
            <div>3 imgs · 7 slides</div>
            <div className={styles.accent}>$ 0,18 · 22s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
