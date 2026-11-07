# Landing de engenharia reversa

Rota: `/engenharia-reversa`. Criada em 2026-11-06. Implementação local, sem commit, push ou publicação nesta tarefa.

## Objetivo e direção

Gerar conversas comerciais pelo WhatsApp para peças automotivas e industriais sob medida. Três públicos: clássicos e raros, performance e personalização, indústria e máquinas. O serviço inclui avaliação, escaneamento 3D, reconstrução CAD, modelagem, protótipos e pequenos lotes conforme proposta.

Identidade local: grafite, papel e verde Belis; Archivo e IBM Plex Mono já existentes. Peça em vista explodida no hero, fotografia conceitual automotiva, diagrama interativo de componente, divisões técnicas e composição editorial. Sem dependências novas, WebGL ou loops de animação. CSS Modules isolados e conteúdo principal renderizado no servidor.

Referências consultadas, sem copiar código ou imagens:

- [Forge Automotive — Awwwards](https://www.awwwards.com/sites/forge-automotive): apresentação de atelier automotivo, objeto em destaque e detalhes técnicos. Página consultada no navegador; web fetch não conseguiu acessá-la.
- [Automotive UX/UI Concept — Dark & Bold, Tatyana Zhrakova — Dribbble](https://dribbble.com/shots/26499358-Automotive-UX-UI-Concept-Dark-Bold): contraste escuro, apresentação automotiva e navegação concisa. Preservada a paleta Belis.

## Conteúdo e limites comerciais

- A página apresenta possibilidades de projeto, não um catálogo de componentes já certificados ou um portfólio de trabalhos entregues.
- Nenhuma garantia genérica de 250 °C para nylon. HDT é diferente de temperatura de uso contínuo; formulação, carga, tempo e processo precisam ser avaliados.
- A [Polymaker distingue PA6-CF20 com HDT de 215 °C e PPS-CF10 acima de 250 °C](https://wiki.polymaker.com/the-basics/applications/custom-tooling). PPS não é nylon. Essa pesquisa fundamenta o cuidado editorial, sem afirmar que uma marca ou formulação específica está disponível na Belis.
- Resistência química depende do agente, concentração, temperatura e exposição. Não há promessa de compatibilidade universal com solventes ou combustíveis.
- Coletores, plenums, cornetas, dutos e componentes do cofre são apresentados como desenvolvimento sujeito à viabilidade e validação térmica, mecânica e de estanqueidade. Não há promessa de ganho de potência.
- Peças críticas de segurança não são apresentadas como substituições diretas por impressão 3D.
- Custos, economia em relação à importação, prazos, tolerâncias, frete e arquivos entregues dependem de proposta. Malha de scan e CAD são entregas distintas.

## Interações e integrações

- Seletor acessível de aplicações usa radios nativos e navegação pelas setas do teclado.
- Demonstração escaneamento → CAD → peça usa SVG original, descrito como ilustração sem escala.
- Briefing monta uma mensagem codificada para `https://wa.me/5511973138895`; não envia automaticamente, não armazena os campos e não oferece upload fictício. Fotos são anexadas pelo visitante no WhatsApp.
- Evento `engineering_whatsapp_click` depende de consentimento. Envia somente `page_path` e `cta_placement`, sem dados do projeto.
- Canonical, Open Graph, Twitter e JSON-LD WebPage/Service/BreadcrumbList próprios. Rota incluída no sitemap, links na home, navegação e rodapé existentes.
- Página excluída do chrome global, como a landing de comunicação visual. Alterações preexistentes preservadas.

## Imagens e prompts

Modo: ferramenta nativa `image_gen`, via skill `imagegen`. Imagens geradas, identificadas como conceitos na página. SVG de escaneamento desenhado em código. Originais preservados em `C:/Users/Lucas PC/.codex/generated_images/01a1b119-de6e-7b02-accc-f2578c043f47/`.

Arquivos finais do projeto:

- `G:/site-belis/public/images/engenharia-reversa/coletor-conceito.webp` — 134.360 bytes.
- `G:/site-belis/public/images/engenharia-reversa/classico-oficina.webp` — 145.806 bytes.
- `G:/site-belis/public/images/engenharia-reversa/og-engenharia-reversa.jpg` — 102.170 bytes, 1200 × 630.

### Prompt do coletor

Use case: product-mockup. Asset type: premium engineering landing page hero, landscape 3:2 image. Photorealistic precision industrial product render of a custom four-cylinder performance automotive intake manifold in graphite black carbon-fiber reinforced 3D-printed nylon. Four elegant curved tubular runners joining a compact plenum with circular throttle opening facing camera, machined-looking mounting flange with four ports, separated top cover floating slightly above with four tiny metallic fasteners in exploded engineering view. Entire object centered with generous margins, camera three-quarter isometric perspective. Matte micro-texture and fine additive manufacturing layers, NOT woven carbon fiber. Dramatic soft white studio key light, restrained muted Belis green rim light. Almost black charcoal background #101412, subtly grounded shadow, no environment. Highly legible rounded volumes, exquisite luxury motorsport engineering visualization. No car, no text, no letters, no logos, no labels, no watermark, no grid. This is conceptual design, not a manufactured certified product.

### Prompt do clássico

Use case: photorealistic-natural. Asset type: wide 16:9 editorial website image for bespoke reverse engineering and classic car restoration. Cinematic close side-rear three-quarter view of an anonymous vintage 1980s European performance sports coupe, no badges or brand identification, graphite silver metal, round wheel arches, beautiful rear wheel, in a quiet high-end industrial workshop. Car sits in right two thirds, left third is negative space of dark workshop. Some precisely manufactured small black automotive vent trims and a compact scanning tool on a tidy workbench in near foreground. Long diffused overhead studio light makes metallic surface readable, subtle muted green reflection, deep graphite charcoal and warm gray palette. Quiet mechanical craft, precise analog heritage meeting modern digital fabrication. Extremely realistic physical materials, art-directed automotive photography, no people, no words, no logos, no labels, no watermarks, no glowing sci-fi holograms. Entire image stays premium and restrained.

## Verificação

- `npm run build`: passou, incluindo TypeScript e geração estática da rota.
- ESLint dos arquivos alterados nesta tarefa: passou.
- `npm test`: 22 testes existentes passaram em 5 arquivos.
- Playwright CLI em build de produção: 34 verificações da landing e 13 de integração passaram.
- Sem violações detectadas por axe nas regras WCAG A/AA utilizadas, desktop e mobile. Isto não equivale a certificação completa de acessibilidade.
- Larguras conferidas: 320, 360, 390, 768, 1024, 1440 e 1920 px, sem overflow horizontal nos elementos inspecionados.
- Verificados seletores por mouse/teclado, três estados do diagrama, conteúdo da mensagem e destinatário, FAQ, metadados, sitemap, conteúdo estático, contato sem JavaScript, movimento reduzido e ausência de erros JavaScript não tratados.
- Verificados consentimento e ausência de texto do briefing nos eventos, acesso à nova rota pela home e preservação da landing de comunicação visual.
- Não enviada mensagem real no WhatsApp. Sem medição de conversão ou desempenho de produção. Uma advertência de CSS pré-carregado não utilizado pertence ao carregamento compartilhado do site; sem erro de execução da página.

Prévias: `output/playwright/engineering-desktop.png`, `engineering-desktop-full.png`, `engineering-mobile.png`, `engineering-mobile-full.png` e `engineering-mobile-brief.png`.
