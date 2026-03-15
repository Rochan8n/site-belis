import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registration is necessary to use GSAP plugins. We use a check to avoid issues with Next.js SSR.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
