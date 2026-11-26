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
    en: "Full-stack software engineer with 3+ years of experience in web and mobile development. I build software that is fast, accessible and easy to maintain, and I learn new technologies quickly. I work well both independently and in a team. AI coding agents make me much faster in my daily work: I plan the work, build it with their help and review every change.",
    sk: "Full-stack vývojár s viac ako 3 rokmi praxe vo vývoji webových a mobilných aplikácií. Tvorím softvér, ktorý je rýchly, prístupný a ľahko udržiavateľný, a nové technológie sa učím rýchlo. Dobre pracujem samostatne aj v tíme. AI agenti na programovanie ma v každodennej práci výrazne zrýchľujú: prácu naplánujem, s ich pomocou ju vytvorím a každú zmenu skontrolujem.",
    de: "Full-Stack-Entwickler mit über 3 Jahren Erfahrung in der Web- und Mobile-Entwicklung. Ich baue Software, die schnell, barrierefrei und leicht wartbar ist, und lerne neue Technologien schnell. Ich arbeite gut selbstständig wie auch im Team. KI-Coding-Agenten machen mich in meiner täglichen Arbeit deutlich schneller: Ich plane die Arbeit, setze sie mit ihrer Hilfe um und prüfe jede Änderung.",
    cs: "Full-stack vývojář s více než 3 lety praxe ve vývoji webových a mobilních aplikací. Tvořím software, který je rychlý, přístupný a snadno udržovatelný, a nové technologie se učím rychle. Dobře pracuji samostatně i v týmu. AI agenti na programování mě v každodenní práci výrazně zrychlují: práci naplánuji, s jejich pomocí ji vytvořím a každou změnu zkontroluji.",
    hu: "Full-stack fejlesztő, több mint 3 év tapasztalattal webes és mobilalkalmazások fejlesztésében. Gyors, akadálymentes és könnyen karbantartható szoftvert készítek, és gyorsan tanulok új technológiákat. Önállóan és csapatban is jól dolgozom. Az AI kódoló ágensek a mindennapi munkámban jóval gyorsabbá tesznek: megtervezem a munkát, a segítségükkel elkészítem, és minden változtatást átnézek.",
  } satisfies Text,

  /** Short bullets and the technology line per job, keyed by `Job.id`. */
  jobs: {
    "igt-systems": {
      highlights: [
        {
          en: "Owned the project management module of **Core3**, a business platform for projects, HR and CRM, in a team of 8: kanban boards, task permissions, Scrum and Waterfall workflows.",
          sk: "Zodpovedal som za modul projektového riadenia platformy **Core3** v tíme 8 ľudí: kanban, oprávnenia, Scrum, Waterfall.",
          de: "Verantwortlich für das Projektmanagement-Modul von **Core3**, einer Unternehmensplattform für Projekte, HR und CRM, in einem Team von 8 Entwicklern: Kanban-Boards, Aufgabenberechtigungen, Scrum- und Wasserfall-Workflows.",
          cs: "Odpovídal jsem za modul projektového řízení ve firemní platformě **Core3** pro projekty, HR a CRM v týmu 8 vývojářů: kanban, oprávnění k úkolům, Scrum a Waterfall.",
          hu: "Egy 8 fős csapatban én feleltem a **Core3** projektmenedzsment-moduljáért, amely egy projekt-, HR- és CRM-platform: kanban táblák, feladatjogosultságok, Scrum és vízesés munkafolyamatok.",
        },
        {
          en: "Sped up the slowest Core3 pages after user complaints: fixed N+1 queries, added caching and background loading.",
          sk: "Po sťažnostiach používateľov som zrýchlil najpomalšie stránky Core3: N+1 dopyty, cache a načítavanie na pozadí.",
          de: "Die langsamsten Core3-Seiten nach Nutzerbeschwerden beschleunigt: N+1-Abfragen behoben, Caching und Laden im Hintergrund.",
          cs: "Po stížnostech uživatelů jsem zrychlil nejpomalejší stránky Core3: N+1 dotazy, cache a načítání na pozadí.",
          hu: "Felhasználói panaszok után felgyorsítottam a Core3 leglassabb oldalait: N+1 lekérdezések, gyorsítótár, háttérbetöltés.",
        },
        {
          en: "Started the **WYDO** sports app in Kotlin Multiplatform and its React web app; top contributor in a team of 3.",
          sk: "Založil som športovú aplikáciu **WYDO** v Kotlin Multiplatform aj jej web v Reacte; hlavný vývojár v tíme troch.",
          de: "Die Sport-App **WYDO** in Kotlin Multiplatform und ihre React-Web-App gestartet; Hauptentwickler im Dreierteam.",
          cs: "Založil jsem sportovní aplikaci **WYDO** v Kotlin Multiplatform i její web v Reactu; hlavní vývojář v týmu tří.",
          hu: "Elindítottam a **WYDO** sportalkalmazást Kotlin Multiplatformban és a React webappját; fő fejlesztő egy háromfős csapatban.",
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
          en: "Wrote most of the REST API and its 200+ tests for a new internal system that replaced older PHP apps.",
          sk: "Napísal som väčšinu REST API a 200+ testov pre nový interný systém, ktorý nahradil staršie PHP aplikácie.",
          de: "Den Großteil der REST-API und über 200 Tests für ein neues internes System geschrieben, das ältere PHP-Apps ablöste.",
          cs: "Napsal jsem většinu REST API a 200+ testů pro nový interní systém, který nahradil starší PHP aplikace.",
          hu: "Én írtam egy új belső rendszer REST API-jának nagy részét és több mint 200 tesztjét; a rendszer régebbi PHP-alkalmazásokat váltott le.",
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
      slug: "skysense",
      summary: {
        en: "weather app that answers when to go out and how sure the forecast is",
        sk: "aplikácia o počasí, ktorá odpovedá, kedy ísť von a ako istá je predpoveď",
        de: "Wetter-App, die beantwortet, wann man rausgeht und wie sicher die Vorhersage ist",
        cs: "aplikace o počasí, která odpovídá, kdy jít ven a jak jistá je předpověď",
        hu: "időjárás-app, amely megmondja, mikor érdemes kimenni és mennyire biztos az előrejelzés",
      },
      stack: "SvelteKit",
    },
    {
      slug: "feast-finder",
      summary: {
        en: "recipe finder that also searches by what is in your fridge",
        sk: "vyhľadávač receptov aj podľa toho, čo je v chladničke",
        de: "Rezeptsuche, auch nach dem, was im Kühlschrank ist",
        cs: "vyhledávač receptů i podle toho, co je v lednici",
        hu: "receptkereső, akár a hűtő tartalma alapján is",
      },
      stack: "Nuxt",
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
      slug: "budget-master",
      summary: {
        en: "personal finance app with shared budgets and live sync",
        sk: "aplikácia na osobné financie so zdieľanými rozpočtami",
        de: "Finanz-App mit geteilten Budgets und Live-Synchronisierung",
        cs: "aplikace na osobní finance se sdílenými rozpočty a živou synchronizací",
        hu: "személyes pénzügyi app megosztott költségvetésekkel és élő szinkronnal",
      },
      stack: "React, PostgreSQL",
    },
  ] as CvProject[],

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
    more: {
      en: "Find more about me, my projects and my skills at",
      sk: "Viac o mne, mojich projektoch a zručnostiach nájdete na",
      de: "Mehr über mich, meine Projekte und meine Kenntnisse finden Sie auf",
      cs: "Více o mně, mých projektech a dovednostech najdete na",
      hu: "Többet rólam, a projektjeimről és a készségeimről itt talál:",
    },
  } satisfies Record<string, Text>,
};
