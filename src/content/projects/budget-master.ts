import type { Project } from "../types";

export const budgetMaster: Project = {
  slug: "budget-master",
  title: "BudgetMaster",
  summary: {
    en: "Money app for your phone: quick add, budgets that start on payday, reports and spaces shared with a partner.",
    sk: "Aplikácia na peniaze do mobilu: rýchle pridanie, rozpočty od výplaty, prehľady a priestory zdieľané s partnerom.",
  },
  description: [
    {
      en: "A personal finance app I started in 2024 on Next.js and MongoDB. Later I rebuilt it from scratch on TanStack Start and PostgreSQL, and it now runs as a live demo on my home server.",
      sk: "Aplikácia na osobné financie, ktorú som začal v roku 2024 na Next.js a MongoDB. Neskôr som ju od základu prerobil na TanStack Start a PostgreSQL a teraz beží ako živé demo na mojom domácom serveri.",
    },
    {
      en: "It answers three questions: where did my money go, how much can I still spend this month, and what is coming up. A couple can keep a shared household space while personal money stays personal. The demo gives every visitor a private copy of 14 months of sample data.",
      sk: "Odpovedá na tri otázky: kam išli moje peniaze, koľko ešte môžem minúť tento mesiac a čo ma čaká. Pár si môže viesť spoločný priestor domácnosti, pričom osobné peniaze zostanú osobné. Demo dá každému návštevníkovi súkromnú kópiu 14 mesiacov vzorových dát.",
    },
  ],
  features: [
    {
      en: 'Quick add in a few seconds, or a typed line like "coffee 3.20 cash yesterday"; known payees fill in their category',
      sk: "Rýchle pridanie za pár sekúnd alebo napísaný riadok ako „káva 3,20 hotovosť včera“; známi príjemcovia doplnia kategóriu",
    },
    {
      en: "Budgets per category with a month that can start on payday, rollover and a spending pace chart",
      sk: "Rozpočty podľa kategórií s mesiacom, ktorý môže začínať výplatou, prenosom zvyšku a grafom tempa míňania",
    },
    {
      en: "Recurring payments, savings goals, split receipts and a 90-day balance forecast",
      sk: "Pravidelné platby, ciele sporenia, rozdelené bločky a 90-dňová predpoveď zostatku",
    },
    {
      en: "Shared spaces with roles, who paid what and settle up, changes pushed live to other devices",
      sk: "Zdieľané priestory s rolami, kto čo platil a vyrovnanie, zmeny sa hneď zobrazia aj na iných zariadeniach",
    },
    {
      en: "Bank statement import from CSV with a review step, duplicate detection and undo",
      sk: "Import bankového výpisu z CSV s kontrolou, rozpoznaním duplicít a možnosťou vrátiť späť",
    },
    {
      en: "Reports: cash flow, net worth, spending calendar, monthly report and a year in review",
      sk: "Prehľady: peňažný tok, čistý majetok, kalendár výdavkov, mesačný prehľad a zhrnutie roka",
    },
    {
      en: "English, Hungarian and Slovak, installable on a phone, light and dark mode",
      sk: "Angličtina, maďarčina a slovenčina, inštalovateľná do mobilu, svetlý a tmavý režim",
    },
  ],
  technical: [
    {
      en: "Server functions with Zod validation and a membership check on every request; amounts stored as integer minor units",
      sk: "Serverové funkcie s validáciou cez Zod a kontrolou členstva pri každej požiadavke; sumy uložené ako celé čísla v najmenších jednotkách",
    },
    {
      en: "Better Auth with passkeys, two-step sign-in and social sign-in; strict Content Security Policy and CSRF checks",
      sk: "Better Auth s prístupovými kľúčmi, dvojstupňovým prihlásením a prihlásením cez sociálne siete; prísna Content Security Policy a ochrana proti CSRF",
    },
    {
      en: "Playwright tests with axe accessibility checks on desktop and mobile; Docker image built in GitHub Actions and deployed with nightly database backups",
      sk: "Playwright testy s kontrolou prístupnosti cez axe na desktope aj mobile; Docker image zostavený v GitHub Actions a nasadený s nočnými zálohami databázy",
    },
  ],
  changelog: [
    {
      en: "Rebuilt from scratch: Next.js and MongoDB replaced by TanStack Start and PostgreSQL with Drizzle",
      sk: "Prerobené od základu: Next.js a MongoDB nahradil TanStack Start a PostgreSQL s Drizzle",
    },
    {
      en: "Custom JWT auth replaced by Better Auth, Redux by TanStack Query and Zustand",
      sk: "Vlastné JWT prihlasovanie nahradil Better Auth, Redux nahradili TanStack Query a Zustand",
    },
    {
      en: "daisyUI replaced by Tailwind CSS 4 and shadcn/ui with a new design",
      sk: "daisyUI nahradil Tailwind CSS 4 a shadcn/ui s novým dizajnom",
    },
  ],
  versions: [
    "TanStack Start 1.169",
    "React 19.2",
    "PostgreSQL 18",
    "Tailwind CSS 4",
    "TypeScript 6",
  ],
  kind: "personal",
  areas: ["web"],
  year: 2024,
  until: 2026,
  stack: [
    "TanStack Start",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Better Auth",
    "TanStack Query",
    "Zustand",
    "Tailwind CSS",
    "shadcn/ui",
    "Recharts",
    "Paraglide",
    "Playwright",
    "Docker",
  ],
  repoUrl: "https://github.com/AkosKappel/BudgetMaster",
  liveUrl: "https://budgetmaster.tailb52c43.ts.net",
  image: {
    src: "/images/projects/budget-master-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "BudgetMaster home with what is left of the monthly budget and the spending pace",
      sk: "Úvodná stránka BudgetMaster so zvyškom mesačného rozpočtu a tempom míňania",
    },
  },
};
