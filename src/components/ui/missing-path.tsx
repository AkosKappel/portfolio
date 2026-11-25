"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { closest } from "@/lib/terminal";

function decode(path: string) {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

/** The 404 as a terminal session: the missing path, and the nearest real page if it looks like a typo. */
export function MissingPath({ paths }: { paths: string[] }) {
  const t = useTranslations();
  const path = decode(usePathname()).replace(/(.)\/$/, "$1");
  const suggestion = closest(path, paths);

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-xl border border-line bg-surface font-mono text-sm shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span aria-hidden className="size-2.5 rounded-full bg-rose-400" />
          <span aria-hidden className="size-2.5 rounded-full bg-amber-400" />
          <span aria-hidden className="size-2.5 rounded-full bg-emerald-400" />
          <span aria-hidden className="flex-1 pr-12 text-center text-xs text-muted">
            guest@akoskappel: ~
          </span>
        </div>
        <div className="grid gap-1 p-4 leading-relaxed break-words">
          <p>
            <span aria-hidden className="text-accent">
              ${" "}
            </span>
            cd {path}
          </p>
          <p className="text-muted">{t("terminal.noSuchFile", { command: "cd", path })}</p>
          {suggestion ? (
            <p>
              {t.rich("terminal.didYouMean", {
                suggestion,
                cmd: (chunks) => (
                  <Link
                    href={suggestion}
                    className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          ) : null}
          <p aria-hidden className="mt-2">
            <span className="text-accent">$ </span>
            <span className="terminal-cursor inline-block h-4 w-2 bg-ink align-middle" />
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
        <button
          type="button"
          // The header's command palette listens for Ctrl+K, so this opens the same one.
          onClick={() =>
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))
          }
          className="inline-flex items-center gap-2 hover:text-ink"
        >
          <Search aria-hidden size={16} />
          {t("notFound.search")}
          <kbd className="rounded border border-line px-1.5 font-mono text-xs">Ctrl K</kbd>
        </button>
        <Link href="/terminal" className="hover:text-ink">
          {t("nav.terminal")} →
        </Link>
      </div>
    </div>
  );
}
