import { site } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";

export function absoluteUrl(locale: Locale, href: string) {
  return new URL(getPathname({ locale, href }), site.url).toString();
}

/** Canonical URL for this language plus hreflang links to every language version. */
export function alternates(locale: Locale, href: string) {
  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((other) => [other, getPathname({ locale: other, href })]),
      ),
      "x-default": getPathname({ locale: routing.defaultLocale, href }),
    },
  };
}
