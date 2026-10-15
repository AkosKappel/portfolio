import {
  PALETTES,
  type Palette,
  paletteStorageKey,
  THEME_STORAGE_KEY,
  type Theme,
} from "./theme-script";

/** Client-side store for the mode (light or dark) and the theme chosen for each mode. */

const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getPalette(): Palette {
  const theme = getTheme();
  const palette = document.documentElement.dataset.palette;
  return isPalette(theme, palette) ? palette : theme;
}

function isPalette(theme: Theme, value: unknown): value is Palette {
  return (PALETTES[theme] as readonly unknown[]).includes(value);
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    // Blocked storage falls back to the defaults.
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
}

export function savedPalette(theme: Theme): Palette {
  const saved = read(paletteStorageKey(theme));
  return isPalette(theme, saved) ? saved : theme;
}

function savedTheme(): Theme {
  const saved = read(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: Theme, palette: Palette, animate: boolean) {
  const update = () => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.palette = palette;
    for (const listener of listeners) listener();
  };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && document.startViewTransition && !reduceMotion) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

/** Switches the mode and shows the theme last chosen for it. */
export function setTheme(theme: Theme) {
  write(THEME_STORAGE_KEY, theme);
  apply(theme, savedPalette(theme), true);
}

/** Picks a theme; its mode becomes the current one. */
export function setPalette(theme: Theme, palette: Palette) {
  write(THEME_STORAGE_KEY, theme);
  write(paletteStorageKey(theme), palette);
  apply(theme, palette, true);
}

/**
 * Switching language swaps the root layout, so React renders a new <html> without the
 * attributes the head script set on the first load. Puts them back before paint.
 */
export function restoreAppearance() {
  if (document.documentElement.dataset.theme) return;
  const theme = savedTheme();
  apply(theme, savedPalette(theme), false);
}

/** The theme chosen for each mode, as one string so it works as a store snapshot. */
export function getChoices() {
  const current = getTheme();
  const choice = (theme: Theme) => (theme === current ? getPalette() : savedPalette(theme));
  return `${choice("light")} ${choice("dark")}`;
}
