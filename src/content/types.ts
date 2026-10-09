import type { Locale } from "@/i18n/routing";

/** Text in every language the site supports. */
export type Text = Record<Locale, string>;

export function pick(text: Text, locale: Locale) {
  return text[locale];
}

export type ProjectKind = "personal" | "university" | "team";
export type ProjectArea = "web" | "ai" | "games" | "infrastructure" | "challenges";

export type Project = {
  slug: string;
  title: string;
  /** One sentence for cards and link previews. */
  summary: Text;
  /** Paragraphs for the project page. */
  description: Text[];
  highlights?: Text[];
  /** Things a visitor can try in the live demo. */
  features?: Text[];
  /** Engineering details: architecture, testing, deployment. */
  technical?: Text[];
  /** What the 2026 rebuild changed. */
  upgrade?: Text;
  /** Main framework versions, e.g. "Phoenix 1.8". */
  versions?: string[];
  kind: ProjectKind;
  area: ProjectArea;
  /** First year of work. */
  year: number;
  /** Last year of work, when the project ran over several years or was rebuilt. */
  until?: number;
  role?: Text;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: { src: string; width: number; height: number; alt: Text };
  featured?: boolean;
};

export type WorkItem = {
  /** Anchor on the experience page. */
  id: string;
  name: Text;
  url?: string;
  context: Text;
  highlights: Text[];
  stack: string[];
};

export type Job = {
  /** Anchor on the experience page. */
  id: string;
  role: string;
  company: string;
  companyNote?: Text;
  location: Text;
  start: string;
  end?: string;
  summary: Text;
  items: WorkItem[];
};

export type Degree = {
  /** Anchor on the education page. */
  id: string;
  degree: Text;
  field: Text;
  start: number;
  end: number;
  description: Text;
  thesis: { title: Text; url?: string };
};

export type SkillGroup = {
  /** Anchor on the skills page. */
  id: string;
  name: Text;
  description: Text;
  skills: string[];
};
