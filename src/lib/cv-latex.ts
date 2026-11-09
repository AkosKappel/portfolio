import type { Locale } from "@/i18n/routing";
import { cv } from "../content/cv";
import { degrees, university } from "../content/education";
import { jobs } from "../content/experience";
import { getProject } from "../content/projects";
import { site } from "../content/site";
import { skillGroups } from "../content/skills";
import { formatMonth } from "./format";

/** Escapes LaTeX special characters, then turns `**text**` into bold. */
function tex(text: string) {
  return text
    .replace(/[\\{}#$%&_~^]/g, (char) =>
      char === "\\"
        ? "\\textbackslash{}"
        : char === "~" || char === "^"
          ? `\\${char}{}`
          : `\\${char}`,
    )
    .replace(/\*\*(.+?)\*\*/g, "\\textbf{$1}");
}

/** hyperref reads URLs verbatim except for these two. */
function url(href: string) {
  return href.replace(/[%#]/g, (char) => `\\${char}`);
}

function years(start: number, end?: number) {
  return end && end !== start ? `${start} -- ${end}` : `${start}`;
}

function project(slug: string) {
  const found = getProject(slug);
  if (!found) throw new Error(`CV links an unknown project: ${slug}`);
  const href = found.liveUrl ?? found.repoUrl;
  if (!href) throw new Error(`CV project has no link: ${slug}`);
  return { title: found.title, href, years: years(found.year, found.until) };
}

/** The full `main-*.tex` document for one language; the layout lives in `latex/cv-style.tex`. */
export function renderCv(locale: Locale) {
  const t = (text: Record<Locale, string>) => text[locale];
  const home = locale === "en" ? `${site.url}/` : `${site.url}/${locale}`;
  const contact = (icon: string, href: string, label: string) =>
    `\\contact{${icon}}{${url(href)}}{${tex(label)}}`;
  const label = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  const header = [
    `\\cvheader{profile.jpg}{${tex(`${site.title} ${site.name}`)}}{${tex(site.headline)}}{%`,
    `  ${contact("\\faEnvelope[regular]", `mailto:${site.email}`, site.email)}\\quad`,
    `  ${contact("\\faPhone*", `tel:${site.phone.replaceAll(" ", "")}`, site.phone)}\\quad`,
    `  ${contact("\\faMapMarker*", "https://www.google.com/maps/place/Bratislava", t(site.location))}\\quad`,
    `  ${contact("\\faGlobe", home, label(home))}\\\\[2pt]`,
    `  ${contact("\\faLinkedinIn", site.links.linkedin, label(site.links.linkedin))}\\quad`,
    `  ${contact("\\faGithub", site.links.github, label(site.links.github))}\\quad`,
    `  ${contact("\\faGitlab", site.links.gitlab, label(site.links.gitlab))}%`,
    "}",
  ];

  const experience = jobs.flatMap((job) => {
    const short = cv.jobs[job.id];
    if (!short) throw new Error(`CV has no bullets for job: ${job.id}`);
    const dates = `${formatMonth(job.start, locale)} -- ${job.end ? formatMonth(job.end, locale) : t(cv.labels.present)}`;
    return [
      "",
      `\\job{${tex(job.role)}}{${tex(job.company)}}{${tex(t(job.location))}}{${dates}}`,
      "\\begin{itemize}",
      ...short.highlights.map((item) => `  \\item ${tex(t(item))}`),
      "\\end{itemize}",
      `\\tech{${tex(short.stack.join(", "))}}`,
    ];
  });

  const languages = site.languages
    .map((language) => {
      const name = locale === "sk" ? t(language.name).toLowerCase() : t(language.name);
      const level = [
        t(language.level).toLowerCase(),
        "cefr" in language ? language.cefr : undefined,
      ]
        .filter(Boolean)
        .join(", ");
      return `${name} (${level})`;
    })
    .join(", ");
  const skills = [
    ...skillGroups.map((group) => {
      const line = cv.skillLines[group.id];
      return `  \\skillrow{${tex(t(group.name))}}{${tex(line ? t(line) : group.skills.join(", "))}}`;
    }),
    `  \\skillrow{${tex(t(cv.labels.practices))}}{${tex(t(cv.practices))}}`,
    `  \\skillrow{${tex(t(cv.labels.languages))}}{${tex(languages)}}`,
  ];

  const faculty = t(university.faculty).replace(/\s*\(.*\)$/, "");
  const education = [
    `{\\small ${tex(t(university.name))}, ${tex(faculty)}}\\par`,
    ...degrees.map((degree) => {
      const abbreviation = t(degree.degree).match(/\((.+)\)/)?.[1] ?? t(degree.degree);
      const name =
        locale === "en"
          ? `${abbreviation} in ${t(degree.field)}`
          : `${abbreviation}, ${t(degree.field)}`;
      const thesisLabel = cv.thesisLabels[degree.id];
      if (!thesisLabel) throw new Error(`CV has no thesis label for degree: ${degree.id}`);
      const thesisUrl = degree.thesis.recordUrl ?? degree.thesis.url ?? home;
      return `\\degree{${tex(name)}}{${years(degree.start, degree.end)}}{\\thesis{${tex(t(thesisLabel))}}{${tex(t(degree.thesis.title))}}{${url(thesisUrl)}}}`;
    }),
  ];

  const selected = cv.projects.map((entry) => {
    const linked = entry.slug ? project(entry.slug) : undefined;
    const title = entry.title ? t(entry.title) : linked?.title;
    const href = entry.url ?? linked?.href;
    const span = entry.years ?? linked?.years;
    if (!title || !href || !span)
      throw new Error(`CV project is incomplete: ${JSON.stringify(entry)}`);
    return `  \\project{${tex(title)}}{${url(href)}}{${span}}{${tex(t(entry.summary))}}{${tex(entry.stack)}}`;
  });

  const others = cv.otherProjects.map((slug) => {
    const { title, href } = project(slug);
    return `\\href{${url(href)}}{${tex(title)}}`;
  });
  const otherList = `${others.slice(0, -1).join(",\n")}\n${t(cv.labels.and)} ${others.at(-1)}`;

  return [
    "% Generated from src/content by src/lib/cv-latex.ts. Do not edit; run `pnpm cv:tex`.",
    "\\documentclass[10pt]{article}",
    "\\input{cv-style}",
    `\\hypersetup{pdftitle={${tex(`${site.name} - ${t(cv.labels.pdfTitle)}`)}}, pdfauthor={${tex(site.name)}}}`,
    "",
    "\\begin{document}",
    "",
    ...header,
    "",
    `\\section{${tex(t(cv.labels.profile))}}`,
    tex(t(cv.profile)),
    "",
    `\\section{${tex(t(cv.labels.experience))}}`,
    ...experience,
    "",
    `\\section{${tex(t(cv.labels.skills))}}`,
    "\\begin{skills}",
    ...skills,
    "\\end{skills}",
    "",
    `\\section{${tex(t(cv.labels.education))}}`,
    ...education,
    "",
    `\\section{${tex(t(cv.labels.projects))}}`,
    "\\begin{itemize}",
    ...selected,
    "\\end{itemize}",
    `{\\small ${tex(t(cv.labels.otherProjects))}`,
    `${otherList}.\\\\`,
    `${tex(t(cv.labels.findAll))} \\href{${url(home)}}{\\color{accent}${tex(label(home))}}.}`,
    "",
    "\\end{document}",
    "",
  ].join("\n");
}
