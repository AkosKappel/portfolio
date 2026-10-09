import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Page, PageHeader } from "@/components/ui/page";
import { TechLogo } from "@/components/ui/tech-badge";
import { projects } from "@/content/projects";
import { practices, skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/skills">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "skills" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternates(locale, "/skills"),
  };
}

/** Projects whose stack mentions the skill, e.g. "Phoenix" also counts "Phoenix LiveView". */
function projectCount(skill: string) {
  const name = skill.toLowerCase();
  return projects.filter((project) =>
    project.stack.some((item) => item.toLowerCase().startsWith(name)),
  ).length;
}

export default async function SkillsPage({ params }: PageProps<"/[locale]/skills">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("skills");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.name.en} aria-labelledby={`group-${group.name.en}`}>
            <h2 id={`group-${group.name.en}`} className="text-2xl font-semibold">
              {pick(group.name, locale)}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const count = projectCount(skill);
                const content = (
                  <>
                    <TechLogo name={skill} className="size-4" />
                    {skill}
                  </>
                );
                return (
                  <li key={skill}>
                    {count ? (
                      <Link
                        href={{ pathname: "/projects", query: { q: skill } }}
                        title={t("projectCount", { count })}
                        className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
                      >
                        {content}
                        <span className="sr-only">({t("projectCount", { count })})</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        <section aria-labelledby="group-practices">
          <h2 id="group-practices" className="text-2xl font-semibold">
            {t("practices")}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {practices.map((practice) => (
              <li key={practice} className="rounded-lg border border-line px-3 py-1.5">
                {practice}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  );
}
