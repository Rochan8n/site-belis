/* Persistent route-transition state. Root curtain survives every App Router
   commit; callers wait until it is opaque before navigating. */

export type CurtainPhase = "idle" | "covering" | "covered" | "revealing";

export interface CurtainSnapshot {
  phase: CurtainPhase;
  destination: string;
  label: string;
}

export const CURTAIN_COVER_NAVIGATION_MS = 300;
export const CURTAIN_HOLD_MS = 320;
export const CURTAIN_REDUCED_HOLD_MS = 50;

const labels: Record<string, string> = {
  "/": "Belis Agency · São Paulo",
  "/portfolio": "Audiovisual Studio · São Paulo",
  "/websites": "Web Studio · São Paulo",
  "/sistemas": "Software Studio · São Paulo",
  "/sobre": "Belis Agency · São Paulo",
  "/contato": "Contato · São Paulo",
};

const routePath = (destination: string) => {
  try {
    return new URL(destination, "https://belis.agency").pathname;
  } catch {
    return destination.split(/[?#]/, 1)[0] || "/";
  }
};

const labelFor = (destination: string) =>
  labels[routePath(destination)] ?? "Belis Agency · São Paulo";

let snapshot: CurtainSnapshot = {
  phase: "idle",
  destination: "",
  label: labels["/"],
};
let resolveCover: ((started: boolean) => void) | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());
const update = (next: Partial<CurtainSnapshot>) => {
  snapshot = { ...snapshot, ...next };
  emit();
};

export const curtain = {
  /**
   * Starts one transition and resolves after curtain becomes opaque.
   * `false` means another navigation already owns curtain.
   */
  cover(destination = "/", label?: string): Promise<boolean> {
    if (snapshot.phase !== "idle") return Promise.resolve(false);

    update({
      phase: "covering",
      destination,
      label: label ?? labelFor(destination),
    });

    return new Promise<boolean>((resolve) => {
      resolveCover = resolve;
    });
  },
  /** Called by persistent component after opacity transition completes. */
  covered() {
    if (snapshot.phase !== "covering") return;
    update({ phase: "covered" });
    const resolve = resolveCover;
    resolveCover = null;
    resolve?.(true);
  },
  /** Destination calls this only after first paint + approved brand hold. */
  reveal() {
    if (snapshot.phase !== "covered") return;
    update({ phase: "revealing" });
  },
  /** Called after reveal fade completes. */
  settle() {
    if (snapshot.phase !== "revealing") return;
    update({ phase: "idle", destination: "" });
  },
  getPhase(): CurtainPhase {
    return snapshot.phase;
  },
  getSnapshot(): CurtainSnapshot {
    return snapshot;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
