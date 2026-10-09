import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { StackList } from "@/components/ui/page";
import type { Project } from "@/content/types";
import { ProjectPlaceholder } from "./project-placeholder";

export function projectDate(project: Project) {
  return project.upgraded ? `${project.year}, upgraded ${project.upgraded}` : `${project.year}`;
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
            alt={project.image.alt}
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
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col">
      <ProjectMedia project={project} sizes={sizes} />
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <Heading className="text-xl font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-clean"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="shrink-0 text-sm text-muted">{projectDate(project)}</p>
      </div>
      <p className="mt-1.5 text-muted">{project.summary}</p>
      <StackList items={project.stack.slice(0, 5)} className="mt-3" />
    </article>
  );
}
