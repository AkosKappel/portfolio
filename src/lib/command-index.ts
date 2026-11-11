import type messages from "../../messages/en.json";
import { PALETTES, type Theme } from "../components/layout/theme-script";
import { degrees } from "../content/education";
import { jobs } from "../content/experience";
import { projects } from "../content/projects";
import { navigation, secondaryNavigation, site } from "../content/site";
import { skillGroups } from "../content/skills";
import { pick } from "../content/types";
import { type Locale, routing } from "../i18n/routing";
import type { Command } from "./commands";

type Messages = typeof messages;

/** Every page, project and section anchor plus the appearance and language settings, from the site's data. */
export function buildCommandIndex(locale: Locale, m: Messages): Command[] {
  const pages: Command[] = [
    { href: "/", key: "home" } as const,
    ...navigation,
    ...secondaryNavigation,
  ].map(({ href, key }) => ({
    id: `page:${key}`,
    group: m.commands.pages,
    label: m.nav[key],
    href,
  }));

  const projectCommands: Command[] = projects.map((project) => ({
    id: `project:${project.slug}`,
    group: m.nav.projects,
    label: project.title,
    keywords: project.stack,
    href: `/projects/${project.slug}`,
  }));

  const sections: Command[] = [
    ...jobs.flatMap((job) => [
      {
        id: `section:${job.id}`,
        group: m.nav.experience,
        label: job.company,
        keywords: [job.role],
        href: `/experience#${job.id}`,
      },
      ...job.items.map((item) => ({
        id: `section:${item.id}`,
        group: m.nav.experience,
        label: pick(item.name, locale),
        keywords: [job.company],
        href: `/experience#${item.id}`,
      })),
    ]),
    ...skillGroups.map((group) => ({
      id: `section:${group.id}`,
      group: m.nav.skills,
      label: pick(group.name, locale),
      keywords: group.skills,
      href: `/skills#${group.id}`,
    })),
    ...degrees.map((degree) => ({
      id: `section:${degree.id}`,
      group: m.nav.education,
      label: pick(degree.degree, locale),
      keywords: [pick(degree.field, locale)],
      href: `/education#${degree.id}`,
    })),
    ...site.about.map((section) => ({
      id: `section:${section.id}`,
      group: m.nav.about,
      label: pick(section.title, locale),
      href: `/about#${section.id}`,
    })),
  ];

  const modes = Object.keys(PALETTES) as Theme[];
  const settings: Command[] = [
    ...modes.map((theme) => ({
      id: `theme:${theme}`,
      group: m.common.palette,
      label: theme === "dark" ? m.common.switchToDark : m.common.switchToLight,
      action: { type: "theme", theme } as const,
    })),
    ...modes.flatMap((theme) =>
      PALETTES[theme].map((palette) => ({
        id: `palette:${palette}`,
        group: m.common.palette,
        label: `${m.common.modes[theme]}: ${m.common.palettes[palette]}`,
        action: { type: "palette", theme, palette } as const,
      })),
    ),
    ...routing.locales.map((option) => ({
      id: `locale:${option}`,
      group: m.common.language,
      label: m.languages[option],
      action: { type: "locale", locale: option } as const,
    })),
    {
      id: "copy:email",
      group: m.nav.contact,
      label: m.common.copyEmail,
      keywords: [site.email],
      action: { type: "copy", text: site.email },
    },
  ];

  return [...pages, ...projectCommands, ...sections, ...settings];
}
