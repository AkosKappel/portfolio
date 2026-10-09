import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page, PageHeader } from "@/components/ui/page";
import { site } from "@/content/site";
import { pick } from "@/content/types";
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

  return (
    <Page>
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <PageHeader title={t("title")} lead={pick(site.intro, locale)} />
          <div className="max-w-2xl space-y-5 text-lg">
            {site.about.map((paragraph) => (
              <p key={paragraph.en}>{pick(paragraph, locale)}</p>
            ))}
          </div>
          <h2 className="mt-12 text-2xl font-semibold">{t("languages")}</h2>
          <dl className="mt-4 grid max-w-2xl grid-cols-2 gap-5 sm:grid-cols-4">
            {site.languages.map((language) => (
              <div key={language.name.en}>
                <dt className="font-medium">{pick(language.name, locale)}</dt>
                <dd className="text-sm text-muted">{pick(language.level, locale)}</dd>
              </div>
            ))}
          </dl>
          <CvMenu className="mt-10" />
        </div>
        <div className="lg:pt-20">
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
