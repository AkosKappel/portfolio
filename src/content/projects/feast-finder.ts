import type { Project } from "../types";

export const feastFinder: Project = {
  slug: "feast-finder",
  title: "Feast Finder",
  summary: {
    en: "Recipe finder for almost 800 meals: search by name, ingredient, category or what is in your fridge.",
    sk: "Hľadanie receptov medzi takmer 800 jedlami: podľa názvu, suroviny, kategórie alebo toho, čo máte v chladničke.",
  },
  description: [
    {
      en: 'A personal recipe finder from 2024 that answers "what should I cook today?" with data from TheMealDB. In 2026 I rebuilt it on Nuxt 4 with tests, accessibility work and a new design.',
      sk: "Osobný projekt z roku 2024 na hľadanie receptov, ktorý odpovedá na otázku „čo dnes uvariť?“ s dátami z TheMealDB. V roku 2026 som ho prerobil na Nuxt 4 s testami, prístupnosťou a novým dizajnom.",
    },
  ],
  features: [
    {
      en: "Search by name, or browse by first letter, category, ingredient or cuisine",
      sk: "Vyhľadávanie podľa názvu alebo prehliadanie podľa písmena, kategórie, suroviny či kuchyne",
    },
    {
      en: '"What\'s in my fridge": pick several ingredients and find meals that use all of them, or all but one',
      sk: "„Čo mám v chladničke“: vyberte viac surovín a nájdite jedlá, ktoré ich použijú všetky alebo všetky okrem jednej",
    },
    {
      en: "Cooking mode: one step at a time, full screen, the screen stays on, timers taken from the recipe",
      sk: "Režim varenia: jeden krok naraz, celá obrazovka, displej nezhasne, časovače z receptu",
    },
    {
      en: "Instructions read aloud with the current step highlighted",
      sk: "Predčítanie postupu so zvýraznením aktuálneho kroku",
    },
    {
      en: "Ingredient checklist, a shopping list for several meals, metric or US units",
      sk: "Kontrolný zoznam surovín, nákupný zoznam pre viac jedál, metrické alebo americké jednotky",
    },
    {
      en: "Favourites, share and print, dark mode, works offline",
      sk: "Obľúbené, zdieľanie a tlač, tmavý režim, funguje offline",
    },
  ],
  technical: [
    {
      en: "A small meal index built at build time makes multi-ingredient search possible, although the free API cannot filter by several ingredients",
      sk: "Malý index jedál vytvorený pri zostavení umožňuje hľadať podľa viacerých surovín, hoci bezplatné API to nevie",
    },
    {
      en: "Playwright tests use a fake clock for timers and a fake speech engine for read-aloud, with accessibility checks in both themes",
      sk: "Playwright testy používajú falošné hodiny pre časovače a falošný hlasový modul pre predčítanie, s kontrolou prístupnosti v oboch témach",
    },
    {
      en: "Prerendered pages with recipe structured data and a sitemap; a weekly CI run refreshes the index",
      sk: "Predgenerované stránky so štruktúrovanými dátami receptov a sitemap; CI raz týždenne obnoví index",
    },
  ],
  upgrade: {
    en: "Nuxt 3.9 to 4.6 with the new app structure, Vue 3.4 to 3.5 and Tailwind CSS 3 to 4. Axios removed.",
    sk: "Nuxt 3.9 na 4.6 s novou štruktúrou aplikácie, Vue 3.4 na 3.5 a Tailwind CSS 3 na 4. Odstránené Axios.",
  },
  versions: ["Nuxt 4.6", "Vue 3.5", "Tailwind CSS 4", "TypeScript 6"],
  kind: "personal",
  area: "web",
  year: 2024,
  until: 2026,
  stack: ["Nuxt", "Vue", "TypeScript", "Tailwind CSS", "Playwright"],
  repoUrl: "https://github.com/AkosKappel/FeastFinder",
  liveUrl: "https://akoskappel.github.io/FeastFinder",
  image: {
    src: "/images/projects/feast-finder-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Feast Finder home page with meal suggestions",
      sk: "Úvodná stránka Feast Finder s návrhmi jedál",
    },
  },
};
