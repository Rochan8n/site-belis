"use client";

import { createContext, useContext } from "react";
import Lenis from "lenis";

// Define the context type. It holds the Lenis instance.
export const LenisContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
  const lenis = useContext(LenisContext);

  // Expose stop/play utility methods to lock scroll when opening modals, etc.
  const stop = () => lenis?.stop();
  const play = () => lenis?.start();

  return { lenis, stop, play };
}
