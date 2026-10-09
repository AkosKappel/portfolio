import { GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Page, PageHeader } from "@/components/ui/page";
import { degrees } from "@/content/education";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/education">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "education" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/education"),
  };
}

export default async function EducationPage({ params }: PageProps<"/[locale]/education">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("education");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <ol className="grid gap-12">
        {degrees.map((degree) => (
          <li
            key={degree.start}
            className="grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_1fr] md:gap-10"
          >
            <p className="font-medium">
              {degree.start} – {degree.end}
            </p>
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <GraduationCap aria-hidden className="size-6 text-accent" />
                {pick(degree.field, locale)}
              </h2>
              <p className="mt-1 text-lg">{pick(degree.degree, locale)}</p>
              <p className="mt-1 text-muted">
                {degree.url ? (
                  <a href={degree.url} className="link">
                    {pick(degree.school, locale)}
                  </a>
                ) : (
                  pick(degree.school, locale)
                )}
              </p>
              {degree.thesis ? (
                <p className="mt-4 max-w-2xl">
                  <span className="text-muted">{t("thesis")}: </span>
                  {degree.thesis.url ? (
                    <Link href={degree.thesis.url} className="link">
                      {pick(degree.thesis.title, locale)}
                    </Link>
                  ) : (
                    pick(degree.thesis.title, locale)
                  )}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <section aria-labelledby="languages" className="mt-20">
        <h2 id="languages" className="text-3xl font-semibold">
          {t("languages")}
        </h2>
        <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {site.languages.map((language) => (
            <div key={language.name.en}>
              <dt className="font-display text-xl font-semibold">{pick(language.name, locale)}</dt>
              <dd className="text-muted">{pick(language.level, locale)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Page>
  );
}
