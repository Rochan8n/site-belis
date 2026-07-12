"use client";

import { useEffect, useState, type RefObject } from "react";
import type { BelisBlobColor, BelisBlobLook } from "@/types/custom-elements";
import type { BelisBlobHandle } from "./BelisBlob";
import { acts, backgrounds, inks, looks, STATION_COUNT } from "./journeyData";

export interface JourneyHud { progress: number; active: number; act: string; rotation: number; time: string; date: string }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mixColor = (a: string, b: string, t: number) => {
  const x = rgb(a), y = rgb(b);
  return `rgb(${x.map((v, i) => Math.round(lerp(v, y[i], t))).join(",")})`;
};
const mixArray = (a: BelisBlobColor, b: BelisBlobColor, t: number) => {
  const x = rgb(String(a)), y = rgb(String(b));
  return x.map((v, i) => lerp(v, y[i], t) / 255) as [number, number, number];
};
const interpolateLook = (a: BelisBlobLook, b: BelisBlobLook, t: number): BelisBlobLook => ({
  amp: lerp(a.amp ?? 0, b.amp ?? 0, t), freq: lerp(a.freq ?? 0, b.freq ?? 0, t),
  spin: lerp(a.spin ?? 0, b.spin ?? 0, t), solid: lerp(a.solid ?? 0, b.solid ?? 0, t),
  wire: lerp(a.wire ?? 0, b.wire ?? 0, t), points: lerp(a.points ?? 0, b.points ?? 0, t),
  colA: mixArray(a.colA!, b.colA!, t), colB: mixArray(a.colB!, b.colB!, t),
  base: mixArray(a.base!, b.base!, t), fadeCol: mixArray(a.fadeCol!, b.fadeCol!, t),
});

export function useJourneyDirector(blobRef: RefObject<BelisBlobHandle | null>, locked: boolean) {
  const [hud, setHud] = useState<JourneyHud>({ progress: 0, active: 0, act: acts[0], rotation: 0, time: "--:--:--", date: "—" });

  useEffect(() => {
    const clock = () => {
      const now = new Date();
      setHud((value) => ({ ...value, time: now.toLocaleTimeString("pt-BR", { hour12: false }), date: now.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).toUpperCase() }));
    };
    clock();
    const interval = window.setInterval(clock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let raf = 0, displayed = clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, STATION_COUNT - 1), frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const step = () => {
      const target = clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, STATION_COUNT - 1);
      displayed = reduced.matches ? target : lerp(displayed, target, 0.14);
      const p = Math.abs(target - displayed) < 0.001 ? target : displayed;
      const i = Math.min(Math.floor(p), STATION_COUNT - 2), fraction = p - i;
      const smooth = fraction * fraction * (3 - 2 * fraction);
      const bg = mixColor(backgrounds[i], backgrounds[i + 1], smooth);
      const ink = mixColor(inks[i], inks[i + 1], smooth);
      document.documentElement.style.setProperty("--journey-bg", bg);
      document.documentElement.style.setProperty("--journey-ink", ink);
      if (!locked) blobRef.current?.setLook(interpolateLook(looks[i], looks[i + 1], smooth));
      for (let station = 0; station < STATION_COUNT; station++) {
        const el = document.getElementById(`journey-station-${station}`);
        if (!el) continue;
        const visibility = Math.max(0, 1 - Math.abs(p - station) * 1.7);
        el.style.opacity = String(visibility * visibility);
        el.style.transform = `translateY(${(station - p) * 56}px)`;
        el.style.visibility = visibility > 0.03 ? "visible" : "hidden";
      }
      if (frame++ % 6 === 0) {
        const active = Math.round(p);
        setHud((value) => ({ ...value, progress: p / (STATION_COUNT - 1), active, act: acts[active], rotation: Math.round(blobRef.current?.getRotationDeg() ?? 0) }));
      }
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--journey-bg");
      document.documentElement.style.removeProperty("--journey-ink");
    };
  }, [blobRef, locked]);

  return hud;
}
