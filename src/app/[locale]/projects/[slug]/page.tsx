import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Globe,
  Images,
  Info,
  Lightbulb,
  MousePointerClick,
  RefreshCw,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoStatus } from "@/components/projects/demo-status";
import { Architecture, Decisions, DetailList, Fact } from "@/components/projects/detail-sections";
import { Gallery } from "@/components/projects/gallery";
import { ProjectMedia, projectYears } from "@/components/projects/project-card";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { ReadingProgress } from "@/components/ui/back-to-top";
import { GitHubIcon, GitLabIcon } from "@/components/ui/brand-icons";
import { JsonLd } from "@/components/ui/json-ld";
import { Page } from "@/components/ui/page";
import { StackList, TechLink, TechLogo } from "@/components/ui/tech-badge";
import { getProject, projects } from "@/content/projects";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { absoluteUrl, alternates } from "@/lib/metadata";
import { breadcrumbs, projectData } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: pick(project.summary, locale),
    alternates: alternates(locale, `/projects/${project.slug}`),
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const t = await getTranslations("projects");

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const RepoIcon = project.repoUrl?.includes("gitlab.com") ? GitLabIcon : GitHubIcon;

  return (
    <Page>
      <ReadingProgress />
      <JsonLd
        data={{
          "@graph": [
            projectData(project, locale, absoluteUrl(locale, `/projects/${project.slug}`)),
            breadcrumbs([
              { name: tNav("home"), url: absoluteUrl(locale, "/") },
              { name: tNav("projects"), url: absoluteUrl(locale, "/projects") },
              { name: project.title, url: absoluteUrl(locale, `/projects/${project.slug}`) },
            ]),
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="pt-10 print:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
        >
          <ArrowLeft aria-hidden size={16} />
          {t("back")}
        </Link>
      </nav>

      <article>
        <header className="grid gap-6 pt-8 pb-10 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-semibold sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
              {pick(project.summary, locale)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end print:hidden">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-on-accent transition-opacity hover:opacity-90"
              >
                <ExternalLink aria-hidden size={18} />
                {tCommon("liveDemo")}
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
              >
                <RepoIcon className="size-4" />
                {tCommon("sourceCode")}
              </a>
            ) : null}
            {project.paperUrl ? (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
              >
                <FileText aria-hidden size={18} />
                {tCommon("thesisRecord")}
              </a>
            ) : null}
            {project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
              >
                <Globe aria-hidden size={18} />
                {tCommon("officialWebsite")}
              </a>
            ) : null}
            {project.liveUrl ? <DemoStatus slug={project.slug} /> : null}
            {project.selfHosted ? (
              <p className="flex w-full items-start gap-1.5 text-sm text-muted lg:justify-end">
                <Info aria-hidden size={16} className="mt-0.5 shrink-0" />
                {tCommon("selfHostedNote")}
              </p>
            ) : null}
          </div>
        </header>

        <ProjectMedia
          project={project}
          sizes="(min-width: 1152px) 1088px, 100vw"
          loading="preload"
          natural
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="grid max-w-2xl gap-12">
            <section aria-labelledby="about">
              <AnchorHeading
                id="about"
                label={tCommon("anchor")}
                className="flex items-center gap-2 text-2xl font-semibold"
              >
                <Info aria-hidden className="size-5 shrink-0 text-accent" />
                {t("about")}
              </AnchorHeading>
              <div className="mt-4 space-y-4 text-lg">
                {project.description.map((paragraph) => (
                  <p key={paragraph.en}>{pick(paragraph, locale)}</p>
                ))}
              </div>
            </section>
            <Decisions
              title={t("decisions")}
              items={project.decisions}
              locale={locale}
              anchor={tCommon("anchor")}
            />
            <DetailList
              id="features"
              title={t("features")}
              items={project.features}
              locale={locale}
              Icon={MousePointerClick}
              anchor={tCommon("anchor")}
            />
            <DetailList
              id="highlights"
              title={t("highlights")}
              items={project.highlights}
              locale={locale}
              Icon={Sparkles}
              anchor={tCommon("anchor")}
            />
            <DetailList
              id="technical"
              title={t("technical")}
              items={project.technical}
              locale={locale}
              Icon={Wrench}
              anchor={tCommon("anchor")}
            />
            <Architecture
              title={t("architecture")}
              nodes={project.architecture}
              locale={locale}
              anchor={tCommon("anchor")}
            />
            <DetailList
              id="lessons"
              title={t("lessons")}
              items={project.lessons}
              locale={locale}
              Icon={Lightbulb}
              anchor={tCommon("anchor")}
            />
            <DetailList
              id="changelog"
              title={t("changelog")}
              items={project.changelog}
              locale={locale}
              Icon={RefreshCw}
              anchor={tCommon("anchor")}
            />
          </div>
          <dl className="grid content-start gap-5 border-t border-line pt-5 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <Fact label={t("when")}>{projectYears(project)}</Fact>
            <Fact label={t("type")}>{t(`kinds.${project.kind}`)}</Fact>
            {project.role ? <Fact label={t("role")}>{pick(project.role, locale)}</Fact> : null}
            {project.versions?.length ? (
              <Fact label={t("versions")}>
                <ul className="mt-1 space-y-1">
                  {project.versions.map((version) => {
                    const name = version.replace(/\s[\d.]+$/, "");
                    return (
                      <li key={version}>
                        <TechLink
                          name={name}
                          label={version}
                          className="inline-flex items-center gap-2 underline-offset-4 [&[href]]:hover:text-accent [&[href]]:hover:underline"
                        >
                          <TechLogo name={name} className="size-4" />
                          {version}
                        </TechLink>
                      </li>
                    );
                  })}
                </ul>
              </Fact>
            ) : null}
            <Fact label={t("stack")}>
              <StackList items={project.stack} className="mt-1" />
            </Fact>
          </dl>
        </div>
        {project.gallery?.length ? (
          <section aria-labelledby="gallery" className="mt-16">
            <AnchorHeading
              id="gallery"
              label={tCommon("anchor")}
              className="flex items-center gap-2 text-2xl font-semibold"
            >
              <Images aria-hidden className="size-5 shrink-0 text-accent" />
              {t("gallery")}
            </AnchorHeading>
            <Gallery
              figures={project.gallery.map((figure) => ({
                ...figure,
                alt: pick(figure.alt, locale),
                caption: pick(figure.caption, locale),
              }))}
              labels={{
                close: t("lightbox.close"),
                previous: t("lightbox.previous"),
                next: t("lightbox.next"),
                zoomIn: t("lightbox.zoomIn"),
                zoomOut: t("lightbox.zoomOut"),
                counter: t.raw("lightbox.counter"),
              }}
            />
          </section>
        ) : null}
      </article>

      <nav
        aria-label={t("moreProjects")}
        className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2 print:hidden"
      >
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="group">
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <ArrowLeft aria-hidden size={14} />
              {t("previous")}
            </span>
            <span className="block font-display text-2xl font-semibold group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group sm:text-right">
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              {t("next")}
              <ArrowRight aria-hidden size={14} />
            </span>
            <span className="block font-display text-2xl font-semibold group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </Page>
  );
}
