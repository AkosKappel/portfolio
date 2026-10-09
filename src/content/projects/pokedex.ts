import type { Project } from "../types";

export const pokedex: Project = {
  slug: "pokedex",
  title: "Pokédex",
  summary: {
    en: "All 1025 Pokémon with search, type matchups, a team builder and a quiz, in nine languages.",
    sk: "Všetkých 1025 Pokémonov s vyhľadávaním, typovými výhodami, skladačom tímu a kvízom, v deviatich jazykoch.",
  },
  description: [
    {
      en: "A personal project from 2024 that started as a simple paged list in Vue CLI. In 2026 I rebuilt it as a fast Pokédex for all 1025 Pokémon, without ads, using data from PokéAPI.",
      sk: "Osobný projekt z roku 2024, ktorý začal ako jednoduchý zoznam v Vue CLI. V roku 2026 som ho prerobil na rýchly Pokédex všetkých 1025 Pokémonov bez reklám, s dátami z PokéAPI.",
    },
  ],
  features: [
    {
      en: "Search by name or number from any page; accents and punctuation do not matter",
      sk: "Vyhľadávanie podľa mena alebo čísla z ktorejkoľvek stránky; diakritika ani interpunkcia nevadí",
    },
    {
      en: "Filter by up to two types and a region, sort, and share the result by URL",
      sk: "Filter až podľa dvoch typov a regiónu, triedenie a zdieľanie výsledku cez URL",
    },
    {
      en: "Pokémon pages with artwork, shiny versions, stats, type matchups, evolutions with conditions, moves, forms and cries",
      sk: "Stránky Pokémonov s ilustráciami, shiny verziami, štatistikami, typovými výhodami, evolúciami s podmienkami, útokmi, formami a zvukmi",
    },
    {
      en: "A team builder that shows shared weaknesses and attack coverage",
      sk: "Skladač tímu, ktorý ukáže spoločné slabiny a pokrytie útokmi",
    },
    {
      en: 'Compare up to three Pokémon, play "Who\'s that Pokémon?" and see the Pokémon of the day',
      sk: "Porovnanie až troch Pokémonov, hra „Who's that Pokémon?“ a Pokémon dňa",
    },
    {
      en: "Names in nine languages, favourites with export and import, dark mode, keyboard shortcuts",
      sk: "Mená v deviatich jazykoch, obľúbené s exportom a importom, tmavý režim, klávesové skratky",
    },
  ],
  technical: [
    {
      en: "Data snapshots are bundled at build time, so search and filters need no network requests",
      sk: "Dáta sa pribalia pri zostavení, takže vyhľadávanie a filtre nepotrebujú sieťové požiadavky",
    },
    {
      en: "Every page is prerendered with its own meta tags, about 2,000 pages including a sitemap",
      sk: "Každá stránka je predgenerovaná s vlastnými meta tagmi, spolu asi 2 000 stránok vrátane sitemap",
    },
    {
      en: "Installable and usable offline (PWA with Workbox); images come as WebP from an image CDN, about 10 kB each",
      sk: "Inštalovateľný a použiteľný offline (PWA s Workbox); obrázky sa načítavajú ako WebP z CDN, asi 10 kB každý",
    },
    {
      en: "Unit tests in Vitest, end-to-end tests in Playwright with accessibility checks, Lighthouse in CI, deployed to GitHub Pages",
      sk: "Unit testy vo Vitest, end-to-end testy v Playwright s kontrolou prístupnosti, Lighthouse v CI, nasadenie na GitHub Pages",
    },
  ],
  upgrade: {
    en: "Vue CLI to Vite, Vue 3.2 to 3.5, Vue Router 4 to 5 and TypeScript 4.5 to 6. Axios and the pagination library removed, Docker replaced by GitHub Pages.",
    sk: "Vue CLI na Vite, Vue 3.2 na 3.5, Vue Router 4 na 5 a TypeScript 4.5 na 6. Odstránené Axios a knižnica na stránkovanie, Docker nahradený GitHub Pages.",
  },
  versions: ["Vue 3.5", "Vue Router 5", "Vite 8", "TypeScript 6"],
  kind: "personal",
  area: "web",
  year: 2024,
  until: 2026,
  stack: ["Vue", "TypeScript", "Vite", "Vitest", "Playwright"],
  repoUrl: "https://github.com/AkosKappel/Pokedex",
  liveUrl: "https://akoskappel.github.io/Pokedex",
  image: {
    src: "/images/projects/pokedex-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Pokédex list with search and filters",
      sk: "Zoznam Pokémonov s vyhľadávaním a filtrami",
    },
  },
  featured: true,
};
