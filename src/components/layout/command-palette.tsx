"use client";

import { Check, Search, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Command, filterCommands } from "@/lib/commands";
import { getTheme, setPalette, setTheme, subscribe } from "./appearance";
import type { Theme } from "./theme-script";

const cache = new Map<string, Promise<Command[]>>();

/** The list is a static file per language; a failed request is retried on the next open. */
function loadCommands(locale: string) {
  let commands = cache.get(locale);
  if (!commands) {
    commands = fetch(`/commands/${locale}.json`).then((response) => {
      if (!response.ok) throw new Error(`Command list: HTTP ${response.status}`);
      return response.json() as Promise<Command[]>;
    });
    commands.catch(() => cache.delete(locale));
    cache.set(locale, commands);
  }
  return commands;
}

/**
 * A modal <dialog> (focus trap, Esc, focus restored on close) holding a combobox:
 * focus stays in the input while the arrow keys move the active option.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("commands");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [commands, setCommands] = useState<Command[] | "error" | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    let current = true;
    loadCommands(locale).then(
      (list) => current && setCommands(list),
      () => current && setCommands("error"),
    );
    return () => {
      current = false;
    };
  }, [open, locale]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  // The current mode and language are hidden: choosing them would do nothing.
  const available = Array.isArray(commands)
    ? commands.filter(
        ({ action }) =>
          !(action?.type === "theme" && action.theme === theme) &&
          !(action?.type === "locale" && action.locale === locale),
      )
    : [];
  const results = filterCommands(available, query);
  const current = Math.min(active, results.length - 1);
  const optionId = (index: number) => `${id}-option-${index}`;

  useEffect(() => {
    if (current >= 0)
      document.getElementById(optionId(current))?.scrollIntoView({ block: "nearest" });
  });

  const run = async (command: Command) => {
    const { action, href } = command;
    if (action?.type === "copy") {
      try {
        await navigator.clipboard.writeText(action.text);
        setCopied(true);
      } catch {
        // Clipboard access can be denied; the address is also on the contact page.
      }
      return;
    }
    dialogRef.current?.close();
    if (href) router.push(href);
    else if (action?.type === "theme") setTheme(action.theme);
    else if (action?.type === "palette") setPalette(action.theme, action.palette);
    else if (action?.type === "locale") router.replace(pathname, { locale: action.locale });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const count = results.length;
    if (event.key === "ArrowDown" && count) {
      event.preventDefault();
      setActive((current + 1) % count);
    } else if (event.key === "ArrowUp" && count) {
      event.preventDefault();
      setActive((current - 1 + count) % count);
    } else if (event.key === "Enter" && current >= 0) {
      event.preventDefault();
      run(results[current]);
    }
  };

  const status =
    commands === null
      ? t("loading")
      : commands === "error"
        ? t("error")
        : results.length === 0
          ? t("empty")
          : null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; Esc already closes a modal dialog
    <dialog
      ref={dialogRef}
      aria-label={t("title")}
      className="mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/30 backdrop:backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      onClose={() => {
        setQuery("");
        setActive(0);
        setCopied(false);
        onClose();
      }}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 focus-within:border-accent">
        <Search aria-hidden size={18} className="shrink-0 text-muted" />
        <input
          type="text"
          role="combobox"
          aria-label={t("open")}
          aria-expanded={results.length > 0}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          aria-activedescendant={current >= 0 ? optionId(current) : undefined}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={t("placeholder")}
          className="h-14 min-w-0 flex-1 bg-transparent text-base placeholder:text-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="-mr-2 grid size-10 shrink-0 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
          aria-label={t("close")}
          title={t("close")}
        >
          <X aria-hidden size={18} />
        </button>
      </div>
      <div
        id={`${id}-listbox`}
        role="listbox"
        aria-label={t("results")}
        // Chrome makes scrollable boxes focusable; Tab should go from the input to the close button.
        tabIndex={-1}
        className="max-h-[min(24rem,55vh)] overflow-y-auto p-1.5 empty:hidden"
      >
        {results.map((command, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/useFocusableInteractive: the combobox input keeps focus and picks options with the keyboard (aria-activedescendant)
          <div
            key={command.id}
            id={optionId(index)}
            role="option"
            aria-selected={index === current}
            onClick={() => run(command)}
            onPointerMove={() => setActive(index)}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent-soft aria-selected:text-ink"
          >
            <span className="flex-1 truncate">
              {command.action?.type === "copy" && copied ? tCommon("copied") : command.label}
            </span>
            {command.action?.type === "copy" && copied ? (
              <Check aria-hidden size={15} className="text-accent" />
            ) : null}
            <span className="shrink-0 text-xs text-muted">{command.group}</span>
          </div>
        ))}
      </div>
      <p role="status" className="px-4 py-6 text-center text-sm text-muted empty:hidden">
        {status}
      </p>
      <p role="status" className="sr-only">
        {copied ? tCommon("copied") : ""}
      </p>
      <p className="hidden border-t border-line px-4 py-2 text-xs text-muted sm:block">
        {t("hint")}
      </p>
    </dialog>
  );
}
