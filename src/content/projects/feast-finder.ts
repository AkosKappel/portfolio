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
      en: 'A personal recipe finder from 2024 that answers "what should I cook today?" with data from TheMealDB. Later I rebuilt it on Nuxt 4 with tests, accessibility work and a new design.',
      sk: "Osobný projekt z roku 2024 na hľadanie receptov, ktorý odpovedá na otázku „čo dnes uvariť?“ s dátami z TheMealDB. Neskôr som ho prerobil na Nuxt 4 s testami, prístupnosťou a novým dizajnom.",
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
    {
      en: "A weekly meal planner with lunch and dinner for each day; the whole week goes to the shopping list in one go",
      sk: "Týždenný plánovač jedál s obedom a večerou na každý deň; celý týždeň sa dá naraz pridať do nákupného zoznamu",
    },
    {
      en: "Voice search, a quick find (Ctrl+K), cuisines from 63 countries with flags and meals from your own country on the home page",
      sk: "Hlasové vyhľadávanie, rýchle hľadanie (Ctrl+K), kuchyne zo 63 krajín s vlajkami a jedlá z vašej krajiny na úvodnej stránke",
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
    {
      en: "API responses are cached in memory for 30 minutes and identical requests are merged",
      sk: "Odpovede API sa ukladajú do pamäte na 30 minút a rovnaké požiadavky sa zlúčia do jednej",
    },
    {
      en: "A small service worker keeps the app shell, recipes and images, so visited pages open offline",
      sk: "Malý service worker uchováva základ aplikácie, recepty a obrázky, takže navštívené stránky sa otvoria aj offline",
    },
  ],
  changelog: [
    {
      en: "Nuxt 3.9 to 4.6 with the new app structure",
      sk: "Nuxt 3.9 na 4.6 s novou štruktúrou aplikácie",
    },
    {
      en: "Vue 3.4 to 3.5 and Tailwind CSS 3 to 4",
      sk: "Vue 3.4 na 3.5 a Tailwind CSS 3 na 4",
    },
    {
      en: "Axios removed",
      sk: "Odstránené Axios",
    },
  ],
  versions: ["Nuxt 4.6", "Vue 3.5", "Tailwind CSS 4", "TypeScript 6"],
  kind: "personal",
  areas: ["web"],
  year: 2024,
  until: 2026,
  stack: [
    "Nuxt",
    "Vue",
    "TypeScript",
    "VueUse",
    "Tailwind CSS",
    "Vitest",
    "Playwright",
    "ESLint",
    "GitHub Pages",
  ],
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
  gallery: [
    {
      src: "/images/projects/feast-finder/fridge.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Ingredient picker that finds meals from what is in the fridge",
        sk: "Výber ingrediencií, ktorý nájde jedlá z toho, čo je v chladničke",
      },
      caption: {
        en: '"What is in my fridge": pick several ingredients and get the meals that use all of them.',
        sk: '„Čo mám v chladničke": vyberte niekoľko ingrediencií a dostanete jedlá, ktoré ich obsahujú všetky.',
      },
    },
    {
      src: "/images/projects/feast-finder/meal.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Recipe page with a photo, ingredients and instructions",
        sk: "Stránka receptu s fotkou, ingredienciami a postupom",
      },
      caption: {
        en: "Recipe page with ingredients, steps, favourites, sharing and printing.",
        sk: "Stránka receptu s ingredienciami, krokmi, obľúbenými, zdieľaním a tlačou.",
      },
    },
    {
      src: "/images/projects/feast-finder/cooking-mode.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Cooking mode showing one large recipe step at a time",
        sk: "Režim varenia, ktorý ukazuje jeden veľký krok receptu naraz",
      },
      caption: {
        en: "Cooking mode: one step at a time, with timers and read-aloud.",
        sk: "Režim varenia: jeden krok naraz, s časovačmi a čítaním nahlas.",
      },
    },
    {
      src: "/images/projects/feast-finder/planner.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Weekly meal planner with meals for lunch and dinner",
        sk: "Týždenný plánovač s jedlami na obed a večeru",
      },
      caption: {
        en: "Meal planner: lunch and dinner for each day, saved in the browser.",
        sk: "Plánovač jedál: obed a večera na každý deň, uložené v prehliadači.",
      },
    },
    {
      src: "/images/projects/feast-finder/cuisines.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Grid of countries with flags and meal counts",
        sk: "Mriežka krajín s vlajkami a počtom jedál",
      },
      caption: {
        en: "Cuisines from 63 countries, each with its flag.",
        sk: "Kuchyne zo 63 krajín, každá so svojou vlajkou.",
      },
    },
    {
      src: "/images/projects/feast-finder/ingredients-dark.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Ingredient cards with photos in the dark theme",
        sk: "Karty surovín s fotkami v tmavom režime",
      },
      caption: {
        en: "Ingredients by letter and type, in the dark theme.",
        sk: "Suroviny podľa písmena a typu, v tmavom režime.",
      },
    },
  ],
};
