# Spherical Portfolio HUD — Design

## Goal

Replace current card orbit in Studio station with nearly closed 3D sphere made from four project-image panels. Sphere surrounds and partially covers blob while gaps preserve visible blob core.

## Projects

| Project | Asset |
| --- | --- |
| Krrom Construtora | `/images/portfolio/krrom.png` |
| Laticínios Latco | `/images/portfolio/latco.jpg` |
| Salles Nogueira Advogados | `/images/portfolio/salles-nogueira.png` |
| Kofar Metalúrgica | `/images/portfolio/kofar.png` |

Every panel links to `/portfolio`.

## Geometry

Four panels form sphere quadrants. Each panel uses perspective, asymmetric border radius, clipping, and 3D transforms to imply curved shell. Narrow horizontal and vertical gaps expose animated blob beneath. Shell remains visually centered on blob and never becomes fully opaque across its entire surface.

Sphere uses one rotating 3D scene. Panel positions remain locked to quadrants while scene rotates slowly around Y axis with subtle X-axis tilt. Depth uses backface visibility, brightness, scale, and shadow rather than duplicated images.

## Materialization lifecycle

`BelisJourney` passes active station state into Studio `TrialStation`, then `PortfolioOrbit` receives `active`.

When Studio becomes active:

1. Panels begin inside blob at reduced scale, blurred and transparent.
2. Panels expand outward with short stagger into four shell quadrants.
3. Blur resolves and opacity rises.
4. Continuous 360-degree rotation starts after entrance settles.

When Studio becomes inactive, active class is removed. Panels contract toward blob core and fade, preventing shell from bleeding into adjacent stations.

## Layering and interaction

Sphere sits above blob but below Studio title, description, CTA, note, statistics, and global HUD. Only panel surfaces accept pointer events. Clicking any panel opens `/portfolio`. Hover or keyboard focus pauses continuous rotation and shows green focus treatment.

## Responsive behavior

Desktop shell approximately follows blob cage size. Mobile shell stays centered in lower blob region, below CTA and above statistics. Panel labels use compact opaque strips. Minimum card hit target remains 44px.

## Accessibility and motion

- Semantic links with project-specific accessible names.
- Project images use descriptive alt text.
- Decorative shell marks remain hidden from assistive technology.
- `prefers-reduced-motion: reduce` disables materialization and rotation; four panels render immediately in stable 2×2 sphere silhouette.

## Verification

- Production build succeeds.
- Changed TypeScript files pass ESLint.
- Studio active state controls entrance and exit classes.
- Four images and four `/portfolio` links render.
- Sphere leaves visible gaps for blob core.
- Mobile content remains readable and clickable.
- Reduced-motion layout remains stable.
