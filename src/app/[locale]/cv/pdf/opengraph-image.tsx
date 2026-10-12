import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { type Locale, routing } from "@/i18n/routing";
import { ogSize, pageOgImage } from "@/lib/og-image";

export const alt = "CV preview";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "cvPdf" });
  const cv = site.cv.find((entry) => entry.locale === locale) ?? site.cv[0];
  return pageOgImage({ title: t("title"), lead: t("description"), screenshot: cv.pages[0] });
}
