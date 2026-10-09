import { type TechIcon, techIcons } from "./tech-icons.data";

/** Logos whose brand is not in Simple Icons, kept as files in public/icons. */
const imageIcons: Record<string, string> = {
  "C#": "/icons/csharp.svg",
};

export type ResolvedIcon =
  | (TechIcon & { kind: "path"; color: string | undefined })
  | { kind: "image"; src: string };

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Logo for a technology name, in its brand colour. Black or white brand colours
 * (Next.js, Express, ...) would vanish on one of the themes, so they use the text colour.
 */
export function techIcon(name: string): ResolvedIcon | undefined {
  if (imageIcons[name]) return { kind: "image", src: imageIcons[name] };
  const icon = techIcons[name];
  if (!icon) return undefined;
  const l = luminance(icon.hex);
  return { kind: "path", ...icon, color: l < 0.04 || l > 0.85 ? undefined : `#${icon.hex}` };
}
