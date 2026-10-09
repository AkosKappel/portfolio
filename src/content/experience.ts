import type { Job, Text } from "./types";

const same = (name: string): Text => ({ en: name, sk: name });

/** Newest first. Dates are ISO months (YYYY-MM). */
export const jobs: Job[] = [
  {
    id: "igt-systems",
    role: "Full-Stack Software Engineer",
    company: "IGT Systems",
    companyNote: { en: "formerly IGT Consulting", sk: "predtým IGT Consulting" },
    location: { en: "Bratislava, hybrid", sk: "Bratislava, hybridne" },
    start: "2025-02",
    summary: {
      en: "I work on several client products at once, in teams of two to eight developers, across web, mobile and backend. I joined as an Elixir developer and now work mostly with React, TypeScript and Kotlin.",
      sk: "Pracujem na viacerých produktoch pre klientov naraz, v tímoch od dvoch do ôsmich vývojárov, naprieč webom, mobilom aj backendom. Nastúpil som ako vývojár v Elixire a dnes pracujem hlavne s Reactom, TypeScriptom a Kotlinom.",
    },
    items: [
      {
        id: "core3",
        name: same("Core3"),
        url: "https://www.core3.digital/",
        context: {
          en: "Business platform for projects, attendance, HR, CRM and ticketing",
          sk: "Firemná platforma pre projekty, dochádzku, HR, CRM a tikety",
        },
        highlights: [
          {
            en: "Responsible for the project management module: kanban boards with drag and drop, task permissions for creators, assignees and project leads, and Scrum and Waterfall workflows",
            sk: "Zodpovedný za modul projektového manažmentu: kanban s drag and drop, oprávnenia k úlohám pre autorov, riešiteľov a vedúcich projektov, postupy Scrum a Waterfall",
          },
          {
            en: "Optimized the slowest pages after user complaints: found the slow parts with flame graphs, fixed N+1 queries in PostgreSQL and MongoDB, and added caching with proper invalidation",
            sk: "Optimalizoval najpomalšie stránky po sťažnostiach používateľov: pomalé miesta som našiel cez flame grafy, opravil N+1 dopyty v PostgreSQL a MongoDB a pridal cache so správnou invalidáciou",
          },
          {
            en: "Async data loading with infinite scroll, documented as a shared pattern for the team",
            sk: "Asynchrónne načítavanie dát s nekonečným scrollovaním, zdokumentované ako spoločný vzor pre tím",
          },
          {
            en: "Real-time updates through one shared PubSub, ordered so that older messages never overwrite newer ones",
            sk: "Aktualizácie v reálnom čase cez jeden spoločný PubSub, zoradené tak, aby staršie správy neprepisovali novšie",
          },
          {
            en: "Loading skeletons, optimistic UI and type-safe URL parameters across several modules",
            sk: "Skeleton načítanie, optimistické UI a typovo bezpečné URL parametre vo viacerých moduloch",
          },
          { en: "End-to-end tests in Cypress", sk: "End-to-end testy v Cypress" },
        ],
        stack: ["Elixir", "Phoenix LiveView", "PostgreSQL", "MongoDB", "JavaScript", "Cypress"],
      },
      {
        id: "wydo",
        name: same("WYDO"),
        url: "https://wydo.sk/",
        context: {
          en: "App for finding sports activities and people to play with",
          sk: "Aplikácia na hľadanie športových aktivít a spoluhráčov",
        },
        highlights: [
          {
            en: "Started the Android and iOS app in Kotlin Multiplatform: a map that clusters activities and loads them as you move, search and filters, groups with posts and comments, ratings and chat over WebSockets",
            sk: "Začal aplikáciu pre Android a iOS v Kotlin Multiplatform: mapa, ktorá zhlukuje aktivity a načítava ich pri posune, vyhľadávanie a filtre, skupiny s príspevkami a komentármi, hodnotenia a chat cez WebSockety",
          },
          {
            en: "Built the promo site and then moved the web version from Kotlin Multiplatform to its own React app",
            sk: "Vytvoril promo stránku a potom presunul webovú verziu z Kotlin Multiplatform do samostatnej aplikácie v Reacte",
          },
          {
            en: "Web app with virtualized feeds, push notifications, passkey login, per-page SEO and installable PWA support",
            sk: "Webová aplikácia s virtualizovanými feedmi, push notifikáciami, prihlásením cez passkey, SEO pre každú stránku a inštalovateľnou PWA",
          },
          {
            en: "Four languages in the app and on the web, with tests that keep the translations in sync",
            sk: "Štyri jazyky v aplikácii aj na webe, s testami, ktoré strážia úplnosť prekladov",
          },
          {
            en: "Backend features in Spring Boot, including passkeys (WebAuthn) and translated error messages",
            sk: "Funkcie backendu v Spring Boot vrátane passkeys (WebAuthn) a preložených chybových hlásení",
          },
        ],
        stack: [
          "Kotlin",
          "Compose Multiplatform",
          "Ktor",
          "React",
          "TypeScript",
          "TanStack",
          "Spring Boot",
          "Vitest",
          "Playwright",
        ],
      },
      {
        id: "cleaneeg",
        name: same("CleanEEG"),
        url: "https://cleaneeg.com/",
        context: {
          en: "Service that removes noise from EEG recordings",
          sk: "Služba, ktorá odstraňuje šum z EEG záznamov",
        },
        highlights: [
          {
            en: "Built the web app from scratch in a team of two",
            sk: "Vytvoril webovú aplikáciu od nuly v tíme dvoch ľudí",
          },
          {
            en: "A fast WebGL viewer that shows raw and cleaned signals over each other, side by side or as their difference, with signal filters running in the browser and full keyboard control",
            sk: "Rýchly WebGL prehliadač, ktorý zobrazí pôvodný a vyčistený signál cez seba, samostatne alebo ich rozdiel, s filtrami signálu priamo v prehliadači a ovládaním klávesnicou",
          },
          {
            en: "Signup, pricing, billing, notifications and a file dashboard with drag-and-drop upload",
            sk: "Registrácia, cenník, platby, notifikácie a prehľad súborov s nahrávaním cez drag and drop",
          },
          {
            en: "TanStack Router, Query, Form, Table and Virtual throughout the app",
            sk: "TanStack Router, Query, Form, Table a Virtual v celej aplikácii",
          },
        ],
        stack: ["React", "TypeScript", "TanStack", "Plotly", "Tailwind CSS", "Zod"],
      },
      {
        id: "bdap",
        name: same("Business Data Access Point (BDAP)"),
        context: {
          en: "Internal dashboard for monitoring data pipelines of a large enterprise client",
          sk: "Interný dashboard na monitorovanie dátových procesov veľkého firemného klienta",
        },
        highlights: [
          {
            en: "Built the frontend from reusable parts, so a new section is just a new route",
            sk: "Vytvoril frontend zo znovupoužiteľných častí, takže nová sekcia je len nová routa",
          },
          {
            en: "A generic, typed data grid with nested rows, sorting and resizable columns",
            sk: "Generická typovaná tabuľka s vnorenými riadkami, triedením a meniteľnou šírkou stĺpcov",
          },
          {
            en: "Filters, sorting and pagination kept in the URL, and a read-only mode based on user roles",
            sk: "Filtre, triedenie a stránkovanie uložené v URL a režim len na čítanie podľa rolí používateľov",
          },
        ],
        stack: ["React", "TypeScript", "TanStack Query", "Zod", "Tailwind CSS"],
      },
    ],
  },
  {
    id: "svarba",
    role: "Full-Stack Developer",
    company: "Švarba s.r.o.",
    location: { en: "remote", sk: "na diaľku" },
    start: "2024-06",
    end: "2025-01",
    summary: {
      en: "A new internal system for an international direct-sales company, replacing several older PHP applications with a React web app and a new API.",
      sk: "Nový interný systém pre medzinárodnú firmu s priamym predajom, ktorý nahradil niekoľko starších PHP aplikácií novou webovou aplikáciou v Reacte a novým API.",
    },
    items: [
      {
        id: "svarba-api",
        name: { en: "REST API", sk: "REST API" },
        context: { en: "TypeScript, Node.js and Express", sk: "TypeScript, Node.js a Express" },
        highlights: [
          {
            en: "Developed the REST API of the new system, with generated OpenAPI documentation and request validation",
            sk: "Vyvinul REST API nového systému s generovanou OpenAPI dokumentáciou a validáciou požiadaviek",
          },
          {
            en: "MSSQL with stored procedures, JWT login with refresh tokens and password reset by e-mail",
            sk: "MSSQL s uloženými procedúrami, prihlásenie cez JWT s obnovou tokenov a reset hesla e-mailom",
          },
          {
            en: "Real-time notifications over WebSockets and Redis, and scheduled jobs for e-mails, imports and exports",
            sk: "Notifikácie v reálnom čase cez WebSockety a Redis a plánované úlohy pre e-maily, importy a exporty",
          },
          {
            en: "Automatic translations of product texts with the OpenAI API",
            sk: "Automatické preklady produktových textov cez OpenAI API",
          },
          {
            en: "Unit and integration tests with Jest and supertest",
            sk: "Unit a integračné testy v Jest a supertest",
          },
        ],
        stack: ["TypeScript", "Node.js", "Express", "MSSQL", "Redis", "Jest"],
      },
      {
        id: "svarba-web",
        name: { en: "Web app and older system", sk: "Webová aplikácia a starší systém" },
        context: { en: "React, PHP and Nette", sk: "React, PHP a Nette" },
        highlights: [
          {
            en: "Forms and screens in the new React app",
            sk: "Formuláre a obrazovky v novej aplikácii v Reacte",
          },
          {
            en: "Reports, data grids and SQL in the older PHP system while it was still in use",
            sk: "Reporty, tabuľky a SQL v staršom PHP systéme, kým sa ešte používal",
          },
        ],
        stack: ["React", "PHP", "Nette"],
      },
    ],
  },
  {
    id: "softpoint",
    role: "Junior Python Developer",
    company: "SoftPoint s.r.o.",
    location: { en: "Bratislava, hybrid", sk: "Bratislava, hybridne" },
    start: "2023-10",
    end: "2024-05",
    summary: {
      en: "Data integration and automation for a large e-commerce retailer.",
      sk: "Integrácia dát a automatizácia pre veľký e-shop.",
    },
    items: [
      {
        id: "softpoint-etl",
        name: { en: "ETL pipelines", sk: "ETL pipeline" },
        context: { en: "Python and Airflow", sk: "Python a Airflow" },
        highlights: [
          {
            en: "Built ETL pipelines in Airflow that import products, prices and stock from more than 20 suppliers into the data warehouse",
            sk: "Vytvoril ETL pipeline v Airflow, ktoré importujú produkty, ceny a zásoby od viac ako 20 dodávateľov do dátového skladu",
          },
          {
            en: "Sources ranged from supplier websites and APIs to XML, XLSX and FTP feeds; some needed Selenium to log in to B2B portals",
            sk: "Zdroje siahali od webov a API dodávateľov po XML, XLSX a FTP feedy; niektoré si vyžadovali prihlásenie do B2B portálov cez Selenium",
          },
          {
            en: "Cleaned and matched the data with pandas, for example normalizing EAN codes and removing duplicates",
            sk: "Dáta som čistil a pároval v pandas, napríklad normalizácia EAN kódov a odstránenie duplicít",
          },
        ],
        stack: ["Python", "Airflow", "pandas", "Selenium", "PostgreSQL", "FastAPI"],
      },
      {
        id: "softpoint-orders",
        name: { en: "Order automation", sk: "Automatizácia objednávok" },
        context: { en: "Ruby", sk: "Ruby" },
        highlights: [
          {
            en: "Automated ordering on 20 supplier web shops with headless-browser scripts in Ruby, a language I learned for this task",
            sk: "Automatizoval objednávanie v 20 e-shopoch dodávateľov skriptmi v Ruby cez headless prehliadač; Ruby som sa kvôli tomu naučil",
          },
        ],
        stack: ["Ruby"],
      },
    ],
  },
];
