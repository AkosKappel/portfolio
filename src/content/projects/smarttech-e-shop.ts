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
      en: "Later I redesigned it, then upgraded it step by step to Laravel 13, covered it with tests first and moved it to my home server.",
      sk: "Neskôr som mu dal nový dizajn a potom som ho postupne aktualizoval na Laravel 13, najprv som ho pokryl testami a presunul na domáci server.",
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
      en: "The whole shop in English, German and Slovak, each language under its own URL",
      sk: "Celý e-shop v angličtine, nemčine a slovenčine, každý jazyk na vlastnej URL",
    },
    {
      en: "Sale prices and discount codes; the cart suggests one to try in the demo",
      sk: "Zľavnené ceny a zľavové kódy; košík v deme ponúkne jeden na vyskúšanie",
    },
    {
      en: "Reviews with star ratings, a wishlist and a side-by-side comparison of up to four phones",
      sk: "Recenzie s hviezdičkami, zoznam želaní a porovnanie až štyroch telefónov vedľa seba",
    },
    {
      en: "Order history with the status of each order",
      sk: "História objednávok so stavom každej z nich",
    },
    {
      en: "Ctrl+K quick find for pages and phones, and a dark mode",
      sk: "Rýchle hľadanie stránok a telefónov cez Ctrl+K a tmavý režim",
    },
    {
      en: "Admin area for products and photos, orders and their status, discount codes, visitor statistics without cookies, translations and planned maintenance",
      sk: "Administrácia produktov a fotiek, objednávok a ich stavu, zľavových kódov, štatistík návštev bez cookies, prekladov a plánovanej údržby",
    },
    {
      en: 'Try the admin area with "Try the admin demo": a throwaway account whose products only it can see, deleted every night',
      sk: "Administráciu si vyskúšate cez „Try the admin demo“: dočasný účet, ktorého produkty vidí len on a každú noc sa zmažú",
    },
  ],
  technical: [
    {
      en: "About 140 tests run against PostgreSQL in GitHub Actions",
      sk: "Asi 140 testov beží proti PostgreSQL v GitHub Actions",
    },
    {
      en: "Admin routes protected by gates and a policy; demo admins have their own rate limit and never touch the shop's products or orders",
      sk: "Administrácia chránená cez gates a policy; demo administrátori majú vlastný limit požiadaviek a nikdy nezasiahnu do produktov ani objednávok obchodu",
    },
    {
      en: "A read-only JSON API for the catalog, public and rate-limited per visitor",
      sk: "JSON API katalógu len na čítanie, verejné a s limitom požiadaviek na návštevníka",
    },
    {
      en: "Canonical links, structured data for products and breadcrumbs, a sitemap and hreflang links between languages",
      sk: "Kanonické odkazy, štruktúrované dáta pre produkty a navigáciu, sitemap a hreflang odkazy medzi jazykmi",
    },
    {
      en: "Uploaded photos are re-encoded, scaled down and get WebP thumbnails; unexpected errors show a reference code that is also written to the log",
      sk: "Nahrané fotky sa znovu zakódujú, zmenšia a dostanú WebP náhľady; neočakávané chyby ukážu referenčný kód, ktorý sa zapíše aj do logu",
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
  changelog: [
    {
      en: "Tests written first, then Laravel 8 and PHP 8.1 to Laravel 13 and PHP 8.5, one major version at a time",
      sk: "Najprv testy, potom Laravel 8 a PHP 8.1 na Laravel 13 a PHP 8.5, po jednej hlavnej verzii",
    },
    {
      en: "Tailwind CSS from the CDN to a local Tailwind 4 build",
      sk: "Tailwind CSS z CDN na lokálny build Tailwind 4",
    },
    {
      en: "PostgreSQL 18",
      sk: "PostgreSQL 18",
    },
  ],
  versions: ["Laravel 13", "PHP 8.5", "PostgreSQL 18", "Tailwind CSS 4"],
  kind: "team",
  areas: ["web"],
  year: 2021,
  until: 2026,
  stack: [
    "Laravel",
    "PHP",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
    "nginx",
    "Tailscale",
    "GitHub Actions",
  ],
  repoUrl: "https://github.com/AkosKappel/WTECH-Laravel",
  liveUrl: "https://wtech.tailb52c43.ts.net",
  image: {
    src: "/images/projects/wtech-2026.webp",
    width: 1600,
    height: 1000,
    alt: { en: "Smartphone catalog with filters", sk: "Katalóg smartfónov s filtrami" },
  },
  architecture: [
    {
      name: { en: "Browser", sk: "Prehliadač" },
      detail: {
        en: "Server-rendered Blade pages styled with Tailwind CSS",
        sk: "Stránky vykresľované na serveri cez Blade, štýly v Tailwind CSS",
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
        en: "Web server in front of PHP-FPM",
        sk: "Webový server pred PHP-FPM",
      },
    },
    {
      name: { en: "Laravel", sk: "Laravel" },
      detail: {
        en: "Catalog, cart, checkout and admin on PHP-FPM; a scheduler container resets the demo every night",
        sk: "Katalóg, košík, objednávky a administrácia na PHP-FPM; kontajner s plánovačom každú noc obnoví demo",
      },
    },
    {
      name: { en: "PostgreSQL", sk: "PostgreSQL" },
      detail: {
        en: "Products and orders, with trigram search",
        sk: "Produkty a objednávky, s trigramovým vyhľadávaním",
      },
    },
  ],
  gallery: [
    {
      src: "/images/projects/smarttech-e-shop/home.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Home page of the SmartTech shop with a phone and three reasons to buy",
        sk: "Úvodná stránka obchodu SmartTech s telefónom a tromi dôvodmi na nákup",
      },
      caption: {
        en: "Home page with the demo banner, search and language switcher.",
        sk: "Úvodná stránka s bannerom dema, vyhľadávaním a prepínačom jazyka.",
      },
    },
    {
      src: "/images/projects/smarttech-e-shop/product.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Product page of a Sony phone with quantity, total price and an add to cart button",
        sk: "Stránka produktu telefónu Sony s množstvom, celkovou cenou a tlačidlom do košíka",
      },
      caption: {
        en: "Product detail with quantity, live total and specifications.",
        sk: "Detail produktu s množstvom, priebežnou cenou a parametrami.",
      },
    },
    {
      src: "/images/projects/smarttech-e-shop/search.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Search suggestions for the misspelt query samsng, listing Samsung phones with photos and prices",
        sk: "Návrhy vyhľadávania pre preklep samsng so zoznamom telefónov Samsung s fotkami a cenami",
      },
      caption: {
        en: 'Live suggestions find Samsung phones even for "samsng".',
        sk: "Návrhy počas písania nájdu telefóny Samsung aj pre „samsng“.",
      },
    },
    {
      src: "/images/projects/smarttech-e-shop/catalog-dark.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Smartphone catalog in the dark theme filtered to Apple, Google and Samsung, sorted by price",
        sk: "Katalóg smartfónov v tmavom režime filtrovaný na Apple, Google a Samsung, zoradený podľa ceny",
      },
      caption: {
        en: "The catalog in the dark theme, with brand filters shown as removable chips.",
        sk: "Katalóg v tmavom režime, s filtrami značiek ako odstrániteľnými štítkami.",
      },
    },
    {
      src: "/images/projects/smarttech-e-shop/cart.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Shopping cart with one phone, a quantity selector, a discount code field and the total",
        sk: "Košík s jedným telefónom, výberom množstva, poľom na zľavový kód a celkovou sumou",
      },
      caption: {
        en: "The cart with a field for discount codes.",
        sk: "Košík s poľom na zľavový kód.",
      },
    },
    {
      src: "/images/projects/smarttech-e-shop/admin-products.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Admin product list with search, sorting, thumbnails, prices and stock badges, and a demo admin notice",
        sk: "Zoznam produktov v administrácii s vyhľadávaním, triedením, náhľadmi, cenami a stavom zásob a upozornením pre demo administrátora",
      },
      caption: {
        en: "The admin product list, opened with a throwaway demo admin account.",
        sk: "Zoznam produktov v administrácii, otvorený cez dočasný demo účet administrátora.",
      },
    },
  ],
  featured: true,
};
