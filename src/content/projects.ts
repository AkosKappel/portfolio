import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "modern-fashion-store",
    title: "Modern Fashion Store",
    summary:
      "Inventory and sales dashboard for a clothing company, with live updates between everyone who has it open.",
    description: [
      "A manager dashboard for a clothing company: products with tags, stock and prices, transactions per month and a bestseller overview. Changes made by one user appear for everyone else right away through Phoenix PubSub.",
      "In 2026 I brought it up to date and put it online: Phoenix 1.8, LiveView 1.2 and Tailwind CSS 4, a security review, a release build in Docker, and a public demo on my home server that resets its data every night.",
    ],
    highlights: [
      "Live updates across sessions with LiveView and PubSub",
      "Filters for inventory and transactions, bestseller statistics",
      "Demo account with a server-side login, nightly data reset",
      "Self-hosted behind nginx and a Tailscale Funnel sidecar",
    ],
    kind: "Personal",
    area: "Web",
    year: 2025,
    upgraded: 2026,
    stack: ["Elixir", "Phoenix LiveView", "PostgreSQL", "Tailwind CSS", "Docker", "nginx"],
    repoUrl: "https://github.com/AkosKappel/clothing-store",
    liveUrl: "https://tagline.tailb52c43.ts.net",
    image: {
      src: "/images/projects/clothing-store.webp",
      width: 1600,
      height: 876,
      alt: "Product dashboard of the Modern Fashion Store with product photos, prices and stock",
    },
    featured: true,
  },
  {
    slug: "glaucoma-segmentation",
    title: "Glaucoma Segmentation",
    summary:
      "Master's thesis: two neural network architectures that segment the optic disc and cup in eye fundus images.",
    description: [
      "Glaucoma is diagnosed partly from the ratio between the optic cup and the optic disc. For my master's thesis at FIIT STU I proposed, implemented and evaluated two segmentation architectures for these structures: a cascade model, where a second network segments the cup inside the detected disc, and a dual-decoder model, where one shared encoder feeds two decoders.",
      "The models were trained on the ORIGA dataset and evaluated on DRISHTI-GS, with region-of-interest detection by CenterNet and training in polar coordinates. The best model reached a Dice score of 96.8 % for the disc and 89.7 % for the cup, and its vertical cup-to-disc ratio was compared with expert measurements.",
    ],
    highlights: [
      "Cascade and dual-decoder architectures in PyTorch",
      "Dice 96.8 % (optic disc) and 89.7 % (optic cup)",
      "Exploratory data analysis, polar-coordinate training, Grad-CAM interpretability",
    ],
    kind: "University",
    area: "AI",
    year: 2023,
    role: "Master's thesis, supervised by doc. RNDr. Silvester Czanner, PhD.",
    stack: ["Python", "PyTorch", "OpenCV", "NumPy", "Albumentations", "Matplotlib"],
    repoUrl: "https://github.com/AkosKappel/DP-GlaucomaSegmentation",
    image: {
      src: "/images/projects/glaucoma.webp",
      width: 1600,
      height: 784,
      alt: "Fundus images with the predicted optic disc and cup outlined",
    },
    featured: true,
  },
  {
    slug: "smarttech-e-shop",
    title: "SmartTech e-Shop",
    summary:
      "Smartphone e-shop with typo-tolerant search, rich filters, a three-step checkout and an admin zone.",
    description: [
      "Started as a university team project and rebuilt in 2026 on Laravel 13. The catalog has typo-tolerant search with PostgreSQL trigram similarity, live search suggestions, filters with live counts and clean, shareable URLs that also work without JavaScript.",
      "Customers can check out as guests or with an account, through delivery, shipping and payment steps. Admins manage products and images in a protected zone. The demo runs on my home server in English, German and Slovak.",
    ],
    highlights: [
      "Fuzzy search with pg_trgm and live suggestions",
      "Filters, sorting and pagination without page reloads",
      "Guest checkout, cart kept across sessions, stock tracking",
      "Feature tests in GitHub Actions, self-hosted with Docker Compose",
    ],
    kind: "Team",
    area: "Web",
    year: 2021,
    upgraded: 2026,
    stack: ["Laravel", "PHP", "PostgreSQL", "Tailwind CSS", "Docker", "nginx"],
    repoUrl: "https://github.com/AkosKappel/WTECH-Laravel",
    liveUrl: "https://wtech.tailb52c43.ts.net",
    image: {
      src: "/images/projects/wtech.webp",
      width: 1596,
      height: 904,
      alt: "Smartphone catalog with brand filters applied",
    },
    featured: true,
  },
  {
    slug: "pokedex",
    title: "Pokédex",
    summary:
      "Pokédex for all 1025 Pokémon with search, type matchups, a team builder and a quiz, in nine languages.",
    description: [
      'A browser for all 1025 Pokémon with data from PokéAPI. Search and filters are kept in the URL, and each Pokémon has stats, type matchups, evolutions and learnsets. There are pages for moves, abilities and items, a team builder, a compare view and a "Who\'s that Pokémon?" quiz.',
      "Rebuilt in 2026 from Vue CLI to Vite with TypeScript, with names in nine languages, dark mode and offline support. Tested with Vitest and Playwright and deployed to GitHub Pages.",
    ],
    kind: "Personal",
    area: "Web",
    year: 2024,
    upgraded: 2026,
    stack: ["Vue", "TypeScript", "Vite", "Vitest", "Playwright"],
    repoUrl: "https://github.com/AkosKappel/Pokedex",
    liveUrl: "https://akoskappel.github.io/Pokedex",
    image: {
      src: "/images/projects/pokedex.webp",
      width: 1280,
      height: 800,
      alt: "Pokédex list with search and type filters",
    },
    featured: true,
  },
  {
    slug: "fakeshop",
    title: "FakeShop",
    summary:
      "Demo online store with instant search, URL-driven filters, a wishlist and a full checkout.",
    description: [
      "An online store with 194 products from DummyJSON: instant search, filters and sorting kept in the URL, a wishlist, a cart with promo codes and a checkout with card validation.",
      "Upgraded in 2026 to React 19, React Router and Tailwind CSS 4, with dark mode, an accessibility pass, Vitest and Playwright tests and deployment to GitHub Pages.",
    ],
    kind: "Personal",
    area: "Web",
    year: 2024,
    upgraded: 2026,
    stack: ["React", "React Router", "TypeScript", "Tailwind CSS", "Playwright"],
    repoUrl: "https://github.com/AkosKappel/FakeShop",
    liveUrl: "https://akoskappel.github.io/FakeShop",
    image: {
      src: "/images/projects/eshop.webp",
      width: 1280,
      height: 800,
      alt: "FakeShop home page with a promotional banner and product cards",
    },
  },
  {
    slug: "feast-finder",
    title: "Feast Finder",
    summary:
      "Recipe finder for almost 800 meals: search by name, ingredient, category or cuisine, or by what is in your fridge.",
    description: [
      "A recipe finder built on TheMealDB. You can search by name, browse by ingredient, category or cuisine, or combine several ingredients to find meals you can cook right now.",
      "Upgraded in 2026 to Nuxt 4 and Tailwind CSS 4, with a cooking checklist, read-aloud instructions, favourites and offline support. Tested with Vitest and Playwright and deployed to GitHub Pages.",
    ],
    kind: "Personal",
    area: "Web",
    year: 2023,
    upgraded: 2026,
    stack: ["Nuxt", "Vue", "TypeScript", "Tailwind CSS", "Playwright"],
    repoUrl: "https://github.com/AkosKappel/FeastFinder",
    liveUrl: "https://akoskappel.github.io/FeastFinder",
    image: {
      src: "/images/projects/feast-finder.webp",
      width: 1280,
      height: 800,
      alt: "Feast Finder home page with recommended meals",
    },
  },
  {
    slug: "budget-master",
    title: "Budget Master",
    summary:
      "Personal finance app with transaction history, filters and charts of monthly spending.",
    description: [
      "A full-stack app for tracking income and expenses. It keeps a history of all transactions, which can be filtered by date, amount and your own labels, and shows charts of monthly spending and spending by category.",
    ],
    kind: "Personal",
    area: "Web",
    year: 2024,
    stack: ["Next.js", "TypeScript", "MongoDB", "Redux", "React Query", "Recharts", "Tailwind CSS"],
    repoUrl: "https://github.com/AkosKappel/BudgetMaster",
    image: {
      src: "/images/projects/budget-master.webp",
      width: 1600,
      height: 1248,
      alt: "Budget Master dashboard with a transaction table and filters",
    },
  },
  {
    slug: "wac-microfrontends",
    title: "WAC",
    summary:
      "Micro-frontend web app with a Go API, deployed to Kubernetes on Azure through GitOps.",
    description: [
      "A university team project. The frontend is a micro-frontend built with Stencil.js and TypeScript; the backend is a Go web API with MongoDB and an OpenAPI specification.",
      "The application was deployed with Docker, Kubernetes and GitHub Actions to Azure, with the cluster configuration kept in a separate GitOps repository.",
    ],
    kind: "Team",
    area: "Infrastructure",
    year: 2024,
    stack: ["Stencil.js", "TypeScript", "Go", "MongoDB", "Kubernetes", "Azure", "GitHub Actions"],
    repoUrl: "https://github.com/AkosKappel/wac-projekt-gitops",
  },
  {
    slug: "petguide",
    title: "PetGuide",
    summary:
      "Helps people choose a pet, and recognises a pet's breed from a photo with a neural network.",
    description: [
      "A university team project: users register, search and filter pets by their characteristics, and upload a photo of their pet so that a neural network in the background predicts its breed.",
    ],
    kind: "Team",
    area: "AI",
    year: 2022,
    stack: ["Laravel", "PHP", "FastAPI", "Python", "TensorFlow", "Bootstrap"],
    repoUrl: "https://github.com/ImMuffin/team_project_14",
    image: {
      src: "/images/projects/petguide.webp",
      width: 1600,
      height: 1022,
      alt: "PetGuide search page with pet cards",
    },
  },
  {
    slug: "iridescent",
    title: "Iridescent",
    summary:
      "Cooperative puzzle game for two players who collect and mix colours to get past obstacles.",
    description: [
      "A two-player cooperative puzzle game made as a university team project. Players collect colours, mix them into new ones and use them to overcome obstacles together, in split-screen mode.",
    ],
    kind: "Team",
    area: "Games",
    year: 2022,
    stack: ["Unity", "C#"],
    repoUrl: "https://gitlab.com/VighNorbert/iridescent",
    liveUrl: "https://the-norb.itch.io/iridescent",
    image: {
      src: "/images/projects/iridescent.webp",
      width: 1435,
      height: 798,
      alt: "Iridescent game scene with two players and coloured platforms",
    },
  },
  {
    slug: "advent-of-code",
    title: "Advent of Code",
    summary:
      "Solutions from 2018 to 2025, a different language every year, 374 stars, tested in CI.",
    description: [
      "Every December I solve the Advent of Code puzzles, and each year in a different language: Go, Java, Kotlin, Python, TypeScript, JavaScript, C# and Elixir. The solutions are tested in CI.",
    ],
    kind: "Personal",
    area: "Challenges",
    year: 2022,
    stack: ["Python", "Kotlin", "TypeScript", "Go", "Elixir", "C#", "Java"],
    repoUrl: "https://github.com/AkosKappel/Advent-of-Code",
    image: {
      src: "/images/projects/aoc.webp",
      width: 1600,
      height: 824,
      alt: "Advent of Code calendar",
    },
  },
  {
    slug: "advent-of-sql",
    title: "Advent of SQL",
    summary: "Daily database puzzles solved in PostgreSQL.",
    description: [
      "Solutions to the Advent of SQL challenge: one database puzzle a day, solved in PostgreSQL.",
    ],
    kind: "Personal",
    area: "Challenges",
    year: 2024,
    stack: ["PostgreSQL", "SQL"],
    repoUrl: "https://github.com/AkosKappel/Advent-of-SQL",
    image: {
      src: "/images/projects/aosql.webp",
      width: 764,
      height: 782,
      alt: "Advent of SQL challenge page",
    },
  },
  {
    slug: "mini-projects",
    title: "Mini Projects",
    summary: "Small experiments in vanilla JavaScript, HTML, CSS and p5.js.",
    description: [
      "A collection of small projects written in vanilla JavaScript, HTML and CSS, some with p5.js.",
    ],
    kind: "Personal",
    area: "Web",
    year: 2021,
    stack: ["JavaScript", "HTML", "CSS", "p5.js"],
    image: {
      src: "/images/projects/mini.webp",
      width: 956,
      height: 859,
      alt: "Grid of small browser experiments",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
