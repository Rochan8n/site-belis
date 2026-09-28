# Validação do blog Belis

Data: 28 de setembro de 2026. Ambiente: checkout local `G:\site-belis`, build de produção Next.js 16.2.10. Nenhum commit, push ou deploy executado.

## Resultado

| Verificação | Resultado e alcance |
| --- | --- |
| TypeScript | `tsc --noEmit` passou; build final também concluiu a checagem de tipos |
| ESLint | Todos os arquivos de código alterados e novos passaram; rotas revisadas novamente após ajuste do fallback |
| Build | 34 páginas geradas, com um worker; sem erro de compilação ou de validação editorial |
| Testes de Analytics | 7 testes passaram: consentimento inicial, fila de comandos gtag, impressão durante carregamento, recusa/cookies, novo aceite, armazenamento bloqueado, remoção da escolha e ID inválido |
| HTTP | 30 requisições passaram no build final; relatório em `output/blog-qa/http-report.json` |
| SEO dos artigos | HTML inicial, canonical, OG, Twitter, H1 único, autoria, datas, fontes, FAQ/breadcrumbs visíveis iguais ao schema, imagem real e links conferidos |
| Conteúdo | 6 guias com 1.076–1.160 palavras, 4 perguntas frequentes e checklist preenchível em cada um |
| Assets | 6 PNGs reais 1200×630 e 6 downloads com UTF-8 BOM, cabeçalhos e URL de origem corretos |
| Catálogo e temas | 6 artigos presentes sem JavaScript; 3 temas com 2 artigos cada |
| RSS e sitemap | XML parseável; artigos e temas corretos; capas/checklists fora do sitemap |
| URLs inexistentes | Artigo, tema, capa e checklist retornam HTTP 404; erro interno de fallback eliminado com guardas explícitas de publicação/tema |
| Navegador desktop | 1280×720, busca sem acento, estado vazio, filtro por tema, copiar link, sumário por teclado, FAQ expandida, popup e Escape conferidos |
| Navegador celular | 390×844, entrada do blog pela home, tema e busca, sumário por clique, tabela com rolagem horizontal por teclado e barra de contato com fechamento conferidos |
| Ordem de leitura | Sumário precede corpo no DOM e no layout móvel; desktop mantém coluna lateral |
| Popup | Abriu com 55 segundos visíveis e leitura acima de 40%; fechou com Escape; não reapareceu após recarregar e repetir tempo/leitura nesta sessão |
| Console | Nenhum erro ou aviso da aplicação nos momentos inspecionados |
| Limpeza | Viewport restaurado, aba criada pela tarefa fechada e servidor temporário encerrado |

## Evidências visuais

Capturas locais em `output/blog-qa/`:

- `blog-desktop.png`: entrada do blog.
- `catalogo-desktop.png`: catálogo e busca.
- `blog-mobile.png`: entrada em celular.
- `artigo-desktop.png`: cabeçalho de artigo.
- `artigo-mobile.png`: artigo em celular.
- `artigo-mobile-barra.png`: leitura com barra de contato.
- `popup-desktop.png`: oferta aberta com foco no controle para continuar lendo.
- `tabela-mobile.png`: tabela com rolagem própria e foco visível.

Downloads reais também foram acionados pela interface do navegador. Links de WhatsApp foram verificados; nenhuma mensagem foi enviada.

## Limites

- O checkout está pronto para revisão e publicação. Não houve validação de deploy nem solicitação de indexação.
- Search Console não está conectado ao projeto OpenSEO Belis; ranking, tráfego e contatos orgânicos atuais não foram medidos.
- Ambiente local sem ID GA4 válido. Testes da fila e do consentimento não comprovam recebimento em uma propriedade real. DebugView/Realtime e ajustes da medição aprimorada permanecem etapas de lançamento.
- Desktop e celular foram revisados no navegador Chromium do Codex. Não houve certificação em Safari, Firefox ou aparelho físico, nem auditoria WCAG completa.
- Não foi medido impacto comercial. Clique, download e leitura não comprovam lead qualificado ou contrato.
- Publicação editorial usa arquivos e deploy; painel administrativo não faz parte desta versão.

## Comandos

```powershell
rtk proxy node node_modules/typescript/bin/tsc --noEmit
rtk proxy node node_modules/eslint/bin/eslint.js # seguido dos arquivos alterados
rtk proxy node node_modules/vitest/vitest.mjs run src/lib/__tests__/analytics-consent.test.ts --maxWorkers 1 --no-file-parallelism
rtk npm run build
rtk proxy node node_modules/next/dist/bin/next start --port 3107
rtk proxy node scripts/verify-blog.mjs
rtk git diff --check
```

Build e verificações executados em sequência. Durante validação HTTP e visual, permaneceu apenas um servidor de preview, encerrado ao concluir.
