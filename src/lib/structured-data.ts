// Relative imports keep this module loadable in Vitest, which has no "@" alias.
import { university } from "../content/education";
import { jobs } from "../content/experience";
import { site } from "../content/site";
import { skillGroups } from "../content/skills";
import { type Project, pick } from "../content/types";
import type { Locale } from "../i18n/routing";

/** One id for the person, so every page and project points to the same entity. */
export const personId = new URL("/#person", site.url).toString();
const currentJob = jobs.find((job) => !job.end);
const { status: _statusPage, ...profiles } = site.links;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  jobTitle: site.headline,
  url: site.url,
  image: new URL("/images/profile.webp", site.url).toString(),
  address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
  ...(currentJob ? { worksFor: { "@type": "Organization", name: currentJob.company } } : {}),
  alumniOf: { "@type": "CollegeOrUniversity", name: university.name.en },
  knowsAbout: [...new Set(skillGroups.flatMap((group) => group.skills))],
  knowsLanguage: site.languages.map((language) => language.name.en),
  // Profiles of the same person; the uptime status page is not one.
  sameAs: Object.values(profiles),
};

/** Code with a public repository is `SoftwareSourceCode`, anything else a `CreativeWork`. */
export function projectData(project: Project, locale: Locale, url: string) {
  return {
    "@type": project.repoUrl ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: pick(project.summary, locale),
    url,
    author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
    dateCreated: String(project.year),
    ...(project.until ? { dateModified: String(project.until) } : {}),
    keywords: project.stack.join(", "),
    ...(project.image ? { image: new URL(project.image.src, site.url).toString() } : {}),
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
