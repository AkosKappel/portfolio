import type { Project } from "../types";

export const fakeshop: Project = {
  slug: "fakeshop",
  title: "FakeShop",
  summary: {
    en: "Demo online store with instant search, filters in the URL, a wishlist and a full checkout.",
    sk: "Demo e-shop s okamžitým vyhľadávaním, filtrami v URL, zoznamom želaní a celým nákupným procesom.",
  },
  description: [
    {
      en: "A personal project from 2024 that I rebuilt in 2026 into a realistic demo store with 194 products from DummyJSON. Nothing is sold and no payment is taken.",
      sk: "Osobný projekt z roku 2024, ktorý som v roku 2026 prerobil na realistický demo e-shop so 194 produktmi z DummyJSON. Nič sa nepredáva a neplatí sa.",
    },
  ],
  features: [
    {
      en: "Search with suggestions and filters for price, rating, brand, stock and discounts, all kept in the URL",
      sk: "Vyhľadávanie s návrhmi a filtre podľa ceny, hodnotenia, značky, dostupnosti a zliav, všetko v URL",
    },
    {
      en: "Product pages with a zoomable gallery, reviews and related products",
      sk: "Stránky produktov s galériou so zoomom, recenziami a podobnými produktmi",
    },
    {
      en: "A cart with undo, the promo codes FAKE10 and FREESHIP, and a free-delivery threshold",
      sk: "Košík s krokom späť, zľavovými kódmi FAKE10 a FREESHIP a hranicou dopravy zadarmo",
    },
    {
      en: "Checkout with card number validation and delivery dates in business days; only the last four digits are kept",
      sk: "Pokladňa s kontrolou čísla karty a termínom doručenia v pracovných dňoch; ukladajú sa len posledné štyri číslice",
    },
    {
      en: "Compare products, wishlist, recently viewed and order history, synced across open tabs",
      sk: "Porovnanie produktov, zoznam želaní, naposledy pozreté a história objednávok, synchronizované medzi kartami",
    },
    {
      en: "Dark mode, image transitions from card to product page, installable as an app",
      sk: "Tmavý režim, prechod obrázka z karty na stránku produktu, inštalácia ako aplikácia",
    },
  ],
  technical: [
    {
      en: "React Router in data mode with loaders, actions and lazy routes; product details stream in with Suspense",
      sk: "React Router v dátovom režime s loadermi, akciami a lenivými routami; detaily produktu sa streamujú cez Suspense",
    },
    {
      en: "End-to-end tests on desktop and phone sizes with accessibility checks, including tests that no card data is stored",
      sk: "End-to-end testy na veľkosti počítača aj telefónu s kontrolou prístupnosti, vrátane testov, že sa neukladajú údaje karty",
    },
    {
      en: "Lighthouse CI fails below 100 for accessibility, best practices and SEO; deployed to GitHub Pages with GitHub Actions",
      sk: "Lighthouse CI zlyhá pod 100 bodov v prístupnosti, osvedčených postupoch a SEO; nasadenie na GitHub Pages cez GitHub Actions",
    },
  ],
  upgrade: {
    en: "React 18 to 19, React Router 6 to 8, Vite 5 to 8, Tailwind CSS 3 to 4, TypeScript 5 to 6. The data source moved from Fake Store API to DummyJSON.",
    sk: "React 18 na 19, React Router 6 na 8, Vite 5 na 8, Tailwind CSS 3 na 4, TypeScript 5 na 6. Zdroj dát sa zmenil z Fake Store API na DummyJSON.",
  },
  versions: ["React 19", "React Router 8", "Vite 8", "Tailwind CSS 4"],
  kind: "personal",
  area: "web",
  year: 2024,
  until: 2026,
  stack: ["React", "React Router", "TypeScript", "Tailwind CSS", "Playwright"],
  repoUrl: "https://github.com/AkosKappel/FakeShop",
  liveUrl: "https://akoskappel.github.io/FakeShop",
  image: {
    src: "/images/projects/eshop-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "FakeShop home page with product cards",
      sk: "Úvodná stránka FakeShopu s produktmi",
    },
  },
};
