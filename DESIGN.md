---
name: Belis Agency
description: Identidade Belis existente e sua extensão material para comunicação visual.
colors:
  belis-dark: "#0A0A0C"
  belis-dark-2: "#050506"
  belis-paper: "#E9E5DA"
  belis-paper-2: "#E5E2D5"
  belis-ink: "#16161A"
  belis-green: "#74C365"
  cream: "#EFECE2"
  visual-muted: "#55554d"
  visual-rule: "#c9c6bc"
  visual-focus: "#347029"
  visual-field: "#f1f0e9"
  visual-action-hover: "#89d47a"
typography:
  brand-heading:
    fontFamily: "Archivo, sans-serif"
  global-body:
    fontFamily: "Inter Tight, sans-serif"
  global-mono:
    fontFamily: "IBM Plex Mono, monospace"
  visual-display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(52px, 5.9vw, 90px)"
    fontWeight: 700
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  visual-headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(32px, 3.45vw, 52px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  visual-body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  visual-label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  control: "4px"
spacing:
  gap-small: "8px"
  gap-inline: "12px"
  gap-medium: "16px"
  gap-content: "20px"
  gap-large: "24px"
  belis-edge: "clamp(22px, 6vw, 120px)"
  visual-edge: "clamp(24px, 5.4vw, 88px)"
components:
  visual-button-primary:
    backgroundColor: "{colors.belis-green}"
    textColor: "{colors.belis-ink}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  visual-button-primary-hover:
    backgroundColor: "{colors.visual-action-hover}"
  visual-button-inverse:
    backgroundColor: "{colors.belis-ink}"
    textColor: "{colors.belis-paper}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  visual-name-field:
    backgroundColor: "{colors.visual-field}"
    textColor: "{colors.belis-ink}"
    rounded: "{rounded.control}"
    padding: "13px 16px"
    width: "100%"
  visual-style-choice:
    textColor: "{colors.belis-ink}"
    rounded: "{rounded.control}"
    padding: "16px 3px 12px"
  visual-style-choice-selected:
    backgroundColor: "{colors.visual-field}"
  visual-text-link:
    textColor: "{colors.belis-ink}"
    padding: "10px 0 7px"
---

# Design System: Belis Agency

**Last Updated:** 2026-11-06

## Overview

**Creative North Star: "Estúdio material Belis"**

A identidade existente combina marca tipográfica BELIS, preto, papel, tinta e verde, composição ampla e contraste forte. Archivo conduz títulos e marca; Inter Tight permanece como família de leitura global; IBM Plex Mono atende códigos e medições nas superfícies existentes. Volume e movimento já pertencem à linguagem Belis.

Comunicação visual estende essa identidade com uma superfície clara e amostras de letras, acabamentos e aplicações físicas. O estúdio material descreve esta extensão, não uma substituição do site inteiro. Os tokens `visual-*` e os componentes abaixo têm esse escopo. Cores de materiais e luz nas imagens não criam novas cores de marca. A extensão inclui a marca d’água original do blob Belis, letras contornadas e monogramas luminosos nas margens; a composição mais expressiva foi solicitada pelo usuário e mantém fotografia, leitura e ações como conteúdo principal.

**Key Characteristics:**
- Contraste de papel, tinta e preto com o verde Belis como assinatura.
- Tipografia expressiva, áreas abertas e imagens de materiais em destaque.
- Controles discretos, volume nas amostras e fundos com letras e contornos luminosos.
- Marca d’água Belis e movimento decorativo que acompanha o mouse.
- Conceitos ilustrativos identificados junto da experiência.

Fonte de verdade: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/visual/visual.module.css`, `src/components/visual/signStudio.module.css`, `src/components/visual/VisualLanding.tsx`, `src/components/visual/HeroShowcase.tsx`, `src/components/visual/VisualAtmosphere.tsx`, `src/components/visual/visualAtmosphere.module.css`, `public/belis-blob-watermark.svg`, `src/components/visual/SignStudio.tsx`, `src/components/visual/signCatalog.ts`, `src/components/visual/FloatingVisualWhatsApp.tsx` e `src/app/comunicacao-visual/page.tsx`. O frontmatter registra valores compartilhados; composições particulares não se tornam tokens globais. Compromissos duráveis de marca constam em `PRODUCT.md`.

## Colors

Papel quente e tinta escura mantêm o caráter da marca; o verde une ações, amostras e áreas de destaque.

### Primary
- **Verde Belis** (`belis-green`): assinatura existente; na landing aparece nos CTAs e na área final de contato.
- **Verde de interação** (`visual-action-hover`): resposta de hover nos botões verdes da landing.
- **Verde de foco** (`visual-focus`): anéis de teclado e indicação de seleção no simulador.

### Neutral
- **Preto Belis** (`belis-dark`, `belis-dark-2`): fundos da identidade existente, preservados nas demais rotas.
- **Papel Belis** (`belis-paper`, `belis-paper-2`): superfícies claras da identidade; o primeiro é a base da landing.
- **Tinta Belis** (`belis-ink`): textos e botões invertidos em superfícies claras.
- **Creme global** (`cream`): primeiro plano do tema global escuro; não substitui o papel local.
- **Tinta secundária** (`visual-muted`): descrições e informação auxiliar na landing.
- **Linha de papel** (`visual-rule`): separadores de navegação, etapas e perguntas.
- **Papel de campo** (`visual-field`): entrada de texto e referência de letra selecionada.

**The Identity Continuity Rule.** A extensão clara conserva papel, tinta e verde Belis; acabamentos de produto não redefinem a paleta global.

Os fundos luminosos usam tonalidades locais do verde Belis e branco quente: tubos claros e brilho verde, com o lettering “oi” em branco quente. Essas cores descrevem luz decorativa da landing; não acrescentam acentos à identidade global.

### Paleta local da prévia
As 25 cores são referências de produto, com valores de face, lateral e luz definidos em `src/components/visual/signCatalog.ts`. Não são cores adicionais da marca nem uma escala tonal da interface. O cenário usa superfície clara de dia e escura à noite; efeitos iluminados usam a tonalidade de luz da opção selecionada.

| Referência | Face | Lateral | Luz |
| --- | --- | --- | --- |
| Verde | `#355e3c` | `#203b27` | `#c3ecbc` |
| Marfim | `#e9e2cf` | `#938d7d` | `#fff2d4` |
| Grafite | `#383c40` | `#171b20` | `#e4edf7` |
| Terracota | `#ad5d47` | `#66362c` | `#ffd0ad` |
| Champagne | `#bda16c` | `#74603d` | `#ffe3a8` |
| Branco | `#f7f5ee` | `#a9aaa2` | `#fffdf1` |
| Preto | `#202122` | `#0f1112` | `#eef1ee` |
| Cinza | `#7c8181` | `#454b4c` | `#e4ecec` |
| Prata | `#c5c8c7` | `#747d7c` | `#effbfa` |
| Areia | `#d3bfa0` | `#8c785a` | `#ffecd0` |
| Caramelo | `#b47b43` | `#6e4929` | `#ffdda7` |
| Cobre | `#b76b4a` | `#71432e` | `#ffd1b1` |
| Chocolate | `#654337` | `#38271f` | `#e8c7b1` |
| Vinho | `#742f3f` | `#411e29` | `#f6bac7` |
| Vermelho | `#b83c39` | `#722927` | `#ffb7ac` |
| Coral | `#d97b66` | `#8d493e` | `#ffcfb9` |
| Rosa antigo | `#bf8890` | `#79515b` | `#ffd7dd` |
| Blush | `#e8bfb1` | `#9e7d70` | `#ffe6dc` |
| Lavanda | `#a396b7` | `#685c7d` | `#e9dcff` |
| Ameixa | `#644961` | `#3a293b` | `#e8c7e3` |
| Azul marinho | `#243e5c` | `#15253c` | `#b9d8fc` |
| Azul petróleo | `#30656b` | `#1b3d42` | `#b9e9eb` |
| Azul | `#487ca5` | `#2b4c69` | `#c3e6ff` |
| Sálvia | `#9cae98` | `#5f735c` | `#e0f3d9` |
| Verde oliva | `#7c8151` | `#4b5031` | `#e3e9b5` |

## Typography

**Display Font:** Archivo, sans-serif.
**Body Font:** Inter Tight, sans-serif, no sistema global; Archivo, sans-serif, na landing de comunicação visual.
**Label/Mono Font:** IBM Plex Mono, monospace, no sistema existente; rótulos do simulador usam Archivo.

Tipografia de peso e contraste, com títulos compactos e descrições mais abertas. As fontes do personalizador demonstram possibilidades de letras; não ampliam a escala tipográfica da interface. Bodoni Moda desenha o “a” do hero e o ampersand da galeria; Satisfy desenha o “oi” luminoso. O monograma “b.” é vetorial, sem nova fonte de interface.

| Referência de letra | Família | Peso |
| --- | --- | --- |
| Essencial | Archivo | 500 |
| Clássica | Bodoni Moda | 500 |
| Manuscrita | Satisfy | 400 |
| Marcante | Bebas Neue | 400 |
| Retrô | Righteous | 400 |
| Geométrica | Syne | 700 |
| Criativa | Bungee | 400 |
| Assinatura | Pacifico | 400 |
| Elegante | Cormorant Garamond | 600 |
| Editorial | Playfair Display | 600 |
| Romana | Cinzel | 600 |
| Moderna | Montserrat | 600 |
| Arredondada | Quicksand | 600 |
| Compacta | Oswald | 600 |
| Impacto | Anton | 400 |
| Artesanal | Caveat | 600 |
| Caligráfica | Dancing Script | 600 |
| Futurista | Orbitron | 500 |

As 17 famílias específicas da rota são servidas localmente por `next/font`, com `preload: false` e `display: swap`. As amostras da lista recebem suas fontes quando um `IntersectionObserver` detecta a seção a até 700px da janela. Archivo continua sendo a fonte da interface. Bodoni Moda, Cormorant Garamond, Playfair Display e Cinzel usam fallback Georgia/serif; Satisfy, Pacifico, Caveat e Dancing Script usam cursive; as demais usam sans-serif. O tamanho da prévia é ajustado à largura real dos glifos por `ResizeObserver`, incluindo mudanças de fonte e do contêiner.

### Hierarchy
- **Display:** `visual-display` rege o título principal no desktop. Até 1100px usa `clamp(52px, 6.4vw, 70px)`; até 760px, `clamp(48px, 12.8vw, 78px)`.
- **Headline:** `visual-headline` rege títulos de seção. Até 760px usa `clamp(32px, 8vw, 46px)`; o encerramento amplia a escala dentro da mesma família e peso.
- **Title:** títulos de amostras e etapas usam peso 500, menores que os títulos de seção; variam conforme o conteúdo.
- **Body:** `visual-body` é a base da landing; descrições compactas usam 14–15px, e o texto de abertura chega a 20px. Blocos de prosa têm largura contida, normalmente entre 410 e 500px no desktop.
- **Label:** `visual-label` descreve o rótulo do campo de nome e a aba selecionada; legendas dos grupos usam 13px e peso regular. Legendas e notas locais têm escalas próprias e não definem uma escala global de leitura.

**The Clear Hierarchy Rule.** Na landing, o título principal usa 700 e os títulos de seção usam 600; não acrescentar pequenos rótulos acima deles.

**The Specimen Font Rule.** Famílias serifadas, manuscritas e de exibição demonstram possibilidades de letras; a interface da landing permanece em Archivo.

## Layout

A identidade global mantém sua margem fluida `belis-edge`. A landing possui margem própria `visual-edge`, grids abertos e separadores finos. Cabeçalho compacto, título à esquerda e amostra fotográfica à direita formam a abertura no desktop; a faixa de atendimento aparece imediatamente depois da abertura. Essa composição é local, não um modelo obrigatório para as demais rotas. A marca d’água e o “a” contornado ocupam margens do hero junto de um contorno neon; a galeria recebe letras e blob em baixa opacidade. Conteúdo e CTAs mantêm suas camadas de leitura, sem interceptação por decoração.

As amostras formam duas colunas desiguais, com deslocamento vertical alternado; não ficam dentro de cartões com molduras. Simulador, processo e perguntas usam duas colunas para relacionar explicação e conteúdo. Intervalos recorrentes de 8–24px organizam controles, enquanto seções possuem respiro maior, ajustado ao conteúdo.

Até 1100px, gaps e proporções se compactam; o personalizador ajusta suas duas colunas em 1050px. Até 760px, os grids principais passam a uma coluna, a navegação ocupa uma segunda linha e os deslocamentos da galeria desaparecem. No personalizador, a sequência móvel é nome, prévia, abas Letra/Efeito/Cor e CTA. Prévia e abas usam `position: sticky` no mobile; ambas voltam ao fluxo normal em janelas de até 600px de altura. No desktop, a prévia permanece sticky à esquerda e os controles ficam à direita. As listas possuem rolagem interna, limitada a 334px no desktop e 286px no mobile. Acima de 1700px, a margem usa `max(88px, calc((100vw - 1500px) / 2))`.

**The Scope Rule.** Margens, escala e composição da comunicação visual se aplicam à sua landing; preservar as decisões das páginas existentes.

## Elevation & Depth

Na landing, superfícies e controles são predominantemente planos: contraste tonal, espaço e linhas organizam a página. Fotografia mostra o volume físico; o simulador usa camadas CSS 3D para explicar a referência de letra. Letras contornadas, monograma vetorial, arco e marca geométrica usam brilho e sobreposição, sem extrusão. O `B` de encerramento permanece plano, ainda que rotacionado. O contato flutuante usa sombra ambiente para se separar do conteúdo.

Inclinação sutil responde ao mouse na imagem principal; os fundos deslocam peças em intensidades e direções diferentes conforme a posição do mouse. Troca de luz e giro respondem a controles explícitos no simulador. A preferência por movimento reduzido remove a animação e a inclinação do hero e desativa transições; os fundos preservam sua composição estática e a mudança funcional de estado do simulador permanece imediata.

**The Material Depth Rule.** Na landing, extrusão demonstra letras e materiais na prévia; fundos decorativos podem usar contornos luminosos, sombras de luz e sobreposição, mantendo controles de navegação planos.

**The Passive Atmosphere Rule.** Fundos decorativos nunca recebem cliques ou foco e ficam fora da árvore de acessibilidade; movimento só acompanha o mouse em seções visíveis, com composição estática no toque e em movimento reduzido.

Valores de sombra, perspectiva, movimento e foco ficam em `.impeccable/design.json`, pois não são campos do frontmatter portátil.

## Shapes

Imagens e áreas editoriais usam recortes retangulares. Botões, campos e escolhas do personalizador compartilham cantos discretos (`rounded.control`). Linhas de um pixel estabelecem limites sem converter toda seção em cartão. Amostras circulares identificam as cores; o contato flutuante tem silhueta arredondada própria à sua função. A extrusão das letras pertence à prévia do produto. Nos fundos, o blob usa o SVG original da marca; arcos, contornos arredondados, monograma “b.” e marca geométrica são traços vetoriais luminosos. Essa liberdade formal é local à decoração, sem alterar o formato dos controles.

## Components

### Buttons
CTAs sólidos, legíveis e diretos. A variante primária usa verde com tinta; sobre o encerramento verde, a variante invertida usa tinta com papel. O botão principal tem altura mínima de 56px, peso 600 e texto de 15px. O cabeçalho usa uma versão compacta; no mobile, o CTA do simulador ocupa toda a largura. Hover altera o fundo; foco de teclado usa contorno verde de 3px com afastamento de 5px.

### Links
Links de ação secundária usam tinta, linha inferior e seta SVG. A seta se desloca levemente no hover; foco mantém o contorno visível. Navegação e rodapé usam sublinhado no hover. Ícones complementam texto ou recebem nome acessível quando o texto fica oculto.

### Inputs / Fields
Campo de nome com papel claro, borda discreta, cantos comuns, texto de 20px e limite de 24 caracteres. Rótulo e ajuda permanecem associados. As 18 referências de letra usam radios nativos em quatro colunas, com amostra acima e nome abaixo. Os 15 efeitos usam lista vertical e as 25 cores usam grade de cinco colunas. Até 380px, letras passam a três colunas e cores a quatro. Todos os catálogos têm rolagem interna e contagem de opções na legenda; seleção combina fundo claro, borda verde, reforço interno de um pixel e ícone de confirmação. As abas Letra/Efeito/Cor expõem apenas o painel ativo, com navegação por setas, Home e End. Dia/Noite e giro são botões com `aria-pressed`; seus nomes acessíveis contêm os textos visíveis.

### Navigation
Marca BELIS à esquerda, âncoras de seção e CTA. No mobile, as âncoras passam para uma linha própria e continuam visíveis. O link de salto aparece ao receber foco. O contato flutuante conserva nome acessível quando passa de texto com ícone a ícone circular. Ele fica oculto somente enquanto a seção do personalizador está visível, abrindo espaço para o CTA que leva a combinação escolhida.

### Open Image Studies
A galeria usa imagem, título, descrição e link em composição aberta. Cada imagem tem descrição alternativa; a nota introdutória declara que são conceitos gerados por IA. A amostra do hero tem sua própria legenda ilustrativa. Nenhum desses estudos representa prova de um projeto entregue.

### Visual Atmosphere
Quatro variantes de `VisualAtmosphere` estendem o estúdio às margens: `hero` combina blob, “a” contornado e forma neon; `gallery` combina blob, “a” e ampersand; `neon` apresenta monograma vetorial “b.”, lettering “oi”, arco e marca geométrica; `closing` combina blob e contorno arredondado atrás do fechamento. A marca d’água usa `public/belis-blob-watermark.svg`. A composição neon substitui as antigas amostras `Aa`, preservando o texto da seção. Toda essa arte é decorativa, sem indicar clientes ou projetos entregues.

As camadas usam `aria-hidden="true"`, SVGs sem foco e `pointer-events: none`. No mobile, posições e escala são recompostas; o painel neon passa de 620px de altura mínima para 360px, ou 320px até 380px de largura. A composição estática permanece em dispositivos de toque e com movimento reduzido; impressão oculta a decoração.

O movimento exige mouse com ponteiro preciso, hover e ausência de movimento reduzido. Um listener passivo agrupa eventos em um único `requestAnimationFrame` pendente e escreve propriedades CSS, sem estado React, loop contínuo, WebGL ou dependências novas. Sair da seção, sair da janela, ocultar o documento, mudar a preferência de movimento ou sair da área visível restaura a posição; a desmontagem limpa listeners, observer e frame pendente.

### Letter Studio
Vitrine interativa para o consumidor: nome, 18 letras, 15 efeitos e 25 cores de referência, definidos em `src/components/visual/signCatalog.ts`. Escolher um efeito define ambiente e posição inicial conforme os campos `lit` e `sideView`; o visitante pode alternar ambos separadamente. Giro e ambiente mudam a apresentação, sem controles de CAD ou medidas de produção.

| Efeito | Representação na amostra |
| --- | --- |
| Letras em relevo | Forma, volume e sombra. Sem luz. |
| Luz frontal | A frente da letra ganha luz. |
| Halo de luz | Luz por trás, desenhando a parede. |
| Dupla luz | Frente iluminada e halo ao redor. |
| Efeito neon | Um contorno de luz para sua marca. |
| Lateral translúcida | Frente sólida, luz pelas laterais. |
| Faixa de luz | Uma faixa luminosa no meio da lateral. |
| Duas faixas de luz | Dois filetes de luz contornam a lateral. |
| Meia lateral de luz | Metade sólida, metade iluminada. |
| Luz por inteiro | Frente e laterais deixam a luz passar. |
| Pontos de luz | Pequenos vazados iluminam a frente. |
| Frente ripada | Luz entre frisos, com ritmo e textura. |
| Luz emoldurada | Luz ao centro, borda sólida em relevo. |
| Relevo bicolor | Frente e lateral em tons diferentes. |
| Borda elevada | Uma moldura destaca o desenho da letra. |

A prévia combina 24 camadas CSS 3D; as miniaturas dos efeitos usam 12. A profundidade varia por efeito como recurso de tela, sem representar uma dimensão de fabricação. Faixas e laterais translúcidas usam intervalos de camadas iluminadas; pontos e frisos usam máscaras sobre um difusor; a luz emoldurada recua o difusor sob uma borda. Bicolor e borda elevada usam contraste calculado a partir da face escolhida. A pesquisa e a distinção entre soluções documentadas e conceitos de produção estão em `docs/comunicacao-visual-efeitos.md`.

A escala considera a largura medida do texto, não apenas a quantidade de caracteres. O resumo da combinação é anunciado com `aria-live="polite"`; o CTA “Quero um projeto assim” envia nome, letra/família, efeito e cor ao WhatsApp. A legenda identifica a simulação ilustrativa e informa que a combinação final depende do tamanho, do traço das letras e do local de uso.

### Questions
Perguntas usam `details` e `summary` nativos, com linhas divisórias, texto e ícone de adição que gira ao abrir. O foco de teclado segue os demais controles. A resposta permanece junto da pergunta.

## Do's and Don'ts

### Do:
- **Do** preservar a identidade global Belis e aplicar os tokens `visual-*` somente à extensão de comunicação visual.
- **Do** usar títulos diretos, fotografias de materiais e composições abertas na landing.
- **Do** manter identificações de conceitos ilustrativos próximas das imagens e da simulação.
- **Do** manter foco visível, rótulos associados e resposta à preferência por movimento reduzido.
- **Do** usar o blob original como marca d’água e manter formas luminosas em verde e branco quente como decoração passiva.
- **Do** reservar as 17 famílias específicas do catálogo às amostras e ao lettering decorativo documentado; manter Archivo na interface.

### Don't:
- **Don't** introduzir arco-íris ou estética RGB como identidade Belis.
- **Don't** aplicar a composição clara da landing automaticamente às páginas existentes.
- **Don't** acrescentar rótulos decorativos acima dos títulos da landing ou extrusão ao lettering dos fundos e ao `B` de encerramento.
- **Don't** tratar imagens geradas ou monogramas decorativos como trabalhos entregues, nem a simulação como especificação final.
- **Don't** transformar medidas isoladas de legendas, ornamentos ou cenários em tokens globais.
