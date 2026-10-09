import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sk"],
  defaultLocale: "en",
  // English lives at "/", Slovak at "/sk".
  localePrefix: "as-needed",
  // Keep URLs predictable for visitors and search engines: no redirect by browser language.
  localeDetection: false,
  // hreflang links come from page metadata with the real site URL, not from response headers.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
