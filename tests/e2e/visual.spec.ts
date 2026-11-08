import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { signFonts, signDesigns, signColors } from "../../src/components/visual/signCatalog";

test.beforeEach(async ({ page }) => {
  // Keep test traffic out of the real analytics property.
  await page.route(/google-analytics\.com|googletagmanager\.com/, (route) => route.abort());
});

test("visual landing exposes crawlable offer, metadata and all WhatsApp destinations", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/comunicacao-visual");
  await expect(page).toHaveTitle(/Comunicação Visual: Letras Caixa/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.belis.agency/comunicacao-visual");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-comunicacao-visual\.jpg/);
  await expect(page.getByText("De São Paulo para todo o Brasil")).toBeVisible();
  const links = await page.locator("a[data-whatsapp-placement]").evaluateAll((items) => items.map((item) => (item as HTMLAnchorElement).href));
  expect(links.length).toBeGreaterThanOrEqual(10);
  for (const link of links) {
    const url = new URL(link);
    expect(url.host).toBe("wa.me");
    expect(url.pathname).toBe("/5511973138895");
    expect(url.searchParams.get("text")).toContain("Belis");
  }
  const response = await request.get("/comunicacao-visual");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("Nosso serviço inclui criação, produção e envio");
  expect(html).toContain('"@type":"Service"');
  expect(html).not.toContain('"@type":"AggregateRating"');
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("https://www.belis.agency/comunicacao-visual");
  expect(errors).toEqual([]);
});

test("studio sends the chosen text, font, effect and color to WhatsApp without sending a message", async ({ page }) => {
  await page.goto("/comunicacao-visual#seu-projeto");
  await page.getByLabel("Nome ou palavra").fill("Café & Cia + São Paulo");
  await page.getByRole("radio", { name: "Manuscrita", exact: true }).check();
  await page.getByRole("tab", { name: "Efeito", exact: true }).click();
  await page.getByRole("radio", { name: "Efeito neon", exact: true }).check();
  await page.getByRole("tab", { name: "Cor", exact: true }).click();
  await page.getByRole("radio", { name: "Terracota", exact: true }).check();
  const preview = page.getByRole("img", { name: /Simulação de Café & Cia/ });
  await expect(preview).toHaveAttribute("aria-label", /Manuscrita, Efeito neon, cor Terracota/);
  const link = page.getByRole("link", { name: "Quero um projeto assim" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.searchParams.get("text")).toContain("Texto: Café & Cia + São Paulo.");
  expect(url.searchParams.get("text")).toContain("Manuscrita");
  expect(url.searchParams.get("text")).toContain("Efeito neon");
  expect(url.searchParams.get("text")).toContain("Terracota");
  await expect(page.getByRole("button", { name: "Ambiente: Noite" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Ambiente: Noite" })).toContainText("Noite");
  await page.getByRole("button", { name: "Ambiente: Noite" }).click();
  await expect(page.getByRole("button", { name: "Ambiente: Dia" })).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Girar amostra" }).click();
  await expect(page.getByRole("button", { name: "Girar amostra" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Girar amostra: Ver de frente" })).toContainText("Ver de frente");
  await page.getByLabel("Nome ou palavra").fill("");
  await expect(page.getByRole("img", { name: /Simulação de Sua marca/ })).toBeVisible();
});

test("hero opens the studio and curated combinations remain editable", async ({ page }) => {
  await page.goto("/comunicacao-visual");
  const reject = page.getByRole("button", { name: "Recusar análise" });
  if (await reject.isVisible()) await reject.click();
  await page.getByRole("link", { name: "Simular meu letreiro", exact: true }).click();
  await expect(page).toHaveURL(/#seu-projeto$/);
  await page.getByLabel("Nome ou palavra").fill("Meu café");
  await page.getByRole("button", { name: /Recepção discreta/ }).click();
  await expect(page.getByRole("img", { name: /Simulação de Meu café/ })).toHaveAttribute("aria-label", /Moderna, Letras em relevo, cor Grafite/);
  await expect(page.getByRole("button", { name: "Ambiente: Dia" })).toHaveAttribute("aria-pressed", "false");
  const luminous = page.getByRole("button", { name: /Letreiro luminoso/ });
  await luminous.focus();
  await page.keyboard.press("Enter");
  await expect(luminous).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("img", { name: /Simulação de Meu café/ })).toHaveAttribute("aria-label", /Manuscrita, Efeito neon, cor Marfim/);
  await expect(page.getByRole("button", { name: "Ambiente: Noite" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("tab", { name: "Cor", exact: true }).click();
  await page.getByRole("radio", { name: "Azul", exact: true }).check();
  await expect(luminous).toHaveAttribute("aria-pressed", "false");
  const message = new URL((await page.locator('[data-whatsapp-placement="studio"]').getAttribute("href"))!).searchParams.get("text");
  expect(message).toContain("Texto: Meu café.");
  expect(message).toContain("Manuscrita (Satisfy)");
  expect(message).toContain("Efeito neon");
  expect(message).toContain("Cor de referência: Azul.");
});

test("FAQ and conversion links remain usable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/comunicacao-visual`);
  await page.getByText("Vocês fazem a instalação?", { exact: true }).click();
  await expect(page.getByText(/Nosso serviço inclui criação, produção e envio/)).toBeVisible();
  await expect(page.locator('[data-whatsapp-placement="hero"]')).toHaveAttribute("href", /^https:\/\/wa.me\/5511973138895/);
  await context.close();
});

test("effects and colors stay selectable with the preview visible on touch screens", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/comunicacao-visual#seu-projeto");
  const reject = page.getByRole("button", { name: "Recusar análise" });
  if (await reject.isVisible()) await reject.click();
  await page.getByLabel("Nome ou palavra").fill("Serena");
  await expect(page.locator('[data-whatsapp-placement="floating"]')).toHaveCount(0);
  await page.getByRole("radio", { name: "Clássica", exact: true }).check();
  await page.getByRole("tab", { name: "Efeito", exact: true }).click();
  await expect(page.locator('input[name="sign-design"]')).toHaveCount(15);
  await fs.mkdir("output/visual-qa", { recursive: true });
  const effectRenders = new Set<string>();
  for (const effect of signDesigns) {
    await page.getByRole("radio", { name: effect.label, exact: true }).check();
    const sample = page.getByRole("img", { name: /Simulação de Serena/ });
    await expect(sample).toHaveAttribute("aria-label", new RegExp(effect.label));
    const render = await sample.screenshot({ path: `output/visual-qa/${testInfo.project.name}-effect-${effect.id}.png` });
    effectRenders.add(createHash("sha256").update(render).digest("hex"));
    if (["faixa", "duasfaixas", "ripado"].includes(effect.id)) {
      await page.locator("#seu-projeto").scrollIntoViewIfNeeded();
      await page.locator("#seu-projeto").screenshot({ path: `output/visual-qa/${testInfo.project.name}-studio-${effect.id}.png` });
    }
  }
  expect(effectRenders.size).toBe(15);
  await page.getByRole("radio", { name: "Halo de luz", exact: true }).check();
  await page.getByRole("tab", { name: "Cor", exact: true }).click();
  await expect(page.locator('input[name="sign-color"]')).toHaveCount(25);
  for (const color of signColors) {
    await page.getByRole("radio", { name: color.label, exact: true }).check();
    await expect(page.getByRole("img", { name: /Simulação de Serena/ })).toHaveAttribute("aria-label", new RegExp("cor " + color.label));
    const message = new URL((await page.locator('[data-whatsapp-placement="studio"]').getAttribute("href"))!).searchParams.get("text");
    expect(message).toContain("Cor de referência: " + color.label);
  }
  await page.screenshot({ path: `output/visual-qa/${testInfo.project.name}-studio-colors-viewport.png` });
  if (testInfo.project.name === "mobile-chromium") {
    const tabsReachable = await page.getByRole("tab", { name: "Efeito", exact: true }).evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= innerHeight && element.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
    });
    expect(tabsReachable).toBe(true);
  }
  await page.locator("#seu-projeto").scrollIntoViewIfNeeded();
  await page.locator("#seu-projeto").screenshot({ path: `output/visual-qa/${testInfo.project.name}-studio-colors.png` });
  await page.getByRole("radio", { name: "Champagne", exact: true }).check();
  await page.getByRole("tab", { name: "Efeito", exact: true }).click();
  await page.evaluate(() => document.fonts.ready);
  await fs.mkdir("output/visual-qa", { recursive: true });
  await page.locator("#seu-projeto").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-whatsapp-placement="floating"]')).toHaveCount(0);
  await page.locator("#seu-projeto").screenshot({ path: `output/visual-qa/${testInfo.project.name}-studio-halo.png` });
  await page.getByRole("radio", { name: "Efeito neon", exact: true }).check();
  const results = await new AxeBuilder({ page }).include("#seu-projeto").withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.locator("#seu-projeto").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-whatsapp-placement="floating"]')).toHaveCount(0);
  await page.locator("#seu-projeto").screenshot({ path: `output/visual-qa/${testInfo.project.name}-studio-neon.png` });
  await page.locator("#duvidas").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-whatsapp-placement="floating"]')).toBeVisible();
});

test("@a11y visual landing, controls and open FAQ have no WCAG A/AA violations", async ({ page }) => {
  await page.goto("/comunicacao-visual");
  const reject = page.getByRole("button", { name: "Recusar análise" });
  if (await reject.isVisible()) await reject.click();
  await page.getByText("Vocês fazem a instalação?", { exact: true }).click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("consent controls never cover floating WhatsApp", async ({ page }) => {
  await page.goto("/comunicacao-visual");
  const floating = page.locator('[data-whatsapp-placement="floating"]');
  await expect(floating).toBeVisible();
  const hit = await floating.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2));
  });
  expect(hit).toBe(true);
});

test("reduced motion keeps hero and interactive preview visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/comunicacao-visual");
  const hero = page.getByRole("img", { name: /Estudo de letras/ });
  await expect(hero).toBeVisible();
  expect(await hero.evaluate((img) => getComputedStyle(img.parentElement!).animationName)).toBe("none");
  await page.getByLabel("Nome ou palavra").fill("Marca");
  await expect(page.getByRole("img", { name: /Simulação de Marca/ })).toBeVisible();
});

test("background letters react to mouse, preserve touch scrolling and respect motion preferences", async ({ page }, testInfo) => {
  await page.goto("/comunicacao-visual");
  const atmosphere = page.locator('[data-atmosphere="hero"]');
  const letter = atmosphere.locator("span");
  await expect(atmosphere).toHaveAttribute("aria-hidden", "true");
  expect(await atmosphere.evaluate((element) => getComputedStyle(element).pointerEvents)).toBe("none");
  const start = await letter.evaluate((element) => getComputedStyle(element).transform);
  const bounds = (await atmosphere.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * .8, bounds.y + bounds.height * .3);

  if (testInfo.project.name === "mobile-chromium") {
    // Mouse emulation must not enable motion on a coarse-pointer device.
    expect(await atmosphere.evaluate((element) => element.style.getPropertyValue("--cursor-x"))).toBe("");
    expect(await letter.evaluate((element) => getComputedStyle(element).transform)).toBe(start);
  } else {
    await expect.poll(() => atmosphere.evaluate((element) => element.style.getPropertyValue("--cursor-x"))).not.toBe("");
    await expect.poll(() => letter.evaluate((element) => getComputedStyle(element).transform)).not.toBe(start);
    await page.mouse.move(10, 10);
    await expect.poll(() => atmosphere.evaluate((element) => element.style.getPropertyValue("--cursor-x"))).toBe("");
    await page.mouse.move(bounds.x + bounds.width * .8, bounds.y + bounds.height * .3);
    await expect.poll(() => atmosphere.evaluate((element) => element.style.getPropertyValue("--cursor-x"))).not.toBe("");
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => atmosphere.evaluate((element) => element.style.getPropertyValue("--cursor-x"))).toBe("");
  expect(await letter.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");
  await page.mouse.move(bounds.x + bounds.width * .6, bounds.y + bounds.height * .4);
  expect(await atmosphere.evaluate((element) => element.style.getPropertyValue("--cursor-x"))).toBe("");
  const cta = page.locator('[data-whatsapp-placement="hero"]');
  expect(await cta.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
  })).toBe(true);
});

test("long names fit every font on narrow screens and keyboard operates tabs and effects", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/comunicacao-visual");
  await page.getByLabel("Nome ou palavra").fill("WWWWWWWWWWWWWWWWWWWWWWWW");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('input[name="letter-style"]')).toHaveCount(18);
  const families = new Set<string>();
  for (const font of signFonts) {
    await page.getByRole("radio", { name: font.label, exact: true }).check();
    const preview = page.getByRole("img", { name: /Simulação de WWWW/ });
    await page.evaluate(() => document.fonts.ready);
    families.add(await preview.evaluate((element) => getComputedStyle(element).fontFamily));
    await expect.poll(() => preview.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const parent = element.parentElement!.getBoundingClientRect();
      return bounds.left >= parent.left && bounds.right <= parent.right;
    })).toBe(true);
  }
  expect(families.size).toBe(18);
  await page.getByRole("tab", { name: "Letra", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Efeito", exact: true })).toBeFocused();
  await page.getByRole("radio", { name: "Halo de luz", exact: true }).focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("radio", { name: "Halo de luz", exact: true })).toBeChecked();
  await page.getByRole("tab", { name: "Efeito", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "Cor", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: "Letra", exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("specimen fonts load near the studio instead of competing with the hero", async ({ page }) => {
  await page.goto("/comunicacao-visual");
  await expect(page.locator("#seu-projeto")).toHaveAttribute("data-specimens-ready", "false");
  await page.evaluate(() => document.fonts.ready);
  // Check specimen families themselves: unrelated global font preloads can vary.
  const specimenFonts = () => page.evaluate(() => {
    const studio = document.getElementById("seu-projeto")!;
    const style = getComputedStyle(studio);
    const normalize = (family: string) => family.replace(/['"]/g, "").trim();
    const faces: FontFace[] = [];
    document.fonts.forEach((face) => faces.push(face));
    return ["--font-sign-condensed", "--font-sign-retro", "--font-sign-geometric", "--font-sign-display", "--font-sign-hand"].map((variable) => {
      const family = normalize(style.getPropertyValue(variable).split(",")[0]);
      const matching = faces.filter((face) => normalize(face.family) === family);
      return { family, registered: matching.length > 0, loaded: matching.some((face) => face.status === "loaded") };
    });
  });
  const before = await specimenFonts();
  expect(before.every((font) => font.registered && !font.loaded)).toBe(true);
  await page.getByLabel("Nome ou palavra").scrollIntoViewIfNeeded();
  await expect(page.locator("#seu-projeto")).toHaveAttribute("data-specimens-ready", "true");
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(specimenFonts).toEqual(before.map((font) => ({ ...font, loaded: true })));
});

test("WhatsApp tracking respects consent and excludes entered project text", async ({ page }) => {
  await page.goto("/comunicacao-visual");
  const analyticsConfigured = await page.getByRole("button", { name: "Recusar análise" }).isVisible();
  await page.evaluate(() => {
    const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void; visualTestEvents?: unknown[][] };
    analyticsWindow.visualTestEvents = [];
    analyticsWindow.gtag = (...args: unknown[]) => analyticsWindow.visualTestEvents!.push(args);
    document.querySelectorAll("a[data-whatsapp-placement]").forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
    localStorage.setItem("belis_analytics_consent", "denied");
    window.dispatchEvent(new Event("belis:analytics-consent"));
  });
  const heroLink = page.locator('[data-whatsapp-placement="hero"]');
  await heroLink.click();
  const getClicks = () => page.evaluate(() => ((window as Window & { visualTestEvents?: unknown[][] }).visualTestEvents ?? []).filter((event) => event[1] === "visual_whatsapp_click"));
  expect(await getClicks()).toEqual([]);
  await page.evaluate(() => {
    localStorage.setItem("belis_analytics_consent", "granted");
    window.dispatchEvent(new Event("belis:analytics-consent"));
  });
  await page.getByLabel("Nome ou palavra").fill("Nome privado de teste");
  await page.getByRole("link", { name: "Quero um projeto assim" }).click();
  const clicks = await getClicks();
  // A GA property is optional; if configured, only editorial identifiers leave.
  if (analyticsConfigured) {
    expect(clicks).toHaveLength(1);
    expect(clicks[0][2]).toEqual({ page_path: "/comunicacao-visual", cta_placement: "studio", project_type: "essencial_volume_verde" });
    expect(JSON.stringify(clicks)).not.toContain("Nome privado");
  } else expect(clicks).toEqual([]);
});

test("captures desktop and mobile layout without overflow", async ({ page }, testInfo) => {
  const dir = path.resolve("output/visual-qa");
  await fs.mkdir(dir, { recursive: true });
  await page.goto("/comunicacao-visual");
  const reject = page.getByRole("button", { name: "Recusar análise" });
  if (await reject.isVisible()) await reject.click();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
  const name = testInfo.project.name;
  const widths = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  await page.screenshot({ path: path.join(dir, `${name}-hero.png`) });
  for (const id of ["inspiracoes", "seu-projeto", "como-funciona", "duvidas"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.locator(`#${id}`).screenshot({ path: path.join(dir, `${name}-${id}.png`) });
  }
  for (const section of ["personal", "closing"]) {
    const region = page.locator(`section[aria-labelledby="${section}-title"]`);
    await region.scrollIntoViewIfNeeded();
    await region.screenshot({ path: path.join(dir, `${name}-${section}.png`) });
  }
  await page.screenshot({ path: path.join(dir, `${name}-full.png`), fullPage: true });
  const imageStates = await page.locator('main img').evaluateAll((imgs) => imgs.map((img) => ({ src: (img as HTMLImageElement).currentSrc, loaded: (img as HTMLImageElement).naturalWidth > 0 })));
  expect(imageStates.every((img) => img.loaded)).toBe(true);
  await page.goto("/");
  await expect(page.getByRole("link", { name: "COMUNICAÇÃO VISUAL" })).toBeVisible();
  await page.screenshot({ path: path.join(dir, `${name}-home.png`) });
});
