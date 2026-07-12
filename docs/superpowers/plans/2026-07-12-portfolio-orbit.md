# Portfolio Orbit HUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four clickable project cards orbiting blob in Studio station without harming mobile readability or reduced-motion accessibility.

**Architecture:** New focused `PortfolioOrbit` component renders semantic project links and images. `TrialStation` mounts it only for Studio. CSS module controls HUD presentation, 3D depth, responsive layout, and reduced-motion fallback without new dependencies.

**Tech Stack:** Next.js 16, React 19, `next/image`, CSS Modules, TypeScript

## Global Constraints

- Use existing four project assets under `/images/portfolio/`.
- Every card links to `/portfolio`.
- Add no runtime dependency.
- Studio copy, CTA, note, stats, and global HUD remain above orbit.
- `prefers-reduced-motion: reduce` disables orbit animation.
- Mobile interactive targets remain at least 44px.

---

### Task 1: PortfolioOrbit component

**Files:**
- Create: `src/components/journey/PortfolioOrbit.tsx`
- Modify: `src/components/journey/stations/TrialStation.tsx`

**Interfaces:**
- Produces: `PortfolioOrbit(): JSX.Element`
- Consumes: Next.js `Image` and `Link`; existing `/portfolio` route and project assets

- [x] **Step 1: Create project card component**

Define immutable project metadata for Krrom, Latco, Salles Nogueira, and Kofar. Render four links with image, visible name, accessible label, and decorative HUD corners.

- [x] **Step 2: Integrate only in Studio station**

Import `PortfolioOrbit` in `TrialStation.tsx` and render `{trial.station === 2 && <PortfolioOrbit />}` outside textual `station-block`.

- [x] **Step 3: Verify compilation**

Run: `npm run build`

Expected: optimized production build completes and all static routes generate.

### Task 2: Orbital HUD styles and responsive safety

**Files:**
- Modify: `src/components/journey/journey.module.css`

**Interfaces:**
- Consumes: global class names emitted by `PortfolioOrbit`
- Produces: desktop/mobile orbit, focus state, paused interaction state, reduced-motion fallback

- [x] **Step 1: Add base HUD and orbit styles**

Place orbit at blob center with lower z-index than `.stations`. Style four image cards as 2×2 HUD frames. Animate each card along elliptical paths with staggered delays, scale, opacity, and z-index depth cues.

- [x] **Step 2: Add interaction and accessibility styles**

Enable pointer events only on links. Pause card animations when orbit has hover/focus. Add visible green `:focus-visible` outline. Keep image crop stable with `object-fit: cover`.

- [x] **Step 3: Add mobile layout**

Keep orbit inside blob region, shrink cards, preserve 44px targets, and position below Studio CTA but above stats. Ensure opaque textual surfaces remain above cards.

- [x] **Step 4: Add reduced-motion fallback**

Disable animation and arrange cards in stable 2×2 positions around blob.

### Task 3: Verification and commit

**Files:**
- Verify: `src/components/journey/PortfolioOrbit.tsx`
- Verify: `src/components/journey/stations/TrialStation.tsx`
- Verify: `src/components/journey/journey.module.css`

**Interfaces:**
- Consumes: completed feature and prior opaque-background CSS changes
- Produces: clean production build and single implementation commit

- [x] **Step 1: Run production validation**

Run: `npm run build`

Expected: exit code 0.

- [x] **Step 2: Run repository checks**

Run: `git diff --check`

Expected: exit code 0.

Run: `npm run lint`

Expected: no new errors in changed files; report unrelated baseline failures separately.

- [x] **Step 3: Inspect final diff**

Confirm only plan, new component, Studio integration, orbital CSS, and earlier opaque-background CSS are included.

- [x] **Step 4: Commit implementation**

```bash
git add docs/superpowers/plans/2026-07-12-portfolio-orbit.md src/components/journey/PortfolioOrbit.tsx src/components/journey/stations/TrialStation.tsx src/components/journey/journey.module.css
git commit -m "feat: add orbital portfolio HUD"
```
