import { describe, expect, it } from "vitest";
import {
  type ChatMessage,
  errorForStatus,
  parseAnswer,
  parseInline,
  sitePath,
  splitFollowUps,
  trimHistory,
} from "./assistant";

const user = (content: string): ChatMessage => ({ role: "user", content });
const assistant = (content: string): ChatMessage => ({ role: "assistant", content });

describe("trimHistory", () => {
  it("keeps a short conversation as it is", () => {
    const messages = [user("Hi"), assistant("Hello"), user("Skills?")];
    expect(trimHistory(messages)).toEqual(messages);
  });

  it("keeps at most the last 10 messages, starting with a visitor message", () => {
    const messages = Array.from({ length: 13 }, (_, i) =>
      i % 2 ? assistant(`a${i}`) : user(`u${i}`),
    );
    const trimmed = trimHistory(messages);
    expect(trimmed.length).toBeLessThanOrEqual(10);
    expect(trimmed[0].role).toBe("user");
    expect(trimmed.at(-1)).toEqual(messages.at(-1));
  });

  it("drops the oldest messages beyond 6,000 characters", () => {
    const long = "x".repeat(1000);
    const messages = [
      user(long),
      assistant(long),
      user(long),
      assistant(long),
      user(long),
      assistant(long),
      user("Last?"),
    ];
    const trimmed = trimHistory(messages);
    expect(trimmed.reduce((sum, m) => sum + m.content.length, 0)).toBeLessThanOrEqual(6000);
    expect(trimmed[0].role).toBe("user");
    expect(trimmed.at(-1)).toEqual(user("Last?"));
  });

  it("sends answers without their follow-up questions", () => {
    expect(
      trimHistory([user("Hi"), assistant("Hello.\n\n>> Skills? | Projects?"), user("Skills?")]),
    ).toEqual([user("Hi"), assistant("Hello."), user("Skills?")]);
  });
});

describe("splitFollowUps", () => {
  it("turns the last line into at most three questions", () => {
    expect(
      splitFollowUps("He works at IGT.\n\n>> What does he build? | Since when? | Remote? | More?"),
    ).toEqual({
      text: "He works at IGT.",
      followUps: ["What does he build?", "Since when?", "Remote?"],
    });
  });

  it("hides a follow-up line that is still streaming in", () => {
    expect(splitFollowUps("He works at IGT.\n>")).toEqual({
      text: "He works at IGT.",
      followUps: [],
    });
  });

  it("leaves answers without follow-ups as they are", () => {
    expect(splitFollowUps("He works at IGT.")).toEqual({ text: "He works at IGT.", followUps: [] });
  });
});

describe("sitePath", () => {
  it("returns the path of links to this site and nothing for other sites", () => {
    expect(sitePath("https://akoskappel.dev/projects/skysense#stack")).toBe(
      "/projects/skysense#stack",
    );
    expect(sitePath("https://github.com/AkosKappel")).toBeUndefined();
    expect(sitePath("https://akoskappel.dev.evil.example/x")).toBeUndefined();
  });
});

describe("errorForStatus", () => {
  it.each([
    [429, "rateLimited"],
    [503, "busy"],
    [403, "botCheck"],
    [400, "failed"],
    [500, "failed"],
  ] as const)("maps %i to %s", (status, error) => {
    expect(errorForStatus(status)).toBe(error);
  });
});

describe("parseInline", () => {
  it("finds bold text, Markdown links and bare HTTPS links", () => {
    expect(
      parseInline(
        "He works at **IGT** ([site](https://igt.sk)), see https://akoskappel.dev/contact.",
      ),
    ).toEqual([
      { type: "text", text: "He works at " },
      { type: "bold", text: "IGT" },
      { type: "text", text: " (" },
      { type: "link", text: "site", href: "https://igt.sk" },
      { type: "text", text: "), see " },
      { type: "link", text: "akoskappel.dev/contact", href: "https://akoskappel.dev/contact" },
      { type: "text", text: "." },
    ]);
  });

  it("leaves links that are not HTTPS as plain text", () => {
    expect(parseInline("[click](javascript:alert(1)) or http://x.example")).toEqual([
      { type: "text", text: "[click](javascript:alert(1)) or http://x.example" },
    ]);
  });
});

describe("parseAnswer", () => {
  it("splits paragraphs and lists", () => {
    const answer = "He speaks:\n\n- Slovak\n- Hungarian\n\n1. First\n2. Second\nThanks!";
    expect(parseAnswer(answer)).toEqual([
      { type: "paragraph", content: [{ type: "text", text: "He speaks:" }] },
      {
        type: "list",
        ordered: false,
        items: [[{ type: "text", text: "Slovak" }], [{ type: "text", text: "Hungarian" }]],
      },
      {
        type: "list",
        ordered: true,
        items: [[{ type: "text", text: "First" }], [{ type: "text", text: "Second" }]],
      },
      { type: "paragraph", content: [{ type: "text", text: "Thanks!" }] },
    ]);
  });

  it("turns headings into plain paragraphs and keeps text without markup as it is", () => {
    expect(parseAnswer("## Projects\nSkySense")).toEqual([
      { type: "paragraph", content: [{ type: "text", text: "Projects SkySense" }] },
    ]);
  });
});
