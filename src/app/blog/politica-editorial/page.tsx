import Link from "next/link";
import { blogMetadata } from "@/lib/blog-metadata";
import styles from "@/components/blog/blog.module.css";

export const metadata = blogMetadata("Política editorial do blog Belis Agency", "Conheça os critérios de autoria, fontes, atualização e exemplos do blog Belis. Guias para ajudar empresas a planejar projetos com informações claras.", "/blog/politica-editorial");

export default function EditorialPolicyPage() {
  return <main id="blog-main" className={styles.container}>
    <header className={styles.hero}><div className={styles.eyebrow}><span>Caderno Belis / Critérios editoriais</span><span>28 de setembro de 2026</span></div><h1>Política editorial.</h1><p>Informação útil para planejar um projeto e entender as opções antes de contratar.</p></header>
    <div className={styles.policy}>
      <h2>Quem publica</h2><p>A Belis Agency é responsável pelos guias deste blog. A autoria institucional é indicada em cada artigo. Quando houver contribuição de uma pessoa identificada, seu papel deverá ser apresentado com informações verificáveis. <Link href="/sobre">Conheça a Belis.</Link></p>
      <h2>Como escolhemos os temas</h2><p>Os conteúdos tratam de dúvidas relacionadas a audiovisual, sites, software e automação para empresas. Priorizamos decisões de contratação, planejamento, comparação de propostas e uso dos materiais. Um artigo deve resolver uma necessidade específica, com exemplos e próximos passos úteis.</p>
      <h2>Fontes, exemplos e ferramentas</h2><p>Referências técnicas são apresentadas com links e contexto. Orientações de escopo e contratação são conteúdo editorial, não uma tabela universal de preços. Cenários ilustrativos são identificados; não representam trabalhos de clientes nem resultados medidos. Pesquisa e preparação de conteúdo podem usar ferramentas de automação e inteligência artificial. Isso não torna uma informação verificada por si só.</p>
      <h2>Preços e resultados</h2><p>Um orçamento depende do escopo e das condições do projeto. Não apresentamos estimativas editoriais como proposta comercial. Estatísticas, depoimentos e resultados precisam de fonte ou evidência correspondente. Leitura, clique, contato e venda são etapas diferentes e não devem ser tratadas como equivalentes.</p>
      <h2>Atualizações e correções</h2><p>Cada artigo mostra sua data de publicação e, quando houver alteração relevante, a data de atualização. Mudanças devem corrigir ou melhorar o conteúdo. Revisamos informações técnicas quando identificamos mudanças nas referências. Se encontrar um erro, envie o link e o trecho para <a href="mailto:Lucas@belis.agency">Lucas@belis.agency</a>.</p>
      <h2>Conteúdo e serviços</h2><p>Os artigos podem apontar para serviços e projetos da Belis quando relacionados ao assunto. Esses links ajudam quem deseja passar do planejamento à contratação. Uma sugestão de contato não substitui avaliação de escopo, proposta e condições do projeto.</p>
      <p><Link href="/blog">Voltar aos guias do blog ↗</Link></p>
    </div>
  </main>;
}
