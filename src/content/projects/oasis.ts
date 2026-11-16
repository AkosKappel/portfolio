import type { Project } from "../types";

export const oasis: Project = {
  slug: "oasis",
  title: "Oasis",
  summary: {
    en: "A browser extension that turns the new tab into a calm dashboard and a bookmark library, with everything stored on your device.",
    sk: "Rozšírenie prehliadača, ktoré z novej karty urobí pokojný panel a knižnicu záložiek, pričom všetko zostáva vo vašom zariadení.",
  },
  description: [
    {
      en: "I collect a lot of links, and the browser's own bookmarks never kept up: no tags, no notes, weak search. Oasis replaces the new tab with a quiet home (a clock, a background and a search field) and puts a proper bookmark library one click away.",
      sk: "Zbieram veľa odkazov a záložky v prehliadači mi nikdy nestačili: žiadne štítky, žiadne poznámky, slabé vyhľadávanie. Oasis nahradí novú kartu tichou domovskou stránkou (hodiny, pozadie a vyhľadávanie) a skutočnú knižnicu záložiek dá na jedno kliknutie.",
    },
    {
      en: "In the library, bookmarks live in nested folders with coloured tags, favourites and plain-text notes. Search forgives typos and understands filters like tag:, folder: and domain:, and a search can be saved as its own smart collection. Separate spaces keep work, learning and personal links apart.",
      sk: "V knižnici sú záložky vo vnorených priečinkoch s farebnými štítkami, obľúbenými a textovými poznámkami. Vyhľadávanie odpustí preklepy a rozumie filtrom ako tag:, folder: a domain:, a hľadanie sa dá uložiť ako vlastná inteligentná kolekcia. Samostatné priestory oddelia pracovné, študijné a osobné odkazy.",
    },
    {
      en: "Privacy shaped the design. There is no account, backend or analytics: everything sits in IndexedDB in the browser profile. Optional extras such as weather or reading a page's description ask for permission first, and opening counts stay off until you switch them on.",
      sk: "Dizajn formovalo súkromie. Nie je tu účet, backend ani analytika: všetko je v IndexedDB v profile prehliadača. Voliteľné doplnky, ako počasie alebo načítanie popisu stránky, si najprv vypýtajú povolenie a počítanie otvorení je vypnuté, kým ho nezapnete.",
    },
  ],
  features: [
    {
      en: "A minimal new tab with a clock, a bookmark search and illustrated backgrounds, or your own photo albums and daily quotes",
      sk: "Minimalistická nová karta s hodinami, vyhľadávaním v záložkách a ilustrovanými pozadiami alebo vlastnými albumami fotiek a citátmi na každý deň",
    },
    {
      en: "Save a page from the toolbar, the context menu or a keyboard shortcut",
      sk: "Uloženie stránky z panela nástrojov, kontextového menu alebo klávesovou skratkou",
    },
    {
      en: "Nested folders, coloured tags, favourites, notes, grid and list views, drag and drop with keyboard alternatives",
      sk: "Vnorené priečinky, farebné štítky, obľúbené, poznámky, zobrazenie v mriežke aj zozname, presúvanie ťahaním aj klávesnicou",
    },
    {
      en: "Typo-tolerant search with filters, saved searches as smart collections, and a Ctrl+K command palette",
      sk: "Vyhľadávanie tolerantné k preklepom s filtrami, uložené hľadania ako inteligentné kolekcie a príkazová paleta cez Ctrl+K",
    },
    {
      en: "Separate spaces with their own layout, tag suggestions from your other bookmarks on the same site, and a duplicate review",
      sk: "Samostatné priestory s vlastným rozložením, návrhy štítkov z vašich ďalších záložiek na tej istej stránke a kontrola duplicít",
    },
    {
      en: "Optional widgets: daily focus, focus timer, world clocks, countdowns, notes, task lists and weather",
      sk: "Voliteľné widgety: denný cieľ, časovač sústredenia, svetové hodiny, odpočty, poznámky, zoznamy úloh a počasie",
    },
    {
      en: "Import and export of browser bookmarks, full backups per space, undo and a trash for removed items",
      sk: "Import a export záložiek prehliadača, úplné zálohy každého priestoru, vrátenie zmien a kôš pre odstránené položky",
    },
    {
      en: "Light, dark or system theme with custom colours that keep text readable",
      sk: "Svetlá, tmavá alebo systémová téma s vlastnými farbami, pri ktorých zostane text čitateľný",
    },
  ],
  technical: [
    {
      en: "Manifest V3 extension built with WXT and React; separate entry points for the new tab and the toolbar popup",
      sk: "Rozšírenie Manifest V3 postavené na WXT a Reacte; samostatné vstupné body pre novú kartu a okno v paneli nástrojov",
    },
    {
      en: "Dexie over IndexedDB, with every write in a transaction that checks which space owns the record; deletion is soft, so a later sync can see it",
      sk: "Dexie nad IndexedDB, každý zápis v transakcii, ktorá overí, ktorému priestoru záznam patrí; mazanie je mäkké, aby ho neskoršia synchronizácia videla",
    },
    {
      en: "No permissions until a feature needs one, each recorded with its reason; bookmark URLs are validated and embedded credentials rejected",
      sk: "Žiadne povolenia, kým ich funkcia nepotrebuje, každé zapísané s dôvodom; adresy záložiek sa overujú a vložené prihlasovacie údaje sa odmietnu",
    },
    {
      en: "Vitest tests for the repositories, filters and migrations, and Playwright tests against the built extension with axe accessibility scans",
      sk: "Vitest testy pre repozitáre, filtre a migrácie a Playwright testy nad zostaveným rozšírením s kontrolou prístupnosti cez axe",
    },
  ],
  versions: ["WXT 0.21", "React 19.3", "Tailwind CSS 4", "TypeScript 6"],
  kind: "personal",
  areas: ["web"],
  year: 2026,
  stack: [
    "WXT",
    "React",
    "TypeScript",
    "Dexie.js",
    "Tailwind CSS",
    "shadcn/ui",
    "Vitest",
    "Playwright",
  ],
  repoUrl: "https://github.com/AkosKappel/Oasis",
  image: {
    src: "/images/projects/oasis-2026.webp",
    width: 1280,
    height: 800,
    alt: {
      en: "The Oasis new tab: a large clock, the date and a bookmark search over an illustrated mountain landscape",
      sk: "Nová karta Oasis: veľké hodiny, dátum a vyhľadávanie v záložkách nad ilustrovanou horskou krajinou",
    },
  },
  gallery: [
    {
      src: "/images/projects/oasis/links.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "The Links panel open over the new tab, with favourites and folders",
        sk: "Panel odkazov otvorený nad novou kartou s obľúbenými a priečinkami",
      },
      caption: {
        en: "Links open on demand from the side, and can stay pinned on a wide screen.",
        sk: "Odkazy sa otvoria z boku podľa potreby a na širokej obrazovke môžu zostať pripnuté.",
      },
    },
    {
      src: "/images/projects/oasis/library.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "The library in grid view with tagged bookmarks, filters and sorting",
        sk: "Knižnica v zobrazení mriežky so záložkami so štítkami, filtrami a triedením",
      },
      caption: {
        en: "The library: folders, tags, favourites, saved searches and sorting in one place.",
        sk: "Knižnica: priečinky, štítky, obľúbené, uložené hľadania a triedenie na jednom mieste.",
      },
    },
    {
      src: "/images/projects/oasis/notes.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Editing the notes of a bookmark in a dialog",
        sk: "Úprava poznámok k záložke v dialógovom okne",
      },
      caption: {
        en: "Each bookmark can carry its own notes, which are searchable and part of every backup.",
        sk: "Každá záložka môže mať vlastné poznámky, v ktorých sa dá hľadať a ktoré sú súčasťou každej zálohy.",
      },
    },
    {
      src: "/images/projects/oasis/phone-home.webp",
      width: 390,
      height: 844,
      alt: {
        en: "The Oasis new tab in a narrow window",
        sk: "Nová karta Oasis v úzkom okne",
      },
      caption: {
        en: "The layout adapts down to a narrow side window.",
        sk: "Rozloženie sa prispôsobí aj úzkemu bočnému oknu.",
      },
    },
  ],
};
