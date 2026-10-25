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
      en: 'Later I upgraded it, reviewed its security and turned it into a public demo on my own server. Press "Try the demo" to log in; the data resets every night.',
      sk: "Neskôr som ho aktualizoval, skontroloval jeho bezpečnosť a spravil z neho verejné demo na vlastnom serveri. Prihlásite sa tlačidlom „Try the demo“ a dáta sa každú noc obnovia.",
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
    {
      en: "Sizes and colours with their own stock, and discounts planned for a date range with a sale badge and price history",
      sk: "Veľkosti a farby s vlastnými zásobami a zľavy naplánované na obdobie so značkou výpredaja a históriou cien",
    },
    {
      en: "Edit history with versions you can restore, and Undo for a few minutes after deleting a product",
      sk: "História úprav s verziami, ktoré sa dajú obnoviť, a možnosť vrátiť zmazaný produkt ešte niekoľko minút",
    },
    {
      en: "An activity feed of edits, restocks and sales; a simulated customer buys something every few minutes",
      sk: "Prehľad aktivity s úpravami, doplneniami zásob a predajmi; simulovaný zákazník každých pár minút niečo kúpi",
    },
    {
      en: "See how many visitors are online, with a warning when someone else is editing the same product",
      sk: "Počet ľudí online a upozornenie, keď ten istý produkt práve upravuje niekto iný",
    },
    {
      en: "CSV import that checks every row before saving anything, CSV export of the inventory and transactions",
      sk: "Import z CSV, ktorý skontroluje každý riadok skôr, než niečo uloží, a export skladu aj transakcií do CSV",
    },
    {
      en: "A printable shelf label with a QR code for every product",
      sk: "Štítok na regál s QR kódom pre každý produkt",
    },
    {
      en: "Ctrl+K command palette, dark mode, English, German and Slovak, and installable as an app",
      sk: "Príkazová paleta cez Ctrl+K, tmavý režim, angličtina, nemčina a slovenčina a inštalácia ako aplikácia",
    },
  ],
  technical: [
    {
      en: "About 320 tests in 46 test files; a pre-commit check runs the compiler with warnings as errors, Credo, the Sobelow security scanner and the tests",
      sk: "Asi 320 testov v 46 súboroch; kontrola pred commitom spúšťa kompilátor s varovaniami ako chybami, Credo, bezpečnostný skener Sobelow a testy",
    },
    {
      en: "GitHub Actions also runs Dialyzer, builds the release image, scans it with Trivy and publishes it to GHCR; the server only pulls and runs that image",
      sk: "GitHub Actions spúšťa aj Dialyzer, zostaví release image, preskenuje ho nástrojom Trivy a nahrá do GHCR; server tento image len stiahne a spustí",
    },
    {
      en: "Write requests rate-limited in nginx, an atomic cap on the number of products, Erlang distribution bound to localhost and an optional database role without superuser rights",
      sk: "Obmedzený počet zapisovacích požiadaviek v nginx, atomický limit počtu produktov, Erlang distribúcia viazaná na localhost a voliteľná databázová rola bez práv superusera",
    },
    {
      en: "Security review: strict Content Security Policy, an allowlist for photo hosts, limits on WebSocket messages and inputs, server-side demo login with CSRF protection",
      sk: "Bezpečnostná kontrola: prísna Content Security Policy, povolené zdroje fotiek, limity WebSocket správ a vstupov, prihlásenie do dema na serveri s ochranou CSRF",
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
  changelog: [
    {
      en: "Phoenix 1.7 to 1.8 and LiveView 1.0 to 1.2",
      sk: "Phoenix 1.7 na 1.8 a LiveView 1.0 na 1.2",
    },
    {
      en: "Tailwind CSS 3 to 4",
      sk: "Tailwind CSS 3 na 4",
    },
    {
      en: "Unused libraries removed",
      sk: "Odstránené nepoužívané knižnice",
    },
    {
      en: "Demo data grew from 10 to 34 products with local photos and a year of sales",
      sk: "Demo dáta narástli z 10 na 34 produktov s vlastnými fotkami a rokom predajov",
    },
  ],
  versions: ["Elixir 1.20", "Phoenix 1.8", "LiveView 1.2", "PostgreSQL 18", "Tailwind CSS 4"],
  kind: "personal",
  areas: ["web"],
  year: 2025,
  until: 2026,
  stack: [
    "Elixir",
    "Phoenix LiveView",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
    "nginx",
    "Tailscale",
  ],
  repoUrl: "https://github.com/AkosKappel/clothing-store",
  liveUrl: "https://tagline.tailb52c43.ts.net",
  image: {
    src: "/images/projects/modern-fashion-store-dashboard-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Product dashboard of the Modern Fashion Store with product photos, prices and stock",
      sk: "Dashboard produktov v Modern Fashion Store s fotkami, cenami a zásobami",
    },
  },
  architecture: [
    {
      name: { en: "Browser", sk: "Prehliadač" },
      detail: {
        en: "Pages update live over a LiveView WebSocket",
        sk: "Stránky sa menia naživo cez WebSocket LiveView",
      },
    },
    {
      name: { en: "Tailscale Funnel", sk: "Tailscale Funnel" },
      detail: {
        en: "Public HTTPS from a sidecar container",
        sk: "Verejné HTTPS zo sidecar kontajnera",
      },
    },
    {
      name: { en: "nginx", sk: "nginx" },
      detail: {
        en: "Security headers and rate limits",
        sk: "Bezpečnostné hlavičky a obmedzenie počtu požiadaviek",
      },
    },
    {
      name: { en: "Phoenix LiveView", sk: "Phoenix LiveView" },
      detail: {
        en: "Elixir release; PubSub sends every change to all open pages",
        sk: "Elixir release; PubSub posiela každú zmenu všetkým otvoreným stránkam",
      },
    },
    {
      name: { en: "PostgreSQL", sk: "PostgreSQL" },
      detail: {
        en: "Products, stock and sales",
        sk: "Produkty, zásoby a predaje",
      },
    },
  ],
  gallery: [
    {
      src: "/images/projects/modern-fashion-store/inventory.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Inventory table filtered by the winter tag, with product photos, categories, prices and stock badges",
        sk: "Tabuľka skladu filtrovaná podľa štítku winter, s fotkami produktov, kategóriami, cenami a stavom zásob",
      },
      caption: {
        en: "Inventory filtered by a tag, with sale prices and low or empty stock marked.",
        sk: "Sklad filtrovaný podľa štítku, so zľavnenými cenami a označenými nízkymi alebo minutými zásobami.",
      },
    },
    {
      src: "/images/projects/modern-fashion-store/product-drawer.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Product details of a trench coat in a side drawer over the inventory, with a 20 % discount and stock per size",
        sk: "Detail trenčkotu v bočnom paneli nad skladom, so zľavou 20 % a zásobami podľa veľkostí",
      },
      caption: {
        en: "A product opens in a side drawer that has its own link.",
        sk: "Produkt sa otvorí v bočnom paneli, ktorý má vlastný odkaz.",
      },
    },
    {
      src: "/images/projects/modern-fashion-store/product-dark.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Product page of slim fit jeans in the dark theme with stock per size, a sales forecast and a QR code",
        sk: "Stránka produktu džínsov v tmavom režime so zásobami podľa veľkostí, odhadom predaja a QR kódom",
      },
      caption: {
        en: "Product page in the dark theme: stock per size, recent sales and a QR code for the shelf.",
        sk: "Stránka produktu v tmavom režime: zásoby podľa veľkostí, nedávne predaje a QR kód na regál.",
      },
    },
    {
      src: "/images/projects/modern-fashion-store/shelf-label.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Printable shelf label with the product name, price, category and a QR code",
        sk: "Štítok na regál na tlač s názvom produktu, cenou, kategóriou a QR kódom",
      },
      caption: {
        en: "A printable shelf label; the QR code opens the product on a phone.",
        sk: "Štítok na regál na tlač; QR kód otvorí produkt v mobile.",
      },
    },
    {
      src: "/images/projects/modern-fashion-store/transactions.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Transactions page with a month picker, sales totals and sales grouped by month",
        sk: "Stránka transakcií s výberom mesiaca, súčtami predaja a predajmi zoskupenými po mesiacoch",
      },
      caption: {
        en: "Transactions grouped by month, with totals and CSV export.",
        sk: "Transakcie zoskupené po mesiacoch, so súčtami a exportom do CSV.",
      },
    },
    {
      src: "/images/projects/modern-fashion-store/statistics.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Sales statistics with monthly revenue bars and a revenue-by-category donut chart",
        sk: "Štatistiky predaja so stĺpcami mesačných tržieb a koláčovým grafom tržieb podľa kategórií",
      },
      caption: {
        en: "Statistics: revenue per month and per category, stock warnings and bestsellers.",
        sk: "Štatistiky: tržby za mesiac a podľa kategórie, upozornenia na zásoby a najpredávanejšie produkty.",
      },
    },
  ],
  featured: true,
};
