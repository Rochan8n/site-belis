# Comunicação visual Belis

## Refinamento de conversão — 8 de novembro de 2026

- Abertura com orçamento explícito no WhatsApp e atalho direto para o personalizador.
- Quatro combinações iniciais no simulador, com fonte, efeito e cor aplicados em conjunto. O catálogo completo de 18 fontes, 15 efeitos e 25 cores permanece editável.
- A seleção de uma combinação preserva o nome digitado; ajustes individuais atualizam sua indicação de seleção e o resumo enviado ao WhatsApp.
- Seção escura passa a explicar tamanho/leitura, acabamento/luz e fixação/envio. Processo e CTAs usam linguagem mais concreta.
- Áreas de toque ampliadas na navegação, controles da prévia e rodapé. Links entre serviços permanecem no rodapé.
- Imagens atuais e avisos de conceitos de IA mantidos até a próxima captação. Prompts alternativos em [Prompts de comunicação visual](prompts-comunicacao-visual.md).
- Novo identificador editorial de clique: `cta_placement: details`; preservadas regras de consentimento e exclusão de texto pessoal dos eventos.

Validação deste refinamento: build/TypeScript, ESLint e 22 testes unitários aprovados. Os 26 casos de navegador desta landing passaram em desktop e celular, incluindo combinações, edição posterior, teclado, consentimento e layout. As imagens foram mantidas nesse refinamento inicial; sua substituição posterior está documentada em Assets. Sem commit, push ou publicação.

## Página e oferta

Rota: `/comunicacao-visual`. Primeira página da frente de fabricação personalizada;
a oferta pública é comunicação visual. Impressão 3D não é o argumento de venda.

Público: negócios que precisam de letras caixa, fachada, logo em relevo ou letreiro.
A página apresenta possibilidades, permite experimentar um nome e conduz à conversa
com a Belis pelo WhatsApp já cadastrado no site: +55 11 97313-8895.

Confirmado pelo usuário: São Paulo, projetos em todo o Brasil, criação, produção
e envio. Instalação a combinar. Preço, prazo, frete, acabamento e condições de uso
externo dependem do orçamento.

## Conversão

- Hero com oferta e ação imediatas; navegação por âncoras, sem bloquear leitura.
- Quatro conceitos identificados como ilustrativos, com mensagens contextuais.
- Personalizador para consumidor final: nome, 18 fontes, 15 efeitos e 25 cores.
- Prévia com dia/noite e giro; sem medidas, CAD, login ou arquivos de produção.
- No celular, nome acima da prévia; prévia acompanha escolhas em Letra/Efeito/Cor.
- WhatsApp do simulador leva a referência escolhida, sem enviar nada automaticamente.
- Processo em três etapas, perguntas reais sobre contratação e fechamento direto.
- Botão flutuante com mensagem da página; cede espaço ao CTA com a combinação
  escolhida enquanto o personalizador está visível e reaparece nas outras seções.
- Sem preços inventados, avaliações, contadores, urgência ou clientes fictícios.

Evento GA4: `visual_whatsapp_click`, apenas após consentimento de análise.
Parâmetros: `page_path`, `cta_placement`, `project_type` quando disponível.
Não coleta o texto digitado, cidade, telefone ou mensagem do WhatsApp.
O evento representa clique de intenção, não lead confirmado nem venda.
Usa a configuração GA4 existente; não adiciona pixels ou campanhas publicitárias.

Para avaliar conversão após publicar: observar cliques por posição e origem da
campanha, conversas iniciadas, pedidos de orçamento e vendas. Marcar como evento
principal ou integrar conversões de anúncios exige configuração na plataforma;
isso não foi feito nesta tarefa. UTMs da campanha podem ser usadas no link da
landing page. Não são encaminhadas como texto na mensagem do WhatsApp.

## SEO

HTML pré-renderizado, título e descrição específicos, canonical na versão `www`,
Open Graph e Twitter com imagem própria, imagens WebP responsivas e alt descritivo.
Página incluída no sitemap e na navegação da home e páginas internas.
Dados estruturados: WebPage, Service e BreadcrumbList vinculados à organização
existente. FAQ é conteúdo visível e acessível, inclusive sem JavaScript.

Direção editorial: explicar oferta e responder dúvidas do comprador, com São
Paulo e alcance nacional inseridos naturalmente. Referências técnicas:
[Google: guia de SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
e [Google: SEO de imagens](https://developers.google.com/search/docs/appearance/google-images).
Nenhum código garante indexação, posição ou taxa de conversão.

## Assets

Em 8 de novembro de 2026, as cinco imagens foram substituídas pelas novas gerações fornecidas e aprovadas pelo usuário. Os PNGs originais permanecem em `F:/Nova pasta/`; os arquivos do site usam WebP, 1536 × 1024, qualidade 86. Total dos cinco arquivos: 501.150 bytes, ante 11.285.147 bytes dos PNGs recebidos. Nenhuma alteração criativa foi aplicada às imagens.

| Arquivo recebido | Arquivo no site | Bytes |
| --- | --- | ---: |
| Freshly painted a and B-6.png | hero-letras.webp | 79.384 |
| Origem storefront in São Paulo-2.png | fachada-origem.webp | 157.594 |
| Vértice sign in a small Brazilian office-3.png | logo-vertice.webp | 55.724 |
| Boa energia neon sign installation-4.png | letreiro-boa-energia.webp | 55.378 |
| Serena on a terracotta storefront-5.png | letras-serena.webp | 153.070 |

A imagem Open Graph/Twitter foi refeita a partir da nova abertura, em JPEG 1200 × 630 (76.048 bytes). URLs usam `v=20261108` para invalidar caches das imagens anteriores. Descrições alternativas atualizadas conforme os novos objetos. Arquivos finais em `public/images/comunicacao-visual/`.

O Next permite essa query somente na pasta de comunicação visual. Ao trocar `VISUAL_IMAGE_VERSION`, atualizar também o `search` correspondente em `images.localPatterns` de `next.config.ts`.

Validação da substituição: build/TypeScript, ESLint e quatro testes focados de navegador aprovados (metadados, contatos, carregamento das imagens e layout em desktop/celular). Abertura, galeria e recorte de compartilhamento inspecionados visualmente. Servidor temporário encerrado. Sem commit, push ou publicação.

A primeira geração e seus prompts estão registrados em `.impeccable/comunicacao-visual-assets.json`; os três estudos de composição iniciais, em `.impeccable/mocks/`. Esses registros são históricos. Os prompts preparados para a nova direção estão em [Prompts de comunicação visual](prompts-comunicacao-visual.md).

Os exemplos ORIGEM, VÉRTICE, boa energia e serena são conceitos fictícios.
Substituir por fotos de trabalhos reais quando existirem, com autorização de uso.
Não remover a identificação de conceito das imagens geradas.

## Validação

- `npm run build`
- `npm test`
- `npx eslint src/app/comunicacao-visual src/components/visual tests/e2e/visual.spec.ts`
- PowerShell: `$env:PLAYWRIGHT_PRODUCTION='1'; npx playwright test tests/e2e/visual.spec.ts --workers=1`

O modo de produção usa o build existente. As capturas ficam em `output/visual-qa/`.
Não houve commit, push ou publicação nesta tarefa.

### Resultado local — atualização do personalizador, 6 de novembro de 2026

Build, TypeScript, ESLint dos arquivos alterados e `git diff --check` aprovados.
Os 22 testes unitários existentes passaram na criação da landing. Nesta extensão,
22 testes de navegador passaram, incluindo 18 famílias de fonte distintas em 320px,
15 prévias visualmente diferentes, 25 cores, teclado, WhatsApp contextual,
carregamento adiado das fontes, consentimento e análise WCAG A/AA.

| Lighthouse 13.6 — build de produção local | Mobile | Desktop |
| --- | ---: | ---: |
| Desempenho | 91 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 3,5 s | 0,7 s |
| CLS | 0 | 0 |

Medições de laboratório, não métricas de produção. TBT: 10ms mobile e 0ms desktop.
Relatórios: `output/visual-qa/lighthouse-catalog-{mobile,desktop}.json`.
O custo de carregamento de JavaScript ainda aparece como oportunidade no mobile.
As famílias de amostra são auto-hospedadas por `next/font`, sem preload adicional
e sem dependência de WebGL. As amostras de fontes são ativadas perto da seção,
com antecipação de 700px. A abertura carregou cinco arquivos de fonte (129KB)
na medição mobile; os demais entram ao chegar ao personalizador. Não houve alteração nas
configurações de anúncios, publicação ou verificação de indexação ao vivo.

O servidor de desenvolvimento apresentou falha de resolução do Tailwind na raiz
do disco durante a preparação dos testes. A validação foi feita com `npm run build`
e `npm run start`, usando `PLAYWRIGHT_PRODUCTION=1`. Não houve correção geral do
ambiente de desenvolvimento nesta tarefa.

### Revisão independente da primeira versão

Veredito final: `disposition: ship`. Pendências materiais: nenhuma.

| Ajuste solicitado pela revisão | Veredito |
| --- | --- |
| Peso dos títulos e hierarquia tipográfica | resolved |
| Alcance nacional visível na primeira tela desktop | resolved |
| Letras decorativas planas, sem extrusão artificial | resolved |
| Categorias incorporadas aos títulos dos exemplos | resolved |
| Contraste do nome no simulador | resolved |

O revisor verificou recapturas; a interatividade foi verificada pelos testes.
Lighthouse final confirmou o contraste após a última revisão.

### Referências e escopo do personalizador

Referência pública consultada: [LetraMaker](https://letramaker.comunicacao3d.com/),
especialmente face iluminada, retroiluminação, LED duplo e neon. A adaptação Belis
é uma vitrine de possibilidades para quem compra o letreiro, conforme esclarecimento
do usuário. Não foram copiados código, modelos 3D ou imagens da ferramenta.

Fontes: Archivo, Bodoni Moda, Satisfy, Bebas Neue, Righteous, Syne, Bungee, Pacifico,
Cormorant Garamond, Playfair Display, Cinzel, Montserrat, Quicksand, Oswald, Anton,
Caveat, Dancing Script e Orbitron.
Os cinco efeitos iniciais permanecem; foram adicionadas dez construções visuais
com laterais translúcidas, faixas, frentes vazadas e relevos contrastantes.
Pesquisa, limites e mapeamento dos 15 efeitos em [Referências dos efeitos](comunicacao-visual-efeitos.md).
As 25 cores são referências visuais; “prata” e “cobre” não prometem peças de metal.
Tons iluminados são aproximações. A escolha não é uma especificação de fabricação.

O CTA inclui texto, fonte, efeito e cor na URL do WhatsApp; a pessoa ainda precisa
enviar a mensagem. Analytics recebe apenas IDs editoriais da combinação após
consentimento, nunca o nome digitado. Não há upload, cadastro ou persistência do nome.

### Revisão da primeira ampliação do personalizador

Veredito independente: `disposition: ship`. Pendências: nenhuma.

| Ajuste | Veredito |
| --- | --- |
| Nomes acessíveis incluem os textos visíveis dos botões de ambiente e giro | resolved |
| Documentação registra opções, ordem móvel e WhatsApp contextual atuais | resolved |

Após os ajustes: novo build e ESLint aprovados; os seis testes de navegador
afetados foram repetidos e passaram. As capturas finais foram revistas.
Servidores e navegador temporários de teste encerrados; nenhuma publicação.

### Revisão da ampliação para 18 fontes, 15 efeitos e 25 cores

Veredito independente: `disposition: ship`. Nenhum defeito material de interface
ou TypeScript/React encontrado. A revisão confirmou que as faixas luminosas aparecem
na profundidade e deixam a frente opaca, conforme a construção ilustrada.

| Ajuste | Veredito |
| --- | --- |
| Sincronizar DESIGN.md, sidecar e surface brief com o catálogo e o comportamento atuais | resolved |

Build, ESLint e 22 testes aprovados. Relatórios Lighthouse do catálogo na tabela
de validação acima. Página recarregada no navegador do usuário; combinação anterior
preservada. Servidor local mantido ativo para o teste solicitado. Sem commit,
push ou publicação.

### Fundos e letras interativas — 6 de novembro de 2026

Refinamento solicitado pelo usuário: mais presença da marca, letras reativas ao
mouse, formas e logos neon. `VisualAtmosphere` compõe quatro áreas: hero, margens
da galeria, composição de letras na seção escura e fechamento. A marca d’água
reutiliza `public/belis-blob-watermark.svg`; os contornos luminosos são geometria
SVG própria, em verde Belis e branco quente. São elementos decorativos, não
portfólio de projetos entregues. O personalizador e o conteúdo comercial permanecem.

O movimento usa propriedades CSS e um `requestAnimationFrame` por lote de eventos
de ponteiro, sem renderizações React a cada movimento, loop contínuo ou WebGL.
As camadas têm `pointer-events: none` e `aria-hidden`. Toque e preferência por
movimento reduzido mantêm a composição estática; saída da seção, perda de foco,
aba oculta e limpeza do componente cancelam o frame e restauram as posições.

Build/TypeScript, ESLint e 24 testes de navegador aprovados. Após diminuir a
intensidade da marca d’água nas áreas de texto, quatro verificações específicas
de interação e captura desktop/mobile também passaram. Detector Impeccable:
76 observações informativas de cores/tamanhos/raio, nenhuma não informativa.

| Lighthouse 13.6 — fundos interativos, produção local | Mobile | Desktop |
| --- | ---: | ---: |
| Desempenho | 91 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 3,6 s | 0,8 s |
| CLS | 0 | 0 |
| TBT | 10 ms | 0 ms |

Relatórios: `output/visual-qa/lighthouse-background-{mobile,desktop}.json`.
Valores de laboratório, sem medição de conversão ou validação em produção.

Revisão independente do refinamento: `disposition: ship`, nenhuma correção
material visual ou React/TypeScript. A revisão usou código e capturas desktop/mobile;
não foi fornecido um cartão QUALITY BAR adicional para esse refinamento.
Prévia atualizada no navegador, com a combinação anterior do personalizador
preservada. Servidor local mantido para uso; nenhum commit, push ou publicação.
