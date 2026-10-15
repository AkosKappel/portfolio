"use client";

import { Check, Palette as PaletteIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useSyncExternalStore } from "react";
import { getChoices, getTheme, setPalette, subscribe } from "./appearance";
import { PALETTES, type Palette, type Theme } from "./theme-script";

/** Themes grouped by mode. Picking one also switches to its mode; the toggle remembers both. */
export function PalettePicker() {
  const t = useTranslations("common");
  const choices = useSyncExternalStore(subscribe, getChoices, () => "light dark");
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const [light, dark] = choices.split(" ");
  const chosen = { light, dark };
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const choose = (mode: Theme, palette: Palette) => {
    setPalette(mode, palette);
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
      <div className="absolute top-full right-0 z-50 mt-2 grid w-96 grid-cols-2 max-sm:fixed max-sm:inset-x-4 max-sm:top-16 max-sm:w-auto gap-1 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
        {(Object.keys(PALETTES) as Theme[]).map((mode) => (
          <fieldset key={mode}>
            <legend className="px-3 pt-1.5 pb-1 text-xs font-semibold text-muted">
              {t(`modes.${mode}`)}
            </legend>
            <ul>
              {PALETTES[mode].map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => choose(mode, option)}
                    aria-pressed={chosen[mode] === option}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent-soft hover:text-accent aria-pressed:font-medium"
                  >
                    <span
                      aria-hidden
                      data-palette={option}
                      className="flex size-5 shrink-0 items-center justify-center gap-0.5 rounded-md border border-line bg-paper"
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span className="size-1.5 rounded-full bg-ink" />
                    </span>
                    <span className="flex-1">{t(`palettes.${option}`)}</span>
                    {chosen[mode] === option ? (
                      <Check
                        aria-hidden
                        size={15}
                        className={mode === theme ? "text-accent" : "text-muted"}
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </details>
  );
}
