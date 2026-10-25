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
      en: "A personal project from 2024 that started as a simple paged list in Vue CLI. Later I rebuilt it as a fast Pokédex for all 1025 Pokémon, without ads, using data from PokéAPI.",
      sk: "Osobný projekt z roku 2024, ktorý začal ako jednoduchý zoznam v Vue CLI. Neskôr som ho prerobil na rýchly Pokédex všetkých 1025 Pokémonov bez reklám, s dátami z PokéAPI.",
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
      en: "Searchable lists of moves, abilities and items; each move and ability page lists the Pokémon that learn or have it",
      sk: "Zoznamy útokov, schopností a predmetov s vyhľadávaním; stránka každého útoku a schopnosti ukáže Pokémonov, ktorí ho poznajú alebo ju majú",
    },
    {
      en: 'Compare up to three Pokémon, play "Who\'s that Pokémon?" and see the Pokémon of the day',
      sk: "Porovnanie až troch Pokémonov, hra „Who's that Pokémon?“ a Pokémon dňa",
    },
    {
      en: "Names in nine languages, favourites with export and import, dark mode, keyboard shortcuts and a quick find (Ctrl+K)",
      sk: "Mená v deviatich jazykoch, obľúbené s exportom a importom, tmavý režim, klávesové skratky a rýchle hľadanie (Ctrl+K)",
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
    {
      en: "Pokémon details load from the PokéAPI REST endpoints when a page is opened, and the service worker caches them with the artwork for 30 days",
      sk: "Detaily Pokémona sa načítajú z REST API PokéAPI až pri otvorení stránky a service worker ich spolu s ilustráciami uchová 30 dní",
    },
    {
      en: "A script refreshes the data snapshots from PokéAPI through GraphQL when new games come out",
      sk: "Skript obnoví dátové snímky z PokéAPI cez GraphQL, keď vyjdú nové hry",
    },
  ],
  changelog: [
    {
      en: "Vue CLI replaced by Vite",
      sk: "Vue CLI nahradil Vite",
    },
    {
      en: "Vue 3.2 to 3.5, Vue Router 4 to 5 and TypeScript 4.5 to 6",
      sk: "Vue 3.2 na 3.5, Vue Router 4 na 5 a TypeScript 4.5 na 6",
    },
    {
      en: "Axios and the pagination library removed",
      sk: "Odstránené Axios a knižnica na stránkovanie",
    },
    {
      en: "Docker replaced by GitHub Pages",
      sk: "Docker nahradili GitHub Pages",
    },
  ],
  versions: ["Vue 3.5", "Vue Router 5", "Vite 8", "TypeScript 6"],
  kind: "personal",
  areas: ["web"],
  year: 2024,
  until: 2026,
  stack: ["Vue", "TypeScript", "Vite", "PWA", "Vitest", "Playwright", "ESLint", "GitHub Pages"],
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
  gallery: [
    {
      src: "/images/projects/pokedex/pokemon.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Pokémon detail page with stats, types and evolutions",
        sk: "Detail Pokémona so štatistikami, typmi a evolúciami",
      },
      caption: {
        en: "Pokémon detail with stats, type matchups and the evolution chain.",
        sk: "Detail Pokémona so štatistikami, typovými výhodami a vývojovým reťazcom.",
      },
    },
    {
      src: "/images/projects/pokedex/browse-dark.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Grid of Pokémon cards in the dark theme",
        sk: "Mriežka kariet Pokémonov v tmavom režime",
      },
      caption: {
        en: "Browsing all 1025 Pokémon in the dark theme.",
        sk: "Prehliadanie všetkých 1025 Pokémonov v tmavom režime.",
      },
    },
    {
      src: "/images/projects/pokedex/team-builder.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Team builder with six Pokémon and an analysis of weaknesses and coverage",
        sk: "Skladač tímu so šiestimi Pokémonmi a rozborom slabín a pokrytia",
      },
      caption: {
        en: "Team builder: shared weaknesses, attack coverage and a table per attack type.",
        sk: "Skladač tímu: spoločné slabiny, pokrytie útokmi a tabuľka pre každý typ útoku.",
      },
    },
    {
      src: "/images/projects/pokedex/compare.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Venusaur, Charizard and Blastoise compared stat by stat",
        sk: "Venusaur, Charizard a Blastoise porovnaní podľa štatistík",
      },
      caption: {
        en: "Comparing up to three Pokémon, with the highest value in each row marked.",
        sk: "Porovnanie až troch Pokémonov, najvyššia hodnota v každom riadku je označená.",
      },
    },
    {
      src: "/images/projects/pokedex/quiz.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Black silhouette of a Pokémon with a field for the guess",
        sk: "Čierna silueta Pokémona s políčkom na tip",
      },
      caption: {
        en: "Who's that Pokémon? Wrong guesses unlock hints, and the best streak is saved.",
        sk: "Who's that Pokémon? Nesprávne tipy odomknú nápovedy a najlepšia séria sa uloží.",
      },
    },
    {
      src: "/images/projects/pokedex/move.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Flamethrower move page with power, accuracy and the Pokémon that learn it",
        sk: "Stránka útoku Flamethrower so silou, presnosťou a Pokémonmi, ktorí ho poznajú",
      },
      caption: {
        en: "Every move has its own page with its stats and the Pokémon that learn it.",
        sk: "Každý útok má vlastnú stránku so štatistikami a Pokémonmi, ktorí ho poznajú.",
      },
    },
  ],
  featured: true,
};
