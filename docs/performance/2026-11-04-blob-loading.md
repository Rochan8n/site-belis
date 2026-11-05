# Blob da landing: carregamento e otimização

## Estado

Na conclusão dos testes, alterações locais, sem publicação. Blob disponível no HTML inicial; animação inicia automaticamente. **Meta de 100 mobile ainda não atingida.** Última série do Lighthouse padrão: **99 / 99 / 99 mobile e 100 desktop**, usando HTTP/2 local. Não são resultados do PageSpeed Insights publicado nem dados de campo.

Versionamento autorizado em 05/11/2026 na branch `codex/optimize-landing-blob`. O `vercel.json` desativa deploys automáticos apenas dessa branch, preservando a restrição de não publicar. As demais branches mantêm seu comportamento.

## Causa e solução

Base original: `981864d`. A home montava o blob somente após interação ou 4 segundos depois de `window.load`. Na produção observada, `load` ocorreu em 209,5 ms e o script começou em 4.239,3 ms. O código antigo explicitava a intenção de manter a inicialização fora da janela da auditoria.

- Prévia do próprio renderer no HTML: AVIF transparente de 730 × 730, **11.560 bytes**, eager, prioridade alta, dimensões reservadas. O WebP de 15.704 bytes permanece como fonte da conversão.
- Renderer solicitado após duas oportunidades de pintura e um callback ocioso com limite de 1 segundo. Sem dependência de scroll, ponteiro ou `window.load`.
- Prévia permanece até o primeiro desenho; troca por opacidade. Sem zoom/blur inicial que escondia o blob.
- Shaders usam `KHR_parallel_shader_compile` quando disponível; conclusão consultada por frame. Falhas preservam a prévia.
- Desktop: 20.480 → 5.120 triângulos, 2.562 vértices. Mobile já utilizava essa geometria.
- Limites de 60 fps desktop / 30 fps mobile; pausa em aba oculta. Perda de contexto recupera a prévia e reconstrói o renderer na restauração.
- Movimento reduzido, economia de dados e ausência de WebGL preservam a prévia. Nos dois primeiros casos, a home não solicita o renderer.

## Segunda rodada: reduzir o caminho inicial

- GSAP da cortina de navegação passou para um módulo carregado ao navegar. Cobertura CSS e temporizadores de recuperação permanecem no componente principal. Navegação funciona mesmo com o módulo bloqueado.
- Regras pequenas da prévia ficam em um `<style>` do React com `href` e `precedence`. O CSS compartilhado anterior fazia a home baixar estilos de cinco outras páginas: pacote específico caiu de 114.050 para 34.382 bytes antes da compressão.
- Tailwind escaneia apenas `src`; relatórios, propostas e arquivos de saída não geram utilitários do site.
- Painéis inativos da jornada usam `content-visibility: hidden`, atualizado pelo mesmo controlador que determina sua visibilidade. Conteúdo continua no HTML; evita layout e fontes dos painéis ocultos.
- Fotos dos depoimentos e o componente `next/image` só são solicitados perto da seção de contato. Dimensões e textos permanecem reservados.
- Consentimento na home usa Archivo, já presente na página, evitando baixar Inter Tight apenas para o banner.
- Plex Mono é descoberto pelo CSS conforme uso, sem preload dos pesos dos painéis ocultos. Família e pesos mantidos.
- Link do blog não antecipa downloads de outra rota durante a abertura da home.
- Sem novas dependências, flags experimentais novas ou alteração de conteúdo comercial.

## Método

Next 16.2.10 em build de produção, Lighthouse 13.6.0, Chrome 156. Execuções sequenciais, cache frio, sem build ou outro navegador de teste em paralelo. Categoria performance; preset mobile e simulação padrão, salvo indicação explícita.

O servidor `next start` local responde em HTTP/1.1. A produção foi consultada separadamente e negociou HTTP/2. Para representar esse transporte localmente, um proxy TLS em `127.0.0.1:3443` encaminhou os mesmos bytes comprimidos de `127.0.0.1:3100`, sem recompressão, cache adicional ou mudança de latência. Certificado local temporário; no Lighthouse, apenas `--ignore-certificate-errors` foi acrescentado. **Não comparar as duas modalidades como se fossem o mesmo teste.**

## Mesmo HTTP/1.1: início e fim da segunda rodada

| Medida | Início desta rodada | Otimizado |
| --- | ---: | ---: |
| Performance mobile padrão | 91 | 96 |
| LCP simulado | 3,529 s | 2,772 s |
| Transferência total | 463.226 bytes | 300.819 bytes |
| JavaScript | 244.166 bytes | 183.179 bytes |
| Fontes | 111.588 bytes | 55.952 bytes |
| CSS | 36.106 bytes | 17.759 bytes |
| Requisições | 35 | 21 |

Redução total: **35,1%**. Relatórios: `blob-round2-baseline.json` e `blob-verified-mobile-h1.json`, em `output/playwright/`. O segundo foi coletado antes de restaurar dois links de ícones Android no metadata; arquivos dos ícones não foram alterados.

## Versão final em HTTP/2: simulação padrão

| Execução | Nota | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile 1 | 99 | 0,910 s | 2,110 s | 29 ms | 0,00359 |
| Mobile 2 | 99 | 0,907 s | 2,107 s | 40 ms | 0 |
| Mobile 3 | 99 | 0,908 s | 2,258 s | 22 ms | 0 |
| Desktop | 100 | 0,248 s | 0,466 s | 0 ms | 0,00161 |

Relatórios: `blob-ready-mobile-{1,2,3}.json`, `blob-ready-desktop.json`. Transferência mobile aproximada de 295 KB. Uma medição anterior desta rodada atingiu 98; a tabela apresenta as três últimas execuções consecutivas do código final, sem escolher a melhor execução.

O LCP de imagem é o limitador restante. Inspeção do grafo do Lantern mostrou downloads dos chunks iniciais de React/Next e fontes no caminho estimado. Não foram usados atrasos específicos de auditoria, detecção de Lighthouse ou ocultação do blob para mudar essa classificação.

## Rede e CPU limitadas diretamente no navegador

Com `--throttling-method=devtools`, mesmo endpoint HTTP/1.1 da medição original:

| Medida | Original, antes da correção | Versão final |
| --- | ---: | ---: |
| Performance | 76 | 99 |
| FCP / LCP | 1,847 / 1,847 s | 1,689 / 1,689 s |
| TBT | 1.028 ms | 24,5 ms |
| CLS | 0,00060 | 0,00367 |
| Speed Index | 2,348 s | 2,275 s |

Relatórios: `lighthouse-blob-before-mobile-observed.json` e `blob-ready-mobile-observed-h1.json`. Cada coluna representa uma execução, não mediana. Uma execução com limitação aplicada em HTTP/2 marcou 97 (`blob-verified-mobile-observed.json`); transporte, concorrência e variação do laboratório importam. Não substituir a nota da simulação padrão pela nota dessa modalidade.

## Histórico e tentativas descartadas

A primeira correção marcou 90–91 na simulação HTTP/1.1, contra 100 no código original que atrasava o blob, e 97 com limitação aplicada, contra 76 original. Relatórios preservados.

- Prévia em base64: documento cresceu para aproximadamente 36 KB e LCP HTTP/2 foi a 2,259 s. Revertido.
- CSS inline experimental do Next: documento passou de aproximadamente 10 KB para 55 KB, nota 98. Revertido; configuração final continua somente com `cpus: 1`.
- Fontes opcionais e mudanças de preload foram comparadas; sem ganho de nota que justificasse alterar a política visual global.
- Subconjuntos e instâncias estáticas de Archivo foram gerados apenas temporariamente para medir tamanho. Nenhum adotado.

## Verificações

- Build e TypeScript aprovados, 34 páginas geradas.
- **22 testes Vitest aprovados**: SSR da imagem, início sem interação, movimento reduzido, economia de dados, ausência de idle callback, cancelamento e recuperação da cortina sem seu módulo.
- ESLint dos componentes/testes alterados, sintaxe do renderer e `git diff --check` aprovados.
- Playwright final: desktop, mobile, JavaScript desativado, movimento reduzido, economia de dados, WebGL indisponível e script bloqueado. Imagem 730 × 730 carregada em todos; scroll zero, sem overflow e sem erros JavaScript. Nos cenários normais, canvas iniciou automaticamente.
- Seis estações com conteúdo visível ao entrar. Fotos ausentes na abertura e três carregadas na estação de contato.
- Home → `/websites` → home aprovada. Módulo da cortina bloqueado: home → `/blog` → home concluiu e liberou interação. Módulo não solicitado na abertura, solicitado uma vez ao navegar.
- Recuperação de contexto WebGL verificada na primeira rodada; mecanismo preservado nesta rodada.

Resumo versionado das métricas e hashes SHA-256 dos relatórios originais: `2026-11-04-blob-metrics.json`, nesta pasta. Evidências completas locais: `blob-round2-flow.json`, capturas `blob-round2-desktop.png`, `blob-round2-mobile.png`, `blob-round2-no-js.png`, `blob-round2-contact.png`, em `output/playwright/`. Relatórios completos, traces e capturas permanecem fora do commit. Servidores, proxy, navegador e certificados temporários encerrados/removidos ao concluir.

## Limitação restante

Não afirmar que 100 mobile foi recuperado nem que a nota publicada mudou. Resultado final: 99 mobile / 100 desktop em HTTP/2 local; meta mobile permanece pendente. A versão hospedada só poderá ser validada depois de publicação autorizada, sem garantia prévia de nota.

Referências: [Google: otimizar LCP](https://web.dev/articles/optimize-lcp/), [React: estilos com precedence](https://react.dev/reference/react-dom/components/style), [MDN: content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility), [Next: limites de inlineCss](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss).
