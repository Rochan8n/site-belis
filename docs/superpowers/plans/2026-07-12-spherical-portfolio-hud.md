# Spherical Portfolio HUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Studio portfolio orbit into materializing, nearly closed 3D image sphere with visible blob gaps and clickable project panels.

**Architecture:** `BelisJourney` passes active station into `TrialStation`; Studio forwards boolean to `PortfolioOrbit`. Component exposes active class and four quadrant links. CSS owns shell geometry, enter/exit transitions, rotation, responsive sizing, and reduced-motion fallback.

**Tech Stack:** Next.js 16, React 19, TypeScript, Next Image, CSS Modules

## Global Constraints

- Keep four existing assets and `/portfolio` destination.
- Add no dependency.
- Sphere stays above blob and below all content.
- Blob remains visible through shell gaps.
- Active Studio state controls materialization and exit.
- Reduced motion disables entrance and rotation.

---

### Task 1: Active-state interface

**Files:**
- Modify: `src/components/journey/BelisJourney.tsx`
- Modify: `src/components/journey/stations/TrialStation.tsx`
- Modify: `src/components/journey/PortfolioOrbit.tsx`

**Interfaces:**
- `TrialStationProps.active: boolean`
- `PortfolioOrbitProps.active: boolean`

- [x] Pass `active={hud.active === trial.station}` from trial mapping.
- [x] Add required `active` prop to `TrialStation` and forward it only to Studio `PortfolioOrbit`.
- [x] Apply `portfolio-sphere-active` class and `aria-hidden={!active}` to shell container.
- [x] Run `npx eslint` on three changed TypeScript files; expect exit code 0.

### Task 2: Spherical shell CSS

**Files:**
- Modify: `src/components/journey/journey.module.css`

**Interfaces:**
- Consumes: `.portfolio-sphere`, `.portfolio-sphere-active`, `.portfolio-sphere-scene`, `.portfolio-sphere-panel`

- [x] Replace elliptical ring/card rules and orbit keyframes with centered perspective shell.
- [x] Place four panels into top-left, top-right, bottom-left, bottom-right quadrants using clipping, asymmetric radii, and 3D transforms.
- [x] Preserve cross-shaped gap showing blob. Keep content z-index above shell.
- [x] Add collapsed default state and staggered active materialization transitions.
- [x] Rotate scene 360 degrees over 28 seconds after entrance. Pause on hover/focus.
- [x] Add mobile size/position preserving CTA and stats.
- [x] Replace old reduced-motion orbit placement with stable 2×2 sphere silhouette.

### Task 3: Verification and commit

**Files:**
- Verify all files above and this plan.

- [x] Run `npm run build`; expect exit code 0.
- [x] Run focused ESLint; expect exit code 0.
- [x] Run `git diff --check`; expect exit code 0.
- [x] Confirm four assets, four links, active class, 28-second animation, mobile rules, and reduced-motion rules by code search.
- [x] Mark plan complete and commit with `feat: materialize portfolio sphere HUD`.
