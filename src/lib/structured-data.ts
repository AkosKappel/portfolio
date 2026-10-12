// Relative imports keep this module loadable in Vitest, which has no "@" alias.
import { site } from "../content/site";
import { type Project, pick } from "../content/types";
import type { Locale } from "../i18n/routing";

export const person = {
  "@type": "Person",
  name: site.name,
  jobTitle: site.headline,
  email: `mailto:${site.email}`,
  url: site.url,
  image: new URL("/images/profile.webp", site.url).toString(),
  address: { "@type": "PostalAddress", addressLocality: "Bratislava", addressCountry: "SK" },
  alumniOf: "Slovak University of Technology in Bratislava",
  sameAs: Object.values(site.links),
};

/** Code with a public repository is `SoftwareSourceCode`, anything else a `CreativeWork`. */
export function projectData(project: Project, locale: Locale, url: string) {
  return {
    "@type": project.repoUrl ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: pick(project.summary, locale),
    url,
    author: { "@type": "Person", name: site.name, url: site.url },
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
