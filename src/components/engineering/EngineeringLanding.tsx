import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus, ScanLine, Box, Layers3, MoveUpRight } from "lucide-react";
import { EngineeringContact } from "./EngineeringContact";
import { EngineeringExplorer, ProjectBrief } from "./EngineeringExplorer";
import { ScanWorkbench } from "./ScanWorkbench";
import { engineeringFaqs } from "./engineeringContent";
import styles from "./engineering.module.css";

export function EngineeringLanding() {
  return <div className={styles.page}>
    <a href="#conteudo" className={styles.skipLink}>Pular para o conteúdo</a>
    <header className={styles.header}>
      <Link href="/" aria-label="Belis — página inicial" className={styles.brand}>BELIS<span>®</span></Link>
      <span className={styles.headerDivision}>ENGENHARIA<br />& FABRICAÇÃO 3D</span>
      <nav aria-label="Engenharia reversa"><a href="#aplicacoes">Aplicações</a><a href="#processo">Processo</a><a href="#materiais">Materiais</a></nav>
      <a href="#projeto" className={styles.headerCta}>Vamos criar sua peça <ArrowUpRight size={18} aria-hidden="true" /></a>
    </header>

    <main id="conteudo">
      <section className={styles.hero} aria-labelledby="engineering-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> ENGENHARIA REVERSA & IMPRESSÃO 3D</p>
          <h1 id="engineering-title">A peça<br />que falta.<br /><span>A gente cria.</span></h1>
          <p className={styles.heroDescription}>Do clássico que merece voltar à rua à máquina que precisa continuar. Escaneamento, modelagem e peças sob medida para o seu projeto.</p>
          <a href="#projeto" className={styles.button}>Tirar minha peça do papel <ArrowUpRight size={21} aria-hidden="true" /></a>
          <a href="#aplicacoes" className={styles.heroExplore}>Explore as possibilidades <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.heroImage}>
            <Image src="/images/engenharia-reversa/coletor-conceito.webp" alt="Conceito ilustrativo de coletor de admissão em nylon com fibra de carbono, com tampa em vista explodida" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 62vw" preload />
            <div className={styles.heroCrosshair} aria-hidden="true" />
            <span className={styles.componentLabel}>01 / ADMISSÃO<br /><strong>Geometria sob medida.</strong></span>
            <span className={styles.materialLabel}><span /> NYLON + FIBRA DE CARBONO</span>
          </div>
          <figcaption><span>ESTUDO DE COMPONENTE / VISTA EXPLODIDA</span><span>Conceito gerado por IA</span></figcaption>
        </figure>
        <div className={styles.heroBottom}><span>PROJETO DIGITAL. PEÇA REAL.</span><span>SÃO PAULO <span aria-hidden="true">↗</span> TODO O BRASIL</span><a href="#aplicacoes" aria-label="Ver aplicações"><ArrowDown size={19} aria-hidden="true" /></a></div>
      </section>

      <div className={styles.capabilityStrip} aria-label="Serviços"><span><ScanLine size={20} aria-hidden="true" /> Escaneamento 3D</span><span><Box size={20} aria-hidden="true" /> Modelagem & engenharia reversa</span><span><Layers3 size={20} aria-hidden="true" /> Impressão de peças técnicas</span></div>

      <section className={styles.applications} id="aplicacoes" aria-labelledby="applications-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / APLICAÇÕES</p><h2 id="applications-title">Difícil de encontrar.<br /><span>Possível de criar.</span></h2><p>Peças descontinuadas, importações demoradas, soluções que ainda não existem. O ponto de partida é o que você precisa resolver.</p></div>
        <EngineeringExplorer />
      </section>

      <section className={styles.heritage} aria-labelledby="heritage-title">
        <Image src="/images/engenharia-reversa/classico-oficina.webp" alt="Cena conceitual de um esportivo clássico em oficina, com peças de acabamento e um scanner 3D sobre a bancada" width={1672} height={941} sizes="100vw" loading="lazy" />
        <div className={styles.heritageCopy}><p className={styles.eyebrow}>PRESERVE A HISTÓRIA. REPENSE A PEÇA.</p><h2 id="heritage-title">Seu carro tem história.<br />A próxima peça<br /><span>pode ter futuro.</span></h2><p>Restauração, personalização e performance. Tecnologia atual para manter projetos únicos em movimento.</p><a href="#projeto" className={styles.lightLink}>Começar meu projeto <ArrowUpRight size={21} aria-hidden="true" /></a></div>
        <span className={styles.imageDisclosure}>Cena ilustrativa gerada por IA; não representa um projeto entregue.</span>
      </section>

      <section className={styles.process} id="processo" aria-labelledby="process-title">
        <div className={styles.processCopy}><p className={styles.eyebrow}>02 / DO FÍSICO AO DIGITAL. E DE VOLTA.</p><h2 id="process-title">A forma é só<br /><span>o começo.</span></h2><p>Copiar o contorno não basta. Sua peça precisa encaixar, cumprir uma função e fazer sentido no ambiente em que vai trabalhar.</p><p>Unimos escaneamento 3D, reconstrução CAD e fabricação para transformar uma referência em um projeto sob medida.</p><a href="#projeto" className={styles.textLink}>Já tem uma peça ou arquivo? <ArrowUpRight size={18} aria-hidden="true" /></a><span className={styles.processAside}>Contrate o processo completo ou uma etapa específica.</span></div>
        <ScanWorkbench />
      </section>

      <section className={styles.materials} id="materiais" aria-labelledby="materials-title">
        <div className={styles.materialHeader}><p className={styles.eyebrow}>03 / MATERIAL É DECISÃO DE PROJETO</p><h2 id="materials-title">Feita para a função.<br /><span>Até na composição.</span></h2></div>
        <div className={styles.materialGrid}>
          <div className={styles.materialSpec}><span className={styles.specKicker}>COMPÓSITOS DE ENGENHARIA</span><div className={styles.materialFormula} aria-label="Poliamida com fibra de carbono">PA<span>+</span>CF</div><h3>Nylon com fibra de carbono.</h3><p>Rigidez, baixo peso e possibilidades de geometrias complexas para peças funcionais. A formulação e o processo são escolhidos conforme o projeto.</p><div className={styles.materialTags}><span>FUNCIONAL</span><span>SOB MEDIDA</span><span>POR APLICAÇÃO</span></div></div>
          <div className={styles.materialRows}>
            <article><span>01</span><div><h3>Calor faz parte da especificação.</h3><p>Trabalha perto de 200 ou 250 °C? Precisamos avaliar o polímero específico, a carga e o tempo de exposição. HDT de ficha técnica não é garantia de uso contínuo nessa temperatura.</p></div><MoveUpRight size={20} aria-hidden="true" /></article>
            <article><span>02</span><div><h3>Química também.</h3><p>Óleos, graxas, combustíveis e solventes pedem análise de compatibilidade. Informar o agente, a concentração e a temperatura permite selecionar o material adequado.</p></div><MoveUpRight size={20} aria-hidden="true" /></article>
            <article><span>03</span><div><h3>O ambiente muda a escolha.</h3><p>No interior, no cofre do motor, na carroceria ou na fábrica: vibração, umidade, sol, esforço e acabamento orientam o desenvolvimento.</p></div><MoveUpRight size={20} aria-hidden="true" /></article>
          </div>
        </div>
        <p className={styles.materialFootnote}>Cada aplicação é avaliada individualmente. Não substituímos componentes críticos de segurança por uma peça impressa sem projeto e validação apropriados.</p>
      </section>

      <section className={styles.delivery} aria-labelledby="delivery-title"><div><p className={styles.eyebrow}>04 / UM CAMINHO CLARO</p><h2 id="delivery-title">Da sua necessidade<br />à próxima peça.</h2></div><ol>
        <li><span>01</span><h3>Mostre o desafio.</h3><p>Fotos, medidas, função da peça e condições de uso. Se tiver a original ou um arquivo 3D, melhor.</p></li>
        <li><span>02</span><h3>Definimos o projeto.</h3><p>Avaliamos viabilidade, material e processo. Você recebe escopo, valor e prazo para aprovar.</p></li>
        <li><span>03</span><h3>Desenvolvemos a solução.</h3><p>Escaneamento, modelagem e protótipo conforme o escopo, com conferência de encaixes e ajustes previstos.</p></li>
        <li><span>04</span><h3>Produzimos sob demanda.</h3><p>Uma peça ou um pequeno lote. Alinhamos acabamento, envio e as validações necessárias para o uso.</p></li>
      </ol></section>

      <section className={styles.faq} id="duvidas" aria-labelledby="faq-title"><div><p className={styles.eyebrow}>05 / ANTES DE COMEÇAR</p><h2 id="faq-title">Boas perguntas.<br /><span>Respostas diretas.</span></h2></div><div className={styles.questions}>{engineeringFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className={styles.brief} id="projeto" aria-labelledby="brief-title"><div className={styles.briefCopy}><p className={styles.eyebrow}>SEU PROJETO COMEÇA AQUI</p><h2 id="brief-title">Qual é a peça<br /><span>que falta?</span></h2><p>Você traz o problema. A gente conversa sobre como transformar isso em projeto.</p><div className={styles.briefChecklist}><span>01 / Escolha sua aplicação</span><span>02 / Conte o que precisa</span><span>03 / Envie fotos pelo WhatsApp</span></div><EngineeringContact placement="direct" className={styles.textLink}>Prefiro falar direto com a Belis <ArrowUpRight size={18} aria-hidden="true" /></EngineeringContact></div><ProjectBrief /></section>
    </main>

    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" aria-label="Belis — página inicial" className={styles.brand}>BELIS<span>®</span></Link>
        <p>Engenharia reversa.<br />Novas possibilidades.</p>
        <EngineeringContact placement="footer">Seu próximo projeto <ArrowUpRight size={18} aria-hidden="true" /></EngineeringContact>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} BELIS · SÃO PAULO</span>
        <div>
          <Link href="/">Conheça a Belis</Link>
          <Link href="/blog/temas/engenharia-reversa">Guias de engenharia reversa</Link>
          <Link href="/comunicacao-visual">Comunicação visual</Link>
          <a href="mailto:Lucas@belis.agency">Lucas@belis.agency</a>
        </div>
        <a href="#conteudo">Voltar ao topo ↑</a>
      </div>
    </footer>
  </div>;
}
