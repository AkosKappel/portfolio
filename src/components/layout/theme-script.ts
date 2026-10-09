export const THEME_STORAGE_KEY = "theme";

/** Runs in <head> before paint: a saved choice wins, otherwise the system setting. */
export const themeScript = `(() => {
  try {
    const saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`;
