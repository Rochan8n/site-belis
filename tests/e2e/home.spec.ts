import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home renders", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Ativos Digitais/i);
  await expect(page.locator("body")).toBeVisible();
});

test("@a11y home has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const serious = results.violations.filter(({ impact }) =>
    impact === "serious" || impact === "critical"
  );
  expect(serious).toEqual([]);
});
