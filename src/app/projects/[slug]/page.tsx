import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia, projectDate } from "@/components/projects/project-card";
import { GitHubIcon, GitLabIcon } from "@/components/ui/brand-icons";
import { Page, StackList } from "@/components/ui/page";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: project.image
      ? { images: [{ url: project.image.src, alt: project.image.alt }] }
      : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <Page>
      <nav aria-label="Breadcrumb" className="pt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
        >
          <ArrowLeft aria-hidden size={16} />
          All projects
        </Link>
      </nav>

      <article>
        <header className="grid gap-6 pt-8 pb-10 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-semibold sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{project.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-colors hover:bg-clean"
              >
                <ExternalLink aria-hidden size={18} />
                Open live demo
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors hover:border-ink"
              >
                {project.repoUrl.includes("gitlab.com") ? (
                  <GitLabIcon className="size-4" />
                ) : (
                  <GitHubIcon className="size-4" />
                )}
                Source code
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
          <div className="max-w-2xl space-y-5 text-lg">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {project.highlights?.length ? (
              <>
                <h2 className="pt-6 text-2xl font-semibold">Highlights</h2>
                <ul className="list-disc space-y-2 pl-5 marker:text-clean">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <dl className="grid content-start gap-5 border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <Fact label="When">{projectDate(project)}</Fact>
            <Fact label="Type">{project.kind} project</Fact>
            {project.role ? <Fact label="Role">{project.role}</Fact> : null}
            <Fact label="Stack">
              <StackList items={project.stack} className="mt-1" />
            </Fact>
          </dl>
        </div>
      </article>

      <nav
        aria-label="More projects"
        className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="group">
            <span className="text-sm text-muted">Previous project</span>
            <span className="block font-display text-2xl font-semibold group-hover:text-clean">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group sm:text-right">
            <span className="text-sm text-muted">Next project</span>
            <span className="block font-display text-2xl font-semibold group-hover:text-clean">
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
