"use client";

import {
  Briefcase,
  Check,
  CircleAlert,
  Copy,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  type AssistantError,
  assistantConfig,
  errorForStatus,
  type Inline,
  MAX_JOB_DESCRIPTION_CHARS,
  MAX_MESSAGE_CHARS,
  parseAnswer,
  parseSources,
  type Rating,
  type Source,
  sitePath,
  splitFollowUps,
  type Turn,
  trimHistory,
} from "@/lib/assistant";
import { useTurnstile } from "./use-turnstile";

// The conversation survives reloads and language switches until the tab is closed.
const STORAGE_KEY = "assistant-conversation";

function loadConversation(): Turn[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveConversation(turns: Turn[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(turns));
  } catch {
    // Storage can be full or blocked; the chat still works without it.
  }
}

function InlineText({ parts, onNavigate }: { parts: Inline[]; onNavigate: () => void }) {
  return parts.map((part, index) => {
    const key = `${index}-${part.text}`;
    if (part.type === "bold") return <strong key={key}>{part.text}</strong>;
    if (part.type === "link") {
      // Pages of this site open in the same tab and language; the chat closes so the page shows.
      const path = sitePath(part.href);
      if (path) {
        return (
          <Link key={key} href={path} onClick={onNavigate} className="link">
            {part.text}
          </Link>
        );
      }
      return (
        <a key={key} href={part.href} target="_blank" rel="noopener noreferrer" className="link">
          {part.text}
        </a>
      );
    }
    return <Fragment key={key}>{part.text}</Fragment>;
  });
}

function Answer({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  return parseAnswer(text).map((block, index): ReactNode => {
    const key = `${block.type}-${index}`;
    if (block.type === "paragraph") {
      return (
        <p key={key}>
          <InlineText parts={block.content} onNavigate={onNavigate} />
        </p>
      );
    }
    const List = block.ordered ? "ol" : "ul";
    return (
      <List key={key} className={`ps-5 ${block.ordered ? "list-decimal" : "list-disc"}`}>
        {block.items.map((item, itemIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: list items have no identity of their own
          <li key={itemIndex}>
            <InlineText parts={item} onNavigate={onNavigate} />
          </li>
        ))}
      </List>
    );
  });
}

// Pages with their own name in the menu; other sources (projects) use the title the Worker sends.
const NAV_KEYS: Record<
  string,
  "about" | "contact" | "education" | "experience" | "projects" | "skills"
> = {
  "/about": "about",
  "/contact": "contact",
  "/education": "education",
  "/experience": "experience",
  "/projects": "projects",
  "/skills": "skills",
};

function Sources({ sources, onNavigate }: { sources: Source[]; onNavigate: () => void }) {
  const t = useTranslations("assistant");
  const nav = useTranslations("nav");
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
      <span>{t("sources")}:</span>
      {sources.map(({ path, title }) => (
        <Link key={path} href={path} onClick={onNavigate} className="link">
          {NAV_KEYS[path] ? nav(NAV_KEYS[path]) : title}
        </Link>
      ))}
    </p>
  );
}

const iconButton =
  "grid size-7 place-items-center rounded-full text-muted hover:bg-accent-soft hover:text-ink aria-pressed:text-accent";

type Props = { id: string; open: boolean; onClose: () => void };

/** The chat panel. Loaded only when the visitor first opens the chat. */
export default function AssistantPanel({ id, open, onClose }: Props) {
  const t = useTranslations("assistant");
  const locale = useLocale();
  const titleId = useId();
  const [messages, setMessages] = useState<Turn[]>(loadConversation);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<AssistantError | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [recruiter, setRecruiter] = useState(false);
  const pathname = usePathname();
  const input = useRef<HTMLTextAreaElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const { url = "", turnstileSiteKey = "" } = assistantConfig;
  const getToken = useTurnstile(turnstileSiteKey, turnstileBox, locale);

  useEffect(() => {
    if (!busy) saveConversation(messages);
  }, [messages, busy]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Keeps the newest text in view while an answer streams in.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on every new piece of the answer
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [messages, error]);

  /** Sends the conversation and streams the answer into a new message at the end. */
  async function ask(history: Turn[]) {
    setError(null);
    setBusy(true);
    setMessages([...history, { role: "assistant", content: "" }]);
    let answer = "";
    let model: string | undefined;
    let sources: Source[] = [];
    const showAnswer = (text: string) =>
      setMessages([...history, { role: "assistant", content: text, model, sources }]);
    // A job description is compared on its own; a chat question brings the conversation along.
    const last = history[history.length - 1];
    const conversation =
      last.mode === "recruiter"
        ? { mode: "recruiter", messages: [{ role: "user", content: last.content }] }
        : { messages: trimHistory(history) };
    const controller = new AbortController();
    request.current = controller;

    try {
      const response = await fetch(`${url}/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...conversation,
          locale,
          page: pathname,
          turnstileToken: await getToken(),
        }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        setMessages(history);
        setError(errorForStatus(response.status));
        setAnnouncement(t(`errors.${errorForStatus(response.status)}`));
        return;
      }
      model = response.headers.get("x-assistant-model") ?? undefined;
      sources = parseSources(response.headers.get("x-assistant-sources"));
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += value;
        showAnswer(answer);
      }
      setAnnouncement(splitFollowUps(answer).text);
    } catch {
      if (controller.signal.aborted) {
        // Stopped by the visitor: keep what arrived, or drop the empty answer.
        if (answer) showAnswer(answer);
        else setMessages(history);
        return;
      }
      // A stream that breaks after text arrived keeps the partial answer, marked as cut off.
      const failure = answer ? "cutOff" : "failed";
      if (!answer) setMessages(history);
      setError(failure);
      setAnnouncement(t(`errors.${failure}`));
    } finally {
      request.current = null;
      setBusy(false);
    }
  }

  function submit(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setDraft("");
    setRecruiter(false);
    ask([
      ...messages,
      recruiter ? { role: "user", content, mode: "recruiter" } : { role: "user", content },
    ]);
  }

  function retry() {
    // Drops a cut-off answer, so the question is asked again from where it was.
    const history = messages.at(-1)?.role === "assistant" ? messages.slice(0, -1) : messages;
    ask(history);
  }

  function rate(index: number, rating: Rating) {
    const { model } = messages[index];
    setMessages(messages.map((turn, i) => (i === index ? { ...turn, rating } : turn)));
    setAnnouncement(t("thanks"));
    if (!model) return;
    // Best effort: a lost rating is not worth an error message.
    fetch(`${url}/feedback`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model, rating }),
    }).catch(() => {});
  }

  async function copy(index: number, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied((current) => (current === index ? null : current)), 2000);
    } catch {
      // Clipboard access can be denied; the text is still there to select.
    }
  }

  const suggestions = t.raw("suggestions") as string[];
  const lastIndex = messages.length - 1;

  return (
    <section
      id={id}
      role="dialog"
      aria-labelledby={titleId}
      hidden={!open}
      className="fixed right-3 bottom-20 z-50 flex h-[min(36rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl sm:right-5 print:hidden"
    >
      <header className="flex items-start gap-3 border-b border-line px-4 py-3">
        <Sparkles aria-hidden size={20} className="mt-0.5 shrink-0 text-accent" />
        <div className="flex-1">
          <h2 id={titleId} className="font-semibold">
            {t("title")}
          </h2>
          <p className="text-sm text-muted">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          title={t("close")}
          className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-accent-soft"
        >
          <X aria-hidden size={18} />
        </button>
      </header>

      <ol
        ref={list}
        aria-label={t("conversation")}
        aria-busy={busy}
        className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 ? (
          <li className="grid gap-3">
            <p className="text-sm text-muted">{t("notice")}</p>
            <p className="text-sm font-medium">{t("suggestionsLabel")}</p>
            <ul className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => submit(suggestion)}
                    className="rounded-full border border-line bg-paper px-3 py-1.5 text-left text-sm hover:border-ink/40"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ) : null}
        {messages.map((message, index) => {
          if (message.role === "user") {
            return (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
                key={index}
                className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-on-accent"
              >
                <span className="sr-only">{t("you")}: </span>
                {message.mode === "recruiter" ? (
                  <>
                    <strong className="block">{t("jobDescription")}</strong>
                    {message.content.length > 160
                      ? `${message.content.slice(0, 160).trimEnd()}…`
                      : message.content}
                  </>
                ) : (
                  message.content
                )}
              </li>
            );
          }
          const { text, followUps } = splitFollowUps(message.content);
          const streaming = busy && index === lastIndex;
          return (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
              key={index}
              className="grid max-w-[92%] gap-2 self-start"
            >
              <div className="grid gap-2 rounded-2xl rounded-bl-sm border border-line bg-paper px-3.5 py-2">
                <span className="sr-only">{t("assistant")}: </span>
                {text ? (
                  <Answer text={text} onNavigate={onClose} />
                ) : (
                  <span className="text-muted">{t("thinking")}</span>
                )}
              </div>
              {text && !streaming && message.sources?.length ? (
                <Sources sources={message.sources} onNavigate={onClose} />
              ) : null}
              {text && !streaming ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => copy(index, text)}
                    aria-label={copied === index ? t("copied") : t("copy")}
                    title={copied === index ? t("copied") : t("copy")}
                    className={iconButton}
                  >
                    {copied === index ? (
                      <Check aria-hidden size={15} />
                    ) : (
                      <Copy aria-hidden size={15} />
                    )}
                  </button>
                  {message.model ? (
                    <>
                      <button
                        type="button"
                        onClick={() => rate(index, "up")}
                        disabled={Boolean(message.rating)}
                        aria-pressed={message.rating === "up"}
                        aria-label={t("helpful")}
                        title={t("helpful")}
                        className={iconButton}
                      >
                        <ThumbsUp aria-hidden size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => rate(index, "down")}
                        disabled={Boolean(message.rating)}
                        aria-pressed={message.rating === "down"}
                        aria-label={t("notHelpful")}
                        title={t("notHelpful")}
                        className={iconButton}
                      >
                        <ThumbsDown aria-hidden size={15} />
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}
              {index === lastIndex && !busy && followUps.length > 0 ? (
                <ul aria-label={t("followUps")} className="flex flex-wrap gap-2">
                  {followUps.map((question) => (
                    <li key={question}>
                      <button
                        type="button"
                        onClick={() => submit(question)}
                        className="rounded-full border border-line bg-paper px-3 py-1.5 text-left text-sm hover:border-ink/40"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
        {error ? (
          <li className="flex flex-wrap items-center gap-2 text-sm text-red-700 dark:text-red-300">
            <CircleAlert aria-hidden size={16} />
            <span>{t(`errors.${error}`)}</span>
            {error !== "rateLimited" && error !== "botCheck" ? (
              <button type="button" onClick={retry} className="inline-flex items-center gap-1 link">
                <RotateCcw aria-hidden size={14} />
                {t("retry")}
              </button>
            ) : null}
          </li>
        ) : null}
      </ol>

      <p aria-live="polite" className="sr-only">
        {busy ? "" : announcement}
      </p>

      <form
        className="grid gap-2 border-t border-line p-3"
        onSubmit={(event) => {
          event.preventDefault();
          submit(draft);
        }}
      >
        {/* Turnstile shows a checkbox here only when Cloudflare is unsure about the visitor. */}
        <div ref={turnstileBox} />
        <button
          type="button"
          onClick={() => {
            setRecruiter((value) => !value);
            input.current?.focus();
          }}
          aria-pressed={recruiter}
          className="inline-flex items-center gap-1.5 justify-self-start rounded-full px-2 py-0.5 text-sm text-muted hover:text-ink aria-pressed:bg-accent-soft aria-pressed:text-ink"
        >
          <Briefcase aria-hidden size={14} />
          {t("recruiter")}
        </button>
        <div className="flex items-end gap-2">
          <label htmlFor={`${id}-input`} className="sr-only">
            {recruiter ? t("recruiterPlaceholder") : t("placeholder")}
          </label>
          <textarea
            id={`${id}-input`}
            ref={input}
            rows={recruiter ? 6 : 1}
            value={draft}
            maxLength={recruiter ? MAX_JOB_DESCRIPTION_CHARS : MAX_MESSAGE_CHARS}
            placeholder={recruiter ? t("recruiterPlaceholder") : t("placeholder")}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(draft);
              }
            }}
            className="max-h-32 min-h-10 flex-1 resize-none rounded-xl border border-line bg-paper px-3 py-2 hover:border-ink/40"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => request.current?.abort()}
              aria-label={t("stop")}
              title={t("stop")}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-opacity hover:opacity-90"
            >
              <Square aria-hidden size={16} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={draft.trim() === ""}
              aria-label={t("send")}
              title={t("send")}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Send aria-hidden size={18} />
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
