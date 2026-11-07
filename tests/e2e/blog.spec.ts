import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/google-analytics\.com|googletagmanager\.com/, route => route.abort());
  await page.addInitScript(() => {
    // Keep the timed offer closed while testing reading and navigation.
    localStorage.setItem("belis_blog_offer_seen_at", String(Date.now()));
  });
});

test("catalog searches new and existing topics without accents and recovers from no results", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/blog");
  await expect(page.getByRole("status")).toHaveText("18 artigos encontrados");
  await expect(page.getByRole("region", { name: "Em destaque: engenharia reversa e comunicação visual" }).locator("article")).toHaveCount(2);
  const search = page.getByRole("searchbox", { name: "Buscar nos artigos" });
  await search.fill("engenharia reversa");
  await expect(page.getByRole("status")).toHaveText("6 artigos encontrados");
  await search.fill("comunicacao visual");
  await expect(page.getByRole("status")).toHaveText("6 artigos encontrados");
  await search.fill("audiovisual");
  await expect(page.getByRole("status")).toHaveText("2 artigos encontrados");
  await search.fill("zzzzzzzz");
  await expect(page.getByRole("status")).toHaveText("0 artigos encontrados");
  await page.getByRole("button", { name: "Limpar busca" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByRole("status")).toHaveText("18 artigos encontrados");
  expect(errors).toEqual([]);
});

for (const [theme, label, service] of [
  ["engenharia-reversa", "Engenharia reversa", "/engenharia-reversa"],
  ["comunicacao-visual", "Comunicação visual", "/comunicacao-visual"],
]) {
  test(`${theme} hub has six articles, service path and return link from landing`, async ({ page }) => {
    await page.goto(`/blog/temas/${theme}`);
    await expect(page.getByRole("status")).toHaveText("6 artigos encontrados");
    await expect(page.getByRole("navigation", { name: "Temas do blog" }).getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.locator("main article")).toHaveCount(6);
    await expect(page.locator(`main aside a[href="${service}"]`)).toBeVisible();
    await page.goto(service);
    await expect(page.getByRole("link", { name: `Guias de ${label.toLocaleLowerCase("pt-BR")}` })).toHaveAttribute("href", `/blog/temas/${theme}`);
  });
}

for (const slug of ["pecas-fora-de-linha-engenharia-reversa", "letra-caixa-iluminada-frontal-retroiluminada"]) {
  test(`${slug} supports reading, keyboard FAQ, checklist and contextual contact`, async ({ page }) => {
    await page.goto(`/blog/${slug}`);
    await expect(page.locator("article > figure figcaption")).toContainText("IA");
    const cover = page.locator("article > figure img");
    await expect(cover).toBeVisible();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const toc = page.getByRole("navigation", { name: "Índice do artigo" }).getByRole("link").first();
    const target = await toc.getAttribute("href");
    await toc.click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    const faq = page.locator("#perguntas-frequentes details").first();
    await faq.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(faq).toHaveAttribute("open", "");
    await expect(faq.locator("p")).toBeVisible();
    const href = new URL((await page.locator('a[data-blog-cta="bottom"]').getAttribute("href"))!);
    expect(href.origin + href.pathname).toBe("https://wa.me/5511973138895");
    expect(href.searchParams.get("text")).toContain(`Origem: https://www.belis.agency/blog/${slug}`);
    expect(href.searchParams.get("text")).toContain("Cidade:");
    const downloadPromise = page.waitForEvent("download");
    await page.locator(`a[href="/blog/${slug}/checklist"]`).click();
    expect((await downloadPromise).suggestedFilename()).toMatch(/\.txt$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
}

test("all articles and conversion paths remain available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/blog`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("status")).toHaveText("18 artigos encontrados");
    await page.goto(`${baseURL}/blog/como-preparar-logo-letreiro-3d`, { waitUntil: "domcontentloaded" });
    await page.locator("#perguntas-frequentes summary").first().click();
    await expect(page.locator("#perguntas-frequentes details").first().locator("p")).toBeVisible();
    await expect(page.locator('a[data-blog-cta="top"]')).toHaveAttribute("href", /^https:\/\/wa.me\//);
    await expect(page.locator('a[href$="/checklist"]')).toHaveCount(1);
  } finally {
    await context.close();
  }
});

test("blog index and both new article themes pass automated accessibility checks @a11y", async ({ page }) => {
  for (const route of ["/blog", "/blog/temas/engenharia-reversa", "/blog/temas/comunicacao-visual", "/blog/pecas-fora-de-linha-engenharia-reversa", "/blog/logotipo-3d-parede-recepcao"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations, route).toEqual([]);
  }
});

test("blog fits narrow screens and produces review captures", async ({ page }, testInfo) => {
  await page.goto("/blog", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("status")).toHaveText("18 artigos encontrados");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `width ${width}`).toBe(true);
  }
  await page.setViewportSize({ width: testInfo.project.name === "chromium" ? 1440 : 390, height: 1000 });
  // Let each responsive image enter the viewport before requiring a lazy load.
  for (const image of await page.locator("main section[aria-label] img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `output/blog-qa/blog-expanded-${testInfo.project.name}.png`, fullPage: true });
});
