import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page } from "@/components/ui/page";
import { degrees, university } from "@/content/education";
import { jobs } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatMonth } from "@/lib/format";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "cv" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/cv"),
  };
}

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("cv");
  const tCommon = await getTranslations("common");

  return (
    <Page className="print:max-w-none print:px-0">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-10 print:hidden">
        <p className="text-muted">{t("lead")}</p>
        <CvMenu />
      </div>

      <article className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-12 print:border-0 print:p-0">
        <header className="border-b border-line pb-8">
          <h1 className="text-4xl font-semibold sm:text-5xl">
            {site.title} {site.name}
          </h1>
          <p className="mt-2 font-display text-2xl text-accent">{site.headline}</p>
          <p className="mt-4 text-muted">
            {pick(site.location, locale)}, {site.phone},{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </p>
        </header>

        <CvSection title={t("profile")}>
          <p className="max-w-3xl">
            {pick(site.intro, locale)} {pick(site.about[0].paragraphs[1], locale)}
          </p>
        </CvSection>

        <CvSection title={t("experience")}>
          {jobs.map((job) => (
            <div key={job.start} className="break-inside-avoid-page">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="text-lg font-semibold">
                  {job.role}, {job.company}
                </h3>
                <p className="text-sm text-muted">
                  {tCommon("period", {
                    start: formatMonth(job.start, locale),
                    end: job.end ? formatMonth(job.end, locale) : tCommon("present"),
                  })}
                </p>
              </div>
              <div className="mt-3 grid gap-4">
                {job.items.map((item) => (
                  <div key={item.id}>
                    {job.items.length > 1 ? (
                      <h4 className="font-semibold">
                        {pick(item.name, locale)}
                        <span className="font-normal text-muted">
                          {" "}
                          · {pick(item.context, locale)}
                        </span>
                      </h4>
                    ) : null}
                    <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-accent">
                      {item.highlights.map((highlight) => (
                        <li key={highlight.en}>{pick(highlight, locale)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CvSection>

        <CvSection title={t("skills")}>
          <dl className="grid gap-2">
            {skillGroups.map((group) => (
              <div key={group.name.en} className="grid gap-1 sm:grid-cols-[11rem_1fr]">
                <dt className="font-semibold">{pick(group.name, locale)}</dt>
                <dd className="text-muted">{group.skills.join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-1 sm:grid-cols-[11rem_1fr]">
              <dt className="font-semibold">{t("languages")}</dt>
              <dd className="text-muted">
                {site.languages
                  .map(
                    (language) =>
                      `${pick(language.name, locale)} (${pick(language.level, locale)})`,
                  )
                  .join(", ")}
              </dd>
            </div>
          </dl>
        </CvSection>

        <CvSection title={t("education")}>
          <p className="text-sm text-muted">
            {pick(university.name, locale)}, {pick(university.faculty, locale)}
          </p>
          {degrees.map((degree) => (
            <div key={degree.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="text-lg font-semibold">
                  {pick(degree.degree, locale)}, {pick(degree.field, locale)}
                </h3>
                <p className="text-sm text-muted">
                  {degree.start} – {degree.end}
                </p>
              </div>
              <p className="mt-1">{pick(degree.thesis.title, locale)}</p>
            </div>
          ))}
        </CvSection>

        <CvSection title={t("projects")}>
          <ul className="grid gap-2">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="link font-semibold">
                  {project.title}
                </Link>
                : {pick(project.summary, locale)}
              </li>
            ))}
          </ul>
        </CvSection>
      </article>
    </Page>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[12rem_1fr]">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
