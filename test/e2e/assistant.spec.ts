import { expect, type Page, test } from "@playwright/test";

// CI builds the site with the chat on (see the e2e job). The Worker and Turnstile are stubbed, so
// these tests need no network and spend no model quota.
const workerUrl = process.env.NEXT_PUBLIC_ASSISTANT_URL;
test.skip(!workerUrl, "the chat is off in this build (NEXT_PUBLIC_ASSISTANT_URL is not set)");

/** A Turnstile stand-in that hands out a token as soon as the chat asks for one. */
async function stubTurnstile(page: Page) {
  await page.route("https://challenges.cloudflare.com/turnstile/v0/api.js*", (route) =>
    route.fulfill({
      contentType: "text/javascript",
      body: `window.turnstile = {
        render: (container, options) => { window.__turnstile = options; return "widget"; },
        execute: () => window.__turnstile.callback("test-token"),
        reset: () => {},
        remove: () => {},
      };`,
    }),
  );
}

type Reply = { status: number; body: string; delayMs?: number };

/** Answers each chat request with the next reply, as the Worker would, and records the requests. */
async function stubWorker(page: Page, ...replies: Reply[]) {
  const requests: Record<string, unknown>[] = [];
  await page.route(`${workerUrl}/chat`, async (route) => {
    requests.push(route.request().postDataJSON());
    const { status, body, delayMs = 0 } = replies.shift() ?? { status: 500, body: "" };
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route
      .fulfill({
        status,
        contentType: "text/plain; charset=utf-8",
        headers: {
          "access-control-allow-origin": "*",
          "access-control-expose-headers": "x-assistant-model, x-assistant-sources",
          "x-assistant-model": "groq/openai/gpt-oss-120b",
          "x-assistant-sources": encodeURIComponent(
            JSON.stringify([
              { path: "/experience", title: "Experience" },
              { path: "/projects/skysense", title: "SkySense" },
            ]),
          ),
        },
        body,
      })
      // The visitor may have stopped the answer in the meantime.
      .catch(() => {});
  });
  return requests;
}

test("the chat answers with lists, bold text and safe links", async ({ page }) => {
  await stubTurnstile(page);
  const requests = await stubWorker(page, {
    status: 200,
    body: "He works on:\n\n- **Core3**, a web platform\n- [WYDO](https://wydo.example)\n\n[bad](javascript:alert(1))",
  });
  await page.goto("/");

  const launcher = page.getByRole("button", { name: "Ask about me" });
  await launcher.click();
  const chat = page.getByRole("dialog", { name: "Ask about Ákos" });
  // Answers and errors are also repeated in a screen reader announcement, so text checks look
  // inside the conversation.
  const conversation = chat.getByRole("list", { name: "Conversation" });
  await expect(conversation.getByText("Answers come from free AI models")).toBeVisible();

  await chat.getByRole("button", { name: "Where does he work now?" }).click();
  await expect(
    conversation.getByRole("listitem").filter({ hasText: /^Core3, a web platform$/ }),
  ).toBeVisible();
  await expect(chat.locator("strong", { hasText: "Core3" })).toBeVisible();
  await expect(chat.getByRole("link", { name: "WYDO" })).toHaveAttribute(
    "href",
    "https://wydo.example",
  );
  await expect(chat.getByRole("link", { name: "bad" })).toHaveCount(0);
  expect(requests).toEqual([
    {
      messages: [{ role: "user", content: "Where does he work now?" }],
      locale: "en",
      page: "/",
      turnstileToken: "test-token",
    },
  ]);

  await page.keyboard.press("Escape");
  await expect(chat).toBeHidden();
  await expect(launcher).toBeFocused();
});

test("the chat sends the conversation and the page language", async ({ page }) => {
  await stubTurnstile(page);
  const requests = await stubWorker(
    page,
    { status: 200, body: "Bratislavában dolgozik." },
    { status: 200, body: "Igen." },
  );
  await page.goto("/hu");
  await page.getByRole("button", { name: "Kérdezzen rólam" }).click();
  const conversation = page.getByRole("dialog").getByRole("list").first();

  const input = page.getByRole("textbox", { name: "Tegyen fel egy kérdést Ákosról" });
  await input.fill("Hol dolgozik?");
  await input.press("Enter");
  await expect(conversation.getByText("Bratislavában dolgozik.")).toBeVisible();
  await input.fill("Távmunka is jöhet?");
  await input.press("Enter");
  await expect(conversation.getByText("Igen.")).toBeVisible();

  expect(requests[1]).toMatchObject({
    locale: "hu",
    messages: [
      { role: "user", content: "Hol dolgozik?" },
      { role: "assistant", content: "Bratislavában dolgozik." },
      { role: "user", content: "Távmunka is jöhet?" },
    ],
  });
});

test("the chat explains errors and retries when the assistant is busy", async ({ page }) => {
  await stubTurnstile(page);
  await stubWorker(
    page,
    { status: 429, body: "" },
    { status: 503, body: "" },
    { status: 200, body: "He works at IGT." },
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Ask about me" }).click();
  const chat = page.getByRole("dialog", { name: "Ask about Ákos" });
  const conversation = chat.getByRole("list", { name: "Conversation" });
  const input = chat.getByRole("textbox", { name: "Ask a question about Ákos" });

  await input.fill("Where does he work?");
  await input.press("Enter");
  await expect(conversation.getByText("Too many questions in a short time.")).toBeVisible();
  await expect(chat.getByRole("button", { name: "Try again" })).toHaveCount(0);

  await input.fill("Where does he work now?");
  await input.press("Enter");
  await expect(conversation.getByText("The assistant is busy right now.")).toBeVisible();
  await chat.getByRole("button", { name: "Try again" }).click();
  await expect(conversation.getByText("He works at IGT.")).toBeVisible();
  await expect(conversation.getByText("The assistant is busy right now.")).toBeHidden();
});

test("follow-up questions become buttons and links to this site stay in the tab", async ({
  page,
}) => {
  await stubTurnstile(page);
  const requests = await stubWorker(
    page,
    {
      status: 200,
      body: "He built [SkySense](https://akoskappel.dev/projects/skysense).\n\n>> Which stack does it use? | Is it live?",
    },
    { status: 200, body: "SvelteKit." },
  );
  await page.goto("/sk");
  await page.getByRole("button", { name: "Opýtajte sa na mňa" }).click();
  const chat = page.getByRole("dialog");
  const conversation = chat.getByRole("list").first();
  await chat.getByRole("textbox").fill("Čo vytvoril?");
  await chat.getByRole("textbox").press("Enter");

  await expect(conversation.getByText(">>")).toHaveCount(0);
  await conversation.getByRole("button", { name: "Which stack does it use?" }).click();
  await expect(conversation.getByText("SvelteKit.")).toBeVisible();
  // The model gets its earlier answer without the follow-up line.
  expect(requests[1]).toMatchObject({
    messages: [
      { role: "user", content: "Čo vytvoril?" },
      {
        role: "assistant",
        content: "He built [SkySense](https://akoskappel.dev/projects/skysense).",
      },
      { role: "user", content: "Which stack does it use?" },
    ],
  });

  // The first link is the one in the answer; the same page is also listed as a source.
  await conversation.getByRole("link", { name: "SkySense" }).first().click();
  await expect(page).toHaveURL(/\/sk\/projects\/skysense$/);
  await expect(chat).toBeHidden();

  // The conversation is still there after a reload.
  await page.reload();
  await page.getByRole("button", { name: "Opýtajte sa na mňa" }).click();
  await expect(page.getByRole("dialog").getByText("SvelteKit.").first()).toBeVisible();
});

test("answers can be copied and rated, and a slow answer can be stopped", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await stubTurnstile(page);
  await stubWorker(
    page,
    { status: 200, body: "He works at IGT." },
    { status: 200, body: "Never shown.", delayMs: 5000 },
  );
  const ratings: unknown[] = [];
  await page.route(`${workerUrl}/feedback`, (route) => {
    ratings.push(route.request().postDataJSON());
    return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*" } });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Ask about me" }).click();
  const chat = page.getByRole("dialog", { name: "Ask about Ákos" });
  const input = chat.getByRole("textbox", { name: "Ask a question about Ákos" });

  await input.fill("Where does he work?");
  await input.press("Enter");
  await chat.getByRole("button", { name: "Copy answer" }).click();
  await expect(chat.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("He works at IGT.");

  await chat.getByRole("button", { name: "Not helpful" }).click();
  await expect(chat.getByRole("button", { name: "Not helpful" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(chat.getByRole("button", { name: "Helpful", exact: true })).toBeDisabled();
  await expect.poll(() => ratings).toEqual([{ model: "groq/openai/gpt-oss-120b", rating: "down" }]);

  await input.fill("And before that?");
  await input.press("Enter");
  await chat.getByRole("button", { name: "Stop the answer" }).click();
  await expect(chat.getByRole("button", { name: "Send" })).toBeVisible();
  await expect(chat.getByText("Never shown.")).toHaveCount(0);
  await expect(chat.getByText("Something went wrong")).toHaveCount(0);
});

test("answers name their sources and the chat knows the page the visitor is on", async ({
  page,
}) => {
  await stubTurnstile(page);
  const requests = await stubWorker(page, { status: 200, body: "SvelteKit and Tailwind CSS." });
  await page.goto("/de/projects/skysense");
  await page.getByRole("button", { name: "Fragen zu mir" }).click();
  const chat = page.getByRole("dialog");
  await chat.getByRole("textbox").fill("Welche Technologien nutzt dieses Projekt?");
  await chat.getByRole("textbox").press("Enter");

  await expect(chat.getByText("SvelteKit and Tailwind CSS.").first()).toBeVisible();
  expect(requests[0]).toMatchObject({ page: "/projects/skysense", locale: "de" });
  // Pages with a menu name use it in the visitor's language; projects use their title.
  await expect(chat.getByRole("link", { name: "Berufserfahrung" })).toHaveAttribute(
    "href",
    "/de/experience",
  );
  await chat.getByRole("link", { name: "SkySense" }).click();
  await expect(page).toHaveURL(/\/de\/projects\/skysense$/);
});

test("recruiter mode sends one job description and keeps it short in the chat", async ({
  page,
}) => {
  await stubTurnstile(page);
  const requests = await stubWorker(
    page,
    { status: 200, body: "A good fit for the React and TypeScript parts." },
    { status: 200, body: "Yes, within the EU." },
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Ask about me" }).click();
  const chat = page.getByRole("dialog", { name: "Ask about Ákos" });
  const description = `Senior Frontend Engineer. ${"We need React and TypeScript. ".repeat(60)}`;

  await chat.getByRole("button", { name: "Compare a job description" }).click();
  const input = chat.getByRole("textbox", { name: "Paste a job description" });
  await input.fill(description);
  await input.press("Enter");
  await expect(
    chat.getByText("A good fit for the React and TypeScript parts.").first(),
  ).toBeVisible();
  expect(requests[0]).toMatchObject({
    mode: "recruiter",
    messages: [{ role: "user", content: description.trim() }],
  });
  await expect(chat.getByText("Job description", { exact: true })).toBeVisible();

  // The next question is a normal chat message again.
  const question = chat.getByRole("textbox", { name: "Ask a question about Ákos" });
  await question.fill("Is he open to remote work?");
  await question.press("Enter");
  await expect(chat.getByText("Yes, within the EU.").first()).toBeVisible();
  expect(requests[1]).not.toHaveProperty("mode");
  expect(requests[1]).toMatchObject({
    messages: [
      { role: "user", content: "(I pasted a job description to compare with his portfolio.)" },
      { role: "assistant", content: "A good fit for the React and TypeScript parts." },
      { role: "user", content: "Is he open to remote work?" },
    ],
  });
});

test("voice input fills the question in the page language", async ({ page }) => {
  // Headless Chromium has no speech recognition, so a stand-in hears a fixed sentence.
  await page.addInitScript(() => {
    class FakeRecognition {
      lang = "";
      onresult: ((event: unknown) => void) | null = null;
      onend: (() => void) | null = null;
      start() {
        (window as unknown as { heardIn: string }).heardIn = this.lang;
        setTimeout(() => {
          this.onresult?.({ results: [[{ transcript: "kde pracuje" }]] });
          this.onend?.();
        }, 100);
      }
      stop() {}
      abort() {}
    }
    Object.assign(window, {
      SpeechRecognition: FakeRecognition,
      webkitSpeechRecognition: FakeRecognition,
    });
  });
  await stubTurnstile(page);
  await page.goto("/sk");
  await page.getByRole("button", { name: "Opýtajte sa na mňa" }).click();
  const chat = page.getByRole("dialog");
  await chat.getByRole("textbox").fill("Povedzte mi,");
  await chat.getByRole("button", { name: "Opýtať sa hlasom" }).click();
  await expect(chat.getByRole("textbox")).toHaveValue("Povedzte mi, kde pracuje");
  expect(await page.evaluate(() => (window as unknown as { heardIn: string }).heardIn)).toBe(
    "sk-SK",
  );
});
