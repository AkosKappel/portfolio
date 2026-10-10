"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function savedTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Blocked storage falls through to the system setting.
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme: Theme) {
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    for (const listener of listeners) listener();
  };
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduceMotion) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

export function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next = theme === "dark" ? "light" : "dark";

  // Switching language swaps the root layout, so React renders a new <html> without the
  // attribute the head script set on the first load. Put it back before paint.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme) return;
    root.dataset.theme = savedTheme();
    for (const listener of listeners) listener();
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
      aria-label={labels[next]}
      title={labels[next]}
    >
      {theme === "dark" ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
    </button>
  );
}
