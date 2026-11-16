import type { Text } from "./types";

type CvProject = {
  /** Title, link and years come from this project unless given below. */
  slug?: string;
  title?: Text;
  url?: string;
  years?: string;
  summary: Text;
  stack: string;
};

/**
 * Wording that only the one-page PDF CV uses. Everything else on the CV (contacts, roles and
 * dates, skills, languages, degrees, project links and years) comes from the shared content,
 * so the CV and the site cannot drift. `src/lib/cv-latex.ts` renders it into `latex/`.
 * `**text**` is bold.
 */
export const cv = {
  profile: {
    en: "Full-stack software engineer with years of experience in web and mobile development. I build software that is fast, accessible and easy to maintain, and I learn new technologies quickly. AI coding agents make me much faster in my daily work: I plan the work, build it with their help and review every change.",
    sk: "Full-stack vývojár s viacročnou praxou vo vývoji webových a mobilných aplikácií. Tvorím softvér, ktorý je rýchly, prístupný a ľahko udržiavateľný, a nové technológie sa učím rýchlo. AI agenti na programovanie ma v každodennej práci výrazne zrýchľujú: prácu naplánujem, s ich pomocou ju vytvorím a každú zmenu skontrolujem.",
    de: "Full-Stack-Entwickler mit mehrjähriger Erfahrung in der Web- und Mobile-Entwicklung. Ich baue Software, die schnell, barrierefrei und leicht wartbar ist, und lerne neue Technologien schnell. KI-Coding-Agenten machen mich in meiner täglichen Arbeit deutlich schneller: Ich plane die Arbeit, setze sie mit ihrer Hilfe um und prüfe jede Änderung.",
    cs: "Full-stack vývojář s několikaletou praxí ve vývoji webových a mobilních aplikací. Tvořím software, který je rychlý, přístupný a snadno udržovatelný, a nové technologie se učím rychle. AI agenti na programování mě v každodenní práci výrazně zrychlují: práci naplánuji, s jejich pomocí ji vytvořím a každou změnu zkontroluji.",
    hu: "Full-stack fejlesztő, többéves tapasztalattal webes és mobilalkalmazások fejlesztésében. Gyors, akadálymentes és könnyen karbantartható szoftvert készítek, és gyorsan tanulok új technológiákat. Az AI kódoló ágensek a mindennapi munkámban jóval gyorsabbá tesznek: megtervezem a munkát, a segítségükkel elkészítem, és minden változtatást átnézek.",
  } satisfies Text,

  /** Short bullets and the technology line per job, keyed by `Job.id`. */
  jobs: {
    "igt-systems": {
      highlights: [
        {
          en: "Responsible for the project management module of **Core3**, a business platform for projects, HR and CRM: kanban boards, task permissions, Scrum and Waterfall workflows.",
          sk: "Zodpovedal som za projektový manažment vo firemnej platforme **Core3**: kanban, oprávnenia, Scrum a Waterfall.",
          de: "Verantwortlich für das Projektmanagement-Modul von **Core3**, einer Unternehmensplattform für Projekte, HR und CRM: Kanban-Boards, Aufgabenberechtigungen, Scrum- und Wasserfall-Workflows.",
          cs: "Odpovídal jsem za modul projektového řízení ve firemní platformě **Core3** pro projekty, HR a CRM: kanban, oprávnění k úkolům, Scrum a Waterfall.",
          hu: "Én feleltem a **Core3** projektmenedzsment-moduljáért, amely egy projekt-, HR- és CRM-platform: kanban táblák, feladatjogosultságok, Scrum és vízesés munkafolyamatok.",
        },
        {
          en: "Optimized the slowest Core3 pages by fixing N+1 database queries, adding caching and loading data in the background.",
          sk: "Optimalizoval som najpomalšie stránky Core3: opravil N+1 dopyty, pridal cache a načítavanie na pozadí.",
          de: "Die langsamsten Core3-Seiten optimiert: N+1-Datenbankabfragen behoben, Caching ergänzt und Daten im Hintergrund geladen.",
          cs: "Optimalizoval jsem nejpomalejší stránky Core3: opravil N+1 dotazy do databáze, přidal cache a načítání na pozadí.",
          hu: "Optimalizáltam a Core3 leglassabb oldalait: kijavítottam az N+1 adatbázis-lekérdezéseket, gyorsítótárat és háttérbeli adatbetöltést vezettem be.",
        },
        {
          en: "Developed the **WYDO** sports app for Android and iOS in Kotlin Multiplatform, then moved its web version to React.",
          sk: "Vyvíjal som mobilnú aplikáciu **WYDO** pre Android a iOS v Kotlin Multiplatform a potom presunul jej web do Reactu.",
          de: "Die Sport-App **WYDO** für Android und iOS in Kotlin Multiplatform entwickelt und danach ihre Webversion auf React umgestellt.",
          cs: "Vyvíjel jsem sportovní aplikaci **WYDO** pro Android a iOS v Kotlin Multiplatform a potom převedl její webovou verzi do Reactu.",
          hu: "Kotlin Multiplatformban fejlesztettem a **WYDO** sportalkalmazást Androidra és iOS-re, majd a webes verzióját átvittem Reactre.",
        },
        {
          en: "Built the **CleanEEG** web app from scratch, including a WebGL viewer that compares raw and cleaned brain signals (EEG), and the frontend of **BDAP**, an analytics dashboard for an enterprise client.",
          sk: "Od nuly som vytvoril web **CleanEEG** s WebGL prehliadačom pôvodných a vyčistených mozgových signálov (EEG) a frontend **BDAP**, analytického dashboardu pre firemného klienta.",
          de: "Die Web-App **CleanEEG** von Grund auf gebaut, inklusive eines WebGL-Viewers, der rohe und bereinigte Hirnsignale (EEG) vergleicht, sowie das Frontend von **BDAP**, einem Analyse-Dashboard für einen Unternehmenskunden.",
          cs: "Od nuly jsem vytvořil webovou aplikaci **CleanEEG** s WebGL prohlížečem, který porovnává původní a vyčištěné mozkové signály (EEG), a frontend **BDAP**, analytického dashboardu pro firemního klienta.",
          hu: "A nulláról építettem fel a **CleanEEG** webalkalmazást, benne egy WebGL-nézegetővel, amely a nyers és a megtisztított agyi jeleket (EEG) hasonlítja össze, valamint a **BDAP** frontendjét, amely egy elemző dashboard egy nagyvállalati ügyfélnek.",
        },
      ],
      stack: [
        "React",
        "TypeScript",
        "TanStack",
        "Kotlin",
        "Spring Boot",
        "Elixir",
        "Phoenix LiveView",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    svarba: {
      highlights: [
        {
          en: "Developed the REST API of a new internal company system, a React web app that replaced several older PHP applications.",
          sk: "Vyvinul som REST API nového interného systému v Reacte, ktorý nahradil staršie PHP aplikácie.",
          de: "Die REST-API eines neuen internen Firmensystems entwickelt, einer React-Web-App, die mehrere ältere PHP-Anwendungen ersetzt hat.",
          cs: "Vyvinul jsem REST API nového interního firemního systému, webové aplikace v Reactu, která nahradila několik starších PHP aplikací.",
          hu: "Kifejlesztettem egy új belső céges rendszer REST API-ját. A rendszer egy React webalkalmazás, amely több régebbi PHP alkalmazást váltott le.",
        },
        {
          en: "Implemented real-time notifications, scheduled data imports and exports, and AI translations of product texts.",
          sk: "Implementoval som notifikácie v reálnom čase, plánované importy a exporty dát a AI preklady produktových textov.",
          de: "Echtzeit-Benachrichtigungen, geplante Datenimporte und -exporte sowie KI-Übersetzungen von Produkttexten umgesetzt.",
          cs: "Implementoval jsem notifikace v reálném čase, plánované importy a exporty dat a AI překlady produktových textů.",
          hu: "Valós idejű értesítéseket, ütemezett adatimportot és -exportot, valamint a terméktextek AI-alapú fordítását valósítottam meg.",
        },
      ],
      stack: [
        "TypeScript",
        "Node.js",
        "Express",
        "React",
        "MSSQL",
        "Redis",
        "Jest",
        "PHP",
        "Nette",
      ],
    },
    softpoint: {
      highlights: [
        {
          en: "Built ETL data pipelines in Airflow importing products, prices and stock from 20+ suppliers.",
          sk: "Vytvoril som ETL pipeline v Airflow na import produktov, cien a zásob od viac ako 20 dodávateľov.",
          de: "ETL-Datenpipelines in Airflow gebaut, die Produkte, Preise und Lagerbestände von über 20 Lieferanten importieren.",
          cs: "Vytvořil jsem ETL pipeline v Airflow pro import produktů, cen a zásob od více než 20 dodavatelů.",
          hu: "ETL adatpipeline-okat építettem Airflow-ban, amelyek több mint 20 beszállító termékeit, árait és készletét importálják.",
        },
        {
          en: "Automated ordering on 20 supplier web shops with headless-browser scripts in Ruby, a language I learned for this task.",
          sk: "Automatizoval som objednávanie v 20 e-shopoch dodávateľov skriptmi v Ruby, ktoré som sa kvôli tomu naučil.",
          de: "Bestellungen in 20 Lieferanten-Onlineshops mit Headless-Browser-Skripten in Ruby automatisiert, einer Sprache, die ich dafür gelernt habe.",
          cs: "Automatizoval jsem objednávání ve 20 e-shopech dodavatelů pomocí headless-browser skriptů v Ruby, které jsem se kvůli tomu naučil.",
          hu: "Automatizáltam a rendelést 20 beszállítói webáruházban headless böngészős Ruby szkriptekkel. A Rubyt ehhez a feladathoz tanultam meg.",
        },
      ],
      stack: ["Python", "Airflow", "pandas", "Selenium", "Ruby", "PostgreSQL", "FastAPI"],
    },
  } as Record<string, { highlights: Text[]; stack: string[] }>,

  /** Replaces the plain list of a skill group, keyed by `SkillGroup.id`. */
  skillLines: {
    ai: {
      en: "Agentic development with Claude Code and Codex (agents, skills, MCP servers), OpenAI API, PyTorch",
      sk: "Vývoj s AI agentmi v Claude Code a Codex (agenti, skills, MCP servery), OpenAI API, PyTorch",
      de: "Agentische Entwicklung mit Claude Code und Codex (Agenten, Skills, MCP-Server), OpenAI API, PyTorch",
      cs: "Vývoj s AI agenty v Claude Code a Codex (agenti, skills, MCP servery), OpenAI API, PyTorch",
      hu: "Ágensalapú fejlesztés Claude Code-dal és Codexszel (ágensek, skillek, MCP szerverek), OpenAI API, PyTorch",
    },
  } as Record<string, Text>,

  practices: {
    en: "REST APIs, a11y, i18n, l10n, SEO, performance optimization, UI/UX, automated testing, Scrum",
    sk: "REST API, a11y, i18n, l10n, SEO, optimalizácia výkonu, UI/UX, automatizované testovanie, Scrum",
    de: "REST-APIs, a11y, i18n, l10n, SEO, Performance-Optimierung, UI/UX, automatisierte Tests, Scrum",
    cs: "REST API, a11y, i18n, l10n, SEO, optimalizace výkonu, UI/UX, automatizované testování, Scrum",
    hu: "REST API-k, a11y, i18n, l10n, SEO, teljesítményoptimalizálás, UI/UX, automatizált tesztelés, Scrum",
  } satisfies Text,

  /** Keyed by `Degree.id`. */
  thesisLabels: {
    masters: {
      en: "Thesis",
      sk: "Diplomová práca",
      de: "Masterarbeit",
      cs: "Diplomová práce",
      hu: "Diplomamunka",
    },
    bachelors: {
      en: "Thesis",
      sk: "Bakalárska práca",
      de: "Bachelorarbeit",
      cs: "Bakalářská práce",
      hu: "Szakdolgozat",
    },
  } as Record<string, Text>,

  projects: [
    {
      slug: "smarttech-e-shop",
      summary: {
        en: "online shop with fuzzy search, checkout and admin area",
        sk: "e-shop s vyhľadávaním, košíkom a administráciou",
        de: "Onlineshop mit unscharfer Suche, Checkout und Adminbereich",
        cs: "e-shop s vyhledáváním, košíkem a administrací",
        hu: "webáruház hibatűrő kereséssel, fizetéssel és adminfelülettel",
      },
      stack: "Laravel",
    },
    {
      slug: "modern-fashion-store",
      summary: {
        en: "inventory dashboard with live updates",
        sk: "skladový dashboard so živými aktualizáciami",
        de: "Lager-Dashboard mit Live-Updates",
        cs: "skladový dashboard s živými aktualizacemi",
        hu: "raktárkezelő dashboard élő frissítésekkel",
      },
      stack: "Elixir, Phoenix",
    },
    {
      slug: "glaucoma-segmentation",
      title: {
        en: "Glaucoma segmentation",
        sk: "Segmentácia glaukómu",
        de: "Glaukom-Segmentierung",
        cs: "Segmentace glaukomu",
        hu: "Glaukóma-szegmentáció",
      },
      summary: {
        en: "master's thesis, neural networks for eye images",
        sk: "diplomová práca, neurónové siete pre snímky oka",
        de: "Masterarbeit, neuronale Netze für Augenaufnahmen",
        cs: "diplomová práce, neuronové sítě pro snímky oka",
        hu: "diplomamunka, neurális hálók szemfelvételekhez",
      },
      stack: "PyTorch",
    },
    {
      title: {
        en: "Portfolio website",
        sk: "Webová stránka portfólia",
        de: "Portfolio-Website",
        cs: "Webová stránka portfolia",
        hu: "Portfólió weboldal",
      },
      url: "https://akoskappel.dev/",
      years: "2026",
      summary: {
        en: "rebuilt with five older projects using AI coding agents",
        sk: "obnovené spolu s piatimi projektmi pomocou AI agentov",
        de: "zusammen mit fünf älteren Projekten mithilfe von KI-Coding-Agenten neu gebaut",
        cs: "přestavěno spolu s pěti staršími projekty pomocí AI agentů",
        hu: "öt régebbi projekttel együtt újraépítve AI kódoló ágensek segítségével",
      },
      stack: "Next.js",
    },
  ] as CvProject[],

  /** Linked by name in the closing line. */
  otherProjects: [
    "pokedex",
    "fakeshop",
    "feast-finder",
    "budget-master",
    "advent-of-code",
    "iridescent",
  ],

  labels: {
    profile: { en: "Profile", sk: "Profil", de: "Profil", cs: "Profil", hu: "Profil" },
    experience: {
      en: "Experience",
      sk: "Pracovné skúsenosti",
      de: "Berufserfahrung",
      cs: "Pracovní zkušenosti",
      hu: "Szakmai tapasztalat",
    },
    skills: {
      en: "Skills",
      sk: "Zručnosti",
      de: "Kenntnisse",
      cs: "Dovednosti",
      hu: "Készségek",
    },
    practices: {
      en: "Practices",
      sk: "Postupy",
      de: "Arbeitsweisen",
      cs: "Postupy",
      hu: "Módszerek",
    },
    languages: { en: "Languages", sk: "Jazyky", de: "Sprachen", cs: "Jazyky", hu: "Nyelvek" },
    education: {
      en: "Education",
      sk: "Vzdelanie",
      de: "Ausbildung",
      cs: "Vzdělání",
      hu: "Tanulmányok",
    },
    projects: {
      en: "Selected projects",
      sk: "Vybrané projekty",
      de: "Ausgewählte Projekte",
      cs: "Vybrané projekty",
      hu: "Válogatott projektek",
    },
    present: { en: "present", sk: "súčasnosť", de: "heute", cs: "současnost", hu: "jelenleg" },
    pdfTitle: { en: "CV", sk: "životopis", de: "Lebenslauf", cs: "životopis", hu: "önéletrajz" },
    otherProjects: {
      en: "Other projects include",
      sk: "Ďalšie projekty sú napríklad",
      de: "Weitere Projekte sind zum Beispiel",
      cs: "Další projekty jsou například",
      hu: "További projektek például",
    },
    and: { en: "and", sk: "a", de: "und", cs: "a", hu: "és" },
    findAll: {
      en: "You can find all of them and read more about me at",
      sk: "Všetky nájdete spolu s informáciami o mne na",
      de: "Alle Projekte und mehr über mich finden Sie auf",
      cs: "Všechny najdete spolu s informacemi o mně na",
      hu: "Mindegyiket megtalálja, és többet is megtudhat rólam itt:",
    },
  } satisfies Record<string, Text>,
};
