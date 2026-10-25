import type { SkillGroup, Text } from "./types";

/** Grouped by area, the same way as on the CV. Logos come from `src/lib/tech-icons.ts`. */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    name: { en: "Frontend", sk: "Frontend" },
    description: {
      en: "Most of my daily work: React with TypeScript and the TanStack libraries, styled with Tailwind CSS. I have also shipped projects in Vue, Nuxt and Angular.",
      sk: "Väčšina mojej každodennej práce: React s TypeScriptom a knižnicami TanStack, štýlovaný cez Tailwind CSS. Projekty som robil aj vo Vue, Nuxt a Angulari.",
    },
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "TanStack",
      "Angular",
      "Vue",
      "Nuxt",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    name: { en: "Backend", sk: "Backend" },
    description: {
      en: "REST APIs and server-rendered apps: Kotlin with Spring Boot and Elixir with Phoenix at work, Node.js, Python and PHP in earlier jobs and projects.",
      sk: "REST API a aplikácie vykresľované na serveri: Kotlin so Spring Boot a Elixir s Phoenixom v práci, Node.js, Python a PHP v predchádzajúcich prácach a projektoch.",
    },
    skills: [
      "Kotlin",
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "Elixir",
      "Phoenix",
      "Python",
      "FastAPI",
      "PHP",
      "Laravel",
      "C#",
    ],
  },
  {
    id: "mobile",
    name: { en: "Mobile", sk: "Mobilné aplikácie" },
    description: {
      en: "One Kotlin codebase for Android and iOS, with shared UI in Compose Multiplatform.",
      sk: "Jeden kód v Kotline pre Android aj iOS so spoločným UI v Compose Multiplatform.",
    },
    skills: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor"],
  },
  {
    id: "data",
    name: { en: "Data", sk: "Dáta" },
    description: {
      en: "Relational and document databases, query tuning, and ETL pipelines that move data between systems.",
      sk: "Relačné aj dokumentové databázy, ladenie dopytov a ETL pipeline, ktoré presúvajú dáta medzi systémami.",
    },
    skills: ["PostgreSQL", "MongoDB", "MSSQL", "Redis", "Airflow", "pandas"],
  },
  {
    id: "ai",
    name: { en: "AI", sk: "AI" },
    description: {
      en: "I develop with AI coding agents every day, through the whole project: planning, implementation, tests, code review and deployment. I make the decisions and review every change. I also trained neural networks for my master's thesis and integrated the OpenAI API into products.",
      sk: "Denne vyvíjam s AI agentmi počas celého projektu: plánovanie, implementácia, testy, code review aj nasadenie. Rozhodnutia robím ja a každú zmenu skontrolujem. Pre diplomovú prácu som trénoval neurónové siete a OpenAI API som integroval do produktov.",
    },
    skills: ["Claude Code", "Codex", "MCP", "OpenAI API", "PyTorch", "TensorFlow", "OpenCV"],
  },
  {
    id: "devops",
    name: { en: "DevOps and testing", sk: "DevOps a testovanie" },
    description: {
      en: "Containers, CI pipelines and a self-hosted home server for my demos, plus unit and end-to-end tests with accessibility checks.",
      sk: "Kontajnery, CI pipeline a vlastný domáci server pre moje demá, plus unit a end-to-end testy s kontrolou prístupnosti.",
    },
    skills: [
      "Docker",
      "Kubernetes",
      "GitLab CI",
      "GitHub Actions",
      "Linux",
      "nginx",
      "Git",
      "Vitest",
      "Jest",
      "Playwright",
      "Cypress",
    ],
  },
];

/** Ways of working, shown next to the technologies, without logos. */
export const practices: Text[] = [
  { en: "AI-assisted development", sk: "Vývoj s pomocou AI" },
  { en: "System design and architecture", sk: "Návrh systémov a architektúra" },
  { en: "REST API design", sk: "Návrh REST API" },
  { en: "Type-safe development", sk: "Typovo bezpečný vývoj" },
  {
    en: "Unit, integration and end-to-end testing",
    sk: "Unit, integračné a end-to-end testovanie",
  },
  { en: "Containerization", sk: "Kontajnerizácia" },
  { en: "CI/CD", sk: "CI/CD" },
  { en: "Observability and monitoring", sk: "Monitorovanie a observabilita" },
  {
    en: "Authentication and authorization (JWT, passkeys, RBAC)",
    sk: "Autentifikácia a autorizácia (JWT, passkeys, RBAC)",
  },
  { en: "Rate limiting", sk: "Obmedzenie počtu požiadaviek (rate limiting)" },
  { en: "Accessibility (a11y)", sk: "Prístupnosť (a11y)" },
  { en: "Internationalization (i18n, l10n)", sk: "Internacionalizácia (i18n, l10n)" },
  { en: "SEO", sk: "SEO" },
  { en: "Performance optimization", sk: "Optimalizácia výkonu" },
  { en: "Caching", sk: "Cache" },
  { en: "UI/UX design", sk: "UI/UX dizajn" },
  { en: "Responsive design", sk: "Responzívny dizajn" },
  { en: "Progressive web apps (PWA)", sk: "Progresívne webové aplikácie (PWA)" },
  { en: "Real-time updates (WebSockets)", sk: "Aktualizácie v reálnom čase (WebSockety)" },
  { en: "Code review", sk: "Code review" },
  { en: "Scrum", sk: "Scrum" },
];
