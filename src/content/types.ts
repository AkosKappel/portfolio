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
  name: string;
  url?: string;
  context: Text;
  highlights: Text[];
  stack: string[];
};

export type Job = {
  role: string;
  company: string;
  location: Text;
  start: string;
  end?: string;
  summary: Text;
  items: WorkItem[];
};

export type Degree = {
  degree: Text;
  field: Text;
  school: Text;
  url?: string;
  start: number;
  end: number;
  thesis?: { title: Text; url?: string };
};

export type SkillGroup = {
  name: Text;
  skills: string[];
};
