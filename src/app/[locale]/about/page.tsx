import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { CvMenu } from "@/components/ui/cv-menu";
import { LanguageList } from "@/components/ui/language-list";
import { Page, PageHeader } from "@/components/ui/page";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <Page>
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <PageHeader title={t("title")} lead={pick(site.intro, locale)} />
          <nav aria-label={t("title")} className="-mt-2 mb-10 flex flex-wrap gap-2">
            {[
              ...site.about.map((section) => ({
                id: section.id,
                title: pick(section.title, locale),
              })),
              { id: "languages", title: t("languages") },
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="hover-lift rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
              >
                {section.title}
              </a>
            ))}
          </nav>
          <div className="grid max-w-2xl gap-12">
            {site.about.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <AnchorHeading
                  id={section.id}
                  label={tCommon("anchor")}
                  className="text-2xl font-semibold"
                >
                  {pick(section.title, locale)}
                </AnchorHeading>
                <div className="mt-4 space-y-4 text-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.en}>{pick(paragraph, locale)}</p>
                  ))}
                </div>
              </section>
            ))}
            <section aria-labelledby="languages">
              <AnchorHeading
                id="languages"
                label={tCommon("anchor")}
                className="text-2xl font-semibold"
              >
                {t("languages")}
              </AnchorHeading>
              <LanguageList locale={locale} />
            </section>
          </div>
          <div className="mt-12 flex flex-wrap items-start gap-3">
            <CvMenu />
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {tNav("experience")}
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start lg:pt-20">
          <Image
            src="/images/profile.webp"
            alt={t("portrait")}
            width={900}
            height={1350}
            sizes="(min-width: 1024px) 20rem, 60vw"
            className="w-60 rounded-2xl border border-line lg:w-full"
            priority
          />
        </div>
      </div>
    </Page>
  );
}
