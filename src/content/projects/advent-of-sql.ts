import type { Project } from "../types";

export const adventOfSql: Project = {
  slug: "advent-of-sql",
  title: "Advent of SQL",
  summary: {
    en: "Daily database puzzles solved in PostgreSQL.",
    sk: "Denné databázové úlohy riešené v PostgreSQL.",
  },
  description: [
    {
      en: "Solutions to the Advent of SQL challenge: one database puzzle a day, solved in PostgreSQL.",
      sk: "Riešenia výzvy Advent of SQL: jedna databázová úloha denne, riešená v PostgreSQL.",
    },
  ],
  kind: "personal",
  area: "challenges",
  year: 2024,
  stack: ["PostgreSQL"],
  repoUrl: "https://github.com/AkosKappel/Advent-of-SQL",
  image: {
    src: "/images/projects/aosql.webp",
    width: 764,
    height: 782,
    alt: { en: "Advent of SQL challenge page", sk: "Stránka výzvy Advent of SQL" },
  },
};
