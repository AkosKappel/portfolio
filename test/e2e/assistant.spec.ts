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

function stubWorker(page: Page, ...responses: { status: number; body: string }[]) {
  const requests: Record<string, unknown>[] = [];
  return page
    .route(`${workerUrl}/chat`, (route) => {
      requests.push(route.request().postDataJSON());
      const { status, body } = responses.shift() ?? { status: 500, body: "" };
      return route.fulfill({ status, contentType: "text/plain; charset=utf-8", body });
    })
    .then(() => requests);
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
