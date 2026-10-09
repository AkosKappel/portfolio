export type ProjectKind = "Personal" | "University" | "Team";
export type ProjectArea = "Web" | "AI" | "Games" | "Infrastructure" | "Challenges";

export type Project = {
  slug: string;
  title: string;
  /** One sentence for cards and link previews. */
  summary: string;
  /** Paragraphs for the project page. */
  description: string[];
  highlights?: string[];
  kind: ProjectKind;
  area: ProjectArea;
  /** First year of work. */
  year: number;
  /** Set when an old project was brought up to date. */
  upgraded?: number;
  role?: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: { src: string; width: number; height: number; alt: string };
  featured?: boolean;
};

export type WorkItem = {
  name: string;
  url?: string;
  context: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Job = {
  role: string;
  company: string;
  location: string;
  start: string;
  end?: string;
  summary: string;
  items: WorkItem[];
};

export type Degree = {
  degree: string;
  field: string;
  school: string;
  url?: string;
  start: number;
  end: number;
  thesis?: { title: string; url?: string };
};

export type SkillGroup = {
  name: string;
  description: string;
  skills: string[];
};
