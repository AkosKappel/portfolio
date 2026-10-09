import type { Project } from "../types";

export const adventOfCode: Project = {
  slug: "advent-of-code",
  title: "Advent of Code",
  summary: {
    en: "Solutions from 2018 to 2025 in a different language every year, tested in CI.",
    sk: "Riešenia z rokov 2018 až 2025, každý rok v inom jazyku, testované v CI.",
  },
  description: [
    {
      en: "Every December I solve the Advent of Code puzzles, each year in a different language: Go, Java, Kotlin, Python, TypeScript, JavaScript, C# and Elixir. All solutions are tested in CI.",
      sk: "Každý december riešim úlohy Advent of Code, každý rok v inom jazyku: Go, Java, Kotlin, Python, TypeScript, JavaScript, C# a Elixir. Všetky riešenia sa testujú v CI.",
    },
  ],
  kind: "personal",
  area: "challenges",
  year: 2022,
  until: 2025,
  stack: ["Python", "Kotlin", "TypeScript", "Go", "Elixir", "C#", "Java"],
  repoUrl: "https://github.com/AkosKappel/Advent-of-Code",
  image: {
    src: "/images/projects/aoc.webp",
    width: 1600,
    height: 824,
    alt: { en: "Advent of Code calendar", sk: "Kalendár Advent of Code" },
  },
};
