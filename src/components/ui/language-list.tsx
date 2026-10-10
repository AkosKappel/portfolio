import { Flag } from "@/components/ui/flags";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function LanguageList({ locale }: { locale: Locale }) {
  return (
    <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
      {site.languages.map((language) => (
        <div key={language.name.en}>
          <dt className="flex items-center gap-2 font-display text-xl font-semibold">
            <Flag locale={language.flag} className="h-4 w-6" />
            {pick(language.name, locale)}
          </dt>
          <dd className="mt-0.5 text-muted">
            {pick(language.level, locale)}
            {"cefr" in language ? ` (${language.cefr})` : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
