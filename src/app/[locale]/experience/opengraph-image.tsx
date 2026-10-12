import { routing } from "@/i18n/routing";
import { ogSize, sectionOgImage } from "@/lib/og-image";

export const alt = "Experience page preview";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  return sectionOgImage(params, "experience");
}
