import en from "../../messages/en.json";
import { caseStudies, hasCaseStudy } from "../content/case-studies";
import { degrees, secondarySchool, university } from "../content/education";
import { jobs } from "../content/experience";
import { projects } from "../content/projects";
import { navigation, secondaryNavigation, site } from "../content/site";
import { practices, skillGroups, skillLevel, skillLevels } from "../content/skills";
import type { Project, Text } from "../content/types";
import { formatMonth, yearRange } from "./format";

// English only: language models read it fine and answer in the visitor's language.
const t = (text: Text) => text.en;
const url = (path: string) => new URL(path, site.url).toString();
const projectUrl = (project: Project) => url(`/projects/${project.slug}`);

function header() {
  return `# ${site.name}

> ${site.headline} based in ${t(site.location)}. ${t(site.intro)}`;
}

/** The index of the site for language models, following https://llmstxt.org. */
export function buildLlmsTxt() {
  const pages = [{ href: "/", key: "home" } as const, ...navigation, ...secondaryNavigation];
  return `${header()}

The whole public profile (experience, education, skills and projects) as one Markdown file: ${url("/llms-full.txt")}

## Pages

${pages.map(({ href, key }) => `- [${en.nav[key]}](${url(href)})`).join("\n")}

## Work case studies

${jobs
  .flatMap((job) => job.items)
  .flatMap((item) => {
    const study = caseStudies.find((entry) => entry.id === item.id);
    return study
      ? [`- [${t(item.name)}](${url(`/experience/${item.id}`)}): ${t(study.summary)}`]
      : [];
  })
  .join("\n")}

## Projects

${projects.map((project) => `- [${project.title}](${projectUrl(project)}): ${t(project.summary)}`).join("\n")}
`;
}

/**
 * Everything a visitor can read on the site about me, in one file. The portfolio assistant
 * sends it with every question, so it stays short: summaries, not the full project pages.
 * The phone number and e-mail are left out on purpose: the site keeps the address out of its
 * bundles to slow down scrapers, and a plain-text file would undo that. Visitors get the
 * contact page instead.
 */
export function buildLlmsFullTxt() {
  const experience = jobs.map((job) => {
    const dates = `${formatMonth(job.start, "en")} – ${job.end ? formatMonth(job.end, "en") : "present"}`;
    const note = job.companyNote ? ` (${t(job.companyNote)})` : "";
    const items = job.items.map(
      (item) =>
        `#### ${t(item.name)}\n\n${t(item.context)}\n\nRole: ${t(item.role)}${item.team ? `. Team size: ${item.team}` : ""}.\n\n${item.highlights.map((h) => `- ${t(h)}`).join("\n")}\n\nStack: ${item.stack.join(", ")}${hasCaseStudy(item.id) ? `\n\nCase study: ${url(`/experience/${item.id}`)}` : ""}`,
    );
    return `### ${job.role}, ${job.company}${note}\n\n${dates}, ${t(job.location)}\n\n${t(job.summary)}\n\n${items.join("\n\n")}`;
  });

  const education = [
    ...degrees.map(
      (degree) =>
        `### ${t(degree.degree)}, ${t(degree.field)} (${degree.start} – ${degree.end})\n\n${t(university.name)}, ${t(university.faculty)}\n\n${t(degree.description)}\n\nThesis: ${t(degree.thesis.title)}`,
    ),
    `### ${t(secondarySchool.type)}, ${t(secondarySchool.name)}, ${secondarySchool.place} (${secondarySchool.start} – ${secondarySchool.end})`,
  ];

  const skills = skillGroups.map(
    (group) =>
      `### ${t(group.name)}\n\n${skillLevels
        .map(
          (level) => [level, group.skills.filter((skill) => skillLevel(skill) === level)] as const,
        )
        .filter(([, skills]) => skills.length > 0)
        .map(([level, skills]) => `${en.skills.levels[level]}: ${skills.join(", ")}`)
        .join("\n")}`,
  );

  const projectEntries = projects.map((project) => {
    const links = [
      `Page: ${projectUrl(project)}`,
      project.liveUrl && `Live: ${project.liveUrl}`,
      project.repoUrl && `Code: ${project.repoUrl}`,
    ].filter(Boolean);
    // Some roles already end with a period ("…, PhD.").
    const role = project.role ? ` Role: ${t(project.role).replace(/\.$/, "")}.` : "";
    return `### ${project.title} (${yearRange(project.year, project.until)}, ${project.kind})\n\n${t(project.summary)}${role}\n\nStack: ${project.stack.join(", ")}\n\n${links.join("\n")}`;
  });

  const about = site.about.map(
    (section) => `### ${t(section.title)}\n\n${section.paragraphs.map(t).join("\n\n")}`,
  );

  return `${header()}

## Contact

- Contact form (the way to reach me): ${url("/contact")}
- GitHub: ${site.links.github}
- LinkedIn: ${site.links.linkedin}
- Availability: ${t(site.availability)}
- Work permit: ${en.home.euCitizen}
- Location: ${t(site.location)}, time zone ${t(site.timezone)}
- Languages: ${site.languages.map((l) => `${t(l.name)} (${t(l.level)}${"cefr" in l ? `, ${l.cefr}` : ""})`).join(", ")}

## About

${about.join("\n\n")}

## Experience

${experience.join("\n\n")}

## Education

${education.join("\n\n")}

## Skills

Main stack: ${site.stack.join(", ")}

Ways of working: ${practices.map(t).join(", ")}

${skills.join("\n\n")}

## Projects

${projectEntries.join("\n\n")}
`;
}
