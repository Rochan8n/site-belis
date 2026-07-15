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

type PanelKey = "dashboard" | "trends" | "radar" | "raiox" | "studio" | "vault";

type NavItem = {
  key: PanelKey;
  icon: ComponentType<{ size?: number }>;
  label: string;
  short: string;
};

const NAV: NavItem[] = [
  { key: "dashboard", icon: LayoutDashboard, label: "Dashboard", short: "Dashboard" },
  { key: "trends", icon: TrendingUp, label: "Trend Hunter", short: "Trends" },
  { key: "radar", icon: Radar, label: "Radar de Mercado", short: "Radar" },
  { key: "raiox", icon: Sparkles, label: "Raio-X Viral", short: "Raio-X" },
  { key: "studio", icon: LayoutGrid, label: "Carousel Studio", short: "Studio" },
  { key: "vault", icon: FolderOpen, label: "Content Vault", short: "Vault" },
];

export function CreatorStudio() {
  const [active, setActive] = useState<PanelKey>("studio");

  return (
    <div className={styles.ct}>
      <aside className={styles.ctSidebar}>
        <nav className={styles.ctNav}>
          {NAV.map(({ key, icon: Icon, label }) => {
            const on = active === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`${styles.ctNavItem} ${on ? styles.active : ""}`}
              >
                <Icon size={15} />
                <span>{label}</span>
                {on && <span className={styles.ctDot} />}
              </button>
            );
          })}
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
        <div className={styles.ctMobileNav}>
          {NAV.map(({ key, icon: Icon, short }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`${styles.ctMobileTab} ${active === key ? styles.active : ""}`}
            >
              <Icon size={13} />
              <span>{short}</span>
            </button>
          ))}
        </div>

        {/* key forces a remount so the fade re-runs on every switch */}
        <div key={active} className={styles.ctPanelWrap}>
          {active === "dashboard" && <DashboardPanel />}
          {active === "trends" && <TrendsPanel />}
          {active === "radar" && <RadarPanel />}
          {active === "raiox" && <RaioxPanel />}
          {active === "studio" && <StudioPanel />}
          {active === "vault" && <VaultPanel />}
        </div>
      </div>
    </div>
  );
}

/* ── Panel: Carousel Studio ── */
type Slide = { n: string; text: string; kind: "cover" | "body" | "image" | "stat" | "cta" };

const SLIDES: Slide[] = [
  { n: "01", text: "A barreira dita o brilho", kind: "cover" },
  { n: "02", text: "90% trata o sintoma errado", kind: "body" },
  { n: "03", text: "Mais ácido ≠ mais resultado", kind: "body" },
  { n: "04", text: "Reparar antes de renovar", kind: "image" },
  { n: "05", text: "TEWL −38% em 4 semanas", kind: "stat" },
  { n: "06", text: "Protocolo em 3 camadas", kind: "body" },
  { n: "07", text: "Avaliação clínica gratuita", kind: "cta" },
];

function slideBg(slide: Slide) {
  switch (slide.n) {
    case "01":
      return "linear-gradient(180deg, rgb(9 20 16 / 12%) 28%, rgb(9 20 16 / 92%) 100%), url('/images/systems/carousel-clinica-luxe.webp') center / cover";
    case "02":
      return "linear-gradient(180deg, rgb(7 20 15 / 4%) 24%, rgb(7 20 15 / 90%) 100%), url('/images/systems/carousel-macro-serum.webp') center / cover";
    case "03":
      return "linear-gradient(180deg, rgb(7 20 15 / 8%) 24%, rgb(7 20 15 / 88%) 100%), url('/images/systems/carousel-macro-serum.webp') 65% center / cover";
    case "04":
      return "linear-gradient(180deg, rgb(9 20 16 / 8%) 28%, rgb(9 20 16 / 88%) 100%), url('/images/systems/carousel-clinica-luxe.webp') 70% center / cover";
    case "05":
      return "linear-gradient(180deg, rgb(244 241 234 / 16%), rgb(244 241 234 / 50%)), url('/images/systems/carousel-protocolo.webp') center / cover";
    case "06":
      return "linear-gradient(180deg, rgb(6 22 15 / 8%) 26%, rgb(6 22 15 / 88%) 100%), url('/images/systems/carousel-protocolo.webp') 70% center / cover";
    case "07":
      return "linear-gradient(180deg, rgb(9 20 16 / 10%) 26%, rgb(9 20 16 / 90%) 100%), url('/images/systems/carousel-clinica-luxe.webp') 65% center / cover";
    default:
      return "#0f1412";
  }
}

function StudioPanel() {
  const [slide, setSlide] = useState(4);
  return (
    <>
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
            onClick={() => setSlide(i)}
            className={`${styles.ctSlide} ${slide === i ? styles.active : ""}`}
            style={{ background: slideBg(s) }}
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
        <div className={styles.ctGlass}>
          <p className={styles.ctPanelLabel}>Legenda sugerida</p>
          <p className={styles.ctCaption}>
            Sua pele descama, arde e perde luminosidade, e a resposta provável não é trocar de ativo.
            É reparar a barreira primeiro. Salva pra revisar antes da próxima rotina.{" "}
            <span className={styles.tags}>#dermato #skinbarrier #clinicaestetica</span>
          </p>
        </div>
        <div className={`${styles.ctGlass} ${styles.ctCost}`}>
          <p className={styles.ctPanelLabel}>Custo</p>
          <div>3 imgs · 7 slides</div>
          <div className={styles.accent}>$ 0,18 · 22s</div>
        </div>
      </div>
    </>
  );
}

/* ── Panel: Dashboard ── */
const KPIS = [
  { l: "Alcance", v: "184k", d: "+38%" },
  { l: "Salvos", v: "2.140", d: "+62%" },
  { l: "Seguidores", v: "+1.287", d: "+24%" },
];

function DashboardPanel() {
  return (
    <>
      <PanelHead kicker="Dashboard · Últimos 30 dias" title="Sua marca está em ritmo de crescimento" meta="@clinica.luxe" />
      <div className={styles.ctKpis}>
        {KPIS.map((k) => (
          <div key={k.l} className={styles.ctKpi}>
            <div className={styles.ctKpiLabel}>{k.l}</div>
            <div className={styles.ctKpiValue}>{k.v}</div>
            <div className={styles.ctKpiDelta}>{k.d} vs. mês anterior</div>
          </div>
        ))}
      </div>
      <div className={styles.ctGlass}>
        <div className={styles.ctChartHead}>
          <span>Engajamento por dia</span>
          <span className={styles.ctMuted}>picos: ter 19h · qui 12h</span>
        </div>
        <svg viewBox="0 0 320 80" className={styles.ctChart} preserveAspectRatio="none">
          <defs>
            <linearGradient id="ctLg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e0894a" stopOpacity=".5" />
              <stop offset="1" stopColor="#e0894a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,60 L20,55 L40,50 L60,42 L80,46 L100,30 L120,38 L140,25 L160,33 L180,20 L200,28 L220,15 L240,22 L260,12 L280,18 L300,8 L320,14 L320,80 L0,80 Z" fill="url(#ctLg)" />
          <path d="M0,60 L20,55 L40,50 L60,42 L80,46 L100,30 L120,38 L140,25 L160,33 L180,20 L200,28 L220,15 L240,22 L260,12 L280,18 L300,8 L320,14" stroke="#e0894a" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className={styles.ctSplit}>
        <div className={styles.ctGlass}>
          <p className={styles.ctPanelLabel}>Top headline</p>
          <p className={styles.ctBody}>&ldquo;3 sinais de que sua skincare não está funcionando&rdquo;</p>
          <p className={styles.ctSub}>12.4k salvos · 38% concluídos</p>
        </div>
        <div className={styles.ctGlass}>
          <p className={styles.ctPanelLabel}>Melhor horário</p>
          <p className={styles.ctBody}>Terça, 19h–21h</p>
          <p className={styles.ctSub}>2.3× mais alcance médio</p>
        </div>
      </div>
    </>
  );
}

/* ── Panel: Trend Hunter ── */
const TRENDS = [
  { h: "#skinbarrier", v: "8.2k posts/24h", d: "+412%", t: "rotina mínima vence multi-step", heat: "92" },
  { h: "#glassskin", v: "5.7k posts/24h", d: "+187%", t: "preparo de pele para verão", heat: "78" },
  { h: "#retinolnight", v: "3.1k posts/24h", d: "+124%", t: "mitos sobre uso diário", heat: "66" },
  { h: "#peelingcaseiro", v: "2.4k posts/24h", d: "+88%", t: "alerta: o que NÃO fazer", heat: "58" },
];

function TrendsPanel() {
  return (
    <>
      <PanelHead
        kicker="Trend Hunter · ao vivo no X"
        title="12 trends quentes no nicho dermato"
        live="LIVE"
      />
      <div className={styles.ctList}>
        {TRENDS.map((t, i) => (
          <div key={t.h} className={`${styles.ctRow} ${i === 0 ? styles.ringed : ""}`}>
            <div className={styles.ctHeat}>{t.heat}</div>
            <div className={styles.ctRowBody}>
              <div className={styles.ctRowTop}>
                <span className={styles.ctMono}>{t.h}</span>
                <span className={styles.ctGrowth}>{t.d}</span>
              </div>
              <div className={styles.ctRowSub}>{t.t}</div>
            </div>
            <div className={styles.ctRowRight}>
              <div className={styles.ctMutedMono}>{t.v}</div>
              <span className={styles.ctChip}>usar →</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Panel: Radar de Mercado ── */
const PROFILES = [
  { h: "@dra.helena", p: "IG", n: "5 posts", t: "barreira · protocolo · mitos" },
  { h: "@skinlab.br", p: "TT", n: "5 posts", t: "rotina mínima · before/after" },
  { h: "@dermato.news", p: "YT", n: "5 Shorts", t: "ciência · retinol · verão" },
];

const INSIGHTS = [
  "Tema em comum: barreira da pele (3/3 perfis)",
  "Lacuna: quase ninguém fala de TEWL com número",
  "Ideia de carrossel: “3 sinais + protocolo em 4 slides”",
];

function RadarPanel() {
  return (
    <>
      <PanelHead kicker="Radar de Mercado · 5 concorrentes" title="O que o mercado dermato está postando" meta="análise pronta" />
      <div className={styles.ctList}>
        {PROFILES.map((r, i) => (
          <div key={r.h} className={`${styles.ctRow} ${i === 0 ? styles.ringed : ""}`}>
            <div className={styles.ctPlatform}>{r.p}</div>
            <div className={styles.ctRowBody}>
              <div className={styles.ctMono}>{r.h}</div>
              <div className={styles.ctRowSub}>{r.t}</div>
            </div>
            <div className={styles.ctMutedMono}>{r.n}</div>
          </div>
        ))}
      </div>
      <div className={styles.ctGlass} style={{ marginTop: 10 }}>
        <p className={styles.ctPanelLabel}>Insights cruzados</p>
        <ul className={styles.ctInsights}>
          {INSIGHTS.map((t) => (
            <li key={t}><span className={styles.accent}>→</span> {t}</li>
          ))}
        </ul>
        <span className={styles.ctChip}>gerar carrossel →</span>
      </div>
    </>
  );
}

/* ── Panel: Raio-X Viral ── */
const RX_BARS = [
  { l: "Gancho (3s)", v: 92, w: "92%" },
  { l: "Retenção", v: 78, w: "78%" },
  { l: "Força do CTA", v: 85, w: "85%" },
];
const RX_TAGS = ["Gancho nos 3s", "Texto na tela", "Prova (antes/depois)", "Corte rápido", "CTA no fim"];

function RaioxPanel() {
  return (
    <>
      <PanelHead kicker="Raio-X Viral · engenharia reversa" title="Por que esse reel bombou" live="analisando" liveMuted />
      <div className={styles.ctRxGrid}>
        <div className={styles.ctRxShot}>
          <img
            className={styles.ctRxImage}
            src="/images/systems/reel-dra-helena.webp"
            alt="Capa de Reel de uma dermatologista com sérum"
          />
          <span className={styles.ctRxPlay}>▶</span>
          <span className={styles.ctRxScan} />
          <span className={styles.ctRxTag}>REEL</span>
          <span className={styles.ctRxHandle}>
            @dra.helena
            <span className={styles.ctRxViews}>182k views · 4.1k salvos</span>
          </span>
        </div>
        <div className={styles.ctRxCol}>
          <div className={styles.ctGlass}>
            <p className={styles.ctPanelLabel}>Sinais extraídos</p>
            <div className={styles.ctBars}>
              {RX_BARS.map((b) => (
                <div key={b.l}>
                  <div className={styles.ctBarHead}>
                    <span>{b.l}</span>
                    <span className={styles.accent}>{b.v}</span>
                  </div>
                  <div className={styles.ctBarTrack}>
                    <div className={styles.ctBarFill} style={{ width: b.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.ctGlass}>
            <p className={styles.ctPanelLabel}>Elementos detectados</p>
            <div className={styles.ctTags}>
              {RX_TAGS.map((t) => <span key={t} className={styles.ctTag}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Panel: Content Vault ── */
type VaultCard = {
  tpl: string; d: string; s: string; kicker: string; title: string; brand: string; variant: string;
};

const VAULT: VaultCard[] = [
  { tpl: "Clínica Luxe", d: "há 2h", s: "rascunho", kicker: "PROTOCOLO · DERMATO", title: "A barreira da pele dita o brilho", brand: "Dra. Helena Castro", variant: "clinica" },
  { tpl: "Impacto", d: "há 1 dia", s: "publicado", kicker: "parem de fazer isso", title: "3 ERROS QUE QUEBRAM SEU FUNIL", brand: "@growthbruno", variant: "bold" },
  { tpl: "Cosmos", d: "há 3 dias", s: "agendado", kicker: "S K I N · 2026", title: "GLASS SKIN EM 4 CAMADAS", brand: "Camille Estética", variant: "moderno" },
  { tpl: "Arquivo", d: "há 5 dias", s: "publicado", kicker: "EDIÇÃO Nº 47", title: "O QUE A CIÊNCIA DIZ SOBRE RETINOL", brand: "Tribuna da Pele", variant: "classico" },
  { tpl: "Marfim", d: "há 1 sem.", s: "publicado", kicker: "estudo · 04", title: "menos é mais na sua rotina", brand: "studio·noma", variant: "minimalista" },
  { tpl: "Tribuna", d: "há 2 sem.", s: "arquivado", kicker: "EDITORIAL", title: "Por que sua pele descama no inverno", brand: "TRIBUNA", variant: "tribuna" },
];

function VaultPanel() {
  return (
    <>
      <div className={styles.ctHead}>
        <div>
          <div className={styles.ctEyebrow}>Content Vault · 47 carrosséis</div>
          <h4 className={styles.ctHeadTitle}>Tudo que você já gerou, organizado por template</h4>
        </div>
        <div className={styles.ctFilters}>
          <span className={styles.on}>todos</span>
          <span>publicados</span>
          <span>rascunhos</span>
        </div>
      </div>
      <div className={styles.ctVault}>
        {VAULT.map((v) => (
          <div key={v.title} className={styles.ctVaultCard}>
            <div className={`${styles.ctVaultArt} ${styles[`v_${v.variant}` as keyof typeof styles] as string}`}>
              <span className={styles.ctVaultTpl}>{v.tpl}</span>
              <span className={styles.ctVaultKicker}>{v.kicker}</span>
              <span className={styles.ctVaultTitle}>{v.title}</span>
              <span className={styles.ctVaultBrand}>{v.brand}</span>
            </div>
            <div className={styles.ctVaultFoot}>
              <span>{v.d}</span>
              <span className={styles.ctVaultStatus}>{v.s}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Shared panel header ── */
function PanelHead({
  kicker, title, meta, live, liveMuted,
}: { kicker: string; title: string; meta?: string; live?: string; liveMuted?: boolean }) {
  return (
    <div className={styles.ctHead}>
      <div>
        <div className={styles.ctEyebrow}>{kicker}</div>
        <h4 className={styles.ctHeadTitle}>{title}</h4>
      </div>
      {meta && <span className={styles.ctMetaText}>{meta}</span>}
      {live && (
        <span className={`${styles.ctLive} ${liveMuted ? styles.ctLiveMuted : ""}`}>
          <span className={styles.ctLiveDot} /> {live}
        </span>
      )}
    </div>
  );
}
