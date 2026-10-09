import { getPathname } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";

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
