import type { FlagCode } from "@/components/ui/flags";
import type { Locale } from "@/i18n/routing";
import type { Text, WorkflowStep } from "./types";

export const site = {
  name: "Ákos Kappel",
  title: "Ing.",
  phone: "+421 918 727 886",
  headline: "Full-Stack Software Engineer",
  /** The main stack, shown under the headline. */
  stack: ["TypeScript", "React", "TanStack", "Tailwind CSS", "Node.js", "PostgreSQL"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akoskappel.dev",
  // Kept apart and joined in a getter, which the minifier cannot fold, so the bundled
  // JavaScript never holds the address as one string. Pages render it through EmailLink.
  emailParts: ["kappelakos", "gmail.com"],
  get email() {
    return this.emailParts.join("@");
  },
  repository: "https://github.com/AkosKappel/portfolio",
  location: {
    en: "Bratislava, Slovakia",
    sk: "Bratislava, Slovensko",
    de: "Bratislava, Slowakei",
    cs: "Bratislava, Slovensko",
    hu: "Pozsony, Szlovákia",
  } satisfies Text,
  /** Also the meta description. Keep the years in step with `experienceYears` (tested). */
  intro: {
    en: "Full-stack software engineer with 3+ years of experience building web and mobile products: React and TypeScript frontends, Kotlin and Elixir backends, and Kotlin Multiplatform apps for Android and iOS. I take projects from planning through implementation and testing to deployment, and I care about fast, accessible interfaces and code that is easy to extend. I work with AI coding agents in a planned, test-backed workflow, which lets me deliver faster while I review and own every change.",
    sk: "Full-stack vývojár s viac ako 3 rokmi praxe vo vývoji webových a mobilných produktov: frontendy v Reacte a TypeScripte, backendy v Kotline a Elixire a aplikácie pre Android a iOS v Kotlin Multiplatform. Projekty dotiahnem od plánovania cez implementáciu a testovanie až po nasadenie a záleží mi na rýchlych, prístupných rozhraniach a kóde, ktorý sa dá ľahko rozširovať. Pracujem s AI agentmi v naplánovanom procese podloženom testami, vďaka čomu dodávam rýchlejšie, no každú zmenu kontrolujem a zodpovedám za ňu.",
    de: "Full-Stack-Entwickler mit über 3 Jahren Erfahrung in der Entwicklung von Web- und Mobile-Produkten: Frontends mit React und TypeScript, Backends mit Kotlin und Elixir sowie Apps für Android und iOS mit Kotlin Multiplatform. Ich begleite Projekte von der Planung über Umsetzung und Tests bis zum Deployment und lege Wert auf schnelle, barrierefreie Oberflächen und Code, der sich leicht erweitern lässt. Ich arbeite mit KI-Coding-Agenten in einem geplanten, durch Tests abgesicherten Ablauf. So liefere ich schneller, und jede Änderung prüfe und verantworte ich selbst.",
    cs: "Full-stack vývojář s více než 3 lety praxe ve vývoji webových a mobilních produktů: frontendy v Reactu a TypeScriptu, backendy v Kotlinu a Elixiru a aplikace pro Android a iOS v Kotlin Multiplatform. Projekty dotáhnu od plánování přes implementaci a testování až po nasazení a záleží mi na rychlých, přístupných rozhraních a kódu, který se dá snadno rozšiřovat. Pracuji s AI agenty v naplánovaném procesu podloženém testy, díky čemuž dodávám rychleji, ale každou změnu kontroluji a odpovídám za ni.",
    hu: "Full-stack fejlesztő, több mint 3 év tapasztalattal webes és mobilos termékek fejlesztésében: React és TypeScript frontendek, Kotlin és Elixir backendek, valamint Android- és iOS-alkalmazások Kotlin Multiplatformban. A projekteket a tervezéstől a megvalósításon és a tesztelésen át az élesítésig viszem végig, és fontosak számomra a gyors, akadálymentes felületek és a könnyen bővíthető kód. AI kódoló ágensekkel dolgozom egy megtervezett, tesztekkel alátámasztott folyamatban, így gyorsabban szállítok, de minden változtatást átnézek, és vállalom érte a felelősséget.",
  } satisfies Text,
  timezone: {
    en: "CET (UTC+1)",
    sk: "SEČ (UTC+1)",
    de: "MEZ (UTC+1)",
    cs: "SEČ (UTC+1)",
    hu: "CET (UTC+1)",
  } satisfies Text,
  /** The stages shown on the home page, each one done with AI coding agents. */
  workflow: [
    {
      id: "define",
      title: { en: "Define", sk: "Zadanie", de: "Definieren", cs: "Zadání", hu: "Meghatározás" },
      text: {
        en: "Understand the problem and agree on what to build and how we will know it works.",
        sk: "Pochopiť problém a dohodnúť sa, čo postaviť a podľa čoho spoznáme, že to funguje.",
        de: "Das Problem verstehen und festlegen, was gebaut wird und woran wir erkennen, dass es funktioniert.",
        cs: "Pochopit problém a domluvit se, co postavit a podle čeho poznáme, že to funguje.",
        hu: "Megérteni a problémát, és megegyezni, mit készítünk, és miből látjuk majd, hogy működik.",
      },
    },
    {
      id: "plan",
      title: { en: "Plan", sk: "Plánovanie", de: "Planen", cs: "Plánování", hu: "Tervezés" },
      text: {
        en: "Split the work into small tasks and sketch the architecture.",
        sk: "Rozdeliť prácu na malé úlohy a navrhnúť architektúru.",
        de: "Die Arbeit in kleine Aufgaben aufteilen und die Architektur skizzieren.",
        cs: "Rozdělit práci na malé úkoly a navrhnout architekturu.",
        hu: "A munkát kis feladatokra bontani, és felvázolni az architektúrát.",
      },
    },
    {
      id: "build",
      title: { en: "Build", sk: "Vývoj", de: "Entwickeln", cs: "Vývoj", hu: "Fejlesztés" },
      text: {
        en: "Frontend, backend and database, with types checked from end to end.",
        sk: "Frontend, backend aj databáza, s typmi kontrolovanými od začiatku do konca.",
        de: "Frontend, Backend und Datenbank, mit durchgehend geprüften Typen.",
        cs: "Frontend, backend i databáze, s typy kontrolovanými od začátku do konce.",
        hu: "Frontend, backend és adatbázis, végig ellenőrzött típusokkal.",
      },
    },
    {
      id: "test",
      title: { en: "Test", sk: "Testovanie", de: "Testen", cs: "Testování", hu: "Tesztelés" },
      text: {
        en: "Unit, integration and end-to-end tests, plus accessibility checks.",
        sk: "Unit, integračné a end-to-end testy, plus kontrola prístupnosti.",
        de: "Unit-, Integrations- und End-to-End-Tests sowie Prüfungen der Barrierefreiheit.",
        cs: "Unit, integrační a end-to-end testy a k tomu kontrola přístupnosti.",
        hu: "Unit-, integrációs és end-to-end tesztek, valamint akadálymentességi ellenőrzés.",
      },
    },
    {
      id: "ship",
      title: { en: "Ship", sk: "Nasadenie", de: "Ausliefern", cs: "Nasazení", hu: "Élesítés" },
      text: {
        en: "Containers, CI/CD pipelines and deployments to the cloud or my own server.",
        sk: "Kontajnery, CI/CD pipeline a nasadenie do cloudu alebo na vlastný server.",
        de: "Container, CI/CD-Pipelines und Deployments in die Cloud oder auf meinen eigenen Server.",
        cs: "Kontejnery, CI/CD pipeline a nasazení do cloudu nebo na vlastní server.",
        hu: "Konténerek, CI/CD pipeline-ok és telepítés a felhőbe vagy a saját szerveremre.",
      },
    },
    {
      id: "run",
      title: { en: "Run", sk: "Prevádzka", de: "Betreiben", cs: "Provoz", hu: "Üzemeltetés" },
      text: {
        en: "Monitoring, updates and the next round of improvements.",
        sk: "Monitorovanie, aktualizácie a ďalšie vylepšenia.",
        de: "Monitoring, Updates und die nächste Runde an Verbesserungen.",
        cs: "Monitorování, aktualizace a další vylepšení.",
        hu: "Monitorozás, frissítések és a következő fejlesztési kör.",
      },
    },
  ] satisfies WorkflowStep[],
  about: [
    {
      id: "how-i-work",
      title: {
        en: "How I work",
        sk: "Ako pracujem",
        de: "Wie ich arbeite",
        cs: "Jak pracuji",
        hu: "Hogyan dolgozom",
      },
      paragraphs: [
        {
          en: "I work across the whole stack, from the database and the API to the interface people actually use. Before I write code I like to understand the problem and sketch the solution, and I leave tests behind so the next change is safe. I work well on my own and in a team: I take personal projects from the first idea to deployment alone, and at work I share reviews, decisions and knowledge with my colleagues.",
          sk: "Pracujem naprieč celým stackom, od databázy a API až po rozhranie, ktoré ľudia naozaj používajú. Kým začnem programovať, chcem pochopiť problém a načrtnúť riešenie, a nechávam po sebe testy, aby bola ďalšia zmena bezpečná. Dobre pracujem samostatne aj v tíme: osobné projekty dotiahnem sám od prvého nápadu po nasadenie a v práci s kolegami zdieľam code review, rozhodnutia aj vedomosti.",
          de: "Ich arbeite über den gesamten Stack, von der Datenbank und der API bis zur Oberfläche, die Menschen tatsächlich nutzen. Bevor ich Code schreibe, will ich das Problem verstehen und die Lösung skizzieren, und ich hinterlasse Tests, damit die nächste Änderung sicher ist. Ich arbeite gut allein und im Team: Eigene Projekte bringe ich allein von der ersten Idee bis zum Deployment, und in der Arbeit teile ich Code-Reviews, Entscheidungen und Wissen mit meinen Kollegen.",
          cs: "Pracuji napříč celým stackem, od databáze a API až po rozhraní, které lidé skutečně používají. Než začnu programovat, chci pochopit problém a načrtnout řešení, a nechávám po sobě testy, aby byla další změna bezpečná. Dobře pracuji samostatně i v týmu: osobní projekty dotáhnu sám od prvního nápadu po nasazení a v práci s kolegy sdílím code review, rozhodnutí i znalosti.",
          hu: "A teljes stacken dolgozom, az adatbázistól és az API-tól egészen a felületig, amelyet az emberek ténylegesen használnak. Mielőtt kódot írok, szeretem megérteni a problémát és felvázolni a megoldást, és teszteket hagyok magam után, hogy a következő változtatás biztonságos legyen. Önállóan és csapatban is jól dolgozom: a saját projektjeimet egyedül viszem végig az első ötlettől a telepítésig, a munkahelyemen pedig a kollégáimmal közösen nézzük át a kódot, hozzuk a döntéseket és osztjuk meg a tudást.",
        },
        {
          en: "AI coding agents make me much faster in my daily work. I plan the work, build it with their help and review every change, the same way I would review a colleague's code. I work with Claude Code and Codex, using agents, skills and MCP servers.",
          sk: "AI agenti na programovanie ma v každodennej práci výrazne zrýchľujú. Prácu naplánujem, s ich pomocou ju vytvorím a každú zmenu skontrolujem rovnako, ako by som kontroloval kód kolegu. Pracujem s Claude Code a Codex a využívam agentov, skills a MCP servery.",
          de: "KI-Coding-Agenten machen mich in meiner täglichen Arbeit deutlich schneller. Ich plane die Arbeit, setze sie mit ihrer Hilfe um und prüfe jede Änderung so, wie ich den Code eines Kollegen prüfen würde. Ich arbeite mit Claude Code und Codex und nutze dabei Agenten, Skills und MCP-Server.",
          cs: "AI agenti na programování mě v každodenní práci výrazně zrychlují. Práci naplánuji, s jejich pomocí ji vytvořím a každou změnu zkontroluji stejně, jako bych kontroloval kód kolegy. Pracuji s Claude Code a Codex a využívám agenty, skills a MCP servery.",
          hu: "Az AI kódoló ágensek a mindennapi munkámban jóval gyorsabbá tesznek. Megtervezem a munkát, a segítségükkel elkészítem, és minden változtatást átnézek, ugyanúgy, ahogy egy kolléga kódját nézném át. Claude Code-dal és Codexszel dolgozom, ágenseket, skilleket és MCP szervereket használva.",
        },
      ],
    },
    {
      id: "what-i-enjoy",
      title: {
        en: "What I enjoy",
        sk: "Čo ma baví",
        de: "Was mir Spaß macht",
        cs: "Co mě baví",
        hu: "Amit szeretek",
      },
      paragraphs: [
        {
          en: "The details users feel without noticing them: a page that loads faster than expected, search that understands a typo, a transition that shows where you came from, a form that works with the keyboard, an app that keeps working offline.",
          sk: "Detaily, ktoré používatelia cítia, aj keď si ich nevšimnú: stránka, ktorá sa načíta rýchlejšie, než čakali, vyhľadávanie, ktoré rozumie preklepu, prechod, ktorý ukáže, odkiaľ prišli, formulár, ktorý funguje s klávesnicou, aplikácia, ktorá funguje aj offline.",
          de: "Die Details, die Nutzer spüren, ohne sie zu bemerken: eine Seite, die schneller lädt als erwartet, eine Suche, die einen Tippfehler versteht, ein Übergang, der zeigt, woher man kommt, ein Formular, das mit der Tastatur funktioniert, eine App, die auch offline weiterläuft.",
          cs: "Detaily, které uživatelé cítí, i když si jich nevšimnou: stránka, která se načte rychleji, než čekali, vyhledávání, které rozumí překlepu, přechod, který ukáže, odkud přišli, formulář, který funguje s klávesnicí, aplikace, která funguje i offline.",
          hu: "Azok a részletek, amelyeket a felhasználók éreznek, még ha észre sem veszik őket: egy oldal, amely gyorsabban betölt, mint várták, egy keresés, amely megérti az elírást, egy átmenet, amely megmutatja, honnan jöttek, egy űrlap, amely billentyűzettel is működik, egy alkalmazás, amely offline is működik.",
        },
        {
          en: "I also like the work behind it: finding why a page is slow, putting an app into a container and onto a server, and making accessibility and SEO part of the build instead of an afterthought.",
          sk: "Baví ma aj práca za tým: zistiť, prečo je stránka pomalá, zabaliť aplikáciu do kontajnera a nasadiť ju na server, a robiť prístupnosť a SEO súčasťou vývoja, nie dodatočnou úlohou.",
          de: "Mir gefällt auch die Arbeit dahinter: herausfinden, warum eine Seite langsam ist, eine App in einen Container packen und auf einen Server bringen, und Barrierefreiheit und SEO von Anfang an mitdenken statt nachträglich.",
          cs: "Baví mě i práce za tím: zjistit, proč je stránka pomalá, zabalit aplikaci do kontejneru a nasadit ji na server, a dělat z přístupnosti a SEO součást vývoje, ne dodatečný úkol.",
          hu: "A mögötte lévő munkát is szeretem: kideríteni, miért lassú egy oldal, konténerbe csomagolni és szerverre telepíteni egy alkalmazást, és az akadálymentességet és a SEO-t a fejlesztés részévé tenni, nem utólagos feladattá.",
        },
      ],
    },
    {
      id: "how-i-got-here",
      title: {
        en: "How I got here",
        sk: "Ako som sa sem dostal",
        de: "Mein Weg hierher",
        cs: "Jak jsem se sem dostal",
        hu: "Hogyan jutottam ide",
      },
      paragraphs: [
        {
          en: "I studied computer science at the Faculty of Informatics and Information Technologies in Bratislava and then intelligent software systems, where my master's thesis used neural networks to help detect glaucoma in eye images.",
          sk: "Študoval som informatiku na Fakulte informatiky a informačných technológií v Bratislave a potom inteligentné softvérové systémy, kde som v diplomovej práci použil neurónové siete na pomoc pri odhaľovaní glaukómu na snímkach oka.",
          de: "Ich habe Informatik an der Fakultät für Informatik und Informationstechnologien in Bratislava studiert und danach Intelligente Softwaresysteme. In meiner Masterarbeit habe ich neuronale Netze eingesetzt, um Glaukom auf Augenaufnahmen besser zu erkennen.",
          cs: "Studoval jsem informatiku na Fakultě informatiky a informačních technologií v Bratislavě a potom inteligentní softwarové systémy, kde jsem v diplomové práci použil neuronové sítě jako pomoc při odhalování glaukomu na snímcích oka.",
          hu: "Informatikát tanultam a pozsonyi Informatikai és Információtechnológiai Karon, majd intelligens szoftverrendszereket, ahol a diplomamunkámban neurális hálókat használtam a glaukóma felismerésének segítésére szemfelvételeken.",
        },
        {
          en: "My first job was in Python, building data pipelines for a large e-shop, where I also learned Ruby for an automation task. Then I built a REST API and React app as a full-stack developer, and at IGT Systems I learned Elixir and Kotlin Multiplatform for new projects. Picking up a new stack when a project needs it has become a normal part of my work.",
          sk: "Prvá práca bola v Pythone, dátové pipeline pre veľký e-shop, kde som sa kvôli automatizácii naučil aj Ruby. Potom som ako full-stack vývojár robil REST API a aplikáciu v Reacte a v IGT Systems som sa pre nové projekty naučil Elixir a Kotlin Multiplatform. Naučiť sa nový stack, keď ho projekt potrebuje, je pre mňa bežná súčasť práce.",
          de: "Mein erster Job war in Python: Datenpipelines für einen großen Onlineshop, wo ich für eine Automatisierungsaufgabe auch Ruby gelernt habe. Danach habe ich als Full-Stack-Entwickler eine REST-API und eine React-App gebaut, und bei IGT Systems habe ich für neue Projekte Elixir und Kotlin Multiplatform gelernt. Einen neuen Stack zu lernen, wenn ein Projekt ihn braucht, ist für mich ein normaler Teil der Arbeit geworden.",
          cs: "První práce byla v Pythonu, datové pipeline pro velký e-shop, kde jsem se kvůli automatizaci naučil i Ruby. Potom jsem jako full-stack vývojář dělal REST API a aplikaci v Reactu a v IGT Systems jsem se pro nové projekty naučil Elixir a Kotlin Multiplatform. Naučit se nový stack, když ho projekt potřebuje, je pro mě běžná součást práce.",
          hu: "Az első munkahelyemen Pythonban dolgoztam, adatpipeline-okat építettem egy nagy webáruháznak, ahol egy automatizálási feladat miatt a Rubyt is megtanultam. Utána full-stack fejlesztőként REST API-t és React alkalmazást készítettem, az IGT Systemsnél pedig új projektekhez megtanultam az Elixirt és a Kotlin Multiplatformot. Új stacket tanulni, amikor egy projektnek szüksége van rá, a munkám természetes része lett.",
        },
      ],
    },
    {
      id: "outside-work",
      title: {
        en: "Outside work",
        sk: "Mimo práce",
        de: "Außerhalb der Arbeit",
        cs: "Mimo práci",
        hu: "Munkán kívül",
      },
      paragraphs: [
        {
          en: "I like tech beyond my job too. I follow new technologies and tech news, run my project demos on my own home server with Docker, Tailscale and monitoring, and every December I solve Advent of Code, each year in a different programming language. Lately I have started building small gadgets for fun, drawn to things like Raspberry Pi and 3D printing, to learn more about the hardware side.",
          sk: "Technika ma baví aj mimo práce. Sledujem nové technológie a technologické novinky, demá svojich projektov prevádzkujem na vlastnom domácom serveri s Dockerom, Tailscale a monitorovaním a každý december riešim Advent of Code, každý rok v inom programovacom jazyku. Nedávno som si pre zábavu začal staviať malé zariadenia, lákajú ma najmä Raspberry Pi a 3D tlač, a tak lepšie spoznávam aj hardvér.",
          de: "Technik begeistert mich auch außerhalb des Jobs. Ich verfolge neue Technologien und Tech-News, betreibe die Demos meiner Projekte auf meinem eigenen Heimserver mit Docker, Tailscale und Monitoring, und jeden Dezember löse ich Advent of Code, jedes Jahr in einer anderen Programmiersprache. Seit Kurzem baue ich zum Spaß kleine Geräte, vor allem mit Raspberry Pi und 3D-Druck, um die Hardware-Seite besser kennenzulernen.",
          cs: "Technika mě baví i mimo práci. Sleduji nové technologie a technologické novinky, dema svých projektů provozuji na vlastním domácím serveru s Dockerem, Tailscale a monitorováním a každý prosinec řeším Advent of Code, každý rok v jiném programovacím jazyce. Nedávno jsem si pro zábavu začal stavět malá zařízení, lákají mě hlavně Raspberry Pi a 3D tisk, a tak lépe poznávám i hardware.",
          hu: "A technika a munkán kívül is érdekel. Követem az új technológiákat és a tech híreket, a projektjeim demóit a saját otthoni szerveremen futtatom Dockerrel, Tailscale-lel és monitorozással, és minden decemberben megoldom az Advent of Code feladatait, minden évben más programozási nyelven. Mostanában szórakozásból kis eszközöket kezdtem építeni, főleg a Raspberry Pi és a 3D nyomtatás vonz, így a hardveres oldalt is jobban megismerem.",
        },
        {
          en: "I like to stay active, whether it is football, climbing or another sport. Travelling is one of my favourite things. I enjoy exploring places I have not been to yet and seeing how life works there. On the side, I am learning Spanish, just for the joy of it.",
          sk: "Rád sa hýbem, či už pri futbale, lezení alebo inom športe. Cestovanie patrí k mojim najobľúbenejším veciam. Rád objavujem miesta, kde som ešte nebol, a spoznávam, ako sa tam žije. Popritom sa učím španielčinu, len tak pre radosť.",
          de: "Ich bewege mich gern, ob beim Fußball, beim Klettern oder bei einem anderen Sport. Reisen gehört zu meinen liebsten Dingen. Ich entdecke gern Orte, an denen ich noch nicht war, und schaue, wie das Leben dort funktioniert. Nebenbei lerne ich Spanisch, einfach aus Freude daran.",
          cs: "Rád se hýbu, ať už u fotbalu, lezení nebo jiného sportu. Cestování patří k mým nejoblíbenějším věcem. Rád objevuji místa, kde jsem ještě nebyl, a poznávám, jak se tam žije. Vedle toho se učím španělštinu, jen tak pro radost.",
          hu: "Szeretek aktív maradni, legyen szó fociról, mászásról vagy más sportról. Az utazás az egyik kedvenc dolgom. Szívesen fedezek fel olyan helyeket, ahol még nem jártam, és megnézem, hogyan élnek ott az emberek. Mellette spanyolul tanulok, csak úgy, kedvtelésből.",
        },
      ],
    },
  ] satisfies { id: string; title: Text; paragraphs: Text[] }[],
  availability: {
    en: "Open to remote roles anywhere, hybrid roles in the EU and relocation.",
    sk: "Otvorený pracovným ponukám na diaľku odkiaľkoľvek, hybridne v rámci EÚ aj relokácii.",
    de: "Offen für Remote-Stellen weltweit, hybride Stellen in der EU und einen Umzug.",
    cs: "Otevřený pracovním nabídkám na dálku odkudkoli, hybridně v rámci EU i relokaci.",
    hu: "Nyitott vagyok távmunkára bárhonnan, hibrid munkára az EU-n belül és költözésre is.",
  } satisfies Text,
  links: {
    github: "https://github.com/AkosKappel",
    gitlab: "https://gitlab.com/AkosKappel",
    linkedin: "https://www.linkedin.com/in/akos-kappel",
    buyMeACoffee: "https://buymeacoffee.com/akoskappel",
    status: "https://stats.uptimerobot.com/ij6rbxvfcb",
  },
  /** PDFs and their page images, both built by `scripts/build-cv.sh`. */
  cv: [
    { locale: "en", href: "/CV_Akos_Kappel_(EN).pdf", pages: ["/images/cv/cv-en-1.webp"] },
    { locale: "sk", href: "/CV_Akos_Kappel_(SK).pdf", pages: ["/images/cv/cv-sk-1.webp"] },
  ] satisfies { locale: Locale; href: string; pages: string[] }[],
  languages: [
    {
      flag: "sk",
      name: { en: "Slovak", sk: "Slovenčina", de: "Slowakisch", cs: "Slovenština", hu: "Szlovák" },
      level: {
        en: "Native",
        sk: "Rodný jazyk",
        de: "Muttersprache",
        cs: "Rodný jazyk",
        hu: "Anyanyelv",
      },
    },
    {
      flag: "hu",
      name: { en: "Hungarian", sk: "Maďarčina", de: "Ungarisch", cs: "Maďarština", hu: "Magyar" },
      level: { en: "Fluent", sk: "Plynulo", de: "Fließend", cs: "Plynule", hu: "Folyékony" },
      cefr: "C2",
    },
    {
      flag: "en",
      name: { en: "English", sk: "Angličtina", de: "Englisch", cs: "Angličtina", hu: "Angol" },
      level: {
        en: "Advanced",
        sk: "Pokročilý",
        de: "Fortgeschritten",
        cs: "Pokročilý",
        hu: "Haladó",
      },
      cefr: "C1",
    },
    {
      flag: "de",
      name: { en: "German", sk: "Nemčina", de: "Deutsch", cs: "Němčina", hu: "Német" },
      level: { en: "Basic", sk: "Základy", de: "Grundkenntnisse", cs: "Základy", hu: "Alapszint" },
      cefr: "A2",
    },
  ] satisfies { flag: FlagCode; name: Text; level: Text; cefr?: string }[],
} as const;

/**
 * Main navigation; labels come from the "nav" messages. On wide screens the header shows
 * Contact as a button next to the other links, the mobile menu lists it with them.
 */
export const navigation = [
  { href: "/projects", key: "projects" },
  { href: "/experience", key: "experience" },
  { href: "/skills", key: "skills" },
  { href: "/education", key: "education" },
  { href: "/activity", key: "activity" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/** Pages linked from the footer only. */
export const secondaryNavigation = [
  { href: "/cv", key: "cv" },
  { href: "/colophon", key: "colophon" },
  { href: "/assistant", key: "assistant" },
  { href: "/terminal", key: "terminal" },
] as const;
