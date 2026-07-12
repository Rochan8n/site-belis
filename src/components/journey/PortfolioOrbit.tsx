import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const orbitProjects = [
  {
    name: "Krrom Construtora",
    image: "/images/portfolio/krrom.png",
  },
  {
    name: "Laticínios Latco",
    image: "/images/portfolio/latco.jpg",
  },
  {
    name: "Salles Nogueira",
    image: "/images/portfolio/salles-nogueira.png",
  },
  {
    name: "Kofar Metalúrgica",
    image: "/images/portfolio/kofar.png",
  },
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
        <Link
          className="portfolio-sphere-orbiter"
          href="/portfolio"
          key={project.name}
          style={getPanelStyle(index)}
          aria-label={`${project.name} — conhecer portfólio`}
          tabIndex={active ? 0 : -1}
        >
          <span className="portfolio-sphere-panel">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 800px) 46vw, 320px"
            />
            <span>{project.name}</span>
            <i aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
