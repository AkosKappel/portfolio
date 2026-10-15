import type { Project } from "../types";

export const budgetMaster: Project = {
  slug: "budget-master",
  title: "Budget Master",
  summary: {
    en: "Personal finance app with a transaction history, filters and charts of monthly spending.",
    sk: "Aplikácia na osobné financie s históriou transakcií, filtrami a grafmi mesačných výdavkov.",
  },
  description: [
    {
      en: "A personal full-stack app from 2024 for tracking income and expenses. It covers the whole Next.js App Router stack in one project: authentication, a database, validated forms and client-side data fetching.",
      sk: "Osobná full-stack aplikácia z roku 2024 na sledovanie príjmov a výdavkov. Pokrýva celý Next.js App Router v jednom projekte: prihlasovanie, databázu, validované formuláre a načítavanie dát na klientovi.",
    },
    {
      en: "Every transaction has an amount, a date and labels. The dashboard sums up the current month, the history page filters and searches all transactions, and six charts show where the money goes over time. A demo account lets visitors try it without signing up. It has not been upgraded yet.",
      sk: "Každá transakcia má sumu, dátum a štítky. Prehľad zhŕňa aktuálny mesiac, stránka s históriou filtruje a prehľadáva všetky transakcie a šesť grafov ukazuje, kam idú peniaze v čase. Demo účet umožňuje vyskúšať aplikáciu bez registrácie. Zatiaľ nebola aktualizovaná.",
    },
  ],
  features: [
    {
      en: "Sign up, or log in with a demo account",
      sk: "Registrácia alebo prihlásenie cez demo účet",
    },
    {
      en: "Dashboard with recent transactions and the month's cash flow",
      sk: "Prehľad s poslednými transakciami a mesačným cash flow",
    },
    {
      en: "Transaction history with filters for date and amount, labels and fuzzy search",
      sk: "História transakcií s filtrami podľa dátumu a sumy, štítkami a fuzzy vyhľadávaním",
    },
    {
      en: "Six charts: income against expenses, totals, balance trend and spending by label",
      sk: "Šesť grafov: príjmy oproti výdavkom, súčty, vývoj zostatku a výdavky podľa štítkov",
    },
  ],
  technical: [
    {
      en: "Next.js App Router with protected routes and an encrypted session cookie, passwords hashed with bcrypt",
      sk: "Next.js App Router s chránenými routami a šifrovaným session cookie, heslá hashované cez bcrypt",
    },
    {
      en: "MongoDB with Mongoose, forms with React Hook Form and Zod, data with TanStack Query and Redux Toolkit",
      sk: "MongoDB s Mongoose, formuláre cez React Hook Form a Zod, dáta cez TanStack Query a Redux Toolkit",
    },
  ],
  versions: ["Next.js 15", "React 19", "MongoDB", "Tailwind CSS 3"],
  kind: "personal",
  areas: ["web"],
  year: 2024,
  until: 2025,
  stack: [
    "Next.js",
    "TypeScript",
    "MongoDB",
    "Mongoose",
    "Redux",
    "React Query",
    "React Hook Form",
    "Zod",
    "Tailwind CSS",
    "daisyUI",
  ],
  repoUrl: "https://github.com/AkosKappel/BudgetMaster",
  image: {
    src: "/images/projects/budget-master.webp",
    width: 1600,
    height: 1248,
    alt: {
      en: "Budget Master transaction table with filters",
      sk: "Tabuľka transakcií v Budget Master s filtrami",
    },
  },
};
