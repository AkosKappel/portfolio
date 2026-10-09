import type { Locale } from "@/i18n/routing";
import type { Text } from "./types";

export const site = {
  name: "Ákos Kappel",
  title: "Ing.",
  headline: "Full-Stack Software Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-taupe-eta-51.vercel.app",
  email: "kappelakos@gmail.com",
  location: { en: "Bratislava, Slovakia", sk: "Bratislava, Slovensko" } satisfies Text,
  intro: {
    en: "Full-stack software engineer with three years of experience in web and mobile development. I build software that is fast, accessible and easy to maintain.",
    sk: "Full-stack vývojár s trojročnou praxou vo vývoji webových a mobilných aplikácií. Tvorím softvér, ktorý je rýchly, prístupný a ľahko udržiavateľný.",
  } satisfies Text,
  about: [
    {
      en: "I work across the whole stack, from the database and the API to the interface people actually use, and I learn new technologies quickly when a project needs them.",
      sk: "Pracujem naprieč celým stackom, od databázy a API až po rozhranie, ktoré ľudia naozaj používajú, a nové technológie sa učím rýchlo, keď ich projekt potrebuje.",
    },
    {
      en: "AI coding agents make me much faster in my daily work: I plan the work, build it with their help and review every change.",
      sk: "AI agenti na programovanie ma v každodennej práci výrazne zrýchľujú: prácu naplánujem, s ich pomocou ju vytvorím a každú zmenu skontrolujem.",
    },
  ] satisfies Text[],
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
    { name: { en: "Slovak", sk: "Slovenčina" }, level: { en: "Native", sk: "Rodný jazyk" } },
    {
      name: { en: "Hungarian", sk: "Maďarčina" },
      level: { en: "Fluent (C2)", sk: "Plynulo (C2)" },
    },
    {
      name: { en: "English", sk: "Angličtina" },
      level: { en: "Advanced (C1)", sk: "Pokročilý (C1)" },
    },
    { name: { en: "German", sk: "Nemčina" }, level: { en: "Basic (A2)", sk: "Základy (A2)" } },
  ] satisfies { name: Text; level: Text }[],
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
