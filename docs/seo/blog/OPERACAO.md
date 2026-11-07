# Operação do blog Belis

## Arquivos

- `src/content/blog/posts/`: artigos e checklists em TypeScript.
- `src/content/blog/types.ts`: contrato dos dados editoriais.
- `src/content/blog/index.ts`: catálogo, filtros públicos, validação, metadados estruturados e CTA.
- `src/content/blog/themes.ts`: temas e links para serviços.
- `public/images/blog/2026/`: capas editoriais WebP da expansão para engenharia reversa e comunicação visual.
- `src/app/blog/`: catálogo, temas, artigo, capa, checklist, RSS e política editorial.
- `src/components/blog/`: busca, cards, CTAs, compartilhamento e experiência de leitura.
- `src/lib/analytics-consent.ts`: consentimento, fila GA4 e eventos.
- `src/config/site.ts`: domínio canônico `https://www.belis.agency`, correspondente ao destino público do redirecionamento.
- `scripts/verify-blog.mjs`: verificação HTTP de preview ou produção.

## Publicar ou atualizar um artigo

1. Criar arquivo em `src/content/blog/posts/` usando o tipo `BlogPost`. Importar e registrar no catálogo em `index.ts`.
2. Definir slug estável, intenção principal única, tema, título, descrição, resposta rápida e seções com IDs únicos.
3. Usar `status: "draft"` enquanto o texto não estiver revisado. Rascunhos não entram em artigo, capa, checklist, catálogo, temas, RSS ou sitemap públicos.
4. Conferir fatos, escopo dos serviços, preços autorizados, português e fontes. A contagem de palavras é um piso estrutural, não medida de qualidade.
5. Definir FAQ visível, fontes com nota, dois relacionados publicados e CTA que faça sentido para o serviço. Download deve conter perguntas úteis e nome de arquivo `.txt` seguro.
6. Definir `publishedAt` com a data real de publicação planejada e `updatedAt` com a última revisão substantiva. Não renovar data sem mudança relevante. Datas futuras e cronologia invertida falham no build.
7. Alterar para `published`, validar e seguir o fluxo de revisão/deploy do projeto. Os seis artigos iniciais foram publicados em 28/09/2026. Evidências desse lançamento em `VALIDACAO-PRODUCAO.md`. A expansão preparada em 07/11/2026 acrescenta 12 artigos e dois temas; pesquisa em `EXPANSAO-2026-11-07.md` e validação em `VALIDACAO-EXPANSAO-2026-11-07.md`.

O build rejeita slug duplicado/reservado, tema inválido, intenção principal duplicada, títulos/descrições fora dos limites, datas inválidas, texto abaixo de 700 palavras, ausência de resposta/FAQ/fontes/capa, IDs de seção repetidos, tabelas inconsistentes, links inadequados, checklist inválido e relacionados inexistentes ou em rascunho.

`coverTitle` define as linhas da capa tipográfica de fallback. Artigos com imagem editorial usam `coverImage` em `/images/blog/AAAA/slug.webp`, `coverAlt` descritivo e `coverCaption` obrigatória. Usar WebP 1200 × 630 abaixo de 150 KB. Identificar imagens geradas como conceitos; não apresentá-las como projetos executados. Conferir visualmente a imagem e registrar origem/prompt. Metadados e HTML devem apontar para a mesma capa.

## Validação local

Executar em sequência, mantendo um servidor temporário durante verificações HTTP e de navegador:

```powershell
rtk proxy node node_modules/typescript/bin/tsc --noEmit
rtk proxy node node_modules/eslint/bin/eslint.js src/app/blog src/components/blog src/content/blog src/lib/analytics-consent.ts src/lib/blog-metadata.ts src/components/analytics
rtk proxy node node_modules/vitest/vitest.mjs run src/lib/__tests__/analytics-consent.test.ts --maxWorkers 1 --no-file-parallelism
rtk npm run build
rtk proxy node node_modules/next/dist/bin/next start --port 3000
```

Com servidor ativo, em outro terminal:

```powershell
rtk proxy node scripts/verify-blog.mjs http://localhost:3000
rtk proxy node node_modules/@playwright/test/cli.js test tests/e2e/blog.spec.ts --workers=1 --reporter=line
```

O verificador HTTP aceita a URL do servidor como argumento. O Playwright usa a porta 3000 por padrão em `playwright.config.ts`: usar essa mesma porta para ambos ao executar a suíte, sem abrir servidores duplicados.

Script verifica HTML inicial, 18 artigos e 5 temas (6 por novo nicho e 2 por tema anterior), canonical, H1, schema, autoria, datas, FAQ e breadcrumbs visíveis, fontes, destinos do sumário, ofertas, bytes e dimensões de PNG/WebP, downloads, RSS, sitemap e 404. Adaptar a expectativa de quantidade ao expandir o catálogo. Artefatos de QA ficam em `output/blog-qa/`, ignorados pelo Git. A suíte de navegador cobre busca, navegação entre serviço e tema, leitura, FAQ por teclado, checklist, contato contextual, funcionamento sem JavaScript, acessibilidade automatizada e larguras de 320 a 1440 px.

Conferir no navegador busca com/sem acento, busca vazia, filtros, sumário por clique e teclado, FAQ, copiar link, download, popup, Escape e barra móvel. Usar 390×844 para celular e largura de desktop; testar novamente tabelas e capas se seu conteúdo mudar. Encerrar o servidor temporário ao terminar.

## Analytics e revisão comercial

Produção usa `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TGVB6Y3VTR`, configurado na Vercel antes do build de lançamento. Alterar essa variável exige novo build. Sem ID válido, navegação e conversão continuam disponíveis, sem carregar GA4. Aceite, recusa e alteração da escolha ficam disponíveis pelo controle de cookies.

GA4: propriedade `Belis Agency` (355143204), fluxo `Belis Agency - Site` (4652305593). `blog_cta_click` é evento principal contado uma vez por sessão, sem valor monetário padrão. Dimensões de evento: `post_slug`, `content_theme`, `cta_placement` e `read_progress`. Mudanças de histórico, rolagem, cliques de saída, pesquisa, formulários e downloads automáticos da medição aprimorada estão desativados; os eventos próprios do blog fazem essa medição. Vídeos do YouTube mantêm medição aprimorada.

Search Console: propriedades de prefixo `https://belis.agency/` e `https://www.belis.agency/` verificadas. Usar a propriedade WWW, correspondente ao canonical, para sitemap e artigos. Sitemap enviado: `https://www.belis.agency/sitemap.xml`. Envio e solicitação de indexação não significam processamento ou indexação concluídos.

Consultar `PESQUISA-E-ESTRATEGIA.md` para configuração da propriedade, prevenção de page views duplicados e distinção entre clique, contato e contrato. Não habilitar metas de lead concluído para eventos que apenas abrem WhatsApp.

## Arquitetura editorial

Publicação atual usa arquivos versionados com geração estática. Não requer banco, credencial de CMS ou autenticação administrativa. Se equipe precisar editar sem Git, escolher CMS e modelo de acesso antes de acrescentar painel; manter o mesmo contrato editorial e as mesmas regras de publicação, inclusive exclusão de rascunhos.
