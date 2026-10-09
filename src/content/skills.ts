import type { SkillGroup } from "./types";

/** Grouped by area, the same way as on the CV. Logos come from `src/lib/tech-icons.ts`. */
export const skillGroups: SkillGroup[] = [
  {
    name: { en: "Frontend", sk: "Frontend" },
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
    name: { en: "Backend", sk: "Backend" },
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
    name: { en: "Mobile", sk: "Mobilné aplikácie" },
    skills: ["Kotlin Multiplatform", "Compose Multiplatform"],
  },
  {
    name: { en: "Data", sk: "Dáta" },
    skills: ["PostgreSQL", "MongoDB", "MSSQL", "Redis", "Airflow"],
  },
  {
    name: { en: "AI", sk: "AI" },
    skills: ["Claude Code", "MCP", "OpenAI API", "PyTorch", "TensorFlow", "OpenCV"],
  },
  {
    name: { en: "DevOps and testing", sk: "DevOps a testovanie" },
    skills: [
      "Docker",
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

/** Practices shown next to the technologies, without logos. */
export const practices = ["A11Y", "I18N", "SEO", "REST APIs", "PWA"];
