"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PALETTES } from "@/components/layout/theme-script";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  ALIASES,
  complete,
  completionOptions,
  displayPath,
  expandHistory,
  HOME,
  KONAMI,
  suggestion,
} from "@/lib/terminal";
import {
  ACHIEVEMENTS,
  type Achievement,
  buildFs,
  execute,
  HELP,
  HelpTable,
  type Mode,
  SCHEMES,
  type Settings,
  type Shell,
} from "./commands";
import { Boot, Confetti, Matrix, SnakeGame } from "./effects";
import { RunContext, reducedMotion } from "./output";

export type TerminalData = {
  whoami: string[];
  about: string;
  projects: { slug: string; title: string; years: string; summary: string }[];
  skills: { id: string; name: string; skills: string[] }[];
  jobs: { id: string; role: string; company: string; period: string }[];
  pages: { name: string; href: string; label: string }[];
  links: { name: string; url: string }[];
};

type Entry = { id: number; command?: string; cwd?: string; output: ReactNode };

const STORAGE = {
  history: "terminal-history",
  achievements: "terminal-achievements",
  settings: "terminal-settings",
  booted: "terminal-booted",
};

function load<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Blocked storage only means the terminal forgets this visit.
  }
}

const QUIT_VIM = /^:(q|q!|qa|qa!|wq|wq!|x)$/;

const Prompt = ({ cwd = "~" }: { cwd?: string }) => (
  <span aria-hidden className="text-accent">
    guest@akoskappel:{cwd}$
  </span>
);

/** A small command line over the site's content, for visitors who prefer a keyboard. */
export function Terminal({ data }: { data: TerminalData }) {
  const t = useTranslations("terminal");
  const tLanguages = useTranslations("languages");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const lastTab = useRef<string>(undefined);
  const job = useRef<AbortController>(undefined);
  const achievedRef = useRef<string[]>([]);

  const [value, setValue] = useState("");
  const [caret, setCaret] = useState(0);
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>();
  const [searching, setSearching] = useState(false);
  const [searchSkip, setSearchSkip] = useState(0);
  const [cwd, setCwd] = useState(HOME);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<Mode>();
  const [vimMessage, setVimMessage] = useState("");
  const [settings, setSettings] = useState<Settings>({ scheme: "default", crt: false });
  const [frame, setFrame] = useState<"window" | "minimized" | "fullscreen">("window");
  const [booting, setBooting] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const fs = useMemo(() => buildFs(data, t("secrets")), [data, t]);
  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: -1, output: t("welcome") },
    { id: 0, command: "help", output: <HelpTable t={t} /> },
  ]);

  const searchMatch = searching
    ? history.filter((entry) => value && entry.includes(value)).reverse()[searchSkip]
    : undefined;
  const ghost = searching || caret < value.length ? "" : suggestion(value, history);

  const focusPrompt = useCallback(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const append = useCallback((entry: Omit<Entry, "id">) => {
    const id = nextId.current++;
    setEntries((previous) => [...previous, { ...entry, id }]);
  }, []);

  const unlock = useCallback(
    (achievement: Achievement) => {
      if (achievedRef.current.includes(achievement)) return;
      achievedRef.current = [...achievedRef.current, achievement];
      save(STORAGE.achievements, achievedRef.current);
      const name = t(`achievements.${achievement}`);
      const found = achievedRef.current.length;
      // After the command's own entry, which is appended once the command returns.
      setTimeout(() =>
        append({
          output: (
            <p className="text-accent">
              ★ {t("achievementUnlocked", { name, found, total: ACHIEVEMENTS.length })}
            </p>
          ),
        }),
      );
    },
    [append, t],
  );

  useEffect(() => {
    setHistory(load<string[]>(STORAGE.history, []));
    achievedRef.current = load<string[]>(STORAGE.achievements, []);
    setSettings((current) => ({ ...current, ...load(STORAGE.settings, {}) }));
    if (!load(STORAGE.booted, false) && !reducedMotion()) {
      save(STORAGE.booted, true);
      setBooting(true);
    }
  }, []);

  // Keep the newest output in view while commands and animations print.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const observer = new MutationObserver(() => {
      body.scrollTop = body.scrollHeight;
    });
    observer.observe(body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!busy) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "c") || event.key === "Escape") job.current?.abort();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [busy]);

  const onKonami = useRef(() => {});
  onKonami.current = () => {
    setInput("");
    append({ output: t("konami") });
    unlock("konami");
    if (!reducedMotion()) setConfetti(true);
  };
  useEffect(() => {
    let position = 0;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0;
      if (position === KONAMI.length) {
        position = 0;
        // Keeps the final "a" out of the prompt.
        event.preventDefault();
        onKonami.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (frame !== "fullscreen" || mode) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setFrame("window");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [frame, mode]);

  function setInput(next: string, position = next.length) {
    setValue(next);
    setCaret(position);
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(position, position));
  }

  function updateSettings(patch: Partial<Settings>) {
    setSettings((current) => {
      const next = { ...current, ...patch };
      save(STORAGE.settings, next);
      return next;
    });
  }

  function run(typed: string) {
    setInput("");
    setHistoryIndex(undefined);
    setSearching(false);
    lastTab.current = undefined;
    const prompt = displayPath(cwd);
    if (!typed) {
      append({ command: "", cwd: prompt, output: null });
      return;
    }
    const expanded = expandHistory(typed, history);
    const nextHistory = [...history, expanded ?? typed].slice(-200);
    setHistory(nextHistory);
    save(STORAGE.history, nextHistory);
    if (expanded === undefined) {
      append({ command: typed, cwd: prompt, output: t("eventNotFound", { event: typed }) });
      return;
    }
    const [first, ...rest] = expanded.split(" ");
    const alias = ALIASES[first.toLowerCase()];
    const line = alias ? [alias, ...rest].join(" ") : expanded;
    if (line.trim().toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    const shell: Shell = {
      t,
      languageName: (code) => tLanguages(code),
      locale,
      data,
      fs,
      cwd,
      setCwd,
      history: nextHistory,
      achieved: achievedRef.current,
      unlock,
      startJob: () => {
        const controller = new AbortController();
        job.current = controller;
        setBusy(true);
        return {
          signal: controller.signal,
          done: () => {
            if (job.current !== controller) return;
            job.current = undefined;
            setBusy(false);
            focusPrompt();
          },
        };
      },
      setMode: (next) => {
        setMode(next);
        setVimMessage("");
      },
      settings,
      updateSettings,
      navigate: (href, target) => router.push(href, target ? { locale: target } : undefined),
    };
    const output = execute(line, shell);
    append({ command: expanded, cwd: prompt, output });
    requestAnimationFrame(() => inputRef.current?.scrollIntoView({ block: "nearest" }));
  }

  function vimCommand(text: string) {
    setInput("");
    if (QUIT_VIM.test(text.trim())) {
      setMode(undefined);
      unlock("vim");
      return;
    }
    const tries = vimMessage.startsWith("E492") ? ` ${t("vimHint")}` : "";
    setVimMessage(`E492: Not an editor command: ${text.replace(/^:/, "")}${tries}`);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (mode === "vim") vimCommand(value);
    else run(searching ? (searchMatch ?? "") : value.trim());
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    const ctrl = event.ctrlKey && !event.altKey && !event.metaKey;
    const input = event.currentTarget;

    if (ctrl && key === "c") {
      // Copying selected text keeps working.
      if (input.selectionStart !== input.selectionEnd || getSelection()?.toString()) return;
      event.preventDefault();
      if (mode === "vim") {
        setVimMessage("Type  :qa!  and press <Enter> to abandon all changes and exit Vim");
        return;
      }
      append({ command: `${value}^C`, cwd: displayPath(cwd), output: null });
      setSearching(false);
      setInput("");
      return;
    }
    if (mode === "vim") return;
    if (ctrl && key === "l") {
      event.preventDefault();
      setEntries([]);
    } else if (ctrl && key === "u") {
      event.preventDefault();
      setInput(value.slice(caret), 0);
    } else if (ctrl && key === "r") {
      event.preventDefault();
      if (searching) setSearchSkip((skip) => skip + 1);
      else {
        setSearching(true);
        setSearchSkip(0);
        setInput("");
      }
    } else if (searching) {
      if (key === "Escape" || (ctrl && key === "g")) {
        event.preventDefault();
        setSearching(false);
        setInput("");
      } else if (key === "Tab" || key === "ArrowRight" || key === "ArrowLeft") {
        event.preventDefault();
        setSearching(false);
        setInput(searchMatch ?? "");
      }
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      if (!history.length) return;
      event.preventDefault();
      const last = history.length - 1;
      const index =
        key === "ArrowUp"
          ? Math.max(0, (historyIndex ?? history.length) - 1)
          : (historyIndex ?? last) + 1;
      if (index > last) {
        setHistoryIndex(undefined);
        setInput("");
      } else {
        setHistoryIndex(index);
        setInput(history[index]);
      }
    } else if (key === "Tab") {
      event.preventDefault();
      const options = completionOptions(
        value,
        {
          open: [...data.projects.map((p) => p.slug), ...data.pages.map((p) => p.name)],
          man: HELP.map(([name]) => name),
          theme: Object.values(PALETTES).flat(),
          lang: routing.locales,
          scheme: SCHEMES,
          crt: ["on", "off"],
          copy: ["email"],
        },
        fs,
        cwd,
      );
      const result = complete(value, options);
      if (result.value !== value) setInput(result.value);
      else if (result.matches.length > 1 && lastTab.current === value) {
        append({
          command: value,
          cwd: displayPath(cwd),
          output: <p className="flex flex-wrap gap-x-6">{result.matches.join("  ")}</p>,
        });
      }
      lastTab.current = result.value;
    } else if ((key === "ArrowRight" || key === "End") && ghost && caret === value.length) {
      event.preventDefault();
      setInput(value + ghost);
    }
  }

  const exitMatrix = useCallback(() => {
    setMode(undefined);
    focusPrompt();
  }, [focusPrompt]);
  const endBoot = useCallback(() => {
    setBooting(false);
    focusPrompt();
  }, [focusPrompt]);
  const endConfetti = useCallback(() => setConfetti(false), []);
  const bootLines = useMemo(() => bootLog(data), [data]);

  const showPrompt = !busy && mode !== "snake" && mode !== "matrix";

  return (
    <RunContext.Provider value={run}>
      {frame === "minimized" ? (
        <button
          type="button"
          onClick={() => {
            setFrame("window");
            focusPrompt();
          }}
          className="flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2 font-mono text-sm shadow-sm hover:border-accent"
        >
          <span aria-hidden className="size-2.5 rounded-full bg-emerald-400" />
          guest@akoskappel: ~<span className="sr-only">{t("window.restore")}</span>
        </button>
      ) : null}
      {/* Clicking anywhere in the window focuses the prompt, as in a real terminal. */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: the input itself is the keyboard path */}
      <div
        hidden={frame === "minimized"}
        onClick={() => {
          if (!getSelection()?.toString()) inputRef.current?.focus();
        }}
        data-scheme={settings.scheme === "default" ? undefined : settings.scheme}
        className={`terminal flex flex-col overflow-hidden border-line bg-surface font-mono text-sm text-ink ${
          frame === "fullscreen" ? "fixed inset-0 z-50" : "relative rounded-xl border shadow-sm"
        } ${settings.crt ? "terminal-crt" : ""}`}
      >
        {booting ? <Boot lines={bootLines} onDone={endBoot} /> : null}
        <div className="flex items-center border-b border-line px-2 py-1.5">
          <WindowButton
            label={t("window.close")}
            colour="bg-rose-400"
            onClick={() => router.push("/")}
          />
          <WindowButton
            label={t("window.minimize")}
            colour="bg-amber-400"
            onClick={() => setFrame("minimized")}
          />
          <WindowButton
            label={t(frame === "fullscreen" ? "window.exitFullscreen" : "window.fullscreen")}
            colour="bg-emerald-400"
            onClick={() => setFrame(frame === "fullscreen" ? "window" : "fullscreen")}
          />
          <span aria-hidden className="flex-1 pr-14 text-center text-xs text-muted">
            guest@akoskappel: {displayPath(cwd)}
          </span>
        </div>
        <div
          ref={bodyRef}
          className={`relative overflow-y-auto p-4 leading-relaxed ${
            frame === "fullscreen" ? "flex-1" : "max-h-[60vh] min-h-80"
          }`}
        >
          {mode === "vim" ? (
            <div aria-live="polite" className="flex min-h-72 flex-col">
              <pre aria-hidden className="flex-1 text-muted">
                {"~\n".repeat(12)}
              </pre>
              <p className="text-muted">"notes.txt" [New]</p>
              <p>{vimMessage}</p>
            </div>
          ) : null}
          {/* Hidden, not unmounted, while vim is open: remounting would replay finished animations. */}
          <div role="log" aria-live="polite" hidden={mode === "vim"} className="grid gap-3">
            {entries.map((entry) => (
              <div key={entry.id}>
                {entry.command !== undefined ? (
                  <p>
                    <Prompt cwd={entry.cwd} /> {entry.command}
                  </p>
                ) : null}
                <div className="break-words whitespace-pre-wrap">{entry.output}</div>
              </div>
            ))}
          </div>
          {mode === "snake" ? (
            <div className="mt-3">
              <SnakeGame
                labels={{
                  help: t("snake.help"),
                  score: (score) => t("snake.score", { score }),
                  over: t("snake.over"),
                }}
                onExit={(best) => {
                  setMode(undefined);
                  append({ output: t("snake.result", { score: best }) });
                  if (best >= 10) unlock("snake");
                  focusPrompt();
                }}
              />
            </div>
          ) : null}
          <form onSubmit={submit} hidden={!showPrompt} className="mt-3 flex items-center gap-2">
            {mode === "vim" ? null : searching ? (
              <span aria-hidden className="text-muted">
                (reverse-i-search)`
              </span>
            ) : (
              <Prompt cwd={displayPath(cwd)} />
            )}
            <label htmlFor="terminal-input" className="sr-only">
              {t("inputLabel")}
            </label>
            <div className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                id="terminal-input"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setCaret(event.target.selectionStart ?? event.target.value.length);
                  setHistoryIndex(undefined);
                  setSearchSkip(0);
                }}
                onSelect={(event) =>
                  setCaret(event.currentTarget.selectionStart ?? event.currentTarget.value.length)
                }
                onKeyDown={onKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-transparent caret-transparent outline-none"
              />
              {/* The block cursor and the suggestion are drawn over the input. They drift once a long line scrolls the input sideways; a contenteditable line would fix that. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre"
              >
                <span className="invisible">{value.slice(0, caret)}</span>
                {focused ? (
                  <span className="terminal-cursor bg-ink text-surface">
                    {value[caret] ?? ghost[0] ?? " "}
                  </span>
                ) : null}
                {searching ? (
                  <>
                    <span className="invisible">{value.slice(caret + 1)}</span>
                    <span className="text-muted">': {searchMatch ?? ""}</span>
                  </>
                ) : (
                  <span className="text-muted opacity-70">{focused ? ghost.slice(1) : ghost}</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {mode === "matrix" ? <Matrix hint={t("matrixHint")} onExit={exitMatrix} /> : null}
      {confetti ? <Confetti onDone={endConfetti} /> : null}
    </RunContext.Provider>
  );
}

function WindowButton({
  label,
  colour,
  onClick,
}: {
  label: string;
  colour: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="group grid size-6 cursor-pointer place-items-center rounded-full"
    >
      <span
        aria-hidden
        className={`size-3 rounded-full ${colour} ring-ink/40 group-hover:ring-2 group-focus-visible:ring-2`}
      />
    </button>
  );
}

function bootLog(data: TerminalData): ReactNode[] {
  const ok = (text: string) => (
    <>
      [<span className="text-accent"> OK </span>] {text}
    </>
  );
  const skills = data.skills.reduce((count, group) => count + group.skills.length, 0);
  return [
    "akoskappel.dev BIOS v1.0",
    "Memory test: 10240M OK",
    "Booting portfolio kernel…",
    ok(`Mounted /home/guest/projects (${data.projects.length} projects)`),
    ok(`Loaded ${skills} skills`),
    ok(`Started career.service (${data.jobs.length} jobs)`),
    ok("Started coffee-maker.service"),
    ok("Reached target multi-user.target"),
    "",
    "akoskappel.dev login: guest",
    "Password: ********",
    "Welcome to akoskappel.dev",
  ];
}
