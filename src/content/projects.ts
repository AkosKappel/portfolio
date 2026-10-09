import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "modern-fashion-store",
    title: "Modern Fashion Store",
    summary: {
      en: "Inventory and sales dashboard for a clothing company, with live updates for everyone who has it open.",
      sk: "Dashboard skladu a predaja pre odevnú firmu so živými aktualizáciami pre každého, kto ho má otvorený.",
    },
    description: [
      {
        en: "A dashboard for the manager of a clothing company: products with tags, stock and prices, transactions per month and an overview of bestsellers. When one person changes something, everyone else sees it right away.",
        sk: "Dashboard pre manažéra odevnej firmy: produkty so štítkami, zásobami a cenami, transakcie po mesiacoch a prehľad najpredávanejších produktov. Keď niekto niečo zmení, ostatní to hneď vidia.",
      },
      {
        en: "In 2026 I updated it to Phoenix 1.8, LiveView 1.2 and Tailwind CSS 4, reviewed its security and put a public demo on my own server. The demo data resets every night.",
        sk: "V roku 2026 som ho aktualizoval na Phoenix 1.8, LiveView 1.2 a Tailwind CSS 4, skontroloval jeho bezpečnosť a spustil verejné demo na vlastnom serveri. Dáta dema sa každú noc obnovia.",
      },
    ],
    highlights: [
      {
        en: "Live updates between users with Phoenix PubSub",
        sk: "Živé aktualizácie medzi používateľmi cez Phoenix PubSub",
      },
      {
        en: "Filters for inventory and transactions, bestseller statistics",
        sk: "Filtre skladu a transakcií, štatistiky predaja",
      },
      {
        en: "Demo login without a shared password, nightly data reset",
        sk: "Prihlásenie do dema bez zdieľaného hesla, nočný reset dát",
      },
      {
        en: "Self-hosted with Docker, nginx and Tailscale",
        sk: "Na vlastnom serveri s Dockerom, nginx a Tailscale",
      },
    ],
    kind: "personal",
    area: "web",
    year: 2025,
    until: 2026,
    stack: ["Elixir", "Phoenix LiveView", "PostgreSQL", "Tailwind CSS", "Docker", "nginx"],
    repoUrl: "https://github.com/AkosKappel/clothing-store",
    liveUrl: "https://tagline.tailb52c43.ts.net",
    image: {
      src: "/images/projects/clothing-store-2026.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Product dashboard of the Modern Fashion Store with product photos, prices and stock",
        sk: "Dashboard produktov v Modern Fashion Store s fotkami, cenami a zásobami",
      },
    },
    featured: true,
  },
  {
    slug: "smarttech-e-shop",
    title: "SmartTech e-shop",
    summary: {
      en: "Smartphone shop with typo-tolerant search, filters, a three-step checkout and an admin area.",
      sk: "E-shop so smartfónmi s vyhľadávaním odolným voči preklepom, filtrami, trojkrokovým nákupom a administráciou.",
    },
    description: [
      {
        en: "It started as a university team project and I rebuilt it in 2026 on Laravel 13. Search understands typos, filters show live counts, and every filter combination has a clean URL that works even without JavaScript.",
        sk: "Začal ako tímový projekt na univerzite a v roku 2026 som ho prerobil na Laravel 13. Vyhľadávanie rozumie preklepom, filtre ukazujú počty výsledkov a každá kombinácia filtrov má čistú URL, ktorá funguje aj bez JavaScriptu.",
      },
      {
        en: "Customers can buy as guests or with an account. Admins manage products and photos in a protected area. The demo runs on my own server in English, German and Slovak.",
        sk: "Zákazníci môžu nakupovať ako hostia alebo s účtom. Administrátori spravujú produkty a fotky v chránenej časti. Demo beží na mojom serveri v angličtine, nemčine a slovenčine.",
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
  },
  {
    slug: "glaucoma-segmentation",
    title: "Glaucoma Segmentation",
    summary: {
      en: "Master's thesis: neural networks that outline the optic disc and cup in eye images.",
      sk: "Diplomová práca: neurónové siete, ktoré vyznačia optický disk a jamku na snímkach oka.",
    },
    description: [
      {
        en: "Glaucoma is diagnosed partly from the ratio between the optic cup and the optic disc. For my master's thesis I designed, implemented and evaluated two network architectures for finding them: a cascade, where a second network looks for the cup inside the disc found by the first, and a dual-decoder network with one shared encoder.",
        sk: "Glaukóm sa diagnostikuje aj podľa pomeru optickej jamky a optického disku. V diplomovej práci som navrhol, implementoval a vyhodnotil dve architektúry sietí na ich nájdenie: kaskádu, kde druhá sieť hľadá jamku vo vnútri disku nájdeného prvou, a sieť s dvoma dekodérmi a spoločným enkodérom.",
      },
      {
        en: "The models were trained on the ORIGA dataset and tested on DRISHTI-GS. The best one reached a Dice score of 96.8 % for the disc and 89.7 % for the cup.",
        sk: "Modely som trénoval na dátach ORIGA a testoval na DRISHTI-GS. Najlepší dosiahol Dice skóre 96,8 % pre disk a 89,7 % pre jamku.",
      },
    ],
    highlights: [
      {
        en: "Cascade and dual-decoder architectures in PyTorch",
        sk: "Kaskádová architektúra a architektúra s dvoma dekodérmi v PyTorch",
      },
      {
        en: "Region-of-interest detection and training in polar coordinates",
        sk: "Detekcia oblasti záujmu a trénovanie v polárnych súradniciach",
      },
      { en: "Explainability with Grad-CAM", sk: "Vysvetliteľnosť pomocou Grad-CAM" },
    ],
    kind: "university",
    area: "ai",
    year: 2023,
    until: 2024,
    role: {
      en: "Supervised by doc. RNDr. Silvester Czanner, PhD.",
      sk: "Vedúci práce doc. RNDr. Silvester Czanner, PhD.",
    },
    stack: ["Python", "PyTorch", "OpenCV", "NumPy", "Albumentations", "Matplotlib"],
    repoUrl: "https://github.com/AkosKappel/DP-GlaucomaSegmentation",
    image: {
      src: "/images/projects/glaucoma.webp",
      width: 1600,
      height: 784,
      alt: {
        en: "Processing steps from a raw eye image to the detected optic disc",
        sk: "Kroky spracovania od snímky oka po nájdený optický disk",
      },
    },
    featured: true,
  },
  {
    slug: "pokedex",
    title: "Pokédex",
    summary: {
      en: "All 1025 Pokémon with search, type matchups, a team builder and a quiz, in nine languages.",
      sk: "Všetkých 1025 Pokémonov s vyhľadávaním, typovými výhodami, skladačom tímu a kvízom, v deviatich jazykoch.",
    },
    description: [
      {
        en: "A browser for every Pokémon with data from PokéAPI: stats, type matchups, evolutions and moves, pages for moves, abilities and items, a team builder, a compare view and a quiz. Search and filters are kept in the URL.",
        sk: "Prehliadač všetkých Pokémonov s dátami z PokéAPI: štatistiky, typové výhody, evolúcie a útoky, stránky pre útoky, schopnosti a predmety, skladač tímu, porovnanie a kvíz. Vyhľadávanie a filtre sa ukladajú do URL.",
      },
      {
        en: "Rebuilt in 2026 on Vite and TypeScript with dark mode, offline support and tests in Vitest and Playwright.",
        sk: "V roku 2026 prerobený na Vite a TypeScript s tmavým režimom, podporou offline a testami vo Vitest a Playwright.",
      },
    ],
    kind: "personal",
    area: "web",
    year: 2024,
    until: 2026,
    stack: ["Vue", "TypeScript", "Vite", "Vitest", "Playwright"],
    repoUrl: "https://github.com/AkosKappel/Pokedex",
    liveUrl: "https://akoskappel.github.io/Pokedex",
    image: {
      src: "/images/projects/pokedex-2026.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Pokédex list with search and filters",
        sk: "Zoznam Pokémonov s vyhľadávaním a filtrami",
      },
    },
    featured: true,
  },
  {
    slug: "fakeshop",
    title: "FakeShop",
    summary: {
      en: "Demo online store with instant search, filters in the URL, a wishlist and a full checkout.",
      sk: "Demo e-shop s okamžitým vyhľadávaním, filtrami v URL, zoznamom želaní a celým nákupným procesom.",
    },
    description: [
      {
        en: "An online store with 194 products from DummyJSON: instant search, filters and sorting kept in the URL, a wishlist, a cart with promo codes and a checkout with card validation.",
        sk: "E-shop so 194 produktmi z DummyJSON: okamžité vyhľadávanie, filtre a triedenie v URL, zoznam želaní, košík so zľavovými kódmi a platba s kontrolou karty.",
      },
      {
        en: "Rebuilt in 2026 on React 19 and Tailwind CSS 4 with dark mode, an accessibility review and tests in Vitest and Playwright.",
        sk: "V roku 2026 prerobený na React 19 a Tailwind CSS 4 s tmavým režimom, kontrolou prístupnosti a testami vo Vitest a Playwright.",
      },
    ],
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
  },
  {
    slug: "feast-finder",
    title: "Feast Finder",
    summary: {
      en: "Recipe finder for almost 800 meals: search by name, ingredient, category or what is in your fridge.",
      sk: "Hľadanie receptov medzi takmer 800 jedlami: podľa názvu, suroviny, kategórie alebo toho, čo máte v chladničke.",
    },
    description: [
      {
        en: "Recipes from TheMealDB: search by name, browse by ingredient, category or cuisine, or combine several ingredients to find meals you can cook right now.",
        sk: "Recepty z TheMealDB: vyhľadávanie podľa názvu, prehliadanie podľa surovín, kategórií a kuchýň, alebo kombinácia viacerých surovín na nájdenie jedál, ktoré sa dajú hneď uvariť.",
      },
      {
        en: "Rebuilt in 2026 on Nuxt 4 and Tailwind CSS 4, with a cooking checklist, instructions read aloud, favourites and offline support.",
        sk: "V roku 2026 prerobený na Nuxt 4 a Tailwind CSS 4, s kontrolným zoznamom pri varení, predčítaním postupu, obľúbenými a podporou offline.",
      },
    ],
    kind: "personal",
    area: "web",
    year: 2023,
    until: 2026,
    stack: ["Nuxt", "Vue", "TypeScript", "Tailwind CSS", "Playwright"],
    repoUrl: "https://github.com/AkosKappel/FeastFinder",
    liveUrl: "https://akoskappel.github.io/FeastFinder",
    image: {
      src: "/images/projects/feast-finder-2026.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Feast Finder home page with meal suggestions",
        sk: "Úvodná stránka Feast Finder s návrhmi jedál",
      },
    },
  },
  {
    slug: "budget-master",
    title: "Budget Master",
    summary: {
      en: "Personal finance app with a transaction history, filters and charts of monthly spending.",
      sk: "Aplikácia na osobné financie s históriou transakcií, filtrami a grafmi mesačných výdavkov.",
    },
    description: [
      {
        en: "A full-stack app for tracking income and expenses. Transactions can be filtered by date, amount and your own labels, and charts show spending per month and per category.",
        sk: "Full-stack aplikácia na sledovanie príjmov a výdavkov. Transakcie sa dajú filtrovať podľa dátumu, sumy a vlastných štítkov a grafy ukazujú výdavky po mesiacoch a kategóriách.",
      },
    ],
    kind: "personal",
    area: "web",
    year: 2024,
    until: 2025,
    stack: ["Next.js", "TypeScript", "MongoDB", "Redux", "React Query", "Tailwind CSS"],
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
  },
  {
    slug: "wac-microfrontends",
    title: "WAC",
    summary: {
      en: "Micro-frontend web app with a Go API, deployed to Kubernetes on Azure through GitOps.",
      sk: "Webová aplikácia z micro-frontendov s API v Go, nasadená do Kubernetes v Azure cez GitOps.",
    },
    description: [
      {
        en: "A university team project. The frontend is a micro-frontend in Stencil.js and TypeScript, the backend a Go API with MongoDB and an OpenAPI specification. It was deployed with Docker, Kubernetes and GitHub Actions to Azure, with the cluster configuration in a separate GitOps repository.",
        sk: "Tímový projekt na univerzite. Frontend je micro-frontend v Stencil.js a TypeScripte, backend API v Go s MongoDB a OpenAPI špecifikáciou. Nasadenie cez Docker, Kubernetes a GitHub Actions do Azure, s konfiguráciou klastra v samostatnom GitOps repozitári.",
      },
    ],
    kind: "team",
    area: "infrastructure",
    year: 2024,
    stack: ["Stencil.js", "TypeScript", "Go", "MongoDB", "Kubernetes", "Azure", "GitHub Actions"],
    repoUrl: "https://github.com/AkosKappel/wac-projekt-gitops",
  },
  {
    slug: "petguide",
    title: "PetGuide",
    summary: {
      en: "Helps people choose a pet, and recognises a pet's breed from a photo with a neural network.",
      sk: "Pomáha vybrať si domáce zviera a neurónovou sieťou rozpozná plemeno z fotky.",
    },
    description: [
      {
        en: "A university team project: users register, search and filter pets by their traits, and upload a photo of their pet so that a neural network predicts its breed.",
        sk: "Tímový projekt na univerzite: používatelia sa zaregistrujú, hľadajú a filtrujú zvieratá podľa vlastností a nahrajú fotku svojho zvieraťa, z ktorej neurónová sieť určí plemeno.",
      },
    ],
    kind: "team",
    area: "ai",
    year: 2022,
    until: 2023,
    stack: ["Laravel", "PHP", "FastAPI", "Python", "TensorFlow", "Bootstrap"],
    repoUrl: "https://github.com/ImMuffin/team_project_14",
    image: {
      src: "/images/projects/petguide.webp",
      width: 1600,
      height: 1022,
      alt: {
        en: "PetGuide search page with pet cards",
        sk: "Vyhľadávanie v PetGuide s kartami zvierat",
      },
    },
  },
  {
    slug: "iridescent",
    title: "Iridescent",
    summary: {
      en: "Cooperative puzzle game for two players who collect and mix colours to get past obstacles.",
      sk: "Kooperatívna hádanková hra pre dvoch hráčov, ktorí zbierajú a miešajú farby, aby prekonali prekážky.",
    },
    description: [
      {
        en: "A two-player split-screen puzzle game made as a university team project. Players collect colours, mix them into new ones and use them together to get through each level.",
        sk: "Hádanková hra pre dvoch hráčov na rozdelenej obrazovke, tímový projekt na univerzite. Hráči zbierajú farby, miešajú z nich nové a spoločne ich využívajú na prejdenie levelov.",
      },
    ],
    kind: "team",
    area: "games",
    year: 2022,
    stack: ["Unity", "C#"],
    repoUrl: "https://gitlab.com/VighNorbert/iridescent",
    liveUrl: "https://the-norb.itch.io/iridescent",
    image: {
      src: "/images/projects/iridescent.webp",
      width: 1435,
      height: 798,
      alt: {
        en: "Iridescent title screen with two characters",
        sk: "Úvodná obrazovka hry Iridescent s dvoma postavami",
      },
    },
  },
  {
    slug: "advent-of-code",
    title: "Advent of Code",
    summary: {
      en: "Solutions from 2018 to 2025 in a different language every year, tested in CI.",
      sk: "Riešenia z rokov 2018 až 2025, každý rok v inom jazyku, testované v CI.",
    },
    description: [
      {
        en: "Every December I solve the Advent of Code puzzles, each year in a different language: Go, Java, Kotlin, Python, TypeScript, JavaScript, C# and Elixir. All solutions are tested in CI.",
        sk: "Každý december riešim úlohy Advent of Code, každý rok v inom jazyku: Go, Java, Kotlin, Python, TypeScript, JavaScript, C# a Elixir. Všetky riešenia sa testujú v CI.",
      },
    ],
    kind: "personal",
    area: "challenges",
    year: 2022,
    until: 2025,
    stack: ["Python", "Kotlin", "TypeScript", "Go", "Elixir", "C#", "Java"],
    repoUrl: "https://github.com/AkosKappel/Advent-of-Code",
    image: {
      src: "/images/projects/aoc.webp",
      width: 1600,
      height: 824,
      alt: { en: "Advent of Code calendar", sk: "Kalendár Advent of Code" },
    },
  },
  {
    slug: "advent-of-sql",
    title: "Advent of SQL",
    summary: {
      en: "Daily database puzzles solved in PostgreSQL.",
      sk: "Denné databázové úlohy riešené v PostgreSQL.",
    },
    description: [
      {
        en: "Solutions to the Advent of SQL challenge: one database puzzle a day, solved in PostgreSQL.",
        sk: "Riešenia výzvy Advent of SQL: jedna databázová úloha denne, riešená v PostgreSQL.",
      },
    ],
    kind: "personal",
    area: "challenges",
    year: 2024,
    stack: ["PostgreSQL"],
    repoUrl: "https://github.com/AkosKappel/Advent-of-SQL",
    image: {
      src: "/images/projects/aosql.webp",
      width: 764,
      height: 782,
      alt: { en: "Advent of SQL challenge page", sk: "Stránka výzvy Advent of SQL" },
    },
  },
  {
    slug: "mini-projects",
    title: "Mini Projects",
    summary: {
      en: "Small experiments in plain JavaScript, HTML, CSS and p5.js.",
      sk: "Malé experimenty v čistom JavaScripte, HTML, CSS a p5.js.",
    },
    description: [
      {
        en: "A collection of small projects written in plain JavaScript, HTML and CSS, some with p5.js.",
        sk: "Zbierka malých projektov v čistom JavaScripte, HTML a CSS, niektoré s p5.js.",
      },
    ],
    kind: "personal",
    area: "web",
    year: 2021,
    stack: ["JavaScript", "HTML", "CSS", "p5.js"],
    image: {
      src: "/images/projects/mini.webp",
      width: 956,
      height: 859,
      alt: {
        en: "Grid of small browser experiments",
        sk: "Mriežka malých experimentov v prehliadači",
      },
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
