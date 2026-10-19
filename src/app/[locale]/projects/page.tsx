import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectArchive } from "@/components/projects/project-archive";
import { Page, PageHeader } from "@/components/ui/page";
import { CardStack, StackList } from "@/components/ui/tech-badge";
import { projects } from "@/content/projects";
import { toSummary } from "@/content/types";
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
      <ProjectArchive
        projects={projects.map(toSummary)}
        stacks={Object.fromEntries(
          projects.map((project) => [
            project.slug,
            {
              card: <CardStack items={project.stack} />,
              full: <StackList items={project.stack} />,
            },
          ]),
        )}
      />
    </Page>
  );
}
