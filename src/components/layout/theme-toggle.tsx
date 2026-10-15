"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { getTheme, restoreAppearance, setTheme, subscribe } from "./appearance";
import type { Theme } from "./theme-script";

export function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next = theme === "dark" ? "light" : "dark";

  useLayoutEffect(restoreAppearance, []);

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
