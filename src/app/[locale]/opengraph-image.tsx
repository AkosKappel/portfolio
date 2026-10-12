import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { ogSize, siteOgImage } from "@/lib/og-image";

export const alt = `${site.name}, ${site.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpenGraphImage() {
  return siteOgImage();
}
