import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CopyButton } from "@/components/ui/copy-button";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page, PageHeader } from "@/components/ui/page";
import { site } from "@/content/site";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: pick(site.availability, locale),
    alternates: alternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");
  const profiles = [
    { href: site.links.linkedin, label: "LinkedIn", detail: t("linkedin"), Icon: LinkedInIcon },
    { href: site.links.github, label: "GitHub", detail: t("github"), Icon: GitHubIcon },
    { href: site.links.gitlab, label: "GitLab", detail: t("gitlab"), Icon: GitLabIcon },
  ];

  return (
    <Page>
      <PageHeader title={t("title")} lead={pick(site.availability, locale)} />
      <div className="grid gap-12 lg:grid-cols-2">
        <section aria-label="Email">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 font-display text-2xl font-semibold break-all hover:text-accent sm:text-4xl"
          >
            <Mail aria-hidden className="size-7 shrink-0" />
            {site.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <CopyButton
              value={site.email}
              label={tCommon("copyEmail")}
              copiedLabel={tCommon("copied")}
            />
            <CvMenu />
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-muted">
            <MapPin aria-hidden size={18} />
            {pick(site.location, locale)}
          </p>
        </section>
        <section aria-labelledby="profiles">
          <h2 id="profiles" className="text-2xl font-semibold">
            {t("profiles")}
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {profiles.map(({ href, label, detail, Icon }) => (
              <li key={label}>
                <a href={href} className="group flex items-center gap-4 py-4">
                  <Icon className="size-6 shrink-0" />
                  <span>
                    <span className="block font-medium group-hover:text-accent">{label}</span>
                    <span className="block text-sm text-muted">{detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  );
}
