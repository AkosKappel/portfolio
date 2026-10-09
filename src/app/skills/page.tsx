import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageHeader } from "@/components/ui/page";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "TypeScript, React, Kotlin and Spring Boot daily; Kotlin Multiplatform for mobile; Elixir, Python, PHP and more from earlier projects.",
  alternates: { canonical: "/skills" },
};

function projectCount(skill: string) {
  const name = skill.toLowerCase();
  return projects.filter((project) => project.stack.some((item) => item.toLowerCase() === name))
    .length;
}

export default function SkillsPage() {
  return (
    <Page>
      <PageHeader
        title="Skills"
        lead="Grouped by how much I use them, not by how they sound on a CV. Skills used in my projects link to them."
      />
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.name} aria-labelledby={`group-${group.name}`}>
            <h2 id={`group-${group.name}`} className="text-2xl font-semibold">
              {group.name}
            </h2>
            <p className="mt-1 text-muted">{group.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const count = projectCount(skill);
                return (
                  <li key={skill}>
                    {count ? (
                      <Link
                        href={`/projects?q=${encodeURIComponent(skill)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 transition-colors hover:border-clean hover:text-clean"
                      >
                        {skill}
                        <span className="text-sm text-muted">
                          {count}
                          <span className="sr-only"> projects</span>
                        </span>
                      </Link>
                    ) : (
                      <span className="inline-block rounded-full border border-line px-3.5 py-1.5">
                        {skill}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Page>
  );
}
