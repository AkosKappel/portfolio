"use client";

import { Check, Palette as PaletteIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { PALETTE_STORAGE_KEY, PALETTES, type Palette } from "./theme-script";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isPalette(value: unknown): value is Palette {
  return PALETTES.includes(value as Palette);
}

function getPalette(): Palette {
  const current = document.documentElement.dataset.palette;
  return isPalette(current) ? current : "navy";
}

function applyPalette(palette: Palette) {
  document.documentElement.dataset.palette = palette;
  for (const listener of listeners) listener();
}

export function PalettePicker() {
  const t = useTranslations("common");
  const palette = useSyncExternalStore(subscribe, getPalette, () => "navy" as Palette);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Switching language renders a new <html> without the attribute the head script set.
  useLayoutEffect(() => {
    if (document.documentElement.dataset.palette) return;
    try {
      const saved = localStorage.getItem(PALETTE_STORAGE_KEY);
      if (isPalette(saved)) applyPalette(saved);
    } catch {
      // Blocked storage keeps the default palette.
    }
  }, []);

  const choose = (next: Palette) => {
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this page view only.
    }
    applyPalette(next);
    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        className="grid size-10 cursor-pointer list-none place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink group-open:text-ink [&::-webkit-details-marker]:hidden"
        title={t("palette")}
      >
        <PaletteIcon aria-hidden size={18} />
        <span className="sr-only">{t("palette")}</span>
      </summary>
      <ul className="absolute top-full right-0 z-50 mt-2 min-w-44 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
        {PALETTES.map((option) => (
          <li key={option}>
            <button
              type="button"
              onClick={() => choose(option)}
              aria-pressed={option === palette}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent-soft hover:text-accent aria-pressed:font-medium"
            >
              <span
                aria-hidden
                data-palette={option}
                className="size-4 rounded-full border border-line bg-accent"
              />
              <span className="flex-1">{t(`palettes.${option}`)}</span>
              {option === palette ? <Check aria-hidden size={15} className="text-accent" /> : null}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
