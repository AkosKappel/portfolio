/**
 * The "ask about me" chat talks to a Cloudflare Worker in the separate `ai` repository. It stays
 * hidden until both values are set, so the site never shows a chat that has nowhere to send.
 */
export const assistantConfig = {
  url: process.env.NEXT_PUBLIC_ASSISTANT_URL,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
};

export const assistantEnabled = Boolean(assistantConfig.url && assistantConfig.turnstileSiteKey);

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** A page of this site an answer was written from. */
export type Source = { path: string; title: string };

/**
 * A message as the chat keeps it. Answers also remember their model, sources and the visitor's
 * rating; a visitor message in recruiter mode is a pasted job description.
 */
export type Turn = ChatMessage & {
  model?: string;
  sources?: Source[];
  rating?: Rating;
  mode?: "recruiter";
};
export type Rating = "up" | "down";

// Recruiter mode takes one longer message: a job description.
export const MAX_JOB_DESCRIPTION_CHARS = 5000;

// The Worker's limits: at most 10 messages, 1,000 characters each and 6,000 in total.
export const MAX_MESSAGE_CHARS = 1000;
const MAX_MESSAGES = 10;
const MAX_TOTAL_CHARS = 6000;

/**
 * The most recent part of the conversation that fits the Worker's limits. It starts with a
 * visitor message, so the model never sees an answer without its question.
 */
export function trimHistory(turns: Turn[]): ChatMessage[] {
  const kept: ChatMessage[] = [];
  let total = 0;
  // Follow-up suggestions are for the visitor, so the model gets its answers without them.
  // A pasted job description would use up the limits on its own; the comparison that follows
  // it says what matters.
  const messages = turns.map(({ role, content, mode }) => ({
    role,
    content:
      role === "assistant"
        ? splitFollowUps(content).text
        : mode === "recruiter"
          ? "(I pasted a job description to compare with his portfolio.)"
          : content,
  }));
  for (const message of messages.reverse()) {
    if (kept.length === MAX_MESSAGES || total + message.content.length > MAX_TOTAL_CHARS) break;
    kept.unshift(message);
    total += message.content.length;
  }
  while (kept.length > 0 && kept[0].role !== "user") kept.shift();
  return kept;
}

export type AssistantError = "rateLimited" | "busy" | "botCheck" | "cutOff" | "failed";

export function errorForStatus(status: number): AssistantError {
  if (status === 429) return "rateLimited";
  if (status === 503) return "busy";
  if (status === 403) return "botCheck";
  return "failed";
}

/**
 * The Worker asks the model to end each answer with a line of follow-up questions:
 * ">> What does he build? | Since when?". The chat shows them as buttons, so they are split off.
 * A last line that starts with ">" is hidden while it streams in, before it can be parsed.
 */
export function splitFollowUps(answer: string): { text: string; followUps: string[] } {
  const lines = answer.trimEnd().split("\n");
  const last = lines.at(-1) ?? "";
  if (!/^\s*>/.test(last)) return { text: answer, followUps: [] };
  const followUps = last
    .replace(/^\s*>+/, "")
    .split("|")
    .map((question) => question.trim())
    .filter((question) => question.length > 0 && question.length <= MAX_FOLLOW_UP_CHARS)
    .slice(0, 3);
  return { text: lines.slice(0, -1).join("\n").trimEnd(), followUps };
}

const MAX_FOLLOW_UP_CHARS = 120;

// Same as `site.url`, without pulling the site content into the chat bundle. The knowledge file
// links pages with this origin.
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akoskappel.dev";

/** Reads the Worker's `X-Assistant-Sources` header; anything unexpected counts as no sources. */
export function parseSources(header: string | null): Source[] {
  if (!header) return [];
  try {
    const sources: unknown = JSON.parse(decodeURIComponent(header));
    if (!Array.isArray(sources)) return [];
    return sources.filter(
      (source): source is Source =>
        typeof source?.path === "string" &&
        source.path.startsWith("/") &&
        typeof source.title === "string",
    );
  } catch {
    return [];
  }
}

/** The path of a link to this site, so it opens in the current tab and language; else undefined. */
export function sitePath(href: string): string | undefined {
  const url = new URL(href);
  return url.origin === SITE_ORIGIN ? `${url.pathname}${url.search}${url.hash}` : undefined;
}

// Answers use a little Markdown: paragraphs, bullet and numbered lists, **bold** and links. It is
// turned into data, never HTML, so a model answer cannot inject markup.
export type Inline =
  | { type: "text" | "bold"; text: string }
  | { type: "link"; text: string; href: string };
export type Block =
  | { type: "paragraph"; content: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] };

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https:\/\/[^\s)]+)\)|(https:\/\/[^\s)]+[^\s).,;:!?])/g;

export function parseInline(text: string): Inline[] {
  const parts: Inline[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) parts.push({ type: "text", text: text.slice(last, match.index) });
    const [, bold, label, href, url] = match;
    if (bold) parts.push({ type: "bold", text: bold });
    else if (label && href) parts.push({ type: "link", text: label, href });
    else if (url) parts.push({ type: "link", text: url.replace(/^https:\/\//, ""), href: url });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: "text", text: text.slice(last) });
  return parts;
}

const BULLET = /^\s*[-*•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;

export function parseAnswer(answer: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", content: parseInline(paragraph.join(" ")) });
    }
    paragraph = [];
  };

  for (const line of answer.split("\n")) {
    const bullet = line.match(BULLET);
    const numbered = line.match(NUMBERED);
    const item = bullet ?? numbered;
    if (item) {
      flush();
      const ordered = Boolean(numbered);
      const previous = blocks.at(-1);
      if (previous?.type === "list" && previous.ordered === ordered) {
        previous.items.push(parseInline(item[1]));
      } else {
        blocks.push({ type: "list", ordered, items: [parseInline(item[1])] });
      }
    } else if (line.trim() === "") {
      flush();
    } else {
      // Headings come back as plain paragraphs; the chat has no room for them.
      paragraph.push(line.replace(/^#+\s*/, "").trim());
    }
  }
  flush();
  return blocks;
}
