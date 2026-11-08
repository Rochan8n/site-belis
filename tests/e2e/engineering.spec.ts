import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";

test.beforeEach(async ({ page }) => {
  await page.route(/google-analytics\.com|googletagmanager\.com/, (route) => route.abort());
  await page.goto("/engenharia-reversa");
  const reject = page.getByRole("button", { name: "Recusar análise" });
  if (await reject.isVisible()) await reject.click();
});

test("application and brief share the chosen sector without losing entered details", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.getByRole("radio", { name: /Indústria & máquinas/ }).check();
  await page.getByRole("link", { name: "Preparar briefing", exact: true }).click();
  const sector = page.getByLabel("Seu projeto", { exact: true });
  await expect(sector).toHaveValue("Industrial — máquinas e equipamentos");
  await page.getByRole("textbox", { name: /Qual é a peça/ }).fill("Guia de montagem & suporte");
  await page.getByLabel(/O que precisamos saber/).fill("2 unidades, São Paulo.");
  const link = page.locator('[data-engineering-contact="brief"]');
  let message = new URL((await link.getAttribute("href"))!).searchParams.get("text");
  expect(message).toContain("Área: Industrial — máquinas e equipamentos.");
  expect(message).toContain("Guia de montagem & suporte");
  await sector.selectOption("Automotivo — performance e custom");
  await expect(page.getByRole("radio", { name: /Performance & custom/ })).toBeChecked();
  await expect(page.getByRole("textbox", { name: /Qual é a peça/ })).toHaveValue("Guia de montagem & suporte");
  await sector.selectOption("Outro projeto");
  message = new URL((await link.getAttribute("href"))!).searchParams.get("text");
  expect(message).toContain("Área: Outro projeto.");
  expect(message).toContain("2 unidades, São Paulo.");
  await expect(page.getByRole("radio", { name: /Performance & custom/ })).not.toBeChecked();
  await page.getByRole("radio", { name: /Performance & custom/ }).check();
  await expect(sector).toHaveValue("Automotivo — performance e custom");
  await page.getByRole("radio", { name: /Clássicos & raros/ }).check();
  await expect(sector).toHaveValue("Automotivo — clássicos e raros");
  expect(errors).toEqual([]);
});

test("contact and explanatory stages work without submitting a message", async ({ page }) => {
  await expect(page.locator('[data-engineering-contact="hero"]')).toHaveAttribute("href", /^https:\/\/wa.me\/5511973138895\?text=/);
  await page.getByRole("button", { name: "Escaneamento", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Capturar a forma." })).toBeVisible();
  await page.getByRole("button", { name: "Peça", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Produzir e conferir." })).toBeVisible();
  const question = page.getByText("Escaneamento e modelagem 3D podem ser contratados separadamente?", { exact: true });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/Malha de escaneamento e modelo CAD são entregas diferentes/)).toBeVisible();
});

test("mobile disclosures stay readable and layouts remain contained", async ({ page }, testInfo) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const locator of [page.locator("figure figcaption"), page.getByText("Cena ilustrativa gerada por IA; não representa um projeto entregue.", { exact: true }), page.getByText("ILUSTRAÇÃO / SEM ESCALA", { exact: true })]) {
      expect(await locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(12);
    }
  }
  await page.setViewportSize(testInfo.project.name === "mobile-chromium" ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  await fs.mkdir("output/landing-improvements-2026-11-08", { recursive: true });
  await page.screenshot({ path: `output/landing-improvements-2026-11-08/${testInfo.project.name}-engineering-hero.png` });
  for (const id of ["aplicacoes", "processo", "materiais", "projeto"]) {
    await page.locator(`#${id}`).screenshot({ path: `output/landing-improvements-2026-11-08/${testInfo.project.name}-engineering-${id}.png` });
  }
});

test("@a11y engineering controls and open FAQ have no WCAG A/AA violations", async ({ page }) => {
  await page.getByText("Qualquer peça pode ser substituída por impressão 3D?", { exact: true }).click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});
