import type { Project } from "../types";

export const adventOfCode: Project = {
  slug: "advent-of-code",
  title: "Advent of Code",
  summary: {
    en: "All 374 stars from 2018 to 2025, in a different language every year, tested in CI and shown on an advent calendar dashboard.",
    sk: "Všetkých 374 hviezd z rokov 2018 až 2025, každý rok v inom jazyku, testované v CI a zobrazené na nástenke v podobe adventného kalendára.",
  },
  description: [
    {
      en: "Advent of Code is a yearly event by Eric Wastl: from 1 December, a new programming puzzle unlocks every day, each in two parts, the second a twist on the first. The puzzles start simple and grow into graph search, simulation, dynamic programming and number theory, often with inputs too large for a naive approach.",
      sk: "Advent of Code je každoročné podujatie, ktoré pripravuje Eric Wastl: od 1. decembra sa každý deň odomkne nová programátorská úloha s dvoma časťami, pričom druhá je obmenou prvej. Úlohy začínajú jednoducho a prerastajú do prehľadávania grafov, simulácií, dynamického programovania a teórie čísel, často so vstupmi príliš veľkými na naivný prístup.",
    },
    {
      en: "I use it to learn a new language each December, and I went back to finish the earlier years too: Go for 2018, Java for 2019, Kotlin for 2020, Python for 2021, TypeScript for 2022, JavaScript for 2023, C# for 2024 and Elixir for 2025. Every puzzle of all eight years is solved, 374 stars in total.",
      sk: "Využívam ho na to, aby som sa každý december naučil nový jazyk, a dokončil som aj staršie ročníky: Go pre 2018, Java pre 2019, Kotlin pre 2020, Python pre 2021, TypeScript pre 2022, JavaScript pre 2023, C# pre 2024 a Elixir pre 2025. Vyriešené sú všetky úlohy všetkých ôsmich ročníkov, spolu 374 hviezd.",
    },
    {
      en: "Each year is a self-contained project with that language's usual tooling and tests. A GitHub Pages dashboard shows every puzzle as a door of an advent calendar, with links to the puzzle, the solution and its tests.",
      sk: "Každý ročník je samostatný projekt s bežnými nástrojmi a testami daného jazyka. Nástenka na GitHub Pages zobrazuje každú úlohu ako okienko adventného kalendára s odkazmi na zadanie, riešenie a jeho testy.",
    },
  ],
  features: [
    {
      en: "Advent calendar of all eight years, where the fill of each door shows how long the solution is",
      sk: "Adventný kalendár všetkých ôsmich ročníkov, v ktorom výplň okienka ukazuje dĺžku riešenia",
    },
    {
      en: "Hover or click a door to preview the puzzle and open its solution; the arrow keys work too",
      sk: "Po prejdení myšou alebo kliknutí na okienko sa zobrazí náhľad úlohy a odkaz na riešenie; fungujú aj šípky",
    },
    {
      en: "A table of all years with stars, lines of code and the live CI status of each year's example tests",
      sk: "Tabuľka všetkých ročníkov s hviezdami, počtom riadkov kódu a aktuálnym stavom testov na príkladoch v CI",
    },
    {
      en: "Light and dark theme that follows the system setting",
      sk: "Svetlá a tmavá téma podľa nastavenia systému",
    },
  ],
  technical: [
    {
      en: "Every day is tested against the examples from the puzzle and against my own input",
      sk: "Každý deň sa testuje na príkladoch zo zadania aj na mojom vlastnom vstupe",
    },
    {
      en: "One GitHub Actions workflow per year runs the example tests with that language's test framework: go test, JUnit, Kotlin test, pytest, Jest, NUnit and ExUnit",
      sk: "Pre každý ročník jeden GitHub Actions workflow spúšťa testy na príkladoch v testovacom nástroji daného jazyka: go test, JUnit, Kotlin test, pytest, Jest, NUnit a ExUnit",
    },
    {
      en: "A Python script builds the dashboard from the README and the solution files, and a workflow deploys it on every push",
      sk: "Python skript zostaví nástenku z README a súborov s riešeniami a workflow ju nasadí pri každom pushi",
    },
    {
      en: "Each year has its own README with the toolchain, how to run a day and its tests, and a day index",
      sk: "Každý ročník má vlastné README s nástrojmi, návodom na spustenie dňa a jeho testov a zoznamom dní",
    },
  ],
  kind: "personal",
  areas: ["challenges"],
  year: 2022,
  until: 2025,
  stack: [
    "Python",
    "Kotlin",
    "TypeScript",
    "JavaScript",
    "Go",
    "Elixir",
    "C#",
    "Java",
    "GitHub Actions",
    "GitHub Pages",
  ],
  repoUrl: "https://github.com/AkosKappel/Advent-of-Code",
  liveUrl: "https://akoskappel.github.io/Advent-of-Code/",
  websiteUrl: "https://adventofcode.com",
  image: {
    src: "/images/projects/advent-of-code-2026.webp",
    width: 1600,
    height: 900,
    alt: {
      en: "Advent of Code dashboard with a calendar of all eight years",
      sk: "Nástenka Advent of Code s kalendárom všetkých ôsmich ročníkov",
    },
  },
  gallery: [
    {
      src: "/images/projects/advent-of-code/calendar-2020.webp",
      width: 1600,
      height: 824,
      alt: {
        en: "Completed Advent of Code 2020 calendar with 50 stars",
        sk: "Dokončený kalendár Advent of Code 2020 s 50 hviezdami",
      },
      caption: {
        en: "The official calendar for 2020, completed with all 50 stars.",
        sk: "Oficiálny kalendár ročníka 2020, dokončený so všetkými 50 hviezdami.",
      },
    },
    {
      src: "/images/projects/advent-of-code/dashboard-door.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Dashboard with a selected door and the preview of its puzzle",
        sk: "Nástenka s vybraným okienkom a náhľadom jeho úlohy",
      },
      caption: {
        en: "A selected door shows the puzzle title, the solution length and links to the puzzle, solution and tests.",
        sk: "Vybrané okienko ukáže názov úlohy, dĺžku riešenia a odkazy na zadanie, riešenie a testy.",
      },
    },
    {
      src: "/images/projects/advent-of-code/dashboard-light.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Advent calendar of all eight years in the light theme",
        sk: "Adventný kalendár všetkých ôsmich ročníkov vo svetlej téme",
      },
      caption: {
        en: "The calendar in the light theme; each row is one year in a different language.",
        sk: "Kalendár vo svetlej téme; každý riadok je jeden ročník v inom jazyku.",
      },
    },
  ],
};
