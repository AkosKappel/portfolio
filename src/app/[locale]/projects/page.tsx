import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ProjectArchive } from "@/components/projects/project-archive";
import { ProjectCard } from "@/components/projects/project-card";
import { Page, PageHeader } from "@/components/ui/page";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/projects"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
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
