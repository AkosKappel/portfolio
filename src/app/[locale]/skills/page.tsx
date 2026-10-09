import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnchorHeading } from "@/components/ui/anchor-heading";
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
  const tCommon = await getTranslations("common");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <nav aria-label={t("title")} className="-mt-4 mb-12 flex flex-wrap gap-2">
        {[
          ...skillGroups.map((group) => ({ id: group.id, name: pick(group.name, locale) })),
          { id: "practices", name: t("practices") },
        ].map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="hover-lift rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
          >
            {section.name}
          </a>
        ))}
      </nav>
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id}>
            <AnchorHeading
              id={group.id}
              label={tCommon("anchor")}
              className="text-2xl font-semibold"
            >
              {pick(group.name, locale)}
            </AnchorHeading>
            <p className="mt-2 max-w-xl text-muted">{pick(group.description, locale)}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const count = projectCount(skill);
                const content = (
                  <>
                    <TechLogo name={skill} className="size-[1.1rem]" />
                    {skill}
                  </>
                );
                return (
                  <li key={skill}>
                    {count ? (
                      <Link
                        href={{ pathname: "/projects", query: { q: skill } }}
                        title={t("projectCount", { count })}
                        className="hover-lift inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 hover:text-accent"
                      >
                        {content}
                        <span className="sr-only">({t("projectCount", { count })})</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-1.5">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <section aria-labelledby="practices" className="mt-16 border-t border-line pt-12">
        <AnchorHeading id="practices" label={tCommon("anchor")} className="text-2xl font-semibold">
          {t("practices")}
        </AnchorHeading>
        <p className="mt-2 text-muted">{t("practicesLead")}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {practices.map((practice) => (
            <li key={practice.en} className="rounded-lg border border-line bg-surface px-3 py-1.5">
              {pick(practice, locale)}
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
