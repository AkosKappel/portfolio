import type { Project } from "../types";

export const miniProjects: Project = {
  slug: "mini-projects",
  title: "Mini Projects",
  summary: {
    en: "Small experiments in plain JavaScript, HTML, CSS and p5.js.",
    sk: "Malé experimenty v čistom JavaScripte, HTML, CSS a p5.js.",
  },
  description: [
    {
      en: "A collection of small projects written in plain JavaScript, HTML and CSS, some with p5.js.",
      sk: "Zbierka malých projektov v čistom JavaScripte, HTML a CSS, niektoré s p5.js.",
    },
  ],
  kind: "personal",
  area: "web",
  year: 2021,
  stack: ["JavaScript", "HTML", "CSS", "p5.js"],
  image: {
    src: "/images/projects/mini.webp",
    width: 956,
    height: 859,
    alt: {
      en: "Grid of small browser experiments",
      sk: "Mriežka malých experimentov v prehliadači",
    },
  },
};
