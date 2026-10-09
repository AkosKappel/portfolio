import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectArchive } from "@/components/projects/project-archive";
import { ProjectCard } from "@/components/projects/project-card";
import { Page, PageHeader } from "@/components/ui/page";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Personal, university and team projects: web apps, a glaucoma segmentation thesis, games and coding challenges.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Page>
      <PageHeader
        title="Projects"
        lead="Things I built on my own, at university and with friends. Several were rebuilt in 2026 with current tools, tests and live demos."
      />
      {/* The fallback is the full list, so the page is complete without JavaScript. */}
      <Suspense
        fallback={
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel="h2" />
              </li>
            ))}
          </ul>
        }
      >
        <ProjectArchive projects={projects} />
      </Suspense>
    </Page>
  );
}
