import { BookOpen, GraduationCap, School } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { LanguageList } from "@/components/ui/language-list";
import { Page, PageHeader } from "@/components/ui/page";
import { degrees, secondarySchool, university } from "@/content/education";
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
  const tCommon = await getTranslations("common");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />

      <section aria-labelledby="university">
        <AnchorHeading id="university" label={tCommon("anchor")} className="text-3xl font-semibold">
          {t("university")}
        </AnchorHeading>
        <p className="mt-2 text-lg">
          <a href={university.url} className="link">
            {pick(university.name, locale)}
          </a>
        </p>
        <p className="text-muted">{pick(university.faculty, locale)}</p>

        <ol className="mt-8 grid gap-10">
          {degrees.map((degree) => (
            <li
              key={degree.id}
              className="grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <p className="font-medium">
                {degree.start} – {degree.end}
              </p>
              <div>
                <AnchorHeading
                  id={degree.id}
                  as="h3"
                  label={tCommon("anchor")}
                  className="flex items-center gap-2 text-2xl font-semibold"
                >
                  <GraduationCap aria-hidden className="size-6 shrink-0 text-accent" />
                  {pick(degree.field, locale)}
                </AnchorHeading>
                <p className="mt-1 text-lg">{pick(degree.degree, locale)}</p>
                <p className="mt-3 max-w-2xl text-muted">{pick(degree.description, locale)}</p>
                <p className="mt-4 flex max-w-2xl gap-2">
                  <BookOpen aria-hidden className="mt-1 size-4 shrink-0 text-muted" />
                  <span>
                    <span className="text-muted">{t("thesis")}: </span>
                    {degree.thesis.url ? (
                      <Link href={degree.thesis.url} className="link">
                        {pick(degree.thesis.title, locale)}
                      </Link>
                    ) : (
                      pick(degree.thesis.title, locale)
                    )}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="secondary-school" className="mt-16">
        <AnchorHeading
          id="secondary-school"
          label={tCommon("anchor")}
          className="text-3xl font-semibold"
        >
          {t("secondarySchool")}
        </AnchorHeading>
        <div className="mt-6 grid gap-3 border-t border-line pt-6 md:grid-cols-[11rem_1fr] md:gap-10">
          <p className="font-medium">
            {secondarySchool.start} – {secondarySchool.end}
          </p>
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-semibold">
              <School aria-hidden className="size-6 shrink-0 text-accent" />
              {pick(secondarySchool.name, locale)}
            </h3>
            <p className="mt-1 text-lg">
              {pick(secondarySchool.type, locale)}, {secondarySchool.place}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="languages" className="mt-16">
        <AnchorHeading id="languages" label={tCommon("anchor")} className="text-3xl font-semibold">
          {t("languages")}
        </AnchorHeading>
        <LanguageList locale={locale} />
      </section>
    </Page>
  );
}
