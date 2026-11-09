import type { Text } from "./types";

type CvProject = {
  /** Title, link and years come from this project unless given below. */
  slug?: string;
  title?: Text;
  url?: string;
  years?: string;
  summary: Text;
  stack: string;
};

/**
 * Wording that only the one-page PDF CV uses. Everything else on the CV (contacts, roles and
 * dates, skills, languages, degrees, project links and years) comes from the shared content,
 * so the CV and the site cannot drift. `src/lib/cv-latex.ts` renders it into `latex/`.
 * `**text**` is bold.
 */
export const cv = {
  profile: {
    en: "Full-stack software engineer with years of experience in web and mobile development. I build software that is fast, accessible and easy to maintain, and I learn new technologies quickly. AI coding agents make me much faster in my daily work: I plan the work, build it with their help and review every change.",
    sk: "Full-stack vývojár s viacročnou praxou vo vývoji webových a mobilných aplikácií. Tvorím softvér, ktorý je rýchly, prístupný a ľahko udržiavateľný, a nové technológie sa učím rýchlo. AI agenti na programovanie ma v každodennej práci výrazne zrýchľujú: prácu naplánujem, s ich pomocou ju vytvorím a každú zmenu skontrolujem.",
  } satisfies Text,

  /** Short bullets and the technology line per job, keyed by `Job.id`. */
  jobs: {
    "igt-systems": {
      highlights: [
        {
          en: "Responsible for the project management module of **Core3**, a business platform for projects, HR and CRM: kanban boards, task permissions, Scrum and Waterfall workflows.",
          sk: "Zodpovedal som za projektový manažment vo firemnej platforme **Core3**: kanban, oprávnenia, Scrum a Waterfall.",
        },
        {
          en: "Optimized the slowest Core3 pages by fixing N+1 database queries, adding caching and loading data in the background.",
          sk: "Optimalizoval som najpomalšie stránky Core3: opravil N+1 dopyty, pridal cache a načítavanie na pozadí.",
        },
        {
          en: "Developed the **WYDO** sports app for Android and iOS in Kotlin Multiplatform, then moved its web version to React.",
          sk: "Vyvíjal som mobilnú aplikáciu **WYDO** pre Android a iOS v Kotlin Multiplatform a potom presunul jej web do Reactu.",
        },
        {
          en: "Built the **CleanEEG** web app from scratch, including a WebGL viewer that compares raw and cleaned brain signals (EEG), and the frontend of **BDAP**, an analytics dashboard for an enterprise client.",
          sk: "Od nuly som vytvoril web **CleanEEG** s WebGL prehliadačom pôvodných a vyčistených mozgových signálov (EEG) a frontend **BDAP**, analytického dashboardu pre firemného klienta.",
        },
      ],
      stack: [
        "React",
        "TypeScript",
        "TanStack",
        "Kotlin",
        "Spring Boot",
        "Elixir",
        "Phoenix LiveView",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    svarba: {
      highlights: [
        {
          en: "Developed the REST API of a new internal company system, a React web app that replaced several older PHP applications.",
          sk: "Vyvinul som REST API nového interného systému v Reacte, ktorý nahradil staršie PHP aplikácie.",
        },
        {
          en: "Implemented real-time notifications, scheduled data imports and exports, and AI translations of product texts.",
          sk: "Implementoval som notifikácie v reálnom čase, plánované importy a exporty dát a AI preklady produktových textov.",
        },
      ],
      stack: [
        "TypeScript",
        "Node.js",
        "Express",
        "React",
        "MSSQL",
        "Redis",
        "Jest",
        "PHP",
        "Nette",
      ],
    },
    softpoint: {
      highlights: [
        {
          en: "Built ETL data pipelines in Airflow importing products, prices and stock from 20+ suppliers.",
          sk: "Vytvoril som ETL pipeline v Airflow na import produktov, cien a zásob od viac ako 20 dodávateľov.",
        },
        {
          en: "Automated ordering on 20 supplier web shops with headless-browser scripts in Ruby, a language I learned for this task.",
          sk: "Automatizoval som objednávanie v 20 e-shopoch dodávateľov skriptmi v Ruby, ktoré som sa kvôli tomu naučil.",
        },
      ],
      stack: ["Python", "Airflow", "pandas", "Selenium", "Ruby", "PostgreSQL", "FastAPI"],
    },
  } as Record<string, { highlights: Text[]; stack: string[] }>,

  /** Replaces the plain list of a skill group, keyed by `SkillGroup.id`. */
  skillLines: {
    ai: {
      en: "Agentic development with Claude Code and Codex (agents, skills, MCP servers), OpenAI API, PyTorch",
      sk: "Vývoj s AI agentmi v Claude Code a Codex (agenti, skills, MCP servery), OpenAI API, PyTorch",
    },
  } as Record<string, Text>,

  practices: {
    en: "REST APIs, a11y, i18n, l10n, SEO, performance optimization, UI/UX, automated testing, Scrum",
    sk: "REST API, a11y, i18n, l10n, SEO, optimalizácia výkonu, UI/UX, automatizované testovanie, Scrum",
  } satisfies Text,

  /** Keyed by `Degree.id`. */
  thesisLabels: {
    masters: { en: "Thesis", sk: "Diplomová práca" },
    bachelors: { en: "Thesis", sk: "Bakalárska práca" },
  } as Record<string, Text>,

  projects: [
    {
      slug: "smarttech-e-shop",
      summary: {
        en: "online shop with fuzzy search, checkout and admin area",
        sk: "e-shop s vyhľadávaním, košíkom a administráciou",
      },
      stack: "Laravel",
    },
    {
      slug: "modern-fashion-store",
      summary: {
        en: "inventory dashboard with live updates",
        sk: "skladový dashboard so živými aktualizáciami",
      },
      stack: "Elixir, Phoenix",
    },
    {
      slug: "glaucoma-segmentation",
      title: { en: "Glaucoma segmentation", sk: "Segmentácia glaukómu" },
      summary: {
        en: "master's thesis, neural networks for eye images",
        sk: "diplomová práca, neurónové siete pre snímky oka",
      },
      stack: "PyTorch",
    },
    {
      title: { en: "Portfolio website", sk: "Webová stránka portfólia" },
      url: "https://akoskappel.dev/",
      years: "2026",
      summary: {
        en: "rebuilt with five older projects using AI coding agents",
        sk: "obnovené spolu s piatimi projektmi pomocou AI agentov",
      },
      stack: "Next.js",
    },
  ] as CvProject[],

  /** Linked by name in the closing line. */
  otherProjects: [
    "pokedex",
    "fakeshop",
    "feast-finder",
    "budget-master",
    "advent-of-code",
    "iridescent",
  ],

  labels: {
    profile: { en: "Profile", sk: "Profil" },
    experience: { en: "Experience", sk: "Pracovné skúsenosti" },
    skills: { en: "Skills", sk: "Zručnosti" },
    practices: { en: "Practices", sk: "Postupy" },
    languages: { en: "Languages", sk: "Jazyky" },
    education: { en: "Education", sk: "Vzdelanie" },
    projects: { en: "Selected projects", sk: "Vybrané projekty" },
    present: { en: "present", sk: "súčasnosť" },
    pdfTitle: { en: "CV", sk: "životopis" },
    otherProjects: { en: "Other projects include", sk: "Ďalšie projekty sú napríklad" },
    and: { en: "and", sk: "a" },
    findAll: {
      en: "You can find all of them and read more about me at",
      sk: "Všetky nájdete spolu s informáciami o mne na",
    },
  } satisfies Record<string, Text>,
};
