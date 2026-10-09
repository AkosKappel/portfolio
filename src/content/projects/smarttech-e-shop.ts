import type { Project } from "../types";

export const smarttechEShop: Project = {
  slug: "smarttech-e-shop",
  title: "SmartTech e-shop",
  summary: {
    en: "Smartphone shop with typo-tolerant search, filters, a three-step checkout and an admin area.",
    sk: "E-shop so smartfónmi s vyhľadávaním odolným voči preklepom, filtrami, trojkrokovým nákupom a administráciou.",
  },
  description: [
    {
      en: "The semester project for the Web Technologies course at FIIT STU in the winter of 2021, made in a pair, and my first Laravel project. The task was a server-rendered shop with filters, search, a cart that survives logout, guest checkout, accounts and an admin area.",
      sk: "Semestrálny projekt z predmetu Webové technológie na FIIT STU v zime 2021, robený vo dvojici, a môj prvý projekt v Laraveli. Zadaním bol e-shop vykresľovaný na serveri s filtrami, vyhľadávaním, košíkom, ktorý prežije odhlásenie, nákupom bez registrácie, účtami a administráciou.",
    },
    {
      en: "In 2025 I redesigned it, and in 2026 I upgraded it step by step to Laravel 13, covered it with tests first and moved it to my home server.",
      sk: "V roku 2025 som mu dal nový dizajn a v roku 2026 som ho postupne aktualizoval na Laravel 13, najprv som ho pokryl testami a presunul na domáci server.",
    },
  ],
  highlights: [
    {
      en: "Fuzzy search with PostgreSQL trigrams and live suggestions",
      sk: "Fuzzy vyhľadávanie cez PostgreSQL trigramy s návrhmi počas písania",
    },
    {
      en: "Filters, sorting and pagination without page reloads",
      sk: "Filtre, triedenie a stránkovanie bez načítania stránky",
    },
    {
      en: "Guest checkout, cart kept across sessions, stock tracking",
      sk: "Nákup bez registrácie, košík medzi reláciami, sledovanie zásob",
    },
    {
      en: "Automated tests in GitHub Actions, Docker Compose deployment",
      sk: "Automatické testy v GitHub Actions, nasadenie cez Docker Compose",
    },
  ],
  features: [
    {
      en: 'Search that forgives typos (try "samsng"), with suggestions while you type',
      sk: "Vyhľadávanie, ktoré odpustí preklepy (skúste „samsng“), s návrhmi počas písania",
    },
    {
      en: "Filters for price, brand, colour, memory, display size and system, each with a live count of matching phones",
      sk: "Filtre podľa ceny, značky, farby, pamäte, veľkosti displeja a systému, každý so živým počtom výsledkov",
    },
    {
      en: "Filtering, sorting and paging without page reloads, with clean URLs you can share",
      sk: "Filtrovanie, triedenie a stránkovanie bez načítania stránky, s čistými URL na zdieľanie",
    },
    {
      en: "Three-step checkout with delivery and payment options, also as a guest",
      sk: "Nákup v troch krokoch s výberom dopravy a platby, aj bez registrácie",
    },
    {
      en: "The cart is saved when you log out and merged when you log in again",
      sk: "Košík sa uloží pri odhlásení a spojí pri ďalšom prihlásení",
    },
    {
      en: "The whole shop in English, German and Slovak",
      sk: "Celý e-shop v angličtine, nemčine a slovenčine",
    },
    {
      en: "Admin area for products and photos",
      sk: "Administrácia produktov a fotiek",
    },
  ],
  technical: [
    {
      en: "About 84 feature tests run against PostgreSQL in GitHub Actions",
      sk: "Asi 84 testov funkcionality beží proti PostgreSQL v GitHub Actions",
    },
    {
      en: "I replaced the cart library with my own class after finding that saved carts could never be restored: PostgreSQL cut the serialized text at the first null byte",
      sk: "Knižnicu košíka som nahradil vlastnou triedou, keď som zistil, že uložené košíky sa nedali obnoviť: PostgreSQL orezal serializovaný text pri prvom nulovom bajte",
    },
    {
      en: "Typo-tolerant search with PostgreSQL trigram similarity",
      sk: "Vyhľadávanie odolné voči preklepom cez trigramovú podobnosť v PostgreSQL",
    },
    {
      en: "Docker Compose with PHP-FPM, nginx and PostgreSQL, a nightly demo reset, rate limiting and a health check",
      sk: "Docker Compose s PHP-FPM, nginx a PostgreSQL, nočný reset dema, obmedzenie počtu požiadaviek a kontrola stavu",
    },
  ],
  upgrade: {
    en: "Laravel 8 and PHP 8.1 to Laravel 13 and PHP 8.5, one major version at a time, after writing the tests. Tailwind CSS from the CDN to a local Tailwind 4 build, PostgreSQL 18.",
    sk: "Laravel 8 a PHP 8.1 na Laravel 13 a PHP 8.5, po jednej hlavnej verzii, až keď boli hotové testy. Tailwind CSS z CDN na lokálny build Tailwind 4, PostgreSQL 18.",
  },
  versions: ["Laravel 13", "PHP 8.5", "PostgreSQL 18", "Tailwind CSS 4"],
  kind: "team",
  area: "web",
  year: 2021,
  until: 2026,
  stack: ["Laravel", "PHP", "PostgreSQL", "Tailwind CSS", "Docker", "nginx"],
  repoUrl: "https://github.com/AkosKappel/WTECH-Laravel",
  liveUrl: "https://wtech.tailb52c43.ts.net",
  image: {
    src: "/images/projects/wtech-2026.webp",
    width: 1600,
    height: 1000,
    alt: { en: "Smartphone catalog with filters", sk: "Katalóg smartfónov s filtrami" },
  },
  featured: true,
};
