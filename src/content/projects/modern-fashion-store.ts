import type { Project } from "../types";

export const modernFashionStore: Project = {
  slug: "modern-fashion-store",
  title: "Modern Fashion Store",
  summary: {
    en: "Inventory and sales dashboard for a clothing company, with live updates for everyone who has it open.",
    sk: "Dashboard skladu a predaja pre odevnú firmu so živými aktualizáciami pre každého, kto ho má otvorený.",
  },
  description: [
    {
      en: "It started in January 2025 as a take-home task in a job application: a stock dashboard for the manager of a clothing shop, in Elixir and Phoenix, a stack I had never used before. I finished both required tasks, all four optional ones and a bonus deployment.",
      sk: "Vznikol v januári 2025 ako zadanie pri pohovore: dashboard skladu pre manažéra obchodu s oblečením v Elixire a Phoenixe, teda v technológiách, ktoré som dovtedy nepoužil. Dokončil som obe povinné úlohy, všetky štyri voliteľné aj bonusové nasadenie.",
    },
    {
      en: 'In 2026 I upgraded it, reviewed its security and turned it into a public demo on my own server. Press "Try the demo" to log in; the data resets every night.',
      sk: "V roku 2026 som ho aktualizoval, skontroloval jeho bezpečnosť a spravil z neho verejné demo na vlastnom serveri. Prihlásite sa tlačidlom „Try the demo“ a dáta sa každú noc obnovia.",
    },
  ],
  highlights: [
    {
      en: "Live updates between users with Phoenix PubSub",
      sk: "Živé aktualizácie medzi používateľmi cez Phoenix PubSub",
    },
    {
      en: "Filters for inventory and transactions, bestseller statistics",
      sk: "Filtre skladu a transakcií, štatistiky predaja",
    },
    {
      en: "Demo login without a shared password, nightly data reset",
      sk: "Prihlásenie do dema bez zdieľaného hesla, nočný reset dát",
    },
    {
      en: "Self-hosted with Docker, nginx and Tailscale",
      sk: "Na vlastnom serveri s Dockerom, nginx a Tailscale",
    },
  ],
  features: [
    {
      en: "Create, edit and delete products with photos, prices, stock and several tags",
      sk: "Pridávanie, úprava a mazanie produktov s fotkami, cenami, zásobami a viacerými štítkami",
    },
    {
      en: "Combine filters by tags, price range and availability, search and sort; the filters stay in the URL",
      sk: "Kombinácia filtrov podľa štítkov, ceny a dostupnosti, vyhľadávanie a triedenie; filtre ostávajú v URL",
    },
    {
      en: "Open the dashboard in two windows and watch changes appear live in the other one",
      sk: "Otvorte dashboard v dvoch oknách a sledujte, ako sa zmeny hneď objavia v druhom",
    },
    {
      en: "Transactions grouped by month with a month picker and pagination",
      sk: "Transakcie po mesiacoch s výberom mesiaca a stránkovaním",
    },
    {
      en: "Statistics: this month compared with last month, a 12-month revenue chart, revenue by category and the top three bestsellers",
      sk: "Štatistiky: porovnanie s minulým mesiacom, graf tržieb za 12 mesiacov, tržby podľa kategórií a tri najpredávanejšie produkty",
    },
    {
      en: "Charts can be switched to a table for screen readers",
      sk: "Grafy sa dajú prepnúť na tabuľku pre čítačky obrazovky",
    },
  ],
  technical: [
    {
      en: "About 240 tests in 32 test files; a pre-commit check runs the compiler with warnings as errors, Credo, the Sobelow security scanner and the tests",
      sk: "Asi 240 testov v 32 súboroch; kontrola pred commitom spúšťa kompilátor s varovaniami ako chybami, Credo, bezpečnostný skener Sobelow a testy",
    },
    {
      en: "Security review in 2026: strict Content Security Policy, an allowlist for photo hosts, limits on WebSocket messages and inputs, server-side demo login with CSRF protection",
      sk: "Bezpečnostná kontrola v roku 2026: prísna Content Security Policy, povolené zdroje fotiek, limity WebSocket správ a vstupov, prihlásenie do dema na serveri s ochranou CSRF",
    },
    {
      en: "Built as a release in a multi-stage Docker image, behind nginx with security headers and rate limits, published through a Tailscale Funnel sidecar with health checks",
      sk: "Zostavený ako release vo viacstupňovom Docker image, za nginx s bezpečnostnými hlavičkami a limitmi požiadaviek, zverejnený cez Tailscale Funnel sidecar s kontrolou stavu",
    },
    {
      en: "View Transitions, screen reader announcements for live changes and support for reduced motion",
      sk: "View Transitions, oznamy pre čítačky obrazovky pri živých zmenách a podpora obmedzeného pohybu",
    },
  ],
  upgrade: {
    en: "Phoenix 1.7 to 1.8, LiveView 1.0 to 1.2 and Tailwind CSS 3 to 4. Unused libraries removed, and the demo data grew from 10 to 24 products with local photos and a year of sales.",
    sk: "Phoenix 1.7 na 1.8, LiveView 1.0 na 1.2 a Tailwind CSS 3 na 4. Nepoužívané knižnice som odstránil a demo dáta narástli z 10 na 24 produktov s vlastnými fotkami a rokom predajov.",
  },
  versions: ["Elixir 1.20", "Phoenix 1.8", "LiveView 1.2", "PostgreSQL 18", "Tailwind CSS 4"],
  kind: "personal",
  area: "web",
  year: 2025,
  until: 2026,
  stack: ["Elixir", "Phoenix LiveView", "PostgreSQL", "Tailwind CSS", "Docker", "nginx"],
  repoUrl: "https://github.com/AkosKappel/clothing-store",
  liveUrl: "https://tagline.tailb52c43.ts.net",
  image: {
    src: "/images/projects/clothing-store-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Product dashboard of the Modern Fashion Store with product photos, prices and stock",
      sk: "Dashboard produktov v Modern Fashion Store s fotkami, cenami a zásobami",
    },
  },
  featured: true,
};
