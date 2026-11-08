"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Moon, Rotate3D, Sun } from "lucide-react";
import { WhatsAppLink } from "./WhatsAppLink";
import landing from "./visual.module.css";
import styles from "./signStudio.module.css";

import { signFonts as fonts, signDesigns as designs, signColors as colors, signPresets, isTranslucentLayer, specimenContrast, type FontId, type DesignId, type ColorId } from "./signCatalog";
const tabs = [
  { id: "font", label: "Letra" },
  { id: "design", label: "Efeito" },
  { id: "color", label: "Cor" },
] as const;
type TabId = typeof tabs[number]["id"];

function SignLayers({ text, designId, count = 24 }: { text: string; designId: DesignId; count?: number }) {
  return <>
    <span className={styles.signGlow} aria-hidden="true">{text}</span>
    {Array.from({ length: count }, (_, index) => {
      const position = index / (count - 1);
      return <span className={styles.signLayer} key={index} data-translucent={isTranslucentLayer(designId, position)} style={{ "--layer": position } as CSSProperties} aria-hidden="true">{text}</span>;
    })}
    <span className={styles.signDiffuser} aria-hidden="true">{text}</span>
    <span className={styles.signFace} aria-hidden="true">{text}</span>
  </>;
}

export function SignStudio() {
  const [name, setName] = useState("Sua marca");
  const [fontId, setFontId] = useState<FontId>("essencial");
  const [designId, setDesignId] = useState<DesignId>("volume");
  const [colorId, setColorId] = useState<ColorId>("verde");
  const [tab, setTab] = useState<TabId>("font");
  const [night, setNight] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [fontSize, setFontSize] = useState<number>();
  const [specimensReady, setSpecimensReady] = useState(false);
  const studioRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const displayName = name.trim() || "Sua marca";
  const font = fonts.find((item) => item.id === fontId)!;
  const design = designs.find((item) => item.id === designId)!;
  const color = colors.find((item) => item.id === colorId)!;

  // Warm up specimen fonts shortly before the studio enters the viewport.
  // This keeps the expanded catalog from competing with the hero's first paint.
  useEffect(() => {
    const studio = studioRef.current;
    if (!studio) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSpecimensReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "700px" });
    observer.observe(studio);
    return () => observer.disconnect();
  }, []);

  // Measure loaded letterforms, including accents and wide characters.
  // ResizeObserver catches font swaps; no render loop or graphics dependency.
  useEffect(() => {
    const preview = previewRef.current;
    const measure = measureRef.current;
    if (!preview || !measure) return;
    const fit = () => {
      const width = measure.getBoundingClientRect().width;
      if (width > 0) setFontSize(Math.min(104, ((preview.clientWidth - 64) / width) * 100));
    };
    const observer = new ResizeObserver(fit);
    observer.observe(preview);
    observer.observe(measure);
    fit();
    return () => observer.disconnect();
  }, []);

  function chooseDesign(id: DesignId) {
    setDesignId(id);
    const chosen = designs.find((item) => item.id === id)!;
    setNight(chosen.lit);
    setRotated(chosen.sideView);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: tabs.length - 1 - index };
    if (!(event.key in offsets)) return;
    event.preventDefault();
    const next = (index + offsets[event.key] + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  const previewStyle = {
    "--sign-face": color.face,
    "--sign-edge": color.edge,
    "--sign-light": color.light,
    "--sign-contrast": specimenContrast(color.face),
    "--sign-depth": design.depth + "px",
    ...(fontSize ? { "--fit-size": fontSize + "px" } : {}),
  } as CSSProperties;
  const message = "Olá, Belis! Experimentei uma ideia no personalizador de comunicação visual. Texto: " + displayName + ". Letra: " + font.label + " (" + font.family + "). Efeito: " + design.label + ". Cor de referência: " + color.label + ". Quero conversar sobre um projeto com essa combinação.";

  return (
    <section ref={studioRef} className={styles.studio} id="seu-projeto" aria-labelledby="studio-title" data-specimens-ready={specimensReady}>
      <div className={styles.intro}>
        <h2 id="studio-title">Teste letras,<br />cores e luz.</h2>
        <p>Escreva o nome da sua marca e experimente uma combinação. Depois, ajuste cada detalhe e leve sua referência para o orçamento.</p>
      </div>
      <div className={styles.body}>
        <div className={styles.nameField}>
          <label htmlFor="sign-name">Nome ou palavra <span aria-hidden="true">{name.length}/24</span></label>
          <input id="sign-name" name="sign-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={24} autoComplete="off" spellCheck={false} aria-describedby="sign-help" />
          <span id="sign-help" className={styles.help}>Até 24 caracteres. Já tem um logo? Envie pelo WhatsApp.</span>
        </div>

        <div className={styles.previewWrap}>
          <div ref={previewRef} className={[styles.preview, night ? styles.night : "", styles[designId]].join(" ")} style={previewStyle}>
            <div className={styles.previewToolbar}>
              <span>Prévia do letreiro</span>
              <button type="button" onClick={() => setNight((value) => !value)} aria-pressed={night} aria-label={"Ambiente: " + (night ? "Noite" : "Dia")} title={night ? "Trocar para ambiente claro" : "Trocar para ambiente noturno"}>
                {night ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
                {night ? "Noite" : "Dia"}
              </button>
            </div>
            <span ref={measureRef} className={[styles.measure, styles[fontId]].join(" ")} aria-hidden="true">{displayName}</span>
            <div className={[styles.signObject, styles[fontId], rotated ? styles.rotated : ""].join(" ")} role="img" aria-label={"Simulação de " + displayName + ", letra " + font.label + ", " + design.label + ", cor " + color.label}>
              <SignLayers text={displayName} designId={designId} />
            </div>
            <div className={styles.previewBottom}>
              <span>{design.label}</span>
              <button type="button" onClick={() => setRotated((value) => !value)} aria-pressed={rotated} aria-label={"Girar amostra: " + (rotated ? "Ver de frente" : "Ver de lado")}>
                <Rotate3D size={17} aria-hidden="true" /> {rotated ? "Ver de frente" : "Ver de lado"}
              </button>
            </div>
          </div>
          <p className={styles.caption}>Simulação ilustrativa. A combinação final depende do tamanho, do traço das letras e do local de uso.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.presetIntro}>
            <h3 id="sign-presets-title">Comece por uma combinação</h3>
            <p>Um ponto de partida. Você pode mudar todas as escolhas abaixo.</p>
          </div>
          <div className={styles.presets} role="group" aria-labelledby="sign-presets-title">
            {signPresets.map((preset) => (
              <button key={preset.id} type="button" aria-pressed={fontId === preset.fontId && designId === preset.designId && colorId === preset.colorId} onClick={() => {
                setFontId(preset.fontId);
                setColorId(preset.colorId);
                chooseDesign(preset.designId);
              }}>
                <strong>{preset.label}</strong>
                <span>{preset.description}</span>
              </button>
            ))}
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Personalizar letreiro">
            {tabs.map((item, index) => (
              <button key={item.id} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab" id={"sign-tab-" + item.id} aria-controls={"sign-panel-" + item.id} aria-selected={tab === item.id} tabIndex={tab === item.id ? 0 : -1} onClick={() => setTab(item.id)} onKeyDown={(event) => navigateTabs(event, index)}>{item.label}</button>
            ))}
          </div>
          <div className={styles.panel} id="sign-panel-font" role="tabpanel" aria-labelledby="sign-tab-font" hidden={tab !== "font"}>
            <fieldset>
              <legend>Qual letra tem a sua cara? <span>{fonts.length} estilos</span></legend>
              <div className={`${styles.fontOptions} ${styles.optionScroll}`}>
                {fonts.map((item) => (
                  <label key={item.id} className={styles.option}>
                    <input type="radio" name="letter-style" value={item.id} checked={fontId === item.id} onChange={() => setFontId(item.id)} />
                    <span className={styles.fontChoice}>
                      <span className={specimensReady ? styles[item.id] : undefined} aria-hidden="true">Aa</span>
                      <span>{item.label}</span>
                      <Check size={13} className={styles.selectedMark} aria-hidden="true" />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className={styles.panel} id="sign-panel-design" role="tabpanel" aria-labelledby="sign-tab-design" hidden={tab !== "design"}>
            <fieldset>
              <legend>Um detalhe muda tudo. <span>{designs.length} efeitos</span></legend>
              <div className={`${styles.designOptions} ${styles.optionScroll}`}>
                {designs.map((item) => (
                  <label key={item.id} className={styles.option}>
                    <input type="radio" name="sign-design" value={item.id} checked={designId === item.id} onChange={() => chooseDesign(item.id)} aria-label={item.label} />
                    <span className={styles.designChoice}>
                      <span className={[styles.designSample, styles[item.id], item.lit ? styles.sampleLit : ""].join(" ")} style={{ "--sign-depth": item.depth * 0.24 + "px" } as CSSProperties} aria-hidden="true"><span className={styles.miniObject}><SignLayers text="a" designId={item.id} count={12} /></span></span>
                      <span><strong>{item.label}</strong><small>{item.description}</small></span>
                      <Check size={16} className={styles.selectedMark} aria-hidden="true" />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className={styles.panel} id="sign-panel-color" role="tabpanel" aria-labelledby="sign-tab-color" hidden={tab !== "color"}>
            <fieldset>
              <legend>Encontre o tom da sua ideia. <span>{colors.length} cores</span></legend>
              <div className={`${styles.colorOptions} ${styles.optionScroll}`}>
                {colors.map((item) => (
                  <label key={item.id} className={styles.option}>
                    <input type="radio" name="sign-color" value={item.id} checked={colorId === item.id} onChange={() => setColorId(item.id)} />
                    <span className={styles.colorChoice}>
                      <span style={{ backgroundColor: item.face }} aria-hidden="true" />
                      <span>{item.label}</span>
                      <Check size={16} className={styles.selectedMark} aria-hidden="true" />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className={styles.colorNote}>São cores de referência. A gente também pode seguir a paleta da sua marca. Nos efeitos de luz, a prévia mostra uma tonalidade iluminada.</p>
          </div>
          <p className={styles.browseHint}>Role a lista para ver todas as opções.</p>
        </div>

        <div className={styles.nextStep}>
          <p className={styles.selection} aria-live="polite" aria-atomic="true">{font.label} <span>·</span> {design.label} <span>·</span> {color.label}</p>
          <WhatsAppLink placement="studio" projectType={[fontId, designId, colorId].join("_")} message={message} className={landing.button}>
            Quero um projeto assim <ArrowUpRight size={19} aria-hidden="true" />
          </WhatsAppLink>
          <p>Sua combinação vai junto na conversa.</p>
        </div>
      </div>
      <noscript><p>Para experimentar os estilos, ative o JavaScript. Você também pode falar com a Belis pelo WhatsApp e contar sua ideia.</p></noscript>
    </section>
  );
}
