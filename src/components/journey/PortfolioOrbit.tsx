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

export function PortfolioOrbit({ active }: PortfolioOrbitProps) {
  return (
    <div
      className={`portfolio-sphere ${active ? "portfolio-sphere-active" : ""}`}
      aria-label="Projetos em destaque"
      aria-hidden={!active}
    >
      <span className="portfolio-sphere-axis" aria-hidden="true" />
      <div className="portfolio-sphere-scene">
        {orbitProjects.map((project, index) => (
          <Link
            className="portfolio-sphere-panel"
            href="/portfolio"
            key={project.name}
            style={{ "--panel-index": index } as CSSProperties}
            aria-label={`${project.name} — conhecer portfólio`}
            tabIndex={active ? 0 : -1}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 800px) 42vw, 270px"
            />
            <span>{project.name}</span>
            <i aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
