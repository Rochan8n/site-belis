import type { ReactNode } from "react";
import styles from "./blobBeltHUD.module.css";

type BlobBeltHUDProps = {
  children: ReactNode;
  hidden?: boolean;
  station: number;
};

const BELT_LABELS = [
  "CLIQUE PARA AVANÇAR",
  "CLIQUE PARA AVANÇAR",
  "PORTFÓLIO",
  "WEBSITES",
  "SISTEMAS",
  "ENTRE EM CONTATO",
];

export function BlobBeltHUD({
  children,
  hidden = false,
  station,
}: BlobBeltHUDProps) {
  const hiddenClass = hidden ? styles.beltHidden : "";
  const label = BELT_LABELS[station] ?? BELT_LABELS[0];

  return (
    <>
      <span
        className={`${styles.belt} ${styles.beltRear} ${hiddenClass}`}
        aria-hidden="true"
      >
        <svg className={styles.beltSvg} viewBox="0 0 1000 420">
          <path
            className={styles.rearBand}
            d="M112 207 A388 112 0 0 1 888 207 L850 214 A350 70 0 0 0 150 214 Z"
          />
          <path
            className={styles.orbitRearMain}
            d="M112 207 A388 112 0 0 1 888 207"
          />
          <path
            className={styles.orbitRearInner}
            d="M150 214 A350 70 0 0 1 850 214"
          />
          <path
            className={styles.orbitRearWide}
            d="M22 218 A478 154 0 0 1 978 218"
          />
          <path
            className={styles.orbitRearOffset}
            d="M54 226 A446 132 0 0 1 946 226"
          />
          <g className={styles.rearPoints}>
            <circle cx="94" cy="151" r="2.2" />
            <circle className={styles.greenPoint} cx="254" cy="111" r="2.8" />
            <circle cx="733" cy="112" r="1.8" />
            <circle className={styles.greenPoint} cx="913" cy="165" r="2.2" />
          </g>
        </svg>
      </span>

      <span className={styles.blobLayer}>{children}</span>

      <span
        className={`${styles.belt} ${styles.beltFront} ${hiddenClass}`}
        aria-hidden="true"
      >
        <svg className={styles.beltSvg} viewBox="0 0 1000 420">
          <defs>
            <linearGradient id="belt-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4fff0" stopOpacity="0.075" />
              <stop offset="0.32" stopColor="#111613" stopOpacity="0.38" />
              <stop offset="1" stopColor="#060907" stopOpacity="0.68" />
            </linearGradient>
            <linearGradient id="belt-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#e9f1e6" stopOpacity="0" />
              <stop offset="0.18" stopColor="#e9f1e6" stopOpacity="0.24" />
              <stop offset="0.5" stopColor="#f6fff2" stopOpacity="0.54" />
              <stop offset="0.82" stopColor="#e9f1e6" stopOpacity="0.24" />
              <stop offset="1" stopColor="#e9f1e6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="belt-side-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset="0.13" stopColor="white" stopOpacity="0" />
              <stop offset="0.25" stopColor="white" stopOpacity="1" />
              <stop offset="0.75" stopColor="white" stopOpacity="1" />
              <stop offset="0.87" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="belt-side-mask">
              <rect width="1000" height="420" fill="url(#belt-side-fade)" />
            </mask>
          </defs>

          <g mask="url(#belt-side-mask)">
            <path
              className={styles.glassBand}
              d="M112 198 A388 158 0 0 0 888 198 L850 210 A350 46 0 0 1 150 210 Z"
              fill="url(#belt-glass)"
            />
            <path
              className={styles.frontEdgeTop}
              d="M150 210 A350 46 0 0 0 850 210"
              stroke="url(#belt-edge)"
            />
            <path
              className={styles.frontEdgeBottom}
              d="M112 198 A388 158 0 0 0 888 198"
              stroke="url(#belt-edge)"
            />
            <path
              className={styles.microTicks}
              d="M150 210 A350 46 0 0 0 850 210"
            />
            <path
              className={styles.microDots}
              d="M112 198 A388 158 0 0 0 888 198"
            />
          </g>

          <path
            className={styles.orbitFrontWide}
            d="M22 218 A478 154 0 0 0 978 218"
          />
          <path
            className={styles.orbitFrontOffset}
            d="M54 226 A446 132 0 0 0 946 226"
          />
          <g className={styles.frontPoints}>
            <circle className={styles.pointGlow} cx="55" cy="310" r="8" />
            <circle className={styles.greenPoint} cx="55" cy="310" r="3.2" />
            <circle cx="178" cy="356" r="1.8" />
            <circle className={styles.greenPoint} cx="342" cy="389" r="2.5" />
            <circle cx="658" cy="389" r="1.8" />
            <circle className={styles.greenPoint} cx="822" cy="356" r="2.4" />
            <circle className={styles.pointGlow} cx="945" cy="310" r="9" />
            <circle className={styles.greenPoint} cx="945" cy="310" r="3.8" />
          </g>
          <g className={styles.positionMarks}>
            <path d="M83 206h24m-12-7v14" />
            <path d="M893 206h24m-12-7v14" />
            <path d="M494 402h12m-6-8v16" />
          </g>
        </svg>
      </span>

      <span
        className={`${styles.beltContent} ${hiddenClass}`}
        aria-hidden="true"
      >
        <svg className={styles.labelSvg} viewBox="0 0 1000 420">
          <defs>
            <path id="belt-label-path" d="M225 224 A280 92 0 0 0 775 224" />
          </defs>
          <text className={styles.beltLabel} textAnchor="middle">
            <textPath href="#belt-label-path" startOffset="50%">
              {label}
            </textPath>
          </text>
        </svg>
      </span>
    </>
  );
}
