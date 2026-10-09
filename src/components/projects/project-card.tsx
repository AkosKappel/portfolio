import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ViewTransition } from "react";
import { StackList } from "@/components/ui/tech-badge";
import { type Project, pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { yearRange } from "@/lib/format";
import { ProjectPlaceholder } from "./project-placeholder";

export function projectYears(project: Project) {
  return yearRange(project.year, project.until);
}

export function ProjectMedia({
  project,
  sizes,
  priority = false,
  natural = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  /** Show the whole screenshot at its own aspect ratio instead of a cropped 16:10 frame. */
  natural?: boolean;
}) {
  const locale = useLocale();
  return (
    <ViewTransition name={`project-${project.slug}`} share="project-media" default="none">
      <div
        className="relative overflow-hidden rounded-lg border border-line bg-surface"
        style={{
          aspectRatio:
            natural && project.image
              ? `${project.image.width} / ${project.image.height}`
              : "16 / 10",
        }}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={pick(project.image.alt, locale)}
            fill
            sizes={sizes}
            priority={priority}
            className={natural ? "object-contain" : "object-cover object-top"}
          />
        ) : (
          <ProjectPlaceholder title={project.title} />
        )}
      </div>
    </ViewTransition>
  );
}

export function ProjectCard({
  project,
  headingLevel = "h3",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  sizes?: string;
}) {
  const locale = useLocale();
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col">
      <ProjectMedia project={project} sizes={sizes} />
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <Heading className="text-xl font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            {project.title}
            <ArrowUpRight
              aria-hidden
              size={18}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        </Heading>
        <p className="shrink-0 text-sm text-muted">{projectYears(project)}</p>
      </div>
      <p className="mt-1.5 text-muted">{pick(project.summary, locale)}</p>
      <StackList items={project.stack.slice(0, 5)} className="mt-3" />
    </article>
  );
}
