# Lançamento e validação em produção

Data: 28 de setembro de 2026. Site: https://www.belis.agency/blog.

## Publicação

- Commit do blog: `f1465623c9a4432aaa614c22ea3200f704bd38e7`.
- Branch: `master`. Push confirmado com igualdade entre HEAD e `origin/master` remoto.
- Vercel: projeto `site-belis`, deployment `dpl_An9Y9DJKYRNdXR9SyG7yT3qcU4XG`, estado `READY`, ambiente `production`, SHA correspondente ao commit do blog.
- Aliases de produção: `www.belis.agency` e `belis.agency`; domínio sem WWW redireciona para WWW.
- Variável pública GA4 configurada no ambiente de produção antes do build: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TGVB6Y3VTR`.

## Verificações externas

| Verificação | Evidência |
| --- | --- |
| HTTP de produção | 30 requisições passaram em 28/09/2026 às 17:10 UTC; relatório `output/blog-qa/http-producao.json` |
| Conteúdo publicado | 6 artigos, 3 temas com 2 artigos cada, metadados, schema, FAQ, autoria, fontes, capas e checklists |
| Assets | PNG 1200×630, checklist com UTF-8 BOM, XML de RSS e sitemap, rotas inexistentes com 404 |
| Catálogo | Busca com normalização de acentos, estado vazio, limpeza da busca e filtro por tema conferidos na versão pública |
| Artigo | Índice, âncoras, navegação por teclado e FAQ expandida conferidos |
| Compartilhamento | URL canônica do artigo copiada e lida do clipboard do navegador do Codex |
| Download real | Checklist baixado pela interface do Chrome; conteúdo salvo conferido, com acentos e URL de origem corretos |
| Contato | Popup abriu por tempo/leitura e CTA abriu WhatsApp com o número da Belis e contexto do artigo; nenhuma mensagem enviada |
| Mobile | 390×844: leitura, barra de contato, popup com fechamento e tabela com rolagem própria; região da tabela com foco por teclado |
| Consentimento | Sem escolha ou com recusa, script GA4 não carregou. Aceite carregou a tag correta. Alteração disponível pelo controle de cookies |
| Console | Sem erro ou aviso da aplicação nos estados inspecionados |

## GA4

- Conta `Belis Productions` (258241609), propriedade `Belis Agency` (355143204).
- Fuso existente conferido: São Paulo (GMT-03:00). Moeda existente: real brasileiro. Objetivos: engajamento/retenção e geração de leads.
- Fluxo web 4652305593, renomeado para `Belis Agency - Site`, URL `https://www.belis.agency`, ID `G-TGVB6Y3VTR`.
- Dimensões personalizadas de evento: Artigo do blog (`post_slug`), Tema do conteúdo (`content_theme`), Posição do CTA (`cta_placement`) e Percentual de leitura (`read_progress`).
- `blog_cta_click` configurado como evento principal, uma vez por sessão, sem valor monetário padrão.
- Realtime recebeu `page_view` e todos os sete eventos próprios durante QA real da versão pública: `blog_cta_click`, `blog_cta_impression`, `blog_read_progress`, `blog_popup_impression`, `blog_popup_dismiss`, `blog_share` e `blog_download`. A última conferência incluiu duas ocorrências de download; houve latência entre a ação e a exibição no relatório.
- Parâmetros `cta_placement=popup` e `post_slug=quanto-custa-landing-page` conferidos em eventos recebidos. Realtime também exibiu `blog_cta_click` no cartão de eventos principais.
- Contagens observadas são tráfego de QA e não aquisição orgânica ou clientes.
- Eventos automáticos de histórico, rolagem, saída, pesquisa, formulários e download desativados para evitar duplicação e coleta inadequada de URLs. Medição de vídeos YouTube permanece ativa.

## Search Console

- Propriedades `https://belis.agency/` e `https://www.belis.agency/` verificadas como proprietário com metatag no HTML público.
- Sitemap `https://www.belis.agency/sitemap.xml` enviado à propriedade WWW às 17:13 UTC.
- Estado consultado às 17:33 UTC: API `pending`, sem último download, zero erros e avisos. A interface exibiu “Não foi possível buscar o sitemap”. Isso ainda não comprova processamento bem-sucedido.
- XML responde HTTP 200, contém 17 URLs canônicas e é referenciado por robots.txt. O teste HTTP com User-Agent Googlebot não substitui rastreamento real do Google.
- Teste em tempo real do Search Console, às 14:37 BRT (17:37 UTC): URL disponível para Google, rastreamento permitido, busca de página “Com êxito.” e indexação permitida. O próprio Google conseguiu buscar o XML. Após essa prova, sitemap reenviado uma vez às 17:37 UTC, aceito como `Pending processing`.
- Solicitações de indexação aceitas pelo Google para catálogo e todos os seis artigos abaixo, com prova individual salva durante a execução. Aceite coloca a URL na fila; não significa que já está indexada.

| URL após `https://www.belis.agency` | Solicitação |
| --- | --- |
| `/blog` | Aceita |
| `/blog/quanto-custa-video-institucional` | Aceita |
| `/blog/cobertura-audiovisual-eventos-corporativos` | Aceita |
| `/blog/site-institucional-ou-landing-page` | Aceita |
| `/blog/quanto-custa-landing-page` | Aceita |
| `/blog/software-sob-medida-ou-pronto` | Aceita |
| `/blog/automatizar-processos-empresa` | Aceita |

Vínculo da propriedade WWW com GA4 foi preparado, mas depende de confirmação específica para disponibilizar os dados do Search Console aos usuários da propriedade Analytics.

As integrações adicionais GSC–GA4 e OAuth do OpenSEO não foram aplicadas enquanto suas confirmações específicas estavam pendentes. Isso não impede a coleta GA4, o acesso pelo MCP nativo do Search Console ou a publicação do blog.

## OpenSEO

- Pesquisa, concorrentes e critérios editoriais registrados em `PESQUISA-E-ESTRATEGIA.md` e `evidencias-openseo-2026-09-28.json`.
- Seis palavras-chave principais salvas no projeto Belis, sem repetir pesquisa paga.
- Conexão GSC do OpenSEO estava expirada. Reconexão depende da confirmação específica do aviso OAuth de app não verificado. O MCP nativo do GSC funciona e foi usado para verificar propriedades, enviar sitemap e inspecionar URLs.

## Evidências locais

Arquivos em `output/blog-qa/` são ignorados pelo Git:

- `http-producao.json`.
- `blog-producao-desktop.png`, `artigo-producao-mobile.png`, `artigo-producao-mobile-barra.png`, `tabela-producao-mobile.png`.
- `popup-producao.png`, `popup-producao-mobile.png`.
- `ga4-fluxo-configurado.png`, `ga4-dimensoes.png`, `ga4-propriedade-configurada.png`, `ga4-eventos-recebidos.png`, `ga4-cta-popup-recebido.png`, `ga4-artigo-recebido.png`.
- `gsc-propriedade-verificada.png`, `gsc-www-verificada.png`, `gsc-sitemap-teste-real.png`, `gsc-sitemap-processamento.png` e `gsc-indexacao-*.png`.

## Limites e operação posterior

- Google controla descoberta, rastreamento e indexação. Solicitação aceita não garante prazo ou presença nos resultados.
- Aumento de clientes exige acompanhamento de contatos qualificados e contratos. Clique, download e leitura não comprovam venda.
- Revisão visual ocorreu em Chromium desktop e viewport mobile; sem certificação em aparelhos físicos, Safari/Firefox ou auditoria WCAG completa.
- Publicação usa arquivos versionados e deploy. Não há painel administrativo de CMS nesta versão.

Referências oficiais: [verificação de propriedade](https://support.google.com/webmasters/answer/9008080), [diagnóstico de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=en), [medição aprimorada do GA4](https://support.google.com/analytics/answer/9216061?hl=en).
