import type { Job } from "./types";

/** Newest first. Dates are ISO months (YYYY-MM). */
export const jobs: Job[] = [
  {
    role: "Full-Stack Software Engineer",
    company: "IGT Systems",
    location: { en: "Bratislava, hybrid", sk: "Bratislava, hybridne" },
    start: "2025-02",
    summary: {
      en: "Web, mobile and backend work on several client products, in teams of two to eight developers.",
      sk: "Webové, mobilné a backendové projekty pre viacerých klientov v tímoch od dvoch do ôsmich vývojárov.",
    },
    items: [
      {
        name: "Core3",
        url: "https://www.core3.digital/",
        context: {
          en: "Business platform for projects, attendance, HR, CRM and ticketing",
          sk: "Firemná platforma pre projekty, dochádzku, HR, CRM a tikety",
        },
        highlights: [
          {
            en: "Responsible for the project management module: kanban boards, task permissions, Scrum and Waterfall workflows",
            sk: "Zodpovedný za modul projektového manažmentu: kanban, oprávnenia k úlohám, postupy Scrum a Waterfall",
          },
          {
            en: "Made the slowest pages fast by fixing N+1 database queries, adding caching and loading data in the background",
            sk: "Zrýchlil najpomalšie stránky opravou N+1 dopytov do databázy, cache a načítavaním dát na pozadí",
          },
          {
            en: "Loading skeletons and instant feedback while data is being saved",
            sk: "Skeleton načítanie a okamžitá odozva počas ukladania dát",
          },
        ],
        stack: ["Elixir", "Phoenix LiveView", "PostgreSQL", "MongoDB", "Cypress"],
      },
      {
        name: "WYDO",
        url: "https://wydo.sk/",
        context: {
          en: "App for finding sports activities and people to play with",
          sk: "Aplikácia na hľadanie športových aktivít a spoluhráčov",
        },
        highlights: [
          {
            en: "Started the Android and iOS app in Kotlin Multiplatform: map, search and filters, groups and chat",
            sk: "Začal aplikáciu pre Android a iOS v Kotlin Multiplatform: mapa, vyhľadávanie a filtre, skupiny a chat",
          },
          {
            en: "Built the promo site and then the React web app, with SEO and support for four languages",
            sk: "Vytvoril promo stránku a potom webovú aplikáciu v Reacte s SEO a podporou štyroch jazykov",
          },
          { en: "Backend features in Spring Boot", sk: "Funkcie backendu v Spring Boot" },
        ],
        stack: [
          "Kotlin",
          "Compose Multiplatform",
          "React",
          "TanStack",
          "Spring Boot",
          "Playwright",
        ],
      },
      {
        name: "CleanEEG",
        url: "https://cleaneeg.com/",
        context: {
          en: "Service that removes noise from EEG recordings",
          sk: "Služba, ktorá odstraňuje šum z EEG záznamov",
        },
        highlights: [
          {
            en: "Built the web app from scratch, including a WebGL viewer that compares raw and cleaned signals",
            sk: "Vytvoril webovú aplikáciu od nuly vrátane WebGL prehliadača pôvodných a vyčistených signálov",
          },
          {
            en: "Signup, billing, notifications and a file dashboard with drag-and-drop upload",
            sk: "Registrácia, platby, notifikácie a prehľad súborov s nahrávaním cez drag and drop",
          },
        ],
        stack: ["React", "TypeScript", "TanStack", "Plotly", "Tailwind CSS"],
      },
      {
        name: "Analytics dashboard",
        context: {
          en: "Data pipeline monitoring for a large enterprise client",
          sk: "Monitorovanie dátových procesov pre veľkého firemného klienta",
        },
        highlights: [
          {
            en: "Built the frontend from reusable parts, so a new section is a new route",
            sk: "Vytvoril frontend zo znovupoužiteľných častí, takže nová sekcia je len nová routa",
          },
        ],
        stack: ["React", "TypeScript", "TanStack Query", "Zod"],
      },
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Švarba s.r.o.",
    location: { en: "remote", sk: "na diaľku" },
    start: "2024-06",
    end: "2025-01",
    summary: {
      en: "A new back office for an international direct-sales company.",
      sk: "Nový back office pre medzinárodnú firmu s priamym predajom.",
    },
    items: [
      {
        name: "Back office",
        context: { en: "React app and REST API", sk: "Aplikácia v Reacte a REST API" },
        highlights: [
          {
            en: "Built the REST API behind a new React back office that replaced several older PHP applications",
            sk: "Vytvoril REST API pre nový back office v Reacte, ktorý nahradil niekoľko starších PHP aplikácií",
          },
          {
            en: "Real-time notifications, scheduled imports and exports, translations with the OpenAI API, automated tests",
            sk: "Notifikácie v reálnom čase, plánované importy a exporty, preklady cez OpenAI API, automatické testy",
          },
          {
            en: "Maintained the older PHP system: reports, data grids and SQL",
            sk: "Údržba staršieho PHP systému: reporty, tabuľky a SQL",
          },
        ],
        stack: [
          "TypeScript",
          "Node.js",
          "Express",
          "React",
          "MSSQL",
          "Redis",
          "Jest",
          "PHP",
          "Nette",
        ],
      },
    ],
  },
  {
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
        name: "Supplier data",
        context: { en: "Python and Airflow", sk: "Python a Airflow" },
        highlights: [
          {
            en: "Built data pipelines that import products, prices and stock from more than 20 suppliers",
            sk: "Vytvoril dátové pipeline na import produktov, cien a zásob od viac ako 20 dodávateľov",
          },
          {
            en: "Automated ordering on 20 supplier web shops with headless-browser scripts in Ruby, a language I learned for this",
            sk: "Automatizoval objednávanie v 20 e-shopoch dodávateľov skriptmi v Ruby, ktoré som sa kvôli tomu naučil",
          },
        ],
        stack: ["Python", "Airflow", "pandas", "Selenium", "Ruby", "PostgreSQL", "FastAPI"],
      },
    ],
  },
];
