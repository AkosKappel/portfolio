import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { workflowIcons } from "@/components/home/workflow-icons";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { Page, PageHeader } from "@/components/ui/page";
import { TechLogo } from "@/components/ui/tech-badge";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { practices, skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";
import { techUrl } from "@/lib/tech-icons";

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
  const tCommon = await getTranslations("common");
  const t = await getTranslations("skills");

  return (
    <Page>
      <PageHeader title={t("title")} lead={t("lead")} />
      <nav aria-label={t("title")} className="-mt-4 mb-12 flex flex-wrap gap-2">
        {[
          ...skillGroups.map((group) => ({ id: group.id, name: pick(group.name, locale) })),
          { id: "workflow", name: t("workflow") },
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
          <section key={group.id} aria-labelledby={group.id} className="reveal">
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
                const url = techUrl(skill);
                return (
                  <li
                    key={skill}
                    className={`inline-flex items-center rounded-lg border border-line ${count ? "hover-lift bg-surface" : "bg-surface/60"}`}
                  >
                    {count ? (
                      <Link
                        href={{ pathname: "/projects", query: { q: skill } }}
                        title={t("projectCount", { count })}
                        className={`inline-flex items-center gap-2 py-1.5 pl-3 hover:text-accent ${url ? "pr-1" : "pr-3"}`}
                      >
                        {content}
                        <span className="sr-only">({t("projectCount", { count })})</span>
                      </Link>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-2 py-1.5 pl-3 ${url ? "pr-1" : "pr-3"}`}
                      >
                        {content}
                      </span>
                    )}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tCommon("techWebsite", { name: skill })}
                        title={tCommon("techWebsite", { name: skill })}
                        className="grid size-7 place-items-center rounded-md text-muted hover:text-accent"
                      >
                        <ExternalLink aria-hidden size={13} />
                      </a>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <section aria-labelledby="workflow" className="mt-16 border-t border-line pt-12">
        <AnchorHeading id="workflow" label={tCommon("anchor")} className="text-2xl font-semibold">
          {t("workflow")}
        </AnchorHeading>
        <p className="mt-2 text-muted">{t("workflowLead")}</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.workflow.map((step) => {
            const Icon = workflowIcons[step.id];
            return (
              <li key={step.id} className="reveal rounded-xl border border-line bg-surface p-5">
                <Icon aria-hidden size={22} className="text-accent" />
                <h3 className="mt-3 text-lg font-semibold">{pick(step.title, locale)}</h3>
                <p className="mt-1 text-sm text-muted">{pick(step.text, locale)}</p>
              </li>
            );
          })}
        </ol>
      </section>
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
