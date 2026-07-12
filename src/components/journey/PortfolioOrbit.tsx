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

export function PortfolioOrbit() {
  return (
    <div className="portfolio-orbit" aria-label="Projetos em destaque">
      <span className="portfolio-orbit-ring" aria-hidden="true" />
      {orbitProjects.map((project, index) => (
        <Link
          className="portfolio-orbit-card"
          href="/portfolio"
          key={project.name}
          style={{ "--orbit-index": index } as CSSProperties}
          aria-label={`${project.name} — conhecer portfólio`}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 800px) 84px, 132px"
          />
          <span>{project.name}</span>
          <i aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
