import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Ákos Kappel" },
  { path: "/projects", heading: "Projects" },
  { path: "/projects/glaucoma-segmentation", heading: "Glaucoma Segmentation" },
  { path: "/experience", heading: "Experience" },
  { path: "/activity", heading: "Activity" },
  { path: "/skills", heading: "Skills" },
  { path: "/education", heading: "Education" },
  { path: "/about", heading: "About me" },
  { path: "/contact", heading: "Contact" },
  { path: "/cv", heading: "Ákos Kappel" },
  { path: "/cv/pdf", heading: "Curriculum vitae" },
  { path: "/colophon", heading: "How this site is built" },
  { path: "/sk", heading: "Ákos Kappel" },
  { path: "/sk/projects", heading: "Projekty" },
  { path: "/sk/experience", heading: "Skúsenosti" },
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

  const slovak = await page.goto("/sk/neexistuje");
  expect(slovak?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Domov" })).toBeVisible();
});

test("English lives at the root and /en redirects there", async ({ page }) => {
  await page.goto("/en/projects");
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="alternate"][hreflang="sk"]')).toHaveAttribute(
    "href",
    /\/sk\/projects$/,
  );
});

test("language switcher keeps the current page", async ({ page }) => {
  await page.goto("/projects/fakeshop");
  await page
    .getByText(/^Language:/)
    .locator("..")
    .click();
  await page.getByRole("link", { name: "Slovak" }).click();
  await expect(page).toHaveURL(/\/sk\/projects\/fakeshop$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "sk");
  await expect(page.getByRole("link", { name: "Všetky projekty" })).toBeVisible();
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
  await expect(page.getByText("14 projects")).toBeVisible();
});

test("area filter and table view sort projects", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "AI", exact: true }).click();
  await page.getByRole("button", { name: "Table view" }).click();
  await page.getByLabel("Sort").selectOption("year-asc");
  await expect(page.getByRole("rowheader")).toHaveText(["PetGuide", "Glaucoma Segmentation"]);
  await expect(page).toHaveURL(/area=ai/);
});

test("projects appear under every area they belong to", async ({ page }) => {
  await page.goto("/projects?area=games&view=table");
  await expect(page.getByRole("rowheader")).toContainText(["Iridescent", "SketchBook"]);
});

test("skills link to the projects that use them", async ({ page }) => {
  await page.goto("/skills");
  await page.getByRole("link", { name: /^Elixir/ }).click();
  await expect(page).toHaveURL(/\/projects\?q=Elixir/);
  await expect(page.getByRole("main").getByRole("heading", { level: 2 }).first()).toBeVisible();
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

test("each mode remembers its theme across reloads and languages", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await page.getByTitle("Theme", { exact: true }).click();
  await page.getByRole("button", { name: "Dracula" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(html).toHaveAttribute("data-palette", "dracula");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(html).toHaveAttribute("data-palette", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(html).toHaveAttribute("data-palette", "dracula");
  await page.reload();
  await expect(html).toHaveAttribute("data-palette", "dracula");
  await page.locator("header summary").first().click();
  await page.getByRole("link", { name: "Slovak" }).click();
  await expect(page).toHaveURL(/\/sk$/);
  await expect(html).toHaveAttribute("data-palette", "dracula");
});

const themes = {
  light: ["light", "corporate", "nord", "cupcake", "retro"],
  dark: ["dark", "dracula", "dim", "coffee", "synthwave"],
};

for (const [mode, palettes] of Object.entries(themes)) {
  for (const palette of palettes) {
    test(`${palette} theme passes the accessibility checks`, async ({ page, isMobile }) => {
      test.skip(isMobile, "colours do not depend on the viewport");
      await page.addInitScript(
        ([mode, palette]) => {
          localStorage.setItem("theme", mode);
          localStorage.setItem(`palette-${mode}`, palette);
        },
        [mode, palette],
      );
      await page.goto("/projects/glaucoma-segmentation");
      await expect(page.locator("html")).toHaveAttribute("data-palette", palette);
      const results = await new AxeBuilder({ page }).withTags(["wcag2aa"]).analyze();
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });
  }
}

test("switching language keeps the theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.locator("header summary").first().click();
  await page.getByRole("link", { name: "Slovak" }).click();
  await expect(page).toHaveURL(/\/sk$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("contact form explains invalid fields and clears fixed ones", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator("form");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(form.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  await page.getByRole("textbox", { name: "Email" }).fill("jane@example.com");
  await expect(form.getByText("Please enter a valid email address.")).toBeHidden();
});

test("back-to-top link appears after scrolling and returns to the top", async ({ page }) => {
  await page.goto("/experience");
  const link = page.getByRole("link", { name: "Back to top" });
  await expect(link).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await expect(link).toBeVisible();
  await link.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("CV menu offers both languages as PDFs", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Download CV").click();
  for (const language of ["English", "Slovak"]) {
    const link = page.getByRole("main").getByRole("link", { name: new RegExp(`^${language}`) });
    const href = await link.getAttribute("href");
    const response = await page.request.get(href ?? "");
    expect(response.headers()["content-type"]).toContain("application/pdf");
  }
});

test("CV menu links to the PDF viewer in each language", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Download CV").click();
  await page.getByRole("link", { name: "Preview Slovak CV" }).click();
  await expect(page).toHaveURL(/\/sk\/cv\/pdf$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Životopis");
});

test("CV menu closes on a click outside and on Escape", async ({ page }) => {
  await page.goto("/");
  const preview = page.getByRole("link", { name: "Preview Slovak CV" });
  await page.getByText("Download CV").click();
  await expect(preview).toBeVisible();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(preview).toBeHidden();

  await page.getByText("Download CV").click();
  await page.keyboard.press("Escape");
  await expect(preview).toBeHidden();
});

test("CV viewer shows the PDF, or page images on touch screens", async ({ page, isMobile }) => {
  await page.goto("/cv/pdf");
  const download = page.getByRole("link", { name: "Download PDF" });
  const href = (await download.getAttribute("href")) ?? "";
  const pdf = await page.request.get(href);
  expect(pdf.headers()["content-security-policy"]).toBe("frame-ancestors 'self'");

  if (isMobile) {
    await expect(page.getByRole("img", { name: /page 1/ })).toBeVisible();
    await expect(page.locator("main iframe")).toHaveCount(0);
  } else {
    const inline = await page.evaluate(() => navigator.pdfViewerEnabled);
    if (inline) await expect(page.locator("main iframe")).toHaveAttribute("src", /\.pdf#/);
    else await expect(page.getByRole("img", { name: /page 1/ })).toBeVisible();
  }
});

test("gallery opens a lightbox with keyboard, swipe and zoom", async ({ page }) => {
  await page.goto("/projects/glaucoma-segmentation");
  // Before hydration the links open the plain image, which is the no-JavaScript fallback.
  await page.waitForLoadState("networkidle");
  const gallery = page.getByRole("region", { name: "Gallery" });
  await gallery.getByRole("figure").first().getByRole("link").click();
  const lightbox = page.getByRole("dialog");
  await expect(lightbox).toBeVisible();
  await expect(lightbox.getByText("1 of 6")).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(lightbox.getByText("2 of 6")).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(lightbox.getByText("6 of 6")).toBeVisible();

  const image = lightbox.getByRole("img");
  const box = await image.boundingBox();
  if (!box) throw new Error("lightbox image has no size");
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();
  await expect(lightbox.getByText("1 of 6")).toBeVisible();

  await lightbox.getByRole("button", { name: "Zoom in" }).click();
  await expect(lightbox.getByRole("button", { name: "Zoom out" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(lightbox).toBeHidden();
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

test("pages send security headers and load without CSP errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && message.text().includes("Content Security Policy")) {
      errors.push(message.text());
    }
  });
  const response = await page.goto("/");
  const headers = response?.headers() ?? {};
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});
