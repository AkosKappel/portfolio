import {
  ArrowRight,
  Brain,
  Briefcase,
  Code,
  Container,
  Database,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Server,
  Smartphone,
  UserRound,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectCard } from "@/components/projects/project-card";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { ReadingProgress } from "@/components/ui/back-to-top";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CvMenu } from "@/components/ui/cv-menu";
import { CvNav } from "@/components/ui/cv-nav";
import { Flag } from "@/components/ui/flags";
import { Page } from "@/components/ui/page";
import { CardStack, StackList, TechLogo } from "@/components/ui/tech-badge";
import { degrees, secondarySchool, university } from "@/content/education";
import { jobs } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { site } from "@/content/site";
import { practices, skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDuration, formatMonth } from "@/lib/format";
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

const groupIcons: Record<string, typeof Monitor> = {
  frontend: Monitor,
  backend: Server,
  mobile: Smartphone,
  data: Database,
  ai: Brain,
  devops: Container,
};

const cefrLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const tCommon = await getTranslations("common");
  const t = await getTranslations("cv");
  const anchor = tCommon("anchor");
  const period = (start: string, end?: string) =>
    tCommon("period", {
      start: formatMonth(start, locale),
      end: end ? formatMonth(end, locale) : tCommon("present"),
    });
  const otherProjects = projects.filter((project) => !project.featured);
  const firstJob = jobs[jobs.length - 1];

  const sections = (
    [
      { id: "profile", icon: UserRound },
      { id: "experience", icon: Briefcase },
      { id: "skills", icon: Wrench },
      { id: "education", icon: GraduationCap },
      { id: "projects", icon: FolderOpen },
    ] as const
  ).map(({ id, icon: Icon }) => ({
    id,
    title: t(id),
    icon: <Icon aria-hidden size={16} className="shrink-0" />,
  }));

  const facts = [
    { label: t("facts.experience"), value: formatDuration(firstJob.start, undefined, tCommon) },
    { label: t("facts.companies"), value: String(jobs.length) },
    { label: t("facts.projects"), value: String(projects.length) },
    { label: t("facts.languages"), value: String(site.languages.length) },
  ];

  const contacts = [
    {
      icon: <Mail aria-hidden size={16} />,
      label: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: <Phone aria-hidden size={16} />,
      label: site.phone,
      href: `tel:${site.phone.replaceAll(" ", "")}`,
    },
    {
      icon: <LinkedInIcon className="size-4" />,
      label: "LinkedIn",
      href: site.links.linkedin,
    },
    { icon: <GitHubIcon className="size-4" />, label: "GitHub", href: site.links.github },
    { icon: <GitLabIcon className="size-4" />, label: "GitLab", href: site.links.gitlab },
  ];

  return (
    <Page className="print:max-w-none print:px-0">
      <ReadingProgress />
      <div className="grid gap-10 pt-10 pb-6 lg:grid-cols-[17rem_1fr] lg:gap-14 print:block print:pt-0">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:pb-6">
          <div className="flex items-center gap-5 lg:flex-col lg:items-start">
            <div className="shrink-0 rounded-full border-4 border-ink p-1">
              <Image
                src="/images/profile.webp"
                alt={pick({ en: `Portrait of ${site.name}`, sk: `Portrét: ${site.name}` }, locale)}
                width={900}
                height={1350}
                sizes="8rem"
                className="size-24 rounded-full object-cover object-[50%_22%] sm:size-32"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                <span className="block text-lg font-medium text-muted">{site.title}</span>
                {site.name}
              </h1>
              <p className="mt-1 font-display text-lg text-accent">{site.headline}</p>
            </div>
          </div>

          <p className="mt-5 flex items-start gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm">
            <span aria-hidden className="relative mt-1.5 flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {pick(site.availability, locale)}
          </p>

          <h2 className="sr-only">{t("contact")}</h2>
          <ul className="mt-5 grid gap-2 text-sm">
            <li className="flex items-center gap-2.5 text-muted">
              <MapPin aria-hidden size={16} />
              {pick(site.location, locale)}
            </li>
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                >
                  {contact.icon}
                  <span className="link">{contact.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 hidden border-t border-line pt-5 lg:block">
            <CvNav label={t("contents")} sections={sections} />
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Languages aria-hidden size={16} className="text-muted" />
              {t("languages")}
            </h2>
            <ul className="mt-3 grid gap-3 text-sm">
              {site.languages.map((language) => {
                const level =
                  "cefr" in language && language.cefr ? cefrLevels.indexOf(language.cefr) + 1 : 6;
                return (
                  <li key={language.flag}>
                    <div className="flex items-center gap-2">
                      <Flag locale={language.flag} />
                      <span className="flex-1 font-medium">{pick(language.name, locale)}</span>
                      <span className="text-xs text-muted">
                        {pick(language.level, locale)}
                        {"cefr" in language ? `, ${language.cefr}` : null}
                      </span>
                    </div>
                    <div aria-hidden className="mt-1.5 grid grid-cols-6 gap-1">
                      {cefrLevels.map((cefr, index) => (
                        <span
                          key={cefr}
                          className={`h-1.5 rounded-full ${index < level ? "bg-accent" : "bg-line"}`}
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 print:hidden">
            <CvMenu />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-8 lg:hidden">
            <CvNav label={t("contents")} sections={sections} />
          </div>

          <CvSection id="profile" title={t("profile")} anchor={anchor} icon={UserRound}>
            <p className="text-lg">{pick(site.intro, locale)}</p>
            {site.about[0].paragraphs.map((paragraph) => (
              <p key={paragraph.en} className="mt-3 text-muted">
                {pick(paragraph, locale)}
              </p>
            ))}
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-line bg-surface p-4">
                  <dt className="text-xs font-medium tracking-wide text-muted uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-semibold sm:text-2xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </CvSection>

          <CvSection id="experience" title={t("experience")} anchor={anchor} icon={Briefcase}>
            <ol className="grid gap-10">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="relative border-l-2 border-line pl-6 break-inside-avoid-page sm:pl-8"
                >
                  <span
                    aria-hidden
                    className={`absolute top-1.5 -left-[7px] size-3 rounded-full ring-4 ring-paper ${job.end ? "bg-muted" : "bg-accent"}`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <AnchorHeading
                      id={`cv-${job.id}`}
                      as="h3"
                      label={anchor}
                      className="text-xl font-semibold sm:text-2xl"
                    >
                      {job.company}
                    </AnchorHeading>
                    <p className="text-sm">
                      <span className="font-medium">{period(job.start, job.end)}</span>
                      <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-muted">
                        {formatDuration(job.start, job.end, tCommon)}
                      </span>
                    </p>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                    <span className="font-medium text-ink">{job.role}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin aria-hidden size={14} />
                      {pick(job.location, locale)}
                    </span>
                    {job.companyNote ? (
                      <span className="text-sm">({pick(job.companyNote, locale)})</span>
                    ) : null}
                  </p>
                  <p className="mt-3 max-w-3xl">{pick(job.summary, locale)}</p>
                  <div className="mt-5 grid gap-4">
                    {job.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-line bg-surface p-5 break-inside-avoid-page print:border-0 print:p-0"
                      >
                        <h4 className="font-semibold">
                          {item.url ? (
                            <a
                              href={item.url}
                              className="inline-flex items-center gap-1.5 hover:text-accent"
                            >
                              <span className="link">{pick(item.name, locale)}</span>
                              <ExternalLink aria-hidden size={14} className="text-muted" />
                            </a>
                          ) : (
                            pick(item.name, locale)
                          )}
                        </h4>
                        <p className="text-sm text-muted">{pick(item.context, locale)}</p>
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent">
                          {item.highlights.map((highlight) => (
                            <li key={highlight.en}>{pick(highlight, locale)}</li>
                          ))}
                        </ul>
                        <StackList items={item.stack} className="mt-4" />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </CvSection>

          <CvSection id="skills" title={t("skills")} anchor={anchor} icon={Wrench}>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => {
                const Icon = groupIcons[group.id] ?? Code;
                return (
                  <section
                    key={group.id}
                    aria-labelledby={`cv-skills-${group.id}`}
                    className="rounded-xl border border-line bg-surface p-5 break-inside-avoid-page"
                  >
                    <h3
                      id={`cv-skills-${group.id}`}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Icon aria-hidden size={18} className="text-accent" />
                      {pick(group.name, locale)}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-sm"
                        >
                          <TechLogo name={skill} className="size-4" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
            <h3 className="mt-6 font-semibold">{t("practices")}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {practices.map((practice) => (
                <li
                  key={practice.en}
                  className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                >
                  {pick(practice, locale)}
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection id="education" title={t("education")} anchor={anchor} icon={GraduationCap}>
            <ol className="grid gap-6">
              {degrees.map((degree) => (
                <li
                  key={degree.id}
                  className="relative border-l-2 border-line pl-6 break-inside-avoid-page sm:pl-8"
                >
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[7px] size-3 rounded-full bg-accent ring-4 ring-paper"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <h3 className="text-lg font-semibold">
                      {pick(degree.degree, locale)}, {pick(degree.field, locale)}
                    </h3>
                    <p className="text-sm font-medium">
                      {degree.start} – {degree.end}
                    </p>
                  </div>
                  <p className="text-sm text-muted">
                    <a href={university.url} className="link">
                      {pick(university.name, locale)}
                    </a>
                    , {pick(university.faculty, locale)}
                  </p>
                  <p className="mt-2">{pick(degree.description, locale)}</p>
                  <div className="mt-3 flex gap-3 rounded-xl border border-line bg-surface p-4">
                    <FileText aria-hidden size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div className="text-sm">
                      <p className="text-xs font-medium tracking-wide text-muted uppercase">
                        {t("thesis")}
                      </p>
                      <p className="mt-0.5 font-medium">
                        {degree.thesis.url ? (
                          <Link href={degree.thesis.url} className="link">
                            {pick(degree.thesis.title, locale)}
                          </Link>
                        ) : (
                          pick(degree.thesis.title, locale)
                        )}
                      </p>
                      {degree.thesis.recordUrl ? (
                        <a
                          href={degree.thesis.recordUrl}
                          className="mt-1.5 inline-flex items-center gap-1.5 text-muted hover:text-accent"
                        >
                          <ExternalLink aria-hidden size={14} />
                          <span className="link">{tCommon("thesisRecord")}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
              <li className="relative border-l-2 border-line pl-6 sm:pl-8">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[7px] size-3 rounded-full bg-muted ring-4 ring-paper"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <h3 className="text-lg font-semibold">
                    {t("secondarySchool")}: {pick(secondarySchool.name, locale)}
                  </h3>
                  <p className="text-sm font-medium">
                    {secondarySchool.start} – {secondarySchool.end}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {pick(secondarySchool.type, locale)}, {secondarySchool.place}
                </p>
              </li>
            </ol>
          </CvSection>

          <CvSection id="projects" title={t("projects")} anchor={anchor} icon={FolderOpen}>
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 print:hidden">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard
                    project={project}
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                    stack={<CardStack items={project.stack} />}
                  />
                </li>
              ))}
            </ul>
            {/* The cards need screenshots and hover; on paper a plain list reads better. */}
            <ul className="hidden gap-3 print:grid">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <span className="font-semibold">{project.title}</span>:{" "}
                  {pick(project.summary, locale)}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold">{t("otherProjects")}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {otherProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover-lift inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-sm"
                    >
                      <TechLogo name={project.stack[0]} />
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/projects"
                className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent hover:underline print:hidden"
              >
                {t("allProjects")}
                <ArrowRight aria-hidden size={16} />
              </Link>
            </div>
          </CvSection>
        </div>
      </div>
    </Page>
  );
}

function CvSection({
  id,
  title,
  anchor,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  anchor: string;
  icon: typeof Monitor;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`section-${id}`}
      aria-labelledby={id}
      className="mb-14 border-t border-line pt-8 first-of-type:border-t-0 first-of-type:pt-0"
    >
      <AnchorHeading
        id={id}
        label={anchor}
        className="mb-6 flex items-center gap-3 text-2xl font-semibold sm:text-3xl"
      >
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"
        >
          <Icon size={20} />
        </span>
        {title}
      </AnchorHeading>
      {children}
    </section>
  );
}
