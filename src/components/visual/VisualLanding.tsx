import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, MapPin, Plus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HeroShowcase } from "./HeroShowcase";
import { SignStudio } from "./SignStudio";
import { WhatsAppLink } from "./WhatsAppLink";
import { FloatingVisualWhatsApp } from "./FloatingVisualWhatsApp";
import { VisualAtmosphere } from "./VisualAtmosphere";
import { visualFaqs, visualProjects } from "./visualContent";
import styles from "./visual.module.css";

export function VisualLanding() {
  return (
    <div className={styles.page}>
      <a href="#conteudo" className={styles.skipLink}>Pular para o conteúdo</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Belis — página inicial">BELIS<span>®</span></Link>
        <nav aria-label="Comunicação visual" className={styles.nav}>
          <a href="#inspiracoes">Inspirações</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <WhatsAppLink placement="header" className={styles.headerCta}>Criar meu projeto <ArrowUpRight size={17} aria-hidden="true" /></WhatsAppLink>
      </header>

      <main id="conteudo">
        <section className={styles.hero} aria-labelledby="hero-title">
          <VisualAtmosphere variant="hero" />
          <div className={styles.heroCopy}>
            <h1 id="hero-title">Sua marca.<br />Em outra<br /><span>dimensão.</span></h1>
            <p className={styles.heroDescription}>Letras caixa, fachadas e logos feitos para a sua marca. Do seu jeito.</p>
            <WhatsAppLink placement="hero" className={styles.button}><FaWhatsapp size={22} aria-hidden="true" /> Criar meu projeto <ArrowUpRight size={19} aria-hidden="true" /></WhatsAppLink>
            <a href="#inspiracoes" className={styles.exploreLink}>Encontre sua inspiração <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <HeroShowcase />
        </section>

        <div className={styles.reassurance}>
          <span><MapPin size={17} aria-hidden="true" /> De São Paulo para todo o Brasil</span>
          <span>Criação, produção e envio</span>
          <span>Seu projeto, sob medida <ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>

        <section className={styles.gallery} id="inspiracoes" aria-labelledby="gallery-title">
          <VisualAtmosphere variant="gallery" />
          <div className={styles.sectionIntro}>
            <h2 id="gallery-title">Letras caixa, fachadas e logos.<br />Com a sua cara.</h2>
            <div><p>Da primeira impressão na rua ao detalhe que recebe seu cliente. A gente transforma a identidade da sua marca em algo que ocupa o mundo.</p><p className={styles.disclosure}>As imagens a seguir são conceitos ilustrativos gerados por IA para inspirar seu projeto, não trabalhos já entregues.</p></div>
          </div>
          <div className={styles.projectGrid}>
            {visualProjects.map((project) => (
              <article key={project.id} className={`${styles.project} ${styles[`project_${project.id}`]}`}>
                <figure>
                  <Image src={`/images/comunicacao-visual/${project.image}.webp`} alt={project.alt} width={1536} height={1024} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 60vw" loading="lazy" />
                </figure>
                <div className={styles.projectDescription}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <WhatsAppLink placement="gallery" projectType={project.id} message={project.message} className={styles.textLink}>Quero algo assim <ArrowUpRight size={19} aria-hidden="true" /></WhatsAppLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SignStudio />

        <section className={styles.process} id="como-funciona" aria-labelledby="process-title">
          <div className={styles.processIntro}>
            <h2 id="process-title">Uma conversa.<br />O começo da sua<br />próxima fachada.</h2>
            <p>Você não precisa chegar com tudo resolvido. Uma foto, um logo ou uma referência já ajudam a tirar a ideia do papel.</p>
            <WhatsAppLink placement="process" className={styles.textLink}>Vamos falar sobre seu projeto <ArrowUpRight size={19} aria-hidden="true" /></WhatsAppLink>
          </div>
          <ol className={styles.steps}>
            <li><span>01</span><div><h3>Conta o que você imaginou.</h3><p>Mande seu logo ou referência, uma foto do espaço e a cidade de entrega. Se tiver uma medida aproximada, melhor ainda.</p></div></li>
            <li><span>02</span><div><h3>A gente desenha o caminho.</h3><p>Conversamos sobre formato, acabamento e luz. Você recebe uma proposta com o que será feito, valor e prazo para decidir com clareza.</p></div></li>
            <li><span>03</span><div><h3>Sua ideia ganha forma.</h3><p>Com o projeto aprovado, seguimos para a produção e combinamos o envio. Os detalhes de instalação são alinhados à parte.</p></div></li>
          </ol>
        </section>

        <section className={styles.personal} aria-labelledby="personal-title">
          <VisualAtmosphere variant="neon" />
          <div className={styles.personalCopy}>
            <h2 id="personal-title">A letra certa muda<br />toda a conversa.</h2>
            <p>Uma fachada delicada pede um traço. Uma marca ousada pede outro. Por isso, a escolha vai além de uma fonte bonita: precisa conversar com o seu negócio.</p>
            <p>Criamos letras e logos personalizados, combinando proporção, volume, cor e acabamento para o seu espaço. Tem uma ideia diferente? É por aí que a gente começa.</p>
            <ul><li><Check size={18} aria-hidden="true" /> Identidade da sua marca como ponto de partida</li><li><Check size={18} aria-hidden="true" /> Formatos e medidas pensados para o local</li><li><Check size={18} aria-hidden="true" /> Opções com volume e efeito de luz</li></ul>
          </div>
        </section>

        <section className={styles.faq} id="duvidas" aria-labelledby="faq-title">
          <div className={styles.faqIntro}><h2 id="faq-title">Antes de começar,<br />vale saber.</h2><p>Ficou alguma dúvida sobre a sua ideia? Fale direto com a gente.</p><WhatsAppLink placement="faq" className={styles.textLink}>Tirar uma dúvida <ArrowUpRight size={19} aria-hidden="true" /></WhatsAppLink></div>
          <div className={styles.questions}>{visualFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <VisualAtmosphere variant="closing" />
          <div><h2 id="closing-title">Vamos dar forma<br />à sua marca?</h2><p>Mande sua ideia. A gente conversa sobre as possibilidades e prepara um orçamento para o seu projeto.</p><WhatsAppLink placement="closing" className={styles.button}><FaWhatsapp size={23} aria-hidden="true" /> Falar com a Belis no WhatsApp <ArrowUpRight size={19} aria-hidden="true" /></WhatsAppLink><span className={styles.closingNote}>São Paulo · Atendimento e envio para todo o Brasil</span></div>
          <div className={styles.closingLetter} aria-hidden="true">B<span>®</span></div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.brand} aria-label="Belis — página inicial">BELIS<span>®</span></Link>
        <p>Comunicação visual feita para a sua marca.</p>
        <div>
          <Link href="/">Conheça a Belis</Link>
          <Link href="/blog/temas/comunicacao-visual">Guias de comunicação visual</Link>
          <a href="mailto:Lucas@belis.agency">Lucas@belis.agency</a>
        </div>
        <small>© {new Date().getFullYear()} Belis Agency · São Paulo</small>
      </footer>
      <FloatingVisualWhatsApp />
    </div>
  );
}
