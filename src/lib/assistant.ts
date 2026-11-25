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

// The Worker's limits: at most 10 messages, 1,000 characters each and 6,000 in total.
export const MAX_MESSAGE_CHARS = 1000;
const MAX_MESSAGES = 10;
const MAX_TOTAL_CHARS = 6000;

/**
 * The most recent part of the conversation that fits the Worker's limits. It starts with a
 * visitor message, so the model never sees an answer without its question.
 */
export function trimHistory(messages: ChatMessage[]): ChatMessage[] {
  const kept: ChatMessage[] = [];
  let total = 0;
  for (const message of [...messages].reverse()) {
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
