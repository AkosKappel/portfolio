import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Info,
  type LucideIcon,
  MousePointerClick,
  RefreshCw,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectMedia, projectYears } from "@/components/projects/project-card";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { GitHubIcon, GitLabIcon } from "@/components/ui/brand-icons";
import { Page } from "@/components/ui/page";
import { StackList, TechLogo } from "@/components/ui/tech-badge";
import { getProject, projects } from "@/content/projects";
import { pick, type Text } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

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
    openGraph: project.image
      ? { images: [{ url: project.image.src, alt: pick(project.image.alt, locale) }] }
      : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const RepoIcon = project.repoUrl?.includes("gitlab.com") ? GitLabIcon : GitHubIcon;

  return (
    <Page>
      <nav aria-label="Breadcrumb" className="pt-10">
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
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-on-accent transition-opacity hover:opacity-90"
              >
                <ExternalLink aria-hidden size={18} />
                {tCommon("liveDemo")}
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
              >
                <RepoIcon className="size-4" />
                {tCommon("sourceCode")}
              </a>
            ) : null}
          </div>
        </header>

        <ProjectMedia
          project={project}
          sizes="(min-width: 1152px) 1088px, 100vw"
          priority
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
            {project.upgrade ? (
              <section
                aria-labelledby="upgrade"
                className="rounded-xl border border-line bg-surface p-6"
              >
                <AnchorHeading
                  id="upgrade"
                  label={tCommon("anchor")}
                  className="flex items-center gap-2 text-2xl font-semibold"
                >
                  <RefreshCw aria-hidden className="size-5 shrink-0 text-accent" />
                  {t("upgrade")}
                </AnchorHeading>
                <p className="mt-3 text-lg">{pick(project.upgrade, locale)}</p>
              </section>
            ) : null}
          </div>
          <dl className="grid content-start gap-5 border-t border-line pt-5 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <Fact label={t("when")}>{projectYears(project)}</Fact>
            <Fact label={t("type")}>{t(`kinds.${project.kind}`)}</Fact>
            {project.role ? <Fact label={t("role")}>{pick(project.role, locale)}</Fact> : null}
            {project.versions?.length ? (
              <Fact label={t("versions")}>
                <ul className="mt-1 space-y-1">
                  {project.versions.map((version) => (
                    <li key={version} className="inline-flex w-full items-center gap-2">
                      <TechLogo name={version.replace(/\s[\d.]+$/, "")} className="size-4" />
                      {version}
                    </li>
                  ))}
                </ul>
              </Fact>
            ) : null}
            <Fact label={t("stack")}>
              <StackList items={project.stack} className="mt-1" />
            </Fact>
          </dl>
        </div>
      </article>

      <nav
        aria-label={t("moreProjects")}
        className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
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

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

function DetailList({
  id,
  title,
  items,
  locale,
  Icon,
  anchor,
}: {
  id: string;
  title: string;
  items?: Text[];
  locale: Locale;
  Icon: LucideIcon;
  anchor: string;
}) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby={id}>
      <AnchorHeading
        id={id}
        label={anchor}
        className="flex items-center gap-2 text-2xl font-semibold"
      >
        <Icon aria-hidden className="size-5 shrink-0 text-accent" />
        {title}
      </AnchorHeading>
      <ul className="mt-4 space-y-2.5 text-lg">
        {items.map((item) => (
          <li key={item.en} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
            {pick(item, locale)}
          </li>
        ))}
      </ul>
    </section>
  );
}
