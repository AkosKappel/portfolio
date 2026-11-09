import { ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { CvMenu } from "@/components/ui/cv-menu";
import { JsonLd } from "@/components/ui/json-ld";
import { LanguageList } from "@/components/ui/language-list";
import { Page, PageHeader } from "@/components/ui/page";
import { TechLogo } from "@/components/ui/tech-badge";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { practices, skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, alternates } from "@/lib/metadata";
import { person } from "@/lib/structured-data";
import { techUrl } from "@/lib/tech-icons";

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

/** Projects whose stack mentions the skill, e.g. "Phoenix" also counts "Phoenix LiveView". */
function projectCount(skill: string) {
  const name = skill.toLowerCase();
  return projects.filter((project) =>
    project.stack.some((item) => item.toLowerCase().startsWith(name)),
  ).length;
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const t = await getTranslations("about");
  const tSkills = await getTranslations("skills");

  return (
    <Page>
      <JsonLd
        data={{ "@type": "ProfilePage", url: absoluteUrl(locale, "/about"), mainEntity: person }}
      />
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
              { id: "skills", title: tSkills("title") },
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
            preload
          />
        </div>
      </div>

      <section aria-labelledby="skills" className="mt-16 border-t border-line pt-12">
        <AnchorHeading id="skills" label={tCommon("anchor")} className="text-3xl font-semibold">
          {tSkills("title")}
        </AnchorHeading>
        <p className="mt-2 mb-10 max-w-2xl text-muted">{tSkills("lead")}</p>
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {skillGroups.map((group) => (
            <section key={group.id} aria-labelledby={group.id} className="reveal">
              <AnchorHeading
                id={group.id}
                as="h3"
                label={tCommon("anchor")}
                className="text-2xl font-semibold"
              >
                {pick(group.name, locale)}
              </AnchorHeading>
              <p className="mt-2 max-w-xl text-muted">{pick(group.description, locale)}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const count = projectCount(skill);
                  const content = (
                    <>
                      <TechLogo name={skill} className="size-[1.1rem]" />
                      {skill}
                    </>
                  );
                  const url = techUrl(skill);
                  return (
                    <li
                      key={skill}
                      className={`inline-flex items-center rounded-lg border border-line ${count ? "hover-lift bg-surface" : "bg-surface/60"}`}
                    >
                      {count ? (
                        <Link
                          href={{ pathname: "/projects", query: { q: skill } }}
                          title={tSkills("projectCount", { count })}
                          className={`inline-flex items-center gap-2 py-1.5 pl-3 hover:text-accent ${url ? "pr-1" : "pr-3"}`}
                        >
                          {content}
                          <span className="sr-only">({tSkills("projectCount", { count })})</span>
                        </Link>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-2 py-1.5 pl-3 ${url ? "pr-1" : "pr-3"}`}
                        >
                          {content}
                        </span>
                      )}
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tCommon("techWebsite", { name: skill })}
                          title={tCommon("techWebsite", { name: skill })}
                          className="grid size-7 place-items-center rounded-md text-muted hover:text-accent"
                        >
                          <ExternalLink aria-hidden size={13} />
                        </a>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <section aria-labelledby="practices" className="mt-14">
          <AnchorHeading
            id="practices"
            as="h3"
            label={tCommon("anchor")}
            className="text-2xl font-semibold"
          >
            {tSkills("practices")}
          </AnchorHeading>
          <p className="mt-2 text-muted">{tSkills("practicesLead")}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {practices.map((practice) => (
              <li
                key={practice.en}
                className="rounded-lg border border-line bg-surface px-3 py-1.5"
              >
                {pick(practice, locale)}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </Page>
  );
}
