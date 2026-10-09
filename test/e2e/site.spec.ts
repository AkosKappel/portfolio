import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Ákos Kappel" },
  { path: "/projects", heading: "Projects" },
  { path: "/projects/glaucoma-segmentation", heading: "Glaucoma Segmentation" },
  { path: "/experience", heading: "Experience" },
  { path: "/skills", heading: "Skills" },
  { path: "/education", heading: "Education" },
  { path: "/about", heading: "About me" },
  { path: "/contact", heading: "Contact" },
  { path: "/cv", heading: "Ákos Kappel" },
];

for (const theme of ["light", "dark"] as const) {
  test.describe(`${theme} theme`, () => {
    test.use({ colorScheme: theme });

    for (const { path, heading } of pages) {
      test(`${path} renders without accessibility violations`, async ({ page }) => {
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
          .analyze();
        expect(results.violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual(
          [],
        );
      });
    }
  });
}

test("unknown pages return 404 with links back", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
});

test("project search tolerates typos and keeps state in the URL", async ({ page }) => {
  await page.goto("/projects");
  await page.getByLabel("Search projects").fill("phoenx");
  await expect(page.getByRole("main").getByRole("heading", { level: 2 })).toHaveText([
    "Modern Fashion Store",
  ]);
  await expect(page).toHaveURL(/q=phoenx/);

  await page.reload();
  await expect(page.getByLabel("Search projects")).toHaveValue("phoenx");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("13 projects")).toBeVisible();
});

test("area filter and table view sort projects", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "AI", exact: true }).click();
  await page.getByRole("button", { name: "Table view" }).click();
  await page.getByLabel("Sort").selectOption("year-asc");
  await expect(page.getByRole("rowheader")).toHaveText(["PetGuide", "Glaucoma Segmentation"]);
  await expect(page).toHaveURL(/area=AI/);
});

test("project cards open their case study", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Glaucoma Segmentation" }).first().click();
  await expect(page).toHaveURL(/\/projects\/glaucoma-segmentation$/);
  await expect(page.getByText("96.8 %").first()).toBeVisible();
});

test("theme choice is remembered", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("CV menu offers both languages", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Download CV").click();
  for (const language of ["English", "Slovak"]) {
    const link = page.getByRole("link", { name: new RegExp(language) });
    const href = await link.getAttribute("href");
    const response = await page.request.get(href ?? "");
    expect(response.headers()["content-type"]).toContain("application/pdf");
  }
});

test("mobile menu opens, closes with Escape and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The menu button only shows on small screens");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();

  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(menu).toBeHidden();
});
