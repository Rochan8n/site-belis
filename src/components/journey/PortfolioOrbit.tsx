import Image from "next/image";
import type { CSSProperties } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";

const orbitProjects = [
  { image: "/images/portfolio/krrom.png" },
  { image: "/images/portfolio/latco.jpg" },
  { image: "/images/portfolio/salles-nogueira.png" },
  { image: "/images/portfolio/kofar.png" },
] as const;

interface PortfolioOrbitProps {
  active: boolean;
}

const getPanelStyle = (index: number) =>
  ({
    "--panel-index": index,
    "--panel-latitude": `${index % 2 === 0 ? -18 : 18}deg`,
  }) as CSSProperties;

export function PortfolioOrbit({ active }: PortfolioOrbitProps) {
  return (
    <div
      className={`portfolio-sphere ${active ? "portfolio-sphere-active" : ""}`}
      aria-label="Projetos em destaque"
      aria-hidden={!active}
    >
      <span className="portfolio-sphere-axis" aria-hidden="true" />
      {orbitProjects.map((project, index) => (
        <TransitionLink
          className="portfolio-sphere-orbiter"
          href="/portfolio"
          key={project.image}
          style={getPanelStyle(index)}
          aria-label={`Projeto ${index + 1} — conhecer portfólio`}
          tabIndex={active ? 0 : -1}
        >
          <span className="portfolio-sphere-panel">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 800px) 46vw, 320px"
            />
            <i aria-hidden="true" />
          </span>
        </TransitionLink>
      ))}
    </div>
  );
}
