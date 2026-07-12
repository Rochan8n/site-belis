import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type BelisBlobColor = string | [number, number, number];

export interface BelisBlobLook {
  amp?: number;
  freq?: number;
  spin?: number;
  solid?: number;
  wire?: number;
  points?: number;
  colA?: BelisBlobColor;
  colB?: BelisBlobColor;
  base?: BelisBlobColor;
  fadeCol?: BelisBlobColor;
}

export interface BelisBlobV2Element extends HTMLElement {
  setLook(look: BelisBlobLook): void;
  setBulge(screenX: number, screenY: number, amount: number): void;
  enter(onMid?: () => void, onDone?: () => void): void;
  reset(): void;
  getRotationDeg(): number;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "belis-blob-v2": DetailedHTMLProps<
        HTMLAttributes<BelisBlobV2Element>,
        BelisBlobV2Element
      >;
    }
  }
}
