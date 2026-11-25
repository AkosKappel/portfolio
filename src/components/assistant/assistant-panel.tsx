"use client";

import { CircleAlert, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, type ReactNode, useEffect, useId, useRef, useState } from "react";
import {
  type AssistantError,
  assistantConfig,
  type ChatMessage,
  errorForStatus,
  type Inline,
  MAX_MESSAGE_CHARS,
  parseAnswer,
  trimHistory,
} from "@/lib/assistant";
import { useTurnstile } from "./use-turnstile";

function InlineText({ parts }: { parts: Inline[] }) {
  return parts.map((part, index) => {
    const key = `${index}-${part.text}`;
    if (part.type === "bold") return <strong key={key}>{part.text}</strong>;
    if (part.type === "link") {
      return (
        <a key={key} href={part.href} target="_blank" rel="noopener noreferrer" className="link">
          {part.text}
        </a>
      );
    }
    return <Fragment key={key}>{part.text}</Fragment>;
  });
}

function Answer({ text }: { text: string }) {
  return parseAnswer(text).map((block, index): ReactNode => {
    const key = `${block.type}-${index}`;
    if (block.type === "paragraph") {
      return (
        <p key={key}>
          <InlineText parts={block.content} />
        </p>
      );
    }
    const List = block.ordered ? "ol" : "ul";
    return (
      <List key={key} className={`ps-5 ${block.ordered ? "list-decimal" : "list-disc"}`}>
        {block.items.map((item, itemIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: list items have no identity of their own
          <li key={itemIndex}>
            <InlineText parts={item} />
          </li>
        ))}
      </List>
    );
  });
}

type Props = { id: string; open: boolean; onClose: () => void };

/** The chat panel. Loaded only when the visitor first opens the chat. */
export default function AssistantPanel({ id, open, onClose }: Props) {
  const t = useTranslations("assistant");
  const locale = useLocale();
  const titleId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<AssistantError | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const { url = "", turnstileSiteKey = "" } = assistantConfig;
  const getToken = useTurnstile(turnstileSiteKey, turnstileBox, locale);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Keeps the newest text in view while an answer streams in.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on every new piece of the answer
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [messages, error]);

  /** Sends the conversation and streams the answer into a new message at the end. */
  async function ask(history: ChatMessage[]) {
    setError(null);
    setBusy(true);
    setMessages([...history, { role: "assistant", content: "" }]);
    let answer = "";
    const showAnswer = (text: string) =>
      setMessages([...history, { role: "assistant", content: text }]);

    try {
      const response = await fetch(`${url}/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: trimHistory(history),
          locale,
          turnstileToken: await getToken(),
        }),
      });
      if (!response.ok || !response.body) {
        setMessages(history);
        setError(errorForStatus(response.status));
        setAnnouncement(t(`errors.${errorForStatus(response.status)}`));
        return;
      }
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += value;
        showAnswer(answer);
      }
      setAnnouncement(answer);
    } catch {
      // A stream that breaks after text arrived keeps the partial answer, marked as cut off.
      const failure = answer ? "cutOff" : "failed";
      if (!answer) setMessages(history);
      setError(failure);
      setAnnouncement(t(`errors.${failure}`));
    } finally {
      setBusy(false);
    }
  }

  function submit(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setDraft("");
    ask([...messages, { role: "user", content }]);
  }

  function retry() {
    // Drops a cut-off answer, so the question is asked again from where it was.
    const history = messages.at(-1)?.role === "assistant" ? messages.slice(0, -1) : messages;
    ask(history);
  }

  const suggestions = t.raw("suggestions") as string[];
  const waiting = busy && messages.at(-1)?.content === "";

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
        {messages.map((message, index) =>
          message.role === "user" ? (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
              key={index}
              className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-on-accent"
            >
              <span className="sr-only">{t("you")}: </span>
              {message.content}
            </li>
          ) : (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
              key={index}
              className="grid max-w-[92%] gap-2 self-start rounded-2xl rounded-bl-sm border border-line bg-paper px-3.5 py-2"
            >
              <span className="sr-only">{t("assistant")}: </span>
              {message.content ? (
                <Answer text={message.content} />
              ) : (
                <span className="text-muted">{t("thinking")}</span>
              )}
            </li>
          ),
        )}
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
        <div className="flex items-end gap-2">
          <label htmlFor={`${id}-input`} className="sr-only">
            {t("placeholder")}
          </label>
          <textarea
            id={`${id}-input`}
            ref={input}
            rows={1}
            value={draft}
            maxLength={MAX_MESSAGE_CHARS}
            placeholder={t("placeholder")}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(draft);
              }
            }}
            className="max-h-32 min-h-10 flex-1 resize-none rounded-xl border border-line bg-paper px-3 py-2 hover:border-ink/40"
          />
          <button
            type="submit"
            disabled={busy || draft.trim() === ""}
            aria-label={waiting ? t("thinking") : t("send")}
            title={t("send")}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Send aria-hidden size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
