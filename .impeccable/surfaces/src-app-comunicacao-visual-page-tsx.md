---
version: 1
slug: "src-app-comunicacao-visual-page-tsx"
primary_target: "src/app/comunicacao-visual/page.tsx"
related_targets: ["src/components/visual/VisualLanding.tsx","src/components/visual/visual.module.css","src/components/visual/VisualAtmosphere.tsx","src/components/visual/visualAtmosphere.module.css","public/belis-blob-watermark.svg","src/components/visual/SignStudio.tsx","src/components/visual/signCatalog.ts","src/components/visual/signStudio.module.css","src/components/visual/FloatingVisualWhatsApp.tsx"]
---

# Comunicação visual

Last Updated: 2026-11-06

Target: src/app/comunicacao-visual/page.tsx
Mode: persuade
Scope: página nova dentro da identidade Belis, com superfície mais clara autorizada.

Audience: empresas buscando letreiros, letras caixa e logos personalizados.
Job: escolher uma direção, entender o escopo e conversar sobre orçamento.
Action: WhatsApp contextual, incluindo referência do simulador.
Proof: conceitos ilustrativos declarados; não há portfólio entregue nesta frente.
Constraints: São Paulo + Brasil, criação/produção/envio, instalação a combinar.

Direction: estúdio de amostras de letras, candidato estrutural 3, seed f132dd92.
Comp: .impeccable/mocks/composicao-1.png, selecionada sob direção criativa delegada
no pedido original; escolha comunicada. Não é aprovação individual do usuário.
Refinement: pedido explícito de fundos menos monótonos, blob como marca d’água,
letras que acompanham o mouse e formas/logos neon; registrado em
.impeccable/visual-brief.md. Amplia a decoração sem substituir a composição ou o seed.

Inventory:
- Marca, navegação, títulos, texto, CTA: HTML/CSS com Archivo do sistema existente.
- Hero a/B com material e sombra: raster gerado, sem recorte do comp; CSS perspective.
- Controles de materiais do comp: omitidos por materiais não confirmados; substituídos
  por simulador funcional de estilos abaixo da galeria, sem prometer materiais.
- Galeria de fachada/logo/luz/estilo: quatro rasters próprios, layout assimétrico.
- Fundos VisualAtmosphere: hero, gallery, neon e closing. Hero mantém copy/CTA à
  esquerda e fotografia à direita, com blob original, “a” contornado e forma neon
  nas margens. Galeria e fechamento repetem watermark e contornos próprios.
- Seção escura: monograma vetorial “b.”, lettering “oi”, arco e marca geométrica
  luminosa substituem os antigos Aa. Verde e branco quente locais, sem nova paleta
  global ou alegação de trabalhos entregues. Blob: public/belis-blob-watermark.svg.
- Decoração aria-hidden e pointer-events none; eventos passivos escrevem CSS via
  um rAF por lote, sem loop contínuo, estado React de movimento, WebGL ou dependência.
  Touch e reduced-motion ficam estáticos. Saída, offscreen, documento oculto e blur
  restauram a posição; listeners, observer e frame são limpos na desmontagem.
- Personalizador: vitrine simples de nome, letra, efeito e cor. Prévia com 24
  camadas CSS em translateZ e miniaturas com 12; sem CAD ou medidas de produção.
- Catálogo em src/components/visual/signCatalog.ts: 18 letras, 15 efeitos e 25 cores.
  Archivo mantém a interface; as 17 fontes específicas usam next/font local,
  preload false e swap. As fontes da lista são ativadas por IntersectionObserver
  a até 700px da seção. ResizeObserver ajusta a prévia à largura dos glifos.
- Efeitos: relevo, frontal, halo, dupla luz, neon, lateral translúcida, faixa de luz,
  duas faixas, meia lateral, luz por inteiro, pontos de luz, frente ripada,
  luz emoldurada, relevo bicolor e borda elevada. A profundidade é apenas visual.
- Paleta de 25 referências restrita às amostras; pesquisa e distinção entre
  soluções documentadas e conceitos em docs/comunicacao-visual-efeitos.md.
- Abas Letra/Efeito/Cor, radios nativos, botões Dia/Noite e giro com aria-pressed.
  Listas com rolagem interna; fontes em quatro colunas e cores em cinco.
  Até 380px: fontes em três colunas e cores em quatro.
  No mobile: nome, prévia sticky, abas sticky e CTA; ambos estáticos até 600px de altura.
- CTA do personalizador leva nome, letra/família, efeito e cor ao WhatsApp.
  O contato flutuante se oculta enquanto o personalizador está visível.
- Processo, FAQ e fechamento: HTML semântico; details nativo funciona sem JS.
- Ícones: Lucide + WhatsApp de react-icons; nada de glifos decorativos novos.

Unresolved: preços, prazos, frete e instalação por projeto; métricas reais após publicação.
