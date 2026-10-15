export const THEME_STORAGE_KEY = "theme";

/** Themes per mode; the first of each list is the default and shares the mode's name. */
export const PALETTES = {
  light: ["light", "corporate", "nord", "cupcake", "retro"],
  dark: ["dark", "dracula", "dim", "coffee", "synthwave"],
} as const;

export type Theme = keyof typeof PALETTES;
export type Palette = (typeof PALETTES)[Theme][number];

export const paletteStorageKey = (theme: Theme) => `palette-${theme}`;

/** Runs in <head> before paint: a saved choice wins, otherwise the system setting. */
export const themeScript = `(() => {
  const root = document.documentElement;
  const palettes = ${JSON.stringify(PALETTES)};
  try {
    const saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = dark ? "dark" : "light";
    const palette = localStorage.getItem("palette-" + theme);
    root.dataset.theme = theme;
    root.dataset.palette = palettes[theme].includes(palette) ? palette : theme;
  } catch {
    root.dataset.theme = "light";
    root.dataset.palette = "light";
  }
})();`;
