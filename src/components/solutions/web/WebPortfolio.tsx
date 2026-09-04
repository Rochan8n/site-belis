import Image from "next/image";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { WEB_WHATSAPP_HREF } from "../solutionsData";
import { webProjects } from "./webPortfolioData";
import styles from "./webPortfolio.module.css";

export function WebPortfolio() {
  return (
    <section id="portfolio" className={styles.section} aria-labelledby="web-portfolio-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="web-portfolio-title">Portfólio de <span>sites.</span></h2>
          <div className={styles.intro}>
            <p>
              Cada negócio pede uma experiência própria. Explore projetos que
              combinam 3D, vídeo e interação para apresentar melhor, despertar
              interesse e facilitar o próximo passo.
            </p>
            <span className={styles.devices}>
              <Monitor size={18} aria-hidden="true" />
              <Smartphone size={16} aria-hidden="true" />
              Design para desktop e celular
            </span>
          </div>
        </div>

        <ul className={styles.projects} role="list">
          {webProjects.map((project) => (
            <li key={project.id}>
              <article className={styles.project}>
                <a
                  className={styles.projectLink}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-labelledby={`${project.id}-title ${project.id}-action`}
                >
                  <div className={styles.imageFrame}>
                    <Image
                      className={styles.image}
                      src={project.image}
                      alt={project.alt}
                      width={1280}
                      height={project.imageHeight}
                      sizes="(min-width: 1600px) 664px, (min-width: 800px) 43vw, 88vw"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.projectMeta}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.visit} id={`${project.id}-action`}>
                      Visitar site
                      <ArrowUpRight size={20} aria-hidden="true" />
                      <span className={styles.srOnly}> (abre em nova aba)</span>
                    </span>
                  </div>
                  <h3 id={`${project.id}-title`}>{project.name}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <ul className={styles.features} aria-label="Destaques do projeto" role="list">
                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <span className={styles.domain}>{project.domain}</span>
                </a>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <p>Seu próximo site pode estar aqui.</p>
          <a href={WEB_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            Conversar sobre meu site
            <ArrowUpRight size={20} aria-hidden="true" />
            <span className={styles.srOnly}> (WhatsApp, abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
