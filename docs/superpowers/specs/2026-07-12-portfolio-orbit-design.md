# Portfolio Orbit HUD — Design

## Goal

Add four important Belis projects to Studio station of new journey landing page. Images orbit blob as clickable spherical HUD, adding portfolio proof without obscuring existing copy or controls.

## Projects and assets

| Project | Asset |
| --- | --- |
| Krrom Construtora | `/images/portfolio/krrom.png` |
| Laticínios Latco | `/images/portfolio/latco.jpg` |
| Salles Nogueira Advogados | `/images/portfolio/salles-nogueira.png` |
| Kofar Metalúrgica | `/images/portfolio/kofar.png` |

All four cards link to `/portfolio`.

## Component design

Create `PortfolioOrbit`, rendered only inside Studio trial station (`station === 2`). Component owns project metadata and emits four semantic links with image, project name, and HUD decoration. Existing blob remains separate and unchanged.

Orbit layer sits around blob and below Studio copy, CTA, notes, statistics, HUD chrome, and navigation. Pointer events remain disabled on orbit container and enabled only on card links.

## Motion and depth

Use CSS transforms and keyframes; add no runtime dependency.

- Four cards begin in a 2×2 spatial arrangement around blob.
- Shared elliptical orbit rotates slowly and continuously.
- Per-card transforms use staggered phases, scale, opacity, and z-index to imply front/back depth.
- Front cards appear larger and more opaque. Rear cards remain readable but visually quieter.
- Hover or keyboard focus pauses orbit and strengthens focused card border.
- Motion uses transform and opacity only.

When `prefers-reduced-motion: reduce` is active, animation stops. Cards remain visible in stable 2×2 layout.

## Responsive behavior

Desktop orbit may extend beyond blob cage while staying inside stage. Mobile orbit stays within blob region below Studio CTA and above statistics. Cards shrink enough to avoid Studio title, description, CTA, note, and bottom HUD.

Mobile cards retain minimum 44px interactive target. Project labels may use compact single-line truncation when space is limited. Existing opaque content surfaces remain above orbit.

## Accessibility

- Each card is a normal Next.js link to `/portfolio`.
- Image `alt` identifies project.
- Link accessible name includes project and portfolio destination.
- Focus-visible state has clear green outline.
- Decorative HUD marks are hidden from assistive technology.
- Reduced-motion preference disables orbit animation.

## Verification

- Production build succeeds.
- TypeScript and CSS compile without new errors.
- Four links render in Studio station and resolve to `/portfolio`.
- Cards do not intercept clicks outside their bounds.
- Mobile widths around 390px keep title, paragraph, CTA, notes, stats, and HUD readable.
- Reduced-motion layout remains stable and clickable.
