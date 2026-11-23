import { type TechIcon, techIcons, techLinks } from "./tech-icons.data";

/** Logos whose brand is not in Simple Icons, kept as files in public/icons. */
const imageIcons: Record<string, string> = {
  "C#": "/icons/csharp.svg",
  Matplotlib: "/icons/matplotlib.svg",
  Playwright: "/icons/playwright.svg",
  PowerSync: "/icons/powersync.svg",
  "React Aria": "/icons/react-aria.svg",
};

/** Names used in versions and architecture steps that share another entry's logo. */
const aliases: Record<string, string> = {
  LiveView: "Phoenix LiveView",
  Stencil: "Stencil.js",
  SvelteKit: "Svelte",
  "Vue Router": "Vue",
  "Go API": "Go",
  Mathematica: "Wolfram Mathematica",
  "Tailscale Funnel": "Tailscale",
  "TanStack DB": "TanStack",
  "TanStack Start": "TanStack",
  "OpenAI API": "OpenAI",
  Codex: "OpenAI",
  Canvas: "HTML",
};

export type ResolvedIcon =
  | (TechIcon & { kind: "path"; id: string; color: string | undefined })
  | { kind: "image"; src: string };

/** Element id of a logo in the `/tech-icons.svg` sprite. */
export function iconId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/** Brands whose Simple Icons colour is plain black although their logo is known in colour. */
const brandColors: Record<string, string> = {
  Angular: "DD0031",
  Java: "ED8B00",
};

/** The dark theme's card surface: the darkest place a logo sits on. */
const darkSurface = "152131";

function channels(hex: string) {
  return [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
}

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const [r, g, b] = channels(hex).map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

/** 0 for greys, 1 for pure hues. */
function saturation(hex: string) {
  const values = channels(hex);
  const max = Math.max(...values);
  return max === 0 ? 0 : (max - Math.min(...values)) / max;
}

/** Mixes a colour toward white until it stands out (3:1) on the dark theme. */
function lightenForDark(hex: string) {
  for (let mix = 0.1; mix < 1; mix += 0.1) {
    const lighter = channels(hex)
      .map((value) =>
        Math.round(value + (255 - value) * mix)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("");
    if (contrast(lighter, darkSurface) >= 3) return lighter;
  }
  return "ffffff";
}

/**
 * CSS colour of a logo. Black, white and grey logos (Next.js, Express, ...) take the text
 * colour, so they show on both themes. Coloured logos keep their brand colour; a dark one
 * (Elixir, pandas, ...) gets a lighter step of the same hue on the dark theme.
 */
export function logoColor(hex: string) {
  const l = luminance(hex);
  if (saturation(hex) < 0.2 && (l < 0.05 || l > 0.7)) return undefined;
  if (contrast(hex, darkSurface) >= 3) return `#${hex}`;
  return `light-dark(#${hex}, #${lightenForDark(hex)})`;
}

/** Logo for a technology name, with the colour it should be drawn in. */
export function techIcon(alias: string): ResolvedIcon | undefined {
  const name = aliases[alias] ?? alias;
  if (imageIcons[name]) return { kind: "image", src: imageIcons[name] };
  const icon = techIcons[name];
  if (!icon) return undefined;
  return {
    kind: "path",
    ...icon,
    id: iconId(name),
    color: logoColor(brandColors[name] ?? icon.hex),
  };
}

/** Official site of a technology, if known. */
export function techUrl(alias: string): string | undefined {
  const name = aliases[alias] ?? alias;
  return techLinks[alias] ?? techLinks[name] ?? techIcons[name]?.url;
}
