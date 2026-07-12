# Landing "A Jornada do Frame ao Sistema" — Design Spec

Data: 2026-07-11
Branch alvo: nova branch a partir de `master`

## Objetivo

Substituir a home atual (`/`) pela landing importada do Claude Design
("Belis Landing.dc.html"): uma experiência cinematográfica scroll-driven
("hero's journey"), com um blob WebGL central que muda de material por estação e,
ao clicar, **expande e navega** para a tela escolhida. Implementar as rotas
`/websites` e `/sistemas` (importadas de "Websites e Sistemas.dc.html").
Reaproveitar conteúdo real da landing antiga (vídeos de depoimento de clientes e
projetos importantes).

## Decisões (aprovadas)

1. **Substituição total** da home. Componentes antigos de `home/` deixam de ser
   usados na página (ficam no repo; limpeza é fora de escopo).
2. Blob **Studio → `/portfolio`** (página existente), **Web → `/websites`**,
   **Systems → `/sistemas`** (rotas próprias, novas).
3. Adotar **Archivo + IBM Plex Mono** só na jornada e nas telas web/sistemas.
4. Reaproveitar da landing antiga:
   - **3 vídeos de depoimento** (YouTube, 9:16):
     Dra. Barbara Goldoni (Cirurgiã) `PQzI3UtDaao` `/images/barbara.jpg`;
     Dr. Thiago Barbosa (Advogado) `hVu5yhGCVmk` `/images/thiago.jpg`;
     Dra. Ana Carolina (Médica) `JoY-feXnk9c` `/images/ana carolina.jpg`.
   - **Projetos importantes**: Krrom Construtora, Laticínios Latco,
     Salles Nogueira Advogados, Kofar Metalúrgica.
   - Copys de headline/subtítulo das seções antigas onde couber.

## O que é a jornada (referência do design)

Palco fixo (`position: fixed`) com blob central dentro de uma "gaiola" quadrada.
6 estações dirigidas por scroll (6 spacers de `100vh`, `scroll-snap`):

| # | Estação | Ato | Papel |
|---|---------|-----|-------|
| 0 | O Chamado (hero) | I · Partida | "Toda empresa que vira referência começa com um chamado." |
| 1 | O Guia | II · Iniciação | "Você é o herói. Nós somos o guia." (StoryBrand) |
| 2 | Studio / A Visibilidade | II | Audiovisual → clique abre `/portfolio` |
| 3 | Web / A Conversão | II | Websites → clique abre `/websites` |
| 4 | Systems / A Escala | II | SaaS/software → clique abre `/sistemas` |
| 5 | O Retorno (contato) | III · Retorno | CTA WhatsApp + **prova social** (3 vídeos) |

Efeitos: blob morfa (cromo líquido → wireframe) e o fundo transita
(escuro → papel/cream → escuro) por estação; marcadores orbitais clicáveis;
HUD topo (data/relógio) e rodapé (progresso/ato); cursor custom; film grain.

**Diferença vs. design original:** no design, estações 2–4 abrem um overlay
"bloom" in-page. Aqui, o clique no blob/marcador/botão dispara a animação de
explosão do blob (`blob.enter()`) e, no meio dela, faz `router.push` para a rota
alvo — mantendo a sensação "expande e abre a tela".

## Arquitetura

### 1. Chrome condicional (`/` sem chrome do site)

Problema: `layout.tsx` envolve tudo em Lenis (`SmoothScroll`), `Navbar`,
`Footer`, `GradientBackground`, `NoiseOverlay`, `CustomCursor`. A jornada usa
scroll nativo + `scroll-snap` + um rAF director que lê `window.scrollY`; Lenis
sequestra o scroll e o próprio HUD/cursor/fundo da jornada conflitam com o chrome.

Solução: novo client component **`SiteChrome`** (usa `usePathname()`):
- Em `/`: renderiza **apenas** `{children}` (jornada cuida do próprio fundo,
  cursor, grain, scroll nativo). Sem Lenis, sem Navbar/Footer/bg.
- Nas demais rotas: renderiza o chrome completo atual (Lenis + Navbar + Footer +
  GradientBackground + NoiseOverlay + CustomCursor + PageTransition), igual hoje.

`layout.tsx` passa a montar `<SiteChrome>{children}</SiteChrome>` no lugar da
árvore de chrome hardcoded. `GoogleAnalytics` continua no layout.

> `/websites` e `/sistemas` usam o **chrome normal do site** (Navbar + Footer),
> descartando a `<nav>`/footer inline do HTML importado — mantém consistência.

### 2. Fontes

Em `layout.tsx`, adicionar via `next/font/google`:
`Archivo` (`--font-archivo`, weights 400–700) e `IBM_Plex_Mono`
(`--font-plex-mono`, 400–600). Expor as vars no `<html className>`.
Em `globals.css` `@theme`: `--font-archivo` / `--font-plex-mono` (para classes
utilitárias, se necessário). A jornada usa majoritariamente estilos inline
(portados do design) referenciando `var(--font-archivo)` / `var(--font-plex-mono)`.

### 3. Blob WebGL

- Copiar `belis-blob-v2.js` (do projeto Claude Design) para `public/belis-blob-v2.js`
  — vanilla, sem deps, com fallback 2D. Sem edição.
- `src/types/custom-elements.d.ts`: declarar `belis-blob-v2` como
  `IntrinsicElement` para o JSX/TS aceitar `<belis-blob-v2>`.
- Wrapper `BelisBlob.tsx`: injeta o script uma vez (`next/script` strategy
  `afterInteractive` ou append manual) e renderiza `<belis-blob-v2>`. Expõe
  `ref` para o director chamar `setLook`, `setBulge`, `enter`, `reset`,
  `getRotationDeg`.

### 4. Jornada (React)

O framework `x-dc`/`DCLogic`/`sc-for` do design **não** existe fora do Claude
Design — reescrever como React. Estrutura em `src/components/journey/`:

- `journeyData.ts` — dados puros portados do design: `looks[]` (keyframes do
  blob por estação), `bgs[]`, `inks[]`, `acts[]`, `sections[]`, `markers[]`,
  `proofs` (3 depoimentos reais), `projetos` (4 projetos). Sem JSX.
- `useJourneyDirector.ts` — hook com o loop `requestAnimationFrame`: lê
  `window.scrollY`, calcula progresso `p ∈ [0, 5]`, interpola cor de fundo/ink,
  chama `blob.setLook(lerp)`, faz fade/slide das seções por proximidade, atualiza
  HUD (relógio, progresso, ato, índice) e estado ativo dos marcadores. Cleanup
  em unmount. Respeita `prefers-reduced-motion` (o blob já respeita internamente).
- `BelisJourney.tsx` (client, "use client") — monta: spacers (6×100vh), palco
  fixo, blob (via `BelisBlob`), gaiola quadrada, marcadores orbitais, as 6
  estações (subcomponentes), HUD topo/rodapé, cursor custom, grain. Orquestra
  `useJourneyDirector`. Handlers de navegação (ver abaixo).
- `stations/` — subcomponentes de estação para manter arquivos <400 linhas:
  `HeroStation.tsx`, `GuideStation.tsx`, `TrialStation.tsx` (parametrizado p/
  Studio/Web/Systems), `ContactStation.tsx` (inclui prova social + projetos).
- `TestimonialProof.tsx` — os 3 cards de depoimento reais; play abre lightbox
  YouTube 9:16 (portar padrão do `Testimonials.tsx` antigo).

**Navegação por clique (expande + abre tela):**
`enterAndNavigate(href)`:
1. bloqueia re-trigger; fade-out das seções/marcadores;
2. `blob.enter(onMid, onDone)` — animação de explosão/tunnel;
3. no `onMid` (~68%): `router.push(href)`;
4. fallback `setTimeout` caso `onMid` não dispare (sem WebGL/reduced-motion).

Mapa: estação 0 → scroll p/ estação 1; estação 1 → scroll p/ estação 2;
Studio → `enterAndNavigate('/portfolio')`; Web → `/websites`;
Systems → `/sistemas`; O Retorno → link WhatsApp (`https://wa.me/5511973138895`).
Marcadores continuam fazendo scroll suave até a estação (como no design).

**Conteúdo reaproveitado nas estações:**
- Studio (2): stats `150+ projetos`, `07D primeira versão`; nota com pipeline;
  linha discreta com os 4 **projetos importantes** (Krrom · Latco ·
  Salles Nogueira · Kofar) como prova de trabalho.
- O Retorno (5): substituir os 3 placeholders "SUBSTITUA PELOS VÍDEOS" pelos
  **3 depoimentos reais** (nome, papel, thumb, play → YouTube).

### 5. Rotas `/websites` e `/sistemas`

Portar "Websites e Sistemas.dc.html" — que é uma página combinada — em **duas**
rotas focadas, reutilizando blocos comuns em `src/components/solutions/`:

- `SolutionHero.tsx` — headline + subcopy + CTA WhatsApp (blob v1 opcional de
  fundo; ver nota abaixo).
- `ItemGrid.tsx` — lista de itens (nome + descrição) com header de seção.
- `ProcessSteps.tsx` — Discovery → … → Launch (01–04).
- `QualityGrid.tsx` — qualidade/stack + linha da stack.
- `CtaBanner.tsx` — banner verde final + links (Home/Instagram/e-mail).
- `solutionsData.ts` — `webItems`, `sysItems`, `audiences`, `steps`, `quality`
  (portados do script do design), separados por página.

Páginas:
- `/websites` — hero "Do vídeo que vende à página que converte"; ItemGrid
  (websites); Para quem (subset relevante); Processo; Qualidade/stack; CTA.
- `/sistemas` — hero "Do vídeo que vende ao sistema que escala"; ItemGrid
  (sistemas: micro-SaaS, SaaS, ERP, portais, dashboards, integrações); Para quem;
  Processo; Qualidade/stack; CTA.

Ambas usam Navbar/Footer do site, fontes Red Hat + Inter Tight (design dessas
telas já usa essas fontes — consistente com o site). Metadata/SEO próprios;
`sitemap.ts` ganha as 2 rotas.

> **Blob v1 nas telas web/sistemas:** o design usa `belis-blob.js` (variante
> wire) no hero. Opcional/nice-to-have — se o porte for simples, incluir como
> fundo decorativo; senão, usar um gradiente/orb estático. Não é bloqueante.

### 6. Metadata / SEO da home

`page.tsx` (server component) mantém `export const metadata` (título/description
atuais servem; ajustar título p/ refletir a jornada se desejado) e renderiza
`<BelisJourney/>`. JSON-LD da Organization continua no layout.

## Riscos / pontos de atenção

- **Lenis vs scroll nativo**: garantir que em `/` o Lenis não monta (via
  SiteChrome). Verificar que `PageTransition` não depende de Lenis quando na home.
- **`scroll-snap`**: aplicar só na home (classe no container/estações), não
  global, para não afetar `/websites` etc.
- **Custom element + React 19 / React Compiler**: `reactCompiler: true` está
  ligado; o wrapper do blob deve evitar padrões que o compiler rejeite (refs ok).
- **Hidratação**: relógio/data do HUD e detecção mobile só no client (evitar
  mismatch — render inicial neutro, preencher em `useEffect`).
- **Acessibilidade**: `prefers-reduced-motion` desliga snap/animação; manter
  textos/links alcançáveis; blob é decorativo (`aria-hidden` onde aplicável),
  mas os botões de "entrar" e marcadores são focáveis.
- **Performance**: blob é WebGL com fallback; grain e HUD são leves. LCP: hero
  textual, sem imagem pesada.

## Fora de escopo

- Remover/limpar componentes antigos de `home/`.
- Testes automatizados novos (projeto não tem suíte; validação será via preview).
- Porte fiel do blob v1 se custar caro (fallback estático é aceitável).

## Critério de pronto

- `/` renderiza a jornada scroll com blob morfando e HUD funcional, sem chrome
  do site nem Lenis.
- Clicar Studio/Web/Systems (blob/botão) explode o blob e navega para
  `/portfolio` / `/websites` / `/sistemas`.
- "O Retorno" mostra os 3 depoimentos reais com lightbox YouTube.
- `/websites` e `/sistemas` existem, portadas do design, com Navbar/Footer do
  site e SEO próprio; incluídas no sitemap.
- `next build` passa; preview validado (director, navegação, responsivo, reduced
  motion).
