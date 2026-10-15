import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { Page, PageHeader } from "@/components/ui/page";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

type Section = { id: string; title: string; paragraphs: string[] };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/colophon">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "colophon" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/colophon"),
  };
}

export default async function ColophonPage({ params }: PageProps<"/[locale]/colophon">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("colophon");
  const tCommon = await getTranslations("common");
  const sections = t.raw("sections") as Section[];

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <nav aria-label={t("title")} className="-mt-2 mb-10 flex flex-wrap gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="hover-lift rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
          >
            {section.title}
          </a>
        ))}
      </nav>
      <div className="grid max-w-3xl gap-12">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <AnchorHeading
              id={section.id}
              label={tCommon("anchor")}
              className="text-2xl font-semibold"
            >
              {section.title}
            </AnchorHeading>
            <div className="mt-4 space-y-4 text-lg">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.id === "accessibility" ? (
                <p>
                  <a href={`mailto:${site.email}`} className="link">
                    {site.email}
                  </a>
                </p>
              ) : null}
            </div>
          </section>
        ))}
        <p className="text-lg">
          <a href={site.repository} className="link">
            {t("sourceCode")}
          </a>
        </p>
      </div>
    </Page>
  );
}
