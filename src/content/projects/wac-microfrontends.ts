import type { Project } from "../types";

export const wacMicrofrontends: Project = {
  slug: "wac-microfrontends",
  title: "Ambulance Devices",
  summary: {
    en: "Register of hospital medical devices: a Stencil micro-frontend and a Go API, first deployed to Kubernetes through GitOps.",
    sk: "Evidencia zdravotníckej techniky nemocnice: micro-frontend v Stencile a API v Go, pôvodne nasadené do Kubernetes cez GitOps.",
  },
  description: [
    {
      en: "A university team project from the Web Applications in the Cloud course at FIIT STU in 2024. Each device in a hospital department has a registration number, a price, a warranty date and its own operations log. The frontend is a Stencil web component loaded into the course's shared portal, the backend a Go API with MongoDB generated from an OpenAPI specification, and Flux CD deployed both to Kubernetes on Azure.",
      sk: "Tímový projekt z predmetu Webové aplikácie v prostredí cloudu na FIIT STU v roku 2024. Každé zariadenie nemocničného oddelenia má registračné číslo, cenu, dátum konca záruky a vlastný prevádzkový log. Frontend je webový komponent v Stencile načítaný do spoločného portálu predmetu, backend API v Go s MongoDB generované z OpenAPI špecifikácie a oboje nasadzoval Flux CD do Kubernetes v Azure.",
    },
    {
      en: "Today it runs as a live demo on my home server. It has a homepage with an overview, an About page, English next to Slovak, dark mode, a safer API and CI that builds the images.",
      sk: "Dnes beží ako živé demo na domácom serveri. Má úvodnú stránku s prehľadom, stránku o projekte, angličtinu popri slovenčine, tmavý režim, bezpečnejšie API a CI, ktoré zostavuje obrazy.",
    },
  ],
  features: [
    {
      en: "An overview of device count, total value and warranties ending soon, with value per department",
      sk: "Prehľad počtu zariadení, celkovej hodnoty a končiacich záruk, s hodnotou podľa oddelení",
    },
    {
      en: "Search, filters by department and warranty state, sorting, and the filters kept in the URL",
      sk: "Vyhľadávanie, filtre podľa oddelenia a stavu záruky, triedenie a filtre uložené v URL",
    },
    {
      en: "Warranty state at a glance: valid, ending within 90 days or expired",
      sk: "Stav záruky na prvý pohľad: platná, končí do 90 dní alebo vypršala",
    },
    {
      en: "A device form and an operations log, validated in the browser and in the API",
      sk: "Formulár zariadenia a prevádzkový log s kontrolou v prehliadači aj v API",
    },
    {
      en: "CSV export, Slovak and English, dark mode, and the API documentation in Swagger UI",
      sk: "Export do CSV, slovenčina a angličtina, tmavý režim a dokumentácia API v Swagger UI",
    },
  ],
  technical: [
    {
      en: "One OpenAPI specification generates both the Go server stubs and the TypeScript client; CI fails when the generated code is out of date",
      sk: "Jedna OpenAPI špecifikácia generuje kostru servera v Go aj klienta v TypeScripte; CI zlyhá, keď vygenerovaný kód nesedí",
    },
    {
      en: "Device and log changes are single atomic MongoDB updates, and the API validates input and keeps internal errors out of responses",
      sk: "Zmeny zariadení a logov sú jednotlivé atomické aktualizácie v MongoDB a API kontroluje vstupy a neprezrádza interné chyby",
    },
    {
      en: "GitHub Actions runs the Go tests against a MongoDB service container, the frontend spec and end-to-end tests, govulncheck and npm audit, and pushes the images to GHCR",
      sk: "GitHub Actions spúšťa testy v Go proti MongoDB v service kontajneri, spec a end-to-end testy frontendu, govulncheck a npm audit a nahráva obrazy do GHCR",
    },
    {
      en: "Docker Compose with nginx (Content-Security-Policy, rate limits), a non-root API, structured JSON logs and a nightly demo reset",
      sk: "Docker Compose s nginx (Content-Security-Policy, obmedzenie požiadaviek), API bez root práv, štruktúrované JSON logy a nočný reset dema",
    },
  ],
  upgrade: {
    en: "Kubernetes and Flux replaced by Docker Compose on a home server, Gin 1.9 to 1.12, MongoDB 7 to 8, Stencil 4.12 to 4.45 and Material Web 1 to 2. The axios client became a generated fetch client.",
    sk: "Kubernetes a Flux nahradil Docker Compose na domácom serveri, Gin 1.9 na 1.12, MongoDB 7 na 8, Stencil 4.12 na 4.45 a Material Web 1 na 2. Klient v axios sa zmenil na generovaný klient nad fetch.",
  },
  versions: ["Stencil 4.45", "Go 1.27", "Gin 1.12", "MongoDB 8"],
  kind: "team",
  area: "infrastructure",
  year: 2024,
  until: 2026,
  stack: [
    "Stencil.js",
    "TypeScript",
    "Go",
    "MongoDB",
    "OpenAPI",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
  ],
  repoUrl: "https://github.com/AkosKappel/wac",
  liveUrl: "https://ambulance.tailb52c43.ts.net",
  image: {
    src: "/images/projects/wac-microfrontends-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Homepage of Ambulance Devices with device count, total value and value by department",
      sk: "Úvodná stránka Ambulance Devices s počtom zariadení, celkovou hodnotou a hodnotou podľa oddelení",
    },
  },
  architecture: [
    {
      name: { en: "Browser", sk: "Prehliadač" },
      detail: {
        en: "Stencil web components with Material Web",
        sk: "Webové komponenty v Stencile s Material Web",
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
        en: "Serves the built frontend and proxies /api",
        sk: "Servíruje zostavený frontend a presmeruje /api",
      },
    },
    {
      name: { en: "Go API", sk: "Go API" },
      detail: {
        en: "Gin handlers on stubs generated from the OpenAPI specification",
        sk: "Handlery v Gin nad kostrou generovanou z OpenAPI špecifikácie",
      },
    },
    {
      name: { en: "MongoDB", sk: "MongoDB" },
      detail: {
        en: "Devices with their logs; a reset container restores the demo every night",
        sk: "Zariadenia s ich logmi; kontajner na reset každú noc obnoví demo",
      },
    },
  ],
  gallery: [
    {
      src: "/images/projects/wac-microfrontends/devices.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Device list filtered to warranties ending within 90 days, sorted by warranty end",
        sk: "Zoznam zariadení filtrovaný na záruky končiace do 90 dní, zoradený podľa konca záruky",
      },
      caption: {
        en: "The device list filtered to warranties ending soon; the filters stay in the URL.",
        sk: "Zoznam zariadení s filtrom na končiace záruky; filtre zostávajú v URL.",
      },
    },
    {
      src: "/images/projects/wac-microfrontends/device-dark.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Device page of an MRI scanner in the dark theme with its form and operations log",
        sk: "Stránka zariadenia magnetickej rezonancie v tmavom režime s formulárom a prevádzkovým logom",
      },
      caption: {
        en: "A device page in the dark theme, with the form and the operations log.",
        sk: "Stránka zariadenia v tmavom režime, s formulárom a prevádzkovým logom.",
      },
    },
  ],
};
