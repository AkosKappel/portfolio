import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projectYears } from "@/components/projects/project-card";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CvMenu } from "@/components/ui/cv-menu";
import { Page } from "@/components/ui/page";
import { degrees, secondarySchool, university } from "@/content/education";
import { jobs } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { site } from "@/content/site";
import { practices, skillGroups } from "@/content/skills";
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
  const anchor = tCommon("anchor");
  const period = (start: string, end?: string) =>
    tCommon("period", {
      start: formatMonth(start, locale),
      end: end ? formatMonth(end, locale) : tCommon("present"),
    });
  const sections = ["profile", "experience", "skills", "education", "projects"] as const;
  const otherProjects = projects.filter((project) => !project.featured);

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
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="inline-flex items-center gap-2">
              <MapPin aria-hidden size={15} />
              {pick(site.location, locale)}
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone aria-hidden size={15} />
              <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="link">
                {site.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail aria-hidden size={15} />
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <LinkedInIcon className="size-[15px]" />
              <a href={site.links.linkedin} className="link">
                LinkedIn
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <GitHubIcon className="size-[15px]" />
              <a href={site.links.github} className="link">
                GitHub
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <GitLabIcon className="size-[15px]" />
              <a href={site.links.gitlab} className="link">
                GitLab
              </a>
            </li>
          </ul>
          <nav aria-label={t("contents")} className="mt-6 flex flex-wrap gap-2 print:hidden">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover-lift rounded-full border border-line bg-paper px-3 py-1 text-sm"
              >
                {t(id)}
              </a>
            ))}
          </nav>
        </header>

        <CvSection id="profile" title={t("profile")} anchor={anchor}>
          <div className="grid max-w-3xl gap-3">
            <p>{pick(site.intro, locale)}</p>
            {site.about[0].paragraphs.map((paragraph) => (
              <p key={paragraph.en} className="text-muted">
                {pick(paragraph, locale)}
              </p>
            ))}
            <p className="text-muted">{pick(site.availability, locale)}</p>
          </div>
        </CvSection>

        <CvSection id="experience" title={t("experience")} anchor={anchor}>
          {jobs.map((job) => (
            <section
              key={job.id}
              aria-labelledby={`cv-${job.id}`}
              className="break-inside-avoid-page rounded-xl border border-line border-l-4 border-l-accent bg-paper p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <AnchorHeading
                  id={`cv-${job.id}`}
                  as="h3"
                  label={anchor}
                  className="text-xl font-semibold"
                >
                  {job.company}
                </AnchorHeading>
                <p className="text-sm font-medium text-muted">{period(job.start, job.end)}</p>
              </div>
              <p className="mt-1 flex flex-wrap gap-x-4 text-muted">
                <span className="font-medium text-ink">{job.role}</span>
                <span>{pick(job.location, locale)}</span>
                {job.companyNote ? <span>{pick(job.companyNote, locale)}</span> : null}
              </p>
              <p className="mt-3 max-w-3xl">{pick(job.summary, locale)}</p>
              <div className="mt-5 grid gap-5">
                {job.items.map((item) => (
                  <div key={item.id}>
                    <h4 className="font-semibold">
                      {item.url ? (
                        <a href={item.url} className="link">
                          {pick(item.name, locale)}
                        </a>
                      ) : (
                        pick(item.name, locale)
                      )}
                      <span className="font-normal text-muted">
                        {" "}
                        · {pick(item.context, locale)}
                      </span>
                    </h4>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-accent">
                      {item.highlights.map((highlight) => (
                        <li key={highlight.en}>{pick(highlight, locale)}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm text-muted">{item.stack.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </CvSection>

        <CvSection id="skills" title={t("skills")} anchor={anchor}>
          <dl className="grid gap-3">
            {skillGroups.map((group) => (
              <div key={group.id} className="grid gap-1 sm:grid-cols-[11rem_1fr]">
                <dt className="font-semibold">{pick(group.name, locale)}</dt>
                <dd className="text-muted">{group.skills.join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-1 sm:grid-cols-[11rem_1fr]">
              <dt className="font-semibold">{t("practices")}</dt>
              <dd className="text-muted">
                {practices.map((practice) => pick(practice, locale)).join(", ")}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[11rem_1fr]">
              <dt className="font-semibold">{t("languages")}</dt>
              <dd className="text-muted">
                {site.languages
                  .map((language) => {
                    const level = pick(language.level, locale).toLowerCase();
                    const details = "cefr" in language ? `${level}, ${language.cefr}` : level;
                    return `${pick(language.name, locale)} (${details})`;
                  })
                  .join(", ")}
              </dd>
            </div>
          </dl>
        </CvSection>

        <CvSection id="education" title={t("education")} anchor={anchor}>
          <p className="text-muted">
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
              <p className="mt-1 text-muted">{pick(degree.description, locale)}</p>
              <p className="mt-1">
                <span className="font-medium">{t("thesis")}: </span>
                {degree.thesis.url ? (
                  <Link href={degree.thesis.url} className="link">
                    {pick(degree.thesis.title, locale)}
                  </Link>
                ) : (
                  pick(degree.thesis.title, locale)
                )}
              </p>
            </div>
          ))}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6">
              <h3 className="text-lg font-semibold">
                {t("secondarySchool")}: {pick(secondarySchool.name, locale)}
              </h3>
              <p className="text-sm text-muted">
                {secondarySchool.start} – {secondarySchool.end}
              </p>
            </div>
            <p className="mt-1 text-muted">
              {pick(secondarySchool.type, locale)}, {secondarySchool.place}
            </p>
          </div>
        </CvSection>

        <CvSection id="projects" title={t("projects")} anchor={anchor}>
          <ul className="grid gap-4">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <Link href={`/projects/${project.slug}`} className="link font-semibold">
                    {project.title}
                  </Link>
                  <span className="text-sm text-muted">{projectYears(project)}</span>
                </div>
                <p className="mt-1">{pick(project.summary, locale)}</p>
                <p className="mt-1 text-sm text-muted">{project.stack.join(", ")}</p>
              </li>
            ))}
          </ul>
          <p>
            <span className="font-semibold">{t("otherProjects")}: </span>
            {otherProjects.map((project, index) => (
              <span key={project.slug}>
                {index > 0 ? ", " : null}
                <Link href={`/projects/${project.slug}`} className="link">
                  {project.title}
                </Link>
              </span>
            ))}
            .{" "}
            <Link href="/projects" className="link font-medium text-accent">
              {t("allProjects")}
            </Link>
          </p>
        </CvSection>
      </article>
    </Page>
  );
}

function CvSection({
  id,
  title,
  anchor,
  children,
}: {
  id: string;
  title: string;
  anchor: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-12 grid gap-6 lg:grid-cols-[12rem_1fr]">
      <AnchorHeading id={id} label={anchor} className="text-2xl font-semibold">
        {title}
      </AnchorHeading>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
