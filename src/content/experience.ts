import type { Job } from "./types";

/** Newest first. Dates are ISO months (YYYY-MM). */
export const jobs: Job[] = [
  {
    role: "Full-Stack Software Engineer",
    company: "IGT Systems (formerly IGT Consulting)",
    location: "Bratislava, hybrid",
    start: "2025-02",
    summary:
      "Product work for several clients in teams of two to eight developers, across web, mobile and backend.",
    items: [
      {
        name: "Core3",
        url: "https://www.core3.digital/",
        context: "Business platform with project management, attendance, CRM, HR and ticketing",
        summary:
          "Owned the Project Management module and made slow pages fast after users complained about them.",
        highlights: [
          "Kanban with drag and drop, per-status rules and move permissions",
          "Task permissions for creators, assignees and project leads; Scrum and Waterfall methodologies",
          "Profiled with flame graphs and removed N+1 queries in PostgreSQL and MongoDB",
          "Caching with invalidation, async streams with infinite scroll, ordered PubSub updates",
          "Loading skeletons and optimistic UI for pending states",
        ],
        stack: ["Elixir", "Phoenix LiveView", "PostgreSQL", "MongoDB", "Cypress"],
      },
      {
        name: "WYDO",
        url: "https://wydo.sk/",
        context: "App for finding sports activities and people to play with",
        summary:
          "Started the mobile app, then the promo site, then moved the web from Kotlin Multiplatform to its own React app.",
        highlights: [
          "Kotlin Multiplatform app for Android and iOS: map with clustering, search and filters, groups, chat over WebSockets, four languages",
          "React web app with virtualized feeds, push notifications, passkey login, per-route SEO and PWA support",
          "Spring Boot backend features, including full WebAuthn passkey support",
          "Unit and end-to-end tests with Vitest and Playwright",
        ],
        stack: [
          "Kotlin",
          "Compose Multiplatform",
          "React",
          "TanStack",
          "Spring Boot",
          "Playwright",
        ],
      },
      {
        name: "CleanEEG",
        url: "https://cleaneeg.com/",
        context: "Service that removes artifacts from EEG recordings",
        summary: "Built the frontend from scratch in a team of two.",
        highlights: [
          "Fast WebGL EEG viewer comparing raw and cleaned signals across many channels",
          "Client-side high-pass, low-pass and notch filters, keyboard controls, fullscreen",
          "Signup, billing, notifications and a file dashboard with drag-and-drop upload",
        ],
        stack: ["React", "TypeScript", "TanStack", "Plotly", "Tailwind CSS"],
      },
      {
        name: "Internal analytics dashboard",
        context: "Data pipeline monitoring for a large enterprise client",
        summary: "Built the frontend so that new sections are added as routes from reusable parts.",
        highlights: [
          "Generic typed data grid with nested rows, sorting and resizable columns",
          "Filters, sorting and pagination kept in the URL",
          "Role-based read-only mode",
        ],
        stack: ["React", "TypeScript", "TanStack Query", "Zod", "Tailwind CSS"],
      },
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Švarba s.r.o.",
    location: "Nové Zámky, remote",
    start: "2024-06",
    end: "2025-01",
    summary:
      "Back-office system for an international direct-sales company: a new React web app that joined and replaced older Laravel and Nette monoliths.",
    items: [
      {
        name: "REST API",
        context: "TypeScript and Express",
        summary: "Designed and built the API behind the new web app.",
        highlights: [
          "MSSQL with stored procedures, JWT authentication, generated OpenAPI documentation",
          "Cron jobs for e-mails, imports and exports, WebSocket notifications over Redis",
          "Automatic translations with the OpenAI API",
          "200+ unit and integration tests with Jest and supertest",
        ],
        stack: ["TypeScript", "Node.js", "Express", "MSSQL", "Redis", "Jest"],
      },
      {
        name: "Web app and legacy system",
        context: "React, PHP and Nette",
        summary: "Worked on the new React app and maintained the legacy PHP system.",
        highlights: [
          "Reports, data grids and T-SQL in the legacy system",
          "React forms for the new web app",
        ],
        stack: ["React", "PHP", "Nette", "T-SQL"],
      },
    ],
  },
  {
    role: "Junior Python Developer",
    company: "SoftPoint s.r.o.",
    location: "Bratislava, hybrid",
    start: "2023-10",
    end: "2024-05",
    summary: "Data integration and automation for a large e-commerce retailer.",
    items: [
      {
        name: "Supplier data pipelines",
        context: "Python and Airflow",
        summary:
          "Built ETL pipelines that import product, price and stock data into the data warehouse.",
        highlights: [
          "Sources: supplier websites, APIs, and XML, XLSX and FTP feeds",
          "Selenium scraping of supplier B2B portals",
        ],
        stack: ["Python", "Airflow", "pandas", "Selenium", "PostgreSQL", "FastAPI"],
      },
      {
        name: "Order automation",
        context: "Ruby",
        summary:
          "Wrote headless-browser scripts that place warehouse orders with suppliers, after learning Ruby for the task.",
        highlights: [],
        stack: ["Ruby"],
      },
    ],
  },
];
