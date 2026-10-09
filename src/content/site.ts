import type { FlagCode } from "@/components/ui/flags";
import type { Locale } from "@/i18n/routing";
import type { Text } from "./types";

export const site = {
  name: "Ákos Kappel",
  title: "Ing.",
  phone: "+421 918 727 886",
  headline: "Full-Stack Software Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-taupe-eta-51.vercel.app",
  email: "kappelakos@gmail.com",
  location: { en: "Bratislava, Slovakia", sk: "Bratislava, Slovensko" } satisfies Text,
  intro: {
    en: "Full-stack software engineer with years of experience in web and mobile development. I build software that is fast, accessible and easy to maintain.",
    sk: "Full-stack vývojár s viacročnou praxou vo vývoji webových a mobilných aplikácií. Tvorím softvér, ktorý je rýchly, prístupný a ľahko udržiavateľný.",
  } satisfies Text,
  about: [
    {
      id: "how-i-work",
      title: { en: "How I work", sk: "Ako pracujem" },
      paragraphs: [
        {
          en: "I work across the whole stack, from the database and the API to the interface people actually use. Before I write code I like to understand the problem and sketch the solution, and I leave tests behind so the next change is safe.",
          sk: "Pracujem naprieč celým stackom, od databázy a API až po rozhranie, ktoré ľudia naozaj používajú. Kým začnem programovať, chcem pochopiť problém a načrtnúť riešenie, a nechávam po sebe testy, aby bola ďalšia zmena bezpečná.",
        },
        {
          en: "AI coding agents make me much faster in my daily work. I plan the work, build it with their help and review every change, the same way I would review a colleague's code. I use Claude Code and Codex with my own agents, skills and MCP servers.",
          sk: "AI agenti na programovanie ma v každodennej práci výrazne zrýchľujú. Prácu naplánujem, s ich pomocou ju vytvorím a každú zmenu skontrolujem rovnako, ako by som kontroloval kód kolegu. Používam Claude Code a Codex s vlastnými agentmi, skills a MCP servermi.",
        },
      ],
    },
    {
      id: "what-i-enjoy",
      title: { en: "What I enjoy", sk: "Čo ma baví" },
      paragraphs: [
        {
          en: "The details users feel without noticing them: a page that loads faster than expected, search that understands a typo, a transition that shows where you came from, a form that works with the keyboard, an app that keeps working offline.",
          sk: "Detaily, ktoré používatelia cítia, aj keď si ich nevšimnú: stránka, ktorá sa načíta rýchlejšie, než čakali, vyhľadávanie, ktoré rozumie preklepu, prechod, ktorý ukáže, odkiaľ prišli, formulár, ktorý funguje s klávesnicou, aplikácia, ktorá funguje aj offline.",
        },
        {
          en: "I also like the work behind it: finding why a page is slow, putting an app into a container and onto a server, and making accessibility and SEO part of the build instead of an afterthought.",
          sk: "Baví ma aj práca za tým: zistiť, prečo je stránka pomalá, zabaliť aplikáciu do kontajnera a nasadiť ju na server, a robiť prístupnosť a SEO súčasťou vývoja, nie dodatočnou úlohou.",
        },
      ],
    },
    {
      id: "how-i-got-here",
      title: { en: "How I got here", sk: "Ako som sa sem dostal" },
      paragraphs: [
        {
          en: "I studied computer science at the Faculty of Informatics and Information Technologies in Bratislava and then intelligent software systems, where my master's thesis used neural networks to help detect glaucoma in eye images.",
          sk: "Študoval som informatiku na Fakulte informatiky a informačných technológií v Bratislave a potom inteligentné softvérové systémy, kde som v diplomovej práci použil neurónové siete na pomoc pri odhaľovaní glaukómu na snímkach oka.",
        },
        {
          en: "My first job was in Python, building data pipelines for a large e-shop, where I also learned Ruby for an automation task. Then I built a REST API and React app as a full-stack developer, and at IGT Systems I learned Elixir and Kotlin Multiplatform for new projects. Picking up a new stack when a project needs it has become a normal part of my work.",
          sk: "Prvá práca bola v Pythone, dátové pipeline pre veľký e-shop, kde som sa kvôli automatizácii naučil aj Ruby. Potom som ako full-stack vývojár robil REST API a aplikáciu v Reacte a v IGT Systems som sa pre nové projekty naučil Elixir a Kotlin Multiplatform. Naučiť sa nový stack, keď ho projekt potrebuje, je pre mňa bežná súčasť práce.",
        },
      ],
    },
    {
      id: "outside-work",
      title: { en: "Outside work", sk: "Mimo práce" },
      paragraphs: [
        {
          en: "I run my project demos on my own home server with Docker, Tailscale and monitoring, and their data resets every night. Every December I solve Advent of Code, each year in a different language. I do sports to balance the screen time, and I am relearning German.",
          sk: "Demá svojich projektov prevádzkujem na vlastnom domácom serveri s Dockerom, Tailscale a monitorovaním a ich dáta sa každú noc obnovujú. Každý december riešim Advent of Code, každý rok v inom jazyku. Športujem, aby som vyvážil čas pred obrazovkou, a znova sa učím nemčinu.",
        },
      ],
    },
  ] satisfies { id: string; title: Text; paragraphs: Text[] }[],
  availability: {
    en: "Open to remote roles in the EU and hybrid roles in Slovakia.",
    sk: "Otvorený pracovným ponukám na diaľku v rámci EÚ a hybridne na Slovensku.",
  } satisfies Text,
  links: {
    github: "https://github.com/AkosKappel",
    gitlab: "https://gitlab.com/AkosKappel",
    linkedin: "https://www.linkedin.com/in/%C3%A1kos-kappel-b53344220",
  },
  cv: [
    { locale: "en", href: "/CV_Akos_Kappel_(EN).pdf" },
    { locale: "sk", href: "/CV_Akos_Kappel_(SK).pdf" },
  ] satisfies { locale: Locale; href: string }[],
  languages: [
    {
      flag: "sk",
      name: { en: "Slovak", sk: "Slovenčina" },
      level: { en: "Native", sk: "Rodný jazyk" },
    },
    {
      flag: "hu",
      name: { en: "Hungarian", sk: "Maďarčina" },
      level: { en: "Fluent (C2)", sk: "Plynulo (C2)" },
    },
    {
      flag: "en",
      name: { en: "English", sk: "Angličtina" },
      level: { en: "Advanced (C1)", sk: "Pokročilý (C1)" },
    },
    {
      flag: "de",
      name: { en: "German", sk: "Nemčina" },
      level: { en: "Basic (A2)", sk: "Základy (A2)" },
    },
  ] satisfies { flag: FlagCode; name: Text; level: Text }[],
} as const;

/** Main navigation; labels come from the "nav" messages. */
export const navigation = [
  { href: "/projects", key: "projects" },
  { href: "/experience", key: "experience" },
  { href: "/skills", key: "skills" },
  { href: "/education", key: "education" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;
