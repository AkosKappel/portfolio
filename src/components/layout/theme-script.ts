export const THEME_STORAGE_KEY = "theme";
export const PALETTE_STORAGE_KEY = "palette";
export const PALETTES = ["navy", "forest", "plum", "copper"] as const;
export type Palette = (typeof PALETTES)[number];

/** Runs in <head> before paint: a saved choice wins, otherwise the system setting. */
export const themeScript = `(() => {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "dark" : "light";
    const palette = localStorage.getItem("${PALETTE_STORAGE_KEY}");
    if (${JSON.stringify(PALETTES)}.includes(palette)) root.dataset.palette = palette;
  } catch {
    root.dataset.theme = "light";
  }
})();`;
