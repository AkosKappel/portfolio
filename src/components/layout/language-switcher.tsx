"use client";

import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Flag } from "@/components/ui/flags";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** A native <details> menu with one real link per language, so it also works without JavaScript. */
export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <details className="group relative">
      <summary className="inline-flex h-9 cursor-pointer list-none items-center gap-2 rounded-full border border-line px-3 text-sm font-medium leading-none text-muted transition-colors hover:border-accent hover:bg-accent-soft hover:text-ink group-open:border-accent group-open:text-ink [&::-webkit-details-marker]:hidden">
        <Flag locale={locale} />
        <span className="sr-only">{t("common.language")}: </span>
        <span className="uppercase">{locale}</span>
        <ChevronDown
          aria-hidden
          size={14}
          className="-mr-0.5 transition-transform group-open:rotate-180"
        />
      </summary>
      <ul className="absolute top-full right-0 z-50 mt-2 min-w-44 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
        {routing.locales.map((option) => (
          <li key={option}>
            <Link
              href={pathname}
              locale={option}
              hrefLang={option}
              aria-current={option === locale ? "true" : undefined}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent-soft hover:text-accent aria-[current=true]:font-medium"
            >
              <Flag locale={option} />
              <span className="flex-1">{t(`languages.${option}`)}</span>
              {option === locale ? <Check aria-hidden size={15} className="text-accent" /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
