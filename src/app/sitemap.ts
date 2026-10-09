import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { navigation, site } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs = [
    "/",
    ...navigation.map((item) => item.href),
    "/cv",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];
  const url = (locale: (typeof routing.locales)[number], href: string) =>
    new URL(getPathname({ locale, href }), site.url).toString();

  return hrefs.map((href) => ({
    url: url(routing.defaultLocale, href),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, url(locale, href)])),
    },
  }));
}
