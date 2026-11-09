import type { Project } from "../types";

export const oriel: Project = {
  slug: "oriel",
  title: "Oriel",
  summary: {
    en: "Notes, lists and tasks that work offline first and sync live with the people you live with.",
    sk: "Poznámky, zoznamy a úlohy, ktoré fungujú najprv offline a živo sa synchronizujú s ľuďmi, s ktorými bývate.",
  },
  description: [
    {
      en: "A calm notebook for the everyday things you don't want to forget: a shopping list, a note, a task for the weekend. It runs as a live demo on my home server and installs on a phone like an app.",
      sk: "Pokojný zápisník na každodenné veci, na ktoré nechcete zabudnúť: nákupný zoznam, poznámka, úloha na víkend. Beží ako živé demo na mojom domácom serveri a do mobilu sa nainštaluje ako aplikácia.",
    },
    {
      en: "The problem I wanted to solve is the shared shopping list in a shop with no signal. Every read and write goes to a SQLite database in the browser first, so the app opens instantly and keeps working offline. An account is optional: it adds sync between devices and spaces shared with others, where changes show up on the other phones within a second.",
      sk: "Chcel som vyriešiť spoločný nákupný zoznam v obchode bez signálu. Každé čítanie a zápis ide najprv do databázy SQLite v prehliadači, takže aplikácia sa otvorí hneď a funguje aj offline. Účet je voliteľný: pridá synchronizáciu medzi zariadeniami a priestory zdieľané s ostatnými, kde sa zmeny do sekundy objavia aj na ostatných mobiloch.",
    },
    {
      en: "The hard part was keeping the server in charge without slowing the device down. Changes are applied locally at once, then each one is checked on the server against the member's role before it reaches anyone else; a refused change is dropped and the device gets the server's version back.",
      sk: "Najťažšie bolo nechať rozhodovanie na serveri bez spomalenia zariadenia. Zmeny sa hneď uložia lokálne a potom server každú z nich overí podľa roly člena, kým sa dostane k ostatným; odmietnutá zmena sa zahodí a zariadenie dostane späť verziu zo servera.",
    },
  ],
  features: [
    {
      en: 'Quick capture at the bottom of the screen: one line like "Groceries: milk, eggs, bread" becomes a list',
      sk: "Rýchly zápis v spodnej časti obrazovky: jeden riadok ako „Nákup: mlieko, vajcia, chlieb“ sa zmení na zoznam",
    },
    {
      en: "Works without a connection after the first visit, with no account needed",
      sk: "Po prvej návšteve funguje bez pripojenia a nepotrebuje účet",
    },
    {
      en: "Shared spaces with owners, editors and viewers; who added or checked what, and who else has a list open",
      sk: "Zdieľané priestory s vlastníkmi, editormi a čitateľmi; kto čo pridal alebo odškrtol a kto má zoznam práve otvorený",
    },
    {
      en: "Tasks with priority, status, due days, repeats and snooze; notes in Markdown with earlier versions to restore",
      sk: "Úlohy s prioritou, stavom, termínom, opakovaním a odložením; poznámky v Markdowne s predchádzajúcimi verziami na obnovenie",
    },
    {
      en: "Search across titles, notes and list entries on the device, ignoring case and accents",
      sk: "Vyhľadávanie v názvoch, poznámkach a položkách zoznamov priamo v zariadení, bez ohľadu na veľké písmená a diakritiku",
    },
    {
      en: "Swipe to finish or delete with undo, drag to reorder, a command palette with Ctrl+K",
      sk: "Potiahnutím dokončíte alebo zmažete s možnosťou vrátiť, presúvanie položiek ťahaním, príkazová paleta cez Ctrl+K",
    },
    {
      en: "Share text into Oriel from other apps, dictate with the microphone and scan a product barcode into a list",
      sk: "Zdieľanie textu do Orielu z iných aplikácií, diktovanie mikrofónom a naskenovanie čiarového kódu produktu do zoznamu",
    },
    {
      en: "A morning reminder of the day's tasks and notices of what others changed, as push notifications",
      sk: "Ranná pripomienka úloh na daný deň a upozornenia na zmeny od ostatných cez push notifikácie",
    },
    {
      en: "Sign in with a passkey, export everything as JSON or Markdown, or delete the account",
      sk: "Prihlásenie prístupovým kľúčom, export všetkého do JSON alebo Markdownu, prípadne zmazanie účtu",
    },
    {
      en: "English, Hungarian and Slovak, light and dark mode",
      sk: "Angličtina, maďarčina a slovenčina, svetlý a tmavý režim",
    },
  ],
  technical: [
    {
      en: "Local-first data: TanStack DB collections over a SQLite database in the browser, kept in sync with PostgreSQL by PowerSync through logical replication",
      sk: "Dáta najprv lokálne: kolekcie TanStack DB nad databázou SQLite v prehliadači, ktorú PowerSync synchronizuje s PostgreSQL cez logickú replikáciu",
    },
    {
      en: "Every uploaded change is validated with Zod and checked against the member's role on the server; downloads are scoped per space by sync streams",
      sk: "Každá nahraná zmena sa overí cez Zod a podľa roly člena na serveri; sťahovanie je obmedzené na priestory člena cez sync streams",
    },
    {
      en: "Client-generated IDs make retried uploads safe; concurrent edits merge per field, written up as decision records",
      sk: "Identifikátory generované na klientovi robia opakované nahrávanie bezpečným; súbežné úpravy sa spájajú po poliach, zdôvodnené v zázname rozhodnutí",
    },
    {
      en: "Hand-written service worker for offline use, Web Push, Web Share Target, Badging and Barcode Detection APIs",
      sk: "Vlastný service worker na prácu offline, Web Push, Web Share Target, Badging a Barcode Detection API",
    },
    {
      en: "Store tests against real SQLite, component tests, and Playwright tests with two browsers syncing, offline emulation and axe checks",
      sk: "Testy dátovej vrstvy nad skutočným SQLite, testy komponentov a Playwright testy s dvoma synchronizujúcimi sa prehliadačmi, emuláciou offline a kontrolou cez axe",
    },
    {
      en: "Strict Content Security Policy with nonces; Docker image built and scanned in GitHub Actions, deployed with nightly database backups",
      sk: "Prísna Content Security Policy s nonce; Docker image zostavený a preverený v GitHub Actions, nasadený s nočnými zálohami databázy",
    },
  ],
  versions: [
    "TanStack Start 1.169",
    "React 19.3",
    "PowerSync 1.27",
    "PostgreSQL 18",
    "TypeScript 7",
  ],
  kind: "personal",
  areas: ["web"],
  year: 2026,
  stack: [
    "TanStack Start",
    "React",
    "TypeScript",
    "TanStack DB",
    "PowerSync",
    "SQLite",
    "PostgreSQL",
    "Drizzle ORM",
    "Better Auth",
    "Zod",
    "React Aria",
    "Tailwind CSS",
    "Paraglide",
    "Playwright",
    "Docker",
  ],
  repoUrl: "https://github.com/AkosKappel/oriel",
  liveUrl: "https://oriel.akoskappel.dev",
  image: {
    src: "/images/projects/oriel-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Oriel on a wide screen in dark mode: the notebook on the left and a Markdown note beside it",
      sk: "Oriel na širokej obrazovke v tmavom režime: zápisník vľavo a poznámka v Markdowne vedľa neho",
    },
  },
  architecture: [
    {
      name: { en: "Browser", sk: "Prehliadač" },
      detail: {
        en: "React UI on TanStack DB collections",
        sk: "React rozhranie nad kolekciami TanStack DB",
      },
    },
    {
      name: { en: "SQLite", sk: "SQLite" },
      detail: {
        en: "Local database in the browser, every write lands here first",
        sk: "Lokálna databáza v prehliadači, každý zápis ide najprv sem",
      },
    },
    {
      name: { en: "PowerSync", sk: "PowerSync" },
      detail: {
        en: "Streams each member's spaces down; uploads go through the app's checks",
        sk: "Posiela dolu priestory člena; zmeny nahor prechádzajú kontrolami aplikácie",
      },
    },
    {
      name: { en: "PostgreSQL", sk: "PostgreSQL" },
      detail: {
        en: "The server's copy, replicated to PowerSync",
        sk: "Kópia na serveri, replikovaná do PowerSyncu",
      },
    },
  ],
  gallery: [
    {
      src: "/images/projects/oriel/phone-home.webp",
      width: 520,
      height: 1125,
      alt: {
        en: "Home on a phone with a pinned grocery list, tasks with due days and the capture field",
        sk: "Domovská obrazovka v mobile s pripnutým nákupným zoznamom, úlohami s termínmi a poľom na zápis",
      },
      caption: {
        en: "Home on a phone: pinned items first, then open tasks by priority and due day, and the capture field at the bottom.",
        sk: "Domovská obrazovka v mobile: najprv pripnuté položky, potom otvorené úlohy podľa priority a termínu a dole pole na zápis.",
      },
    },
    {
      src: "/images/projects/oriel/phone-list.webp",
      width: 520,
      height: 1125,
      alt: {
        en: "A grocery list on a phone with open and checked entries",
        sk: "Nákupný zoznam v mobile s otvorenými a odškrtnutými položkami",
      },
      caption: {
        en: "A list: checked entries move to the bottom, and in a shared space they show who checked them.",
        sk: "Zoznam: odškrtnuté položky sa presunú dole a v zdieľanom priestore ukazujú, kto ich odškrtol.",
      },
    },
    {
      src: "/images/projects/oriel/desktop-light.webp",
      width: 1280,
      height: 640,
      alt: {
        en: "The notebook and an open grocery list side by side in light mode",
        sk: "Zápisník a otvorený nákupný zoznam vedľa seba vo svetlom režime",
      },
      caption: {
        en: "On a wide screen the notebook stays on the left and the open item reads beside it.",
        sk: "Na širokej obrazovke zostáva zápisník vľavo a otvorená položka sa číta vedľa neho.",
      },
    },
  ],
};
