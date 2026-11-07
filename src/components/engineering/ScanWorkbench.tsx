"use client";

import { useState } from "react";
import { Box, ScanLine, Layers3 } from "lucide-react";
import styles from "./engineering.module.css";

const stages = [
  { label: "Escaneamento", icon: ScanLine, title: "Capturar a forma.", text: "O escaneamento registra a superfície da peça. Medidas de referência ajudam a conferir dimensões e interfaces importantes.", code: "01 / GEOMETRIA CAPTURADA" },
  { label: "Modelo CAD", icon: Box, title: "Reconstruir a função.", text: "A malha vira referência para modelar encaixes, espessuras e fixações. É aqui que a peça pode ser recuperada, adaptada ou redesenhada.", code: "02 / RECONSTRUÇÃO DIGITAL" },
  { label: "Peça", icon: Layers3, title: "Produzir e conferir.", text: "Definimos material e processo, produzimos o protótipo e alinhamos a verificação de montagem. Os testes de uso dependem da aplicação.", code: "03 / FABRICAÇÃO SOB MEDIDA" },
] as const;

export function ScanWorkbench() {
  const [stage, setStage] = useState(1);
  const current = stages[stage];
  return <div className={styles.workbench}>
    <div className={styles.stageControls} role="group" aria-label="Etapas da engenharia reversa">
      {stages.map(({ label, icon: Icon }, index) => <button key={label} type="button" aria-pressed={stage === index} onClick={() => setStage(index)}><Icon size={17} aria-hidden="true" />{label}</button>)}
    </div>
    <div className={styles.cadViewport} data-stage={stage}>
      <div className={styles.viewportMeta}><span>BELIS / ESTUDO DE COMPONENTE</span><span>ISO VIEW</span></div>
      <svg viewBox="0 0 680 390" role="img" aria-label={`Estudo ilustrativo de flange na etapa ${current.label}; sem escala`} className={styles.cadDrawing}>
        <defs>
          <pattern id="engineering-scan-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="currentColor" /></pattern>
          <pattern id="engineering-layer-lines" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 1H5" stroke="currentColor" strokeWidth=".5" /></pattern>
        </defs>
        <g className={styles.cadGuides} fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M62 264 420 58M105 309 539 60M160 343 603 88M46 183 432 359M111 135 515 320M209 86 600 264" />
          <path d="M115 310 555 118M115 298v24M555 106v24M546 300 611 257M535 294l23 13M600 251l23 13" strokeDasharray="3 5" />
        </g>
        <g className={styles.cadSolid} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="m112 225 333-153 128 59v37L239 322l-127-60Z" />
          <path d="m112 225 127 59 334-153M239 284v38" fill="none" />
          <path d="m150 208 277-127 107 49-276 128Z" className={styles.cadTop} />
          {[0, 1, 2, 3].map((index) => <g key={index} transform={`translate(${212 + index * 75} ${211 - index * 34})`}>
            <path d="M-35 0v-55c0-25 70-25 70 0V0c0 25-70 25-70 0Z" />
            <ellipse cy="-55" rx="35" ry="18" className={styles.cadTop} /><ellipse cy="-55" rx="24" ry="11" className={styles.cadHole} />
            <path d="M-35-29c0 24 70 24 70 0M-35-18c0 24 70 24 70 0" fill="none" opacity=".4" />
          </g>)}
          {[[137, 229], [238, 274], [444, 91], [548, 136]].map(([cx, cy]) => <ellipse key={cx} cx={cx} cy={cy} rx="7" ry="3.5" className={styles.cadHole} />)}
        </g>
        <g fill="none" stroke="currentColor" className={styles.cadCallouts}><path d="M212 150 131 95H67M493 129 558 63H620M372 221 463 307h120" /><circle cx="212" cy="150" r="4" /><circle cx="493" cy="129" r="4" /><circle cx="372" cy="221" r="4" /></g>
        <g fill="currentColor" fontFamily="monospace" fontSize="11"><text x="64" y="85">SUPERFÍCIE</text><text x="556" y="53">ENCAIXE</text><text x="468" y="325">FIXAÇÃO</text></g>
      </svg>
      <div className={styles.viewportBottom}><span>{current.code}</span><span>ILUSTRAÇÃO / SEM ESCALA</span></div>
    </div>
    <div className={styles.stageDescription} aria-live="polite" aria-atomic="true"><h3>{current.title}</h3><p>{current.text}</p></div>
  </div>;
}
