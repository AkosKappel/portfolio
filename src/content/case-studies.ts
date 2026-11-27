import { jobs } from "./experience";
import type { CaseStudy, Job, WorkItem } from "./types";

/**
 * Detail pages for work projects. They describe the problem, my part and the approach in my own
 * words, without internal names, code or screenshots the employer has not cleared.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "core3",
    summary: {
      en: "Business platform with nine modules, from project management to a warehouse. I started the ticketing and HR modules, work mainly on project management and build features across the platform.",
      sk: "Firemná platforma s deviatimi modulmi, od projektového riadenia po sklad. Založil som moduly ticketingu a HR, hlavne pracujem na projektovom riadení a robím funkcie naprieč celou platformou.",
      de: "Unternehmensplattform mit neun Modulen, vom Projektmanagement bis zum Lager. Ich habe die Module Ticketing und HR begonnen, arbeite vor allem am Projektmanagement und baue Funktionen in der ganzen Plattform.",
      cs: "Firemní platforma s devíti moduly, od projektového řízení po sklad. Založil jsem moduly ticketingu a HR, hlavně pracuji na projektovém řízení a dělám funkce napříč celou platformou.",
      hu: "Üzleti platform kilenc modullal, a projektmenedzsmenttől a raktárig. Én indítottam a ticketing és a HR modult, főleg a projektmenedzsmenten dolgozom, és az egész platformon készítek funkciókat.",
    },
    description: [
      {
        en: "Core3 is a modular business platform built with Elixir and Phoenix LiveView. Its modules cover project management, ticketing, HR, attendance, finance, CRM, employee benefits, planning and a warehouse, on a shared core with settings, search and permissions. I work on it in a team of 8 developers.",
        sk: "Core3 je modulárna firemná platforma postavená na Elixire a Phoenix LiveView. Jej moduly pokrývajú projektové riadenie, ticketing, HR, dochádzku, financie, CRM, zamestnanecké benefity, plánovanie a sklad, nad spoločným jadrom s nastaveniami, vyhľadávaním a oprávneniami. Pracujem na nej v tíme 8 vývojárov.",
        de: "Core3 ist eine modulare Unternehmensplattform auf Basis von Elixir und Phoenix LiveView. Ihre Module decken Projektmanagement, Ticketing, HR, Anwesenheit, Finanzen, CRM, Mitarbeiterbenefits, Planung und ein Lager ab, auf einem gemeinsamen Kern mit Einstellungen, Suche und Berechtigungen. Ich arbeite daran in einem Team von 8 Entwicklern.",
        cs: "Core3 je modulární firemní platforma postavená na Elixiru a Phoenix LiveView. Její moduly pokrývají projektové řízení, ticketing, HR, docházku, finance, CRM, zaměstnanecké benefity, plánování a sklad, nad společným jádrem s nastaveními, vyhledáváním a oprávněními. Pracuji na ní v týmu 8 vývojářů.",
        hu: "A Core3 egy moduláris üzleti platform Elixirben és Phoenix LiveView-ban. A moduljai lefedik a projektmenedzsmentet, a ticketinget, a HR-t, a jelenlétet, a pénzügyeket, a CRM-et, a munkavállalói juttatásokat, a tervezést és a raktárt, egy közös magra építve beállításokkal, kereséssel és jogosultságokkal. Egy 8 fős fejlesztőcsapatban dolgozom rajta.",
      },
      {
        en: "I joined in February 2025 as an Elixir developer and have worked in every module since. I started the ticketing and HR modules from scratch, project management is my main area, and I also build features for attendance, finance, CRM and the shared core.",
        sk: "Nastúpil som vo februári 2025 ako vývojár v Elixire a odvtedy som pracoval vo všetkých moduloch. Moduly ticketingu a HR som založil od nuly, mojou hlavnou oblasťou je projektové riadenie a robím aj funkcie pre dochádzku, financie, CRM a spoločné jadro.",
        de: "Ich bin im Februar 2025 als Elixir-Entwickler eingestiegen und habe seitdem in allen Modulen gearbeitet. Die Module Ticketing und HR habe ich von Grund auf begonnen, das Projektmanagement ist mein Hauptbereich, und ich baue auch Funktionen für Anwesenheit, Finanzen, CRM und den gemeinsamen Kern.",
        cs: "Nastoupil jsem v únoru 2025 jako vývojář v Elixiru a od té doby jsem pracoval ve všech modulech. Moduly ticketingu a HR jsem založil od nuly, mou hlavní oblastí je projektové řízení a dělám i funkce pro docházku, finance, CRM a společné jádro.",
        hu: "2025 februárjában kezdtem Elixir-fejlesztőként, és azóta minden modulban dolgoztam. A ticketing és a HR modult a nulláról indítottam, a fő területem a projektmenedzsment, és a jelenléthez, a pénzügyekhez, a CRM-hez és a közös maghoz is készítek funkciókat.",
      },
    ],
    contributions: [
      {
        en: "Project management, my main area, where I am the second largest contributor: kanban boards with drag and drop and status rules, task permissions for creators, assignees and project leads, Scrum and Waterfall workflows, the task detail drawer, project spaces and activity feeds",
        sk: "Projektové riadenie, moja hlavná oblasť, kde som druhý najväčší prispievateľ: kanban tabule s drag and drop a pravidlami stavov, oprávnenia úloh pre autorov, riešiteľov a vedúcich projektov, workflow Scrum a Waterfall, detail úlohy, projektové priestory a prehľady aktivít",
        de: "Projektmanagement, mein Hauptbereich, in dem ich der zweitgrößte Beitragende bin: Kanban-Boards mit Drag and Drop und Statusregeln, Aufgabenrechte für Ersteller, Zuständige und Projektleiter, Scrum- und Wasserfall-Abläufe, die Aufgabendetails, Projektbereiche und Aktivitätsfeeds",
        cs: "Projektové řízení, moje hlavní oblast, kde jsem druhý největší přispěvatel: kanban tabule s drag and drop a pravidly stavů, oprávnění úkolů pro autory, řešitele a vedoucí projektů, workflow Scrum a Waterfall, detail úkolu, projektové prostory a přehledy aktivit",
        hu: "Projektmenedzsment, a fő területem, ahol a második legtöbbet hozzájáruló fejlesztő vagyok: kanban táblák drag and droppal és státuszszabályokkal, feladatjogosultságok a létrehozónak, a felelősnek és a projektvezetőnek, Scrum és Waterfall munkafolyamatok, a feladat részletei, projektterek és aktivitásfolyamok",
      },
      {
        en: "Ticketing, which I started and where I wrote the largest share: ticket types and statuses, the service desk, a form for new tickets, assignment, a watchlist and rich-text comments that update live",
        sk: "Ticketing, ktorý som založil a kde som napísal najväčšiu časť: typy a stavy tiketov, zákaznícka podpora, formulár na nové tikety, priraďovanie, sledovanie a komentáre s formátovaným textom, ktoré sa aktualizujú naživo",
        de: "Ticketing, das ich begonnen und zum größten Teil geschrieben habe: Ticket-Typen und Status, der Service Desk, ein Formular für neue Tickets, die Zuweisung, eine Beobachtungsliste und Rich-Text-Kommentare, die sich live aktualisieren",
        cs: "Ticketing, který jsem založil a kde jsem napsal největší část: typy a stavy tiketů, zákaznická podpora, formulář pro nové tikety, přiřazování, sledování a komentáře s formátovaným textem, které se aktualizují živě",
        hu: "Ticketing, amelyet én indítottam és amelynek a legnagyobb részét én írtam: jegytípusok és státuszok, az ügyfélszolgálat, űrlap új jegyekhez, hozzárendelés, figyelőlista és élőben frissülő, formázott szöveges kommentek",
      },
      {
        en: "HR, which I also started, as the second largest contributor: payroll and time sheet approvals with steps you can go back to, employee funds created from approved payroll, contract validation and end-to-end tests for the approvals",
        sk: "HR, ktoré som tiež založil, ako druhý najväčší prispievateľ: schvaľovanie miezd a výkazov s krokmi, ku ktorým sa dá vrátiť, zamestnanecké fondy vytvárané zo schválených miezd, validácia zmlúv a end-to-end testy schvaľovania",
        de: "HR, das ich ebenfalls begonnen habe, als zweitgrößter Beitragender: Freigaben für Lohnabrechnungen und Stundenzettel mit Schritten, zu denen man zurückkehren kann, Mitarbeiterfonds aus freigegebenen Abrechnungen, Vertragsprüfung und End-to-End-Tests für die Freigaben",
        cs: "HR, které jsem také založil, jako druhý největší přispěvatel: schvalování mezd a výkazů s kroky, ke kterým se lze vrátit, zaměstnanecké fondy vytvářené ze schválených mezd, validace smluv a end-to-end testy schvalování",
        hu: "HR, amelyet szintén én indítottam, a második legtöbbet hozzájáruló fejlesztőként: bér- és munkaidő-jóváhagyások visszaléphető lépésekkel, a jóváhagyott bérből létrejövő munkavállalói alapok, szerződésellenőrzés és end-to-end tesztek a jóváhagyásokhoz",
      },
      {
        en: "Attendance, finance and CRM: home office planning by month and team, invoice filters kept in the URL, drag-and-drop attachments, and links between customers, projects and cost centres",
        sk: "Dochádzka, financie a CRM: plánovanie home office podľa mesiaca a tímu, filtre faktúr uložené v URL, prílohy cez drag and drop a prepojenie zákazníkov, projektov a nákladových stredísk",
        de: "Anwesenheit, Finanzen und CRM: Homeoffice-Planung nach Monat und Team, Rechnungsfilter in der URL, Anhänge per Drag and Drop und Verknüpfungen zwischen Kunden, Projekten und Kostenstellen",
        cs: "Docházka, finance a CRM: plánování home office podle měsíce a týmu, filtry faktur uložené v URL, přílohy přes drag and drop a propojení zákazníků, projektů a nákladových středisek",
        hu: "Jelenlét, pénzügyek és CRM: home office tervezés hónap és csapat szerint, az URL-ben tárolt számlaszűrők, drag and drop mellékletek, valamint kapcsolatok az ügyfelek, a projektek és a költséghelyek között",
      },
      {
        en: "Benefits, planning and warehouse: smaller changes, mostly shared fixes such as safe search and caching",
        sk: "Benefity, plánovanie a sklad: menšie zmeny, väčšinou spoločné opravy, napríklad bezpečné vyhľadávanie a cache",
        de: "Benefits, Planung und Lager: kleinere Änderungen, meist gemeinsame Korrekturen wie sichere Suche und Caching",
        cs: "Benefity, plánování a sklad: menší změny, většinou společné opravy, například bezpečné vyhledávání a cache",
        hu: "Juttatások, tervezés és raktár: kisebb változtatások, főleg közös javítások, például biztonságos keresés és gyorsítótár",
      },
      {
        en: "Shared core: dynamic settings with caching and a screen to manage the cache, audit logs, an error dashboard, fuzzy search by record ID, form components in Storybook, a PDF viewer and the first PWA setup",
        sk: "Spoločné jadro: dynamické nastavenia s cache a obrazovkou na jej správu, auditné logy, prehľad chýb, fuzzy vyhľadávanie podľa ID záznamu, formulárové komponenty v Storybooku, prehliadač PDF a prvé nastavenie PWA",
        de: "Gemeinsamer Kern: dynamische Einstellungen mit Caching und einer Verwaltungsseite für den Cache, Audit-Logs, ein Fehler-Dashboard, unscharfe Suche nach Datensatz-ID, Formularkomponenten in Storybook, ein PDF-Viewer und die erste PWA-Einrichtung",
        cs: "Společné jádro: dynamická nastavení s cache a obrazovkou pro její správu, auditní logy, přehled chyb, fuzzy vyhledávání podle ID záznamu, formulářové komponenty ve Storybooku, prohlížeč PDF a první nastavení PWA",
        hu: "Közös mag: dinamikus beállítások gyorsítótárral és kezelőfelülettel, auditnaplók, hibairányítópult, fuzzy keresés rekordazonosító alapján, űrlapkomponensek Storybookban, PDF-megjelenítő és az első PWA-beállítás",
      },
      {
        en: "Across modules: found and fixed the slowest pages, moved real-time updates to one PubSub, and documented async loading with infinite scroll for the team, along with loading skeletons, optimistic UI and type-safe URL parameters",
        sk: "Naprieč modulmi: našiel a opravil som najpomalšie stránky, presunul aktualizácie v reálnom čase do jedného PubSub a zdokumentoval pre tím asynchrónne načítavanie s nekonečným scrollom, spolu so skeletonmi pri načítavaní, optimistickým UI a typovo bezpečnými parametrami v URL",
        de: "Über alle Module: die langsamsten Seiten gefunden und beschleunigt, Echtzeit-Updates in ein PubSub verlegt und asynchrones Laden mit Infinite Scroll für das Team dokumentiert, dazu Lade-Skeletons, optimistische UI und typsichere URL-Parameter",
        cs: "Napříč moduly: našel a opravil jsem nejpomalejší stránky, přesunul aktualizace v reálném čase do jednoho PubSub a zdokumentoval pro tým asynchronní načítání s nekonečným scrollem, spolu se skeletony při načítání, optimistickým UI a typově bezpečnými parametry v URL",
        hu: "Modulokon át: megtaláltam és felgyorsítottam a leglassabb oldalakat, a valós idejű frissítéseket egyetlen PubSubba tettem, és dokumentáltam a csapatnak az aszinkron betöltést végtelen görgetéssel, a betöltési skeletonokkal, az optimista UI-jal és a típusbiztos URL-paraméterekkel együtt",
      },
    ],
    measurements: {
      lead: {
        en: "Users complained about slow pages, so I profiled them with flame graphs before changing anything. These are the times measured before the fixes:",
        sk: "Používatelia sa sťažovali na pomalé stránky, preto som ich pred akoukoľvek zmenou profiloval cez flame grafy. Toto sú časy namerané pred opravami:",
        de: "Nutzer beschwerten sich über langsame Seiten, also habe ich sie vor jeder Änderung mit Flame Graphs profiliert. Das sind die vor den Korrekturen gemessenen Zeiten:",
        cs: "Uživatelé si stěžovali na pomalé stránky, proto jsem je před jakoukoli změnou profiloval pomocí flame grafů. Toto jsou časy naměřené před opravami:",
        hu: "A felhasználók lassú oldalakra panaszkodtak, ezért minden változtatás előtt flame graphokkal profiloztam őket. Ezek a javítások előtt mért idők:",
      },
      rows: [
        {
          label: {
            en: "Opening a project",
            sk: "Otvorenie projektu",
            de: "Projekt öffnen",
            cs: "Otevření projektu",
            hu: "Projekt megnyitása",
          },
          ms: 2186,
          queries: 303,
        },
        {
          label: {
            en: "Loading the task list",
            sk: "Načítanie zoznamu úloh",
            de: "Aufgabenliste laden",
            cs: "Načtení seznamu úkolů",
            hu: "A feladatlista betöltése",
          },
          ms: 726,
          queries: 77,
        },
        {
          label: {
            en: "Opening a task's details",
            sk: "Otvorenie detailu úlohy",
            de: "Aufgabendetails öffnen",
            cs: "Otevření detailu úkolu",
            hu: "Egy feladat részleteinek megnyitása",
          },
          ms: 454,
          queries: 73,
        },
      ],
      note: {
        en: "On the project page, about 1.4 seconds went to labels looked up one by one, more than 30 times, and most of the rest to loading project spaces. The fixes batch these lookups, compute the labels inside the database query and cache what rarely changes.",
        sk: "Na stránke projektu išlo asi 1,4 sekundy na štítky dohľadávané po jednom, viac ako 30-krát, a väčšina zvyšku na načítanie projektových priestorov. Opravy tieto dopyty spájajú, štítky počítajú priamo v databázovom dopyte a ukladajú do cache to, čo sa mení zriedka.",
        de: "Auf der Projektseite gingen etwa 1,4 Sekunden auf Labels, die einzeln nachgeschlagen wurden, mehr als 30-mal, und der Großteil des Rests auf das Laden der Projektbereiche. Die Korrekturen bündeln diese Abfragen, berechnen die Labels direkt in der Datenbankabfrage und cachen, was sich selten ändert.",
        cs: "Na stránce projektu šlo asi 1,4 sekundy na štítky dohledávané po jednom, více než 30krát, a většina zbytku na načtení projektových prostorů. Opravy tyto dotazy spojují, štítky počítají přímo v databázovém dotazu a ukládají do cache to, co se mění zřídka.",
        hu: "A projektoldalon körülbelül 1,4 másodperc ment el a címkék egyenkénti, több mint 30-szori lekérdezésére, a maradék nagy része pedig a projekttereket töltötte be. A javítások összevonják ezeket a lekérdezéseket, a címkéket magában az adatbázis-lekérdezésben számolják ki, és gyorsítótárazzák, ami ritkán változik.",
      },
    },
    decisions: [
      {
        title: {
          en: "Profile first, then fix",
          sk: "Najprv merať, potom opravovať",
          de: "Erst messen, dann beheben",
          cs: "Nejdřív měřit, pak opravovat",
          hu: "Előbb mérni, aztán javítani",
        },
        text: {
          en: "Users only said the pages were slow. Flame graphs showed where the time went: hundreds of small queries, many repeating the same lookup for each row. That pointed to batching and caching instead of rewriting the pages.",
          sk: "Používatelia hovorili len to, že stránky sú pomalé. Flame grafy ukázali, kam čas ide: stovky malých dopytov, mnohé opakovali to isté dohľadanie pre každý riadok. To ukázalo na spájanie dopytov a cache namiesto prepisovania stránok.",
          de: "Die Nutzer sagten nur, dass die Seiten langsam sind. Die Flame Graphs zeigten, wohin die Zeit ging: Hunderte kleine Abfragen, viele davon dieselbe Abfrage für jede Zeile. Das sprach für Bündeln und Caching statt für ein Neuschreiben der Seiten.",
          cs: "Uživatelé říkali jen to, že stránky jsou pomalé. Flame grafy ukázaly, kam čas jde: stovky malých dotazů, mnohé opakovaly totéž dohledání pro každý řádek. To ukázalo na spojování dotazů a cache místo přepisování stránek.",
          hu: "A felhasználók csak annyit mondtak, hogy lassúak az oldalak. A flame graphok megmutatták, hová megy az idő: több száz kis lekérdezés, sokuk minden sorra ugyanazt kereste ki. Ez az összevonás és a gyorsítótár felé mutatott, nem az oldalak újraírása felé.",
        },
      },
      {
        title: {
          en: "One PubSub with ordered updates",
          sk: "Jeden PubSub s usporiadanými aktualizáciami",
          de: "Ein PubSub mit geordneten Updates",
          cs: "Jeden PubSub s uspořádanými aktualizacemi",
          hu: "Egy PubSub, sorrendben érkező frissítésekkel",
        },
        text: {
          en: "Real-time updates came through several channels and could arrive out of order, so an older update sometimes replaced a newer one and the screen flickered. I moved them to one shared PubSub and made sure an older message never overwrites a newer one.",
          sk: "Aktualizácie v reálnom čase chodili cez viac kanálov a mohli prísť v zlom poradí, takže staršia niekedy prepísala novšiu a obrazovka blikala. Presunul som ich do jedného spoločného PubSub a zabezpečil, že staršia správa nikdy neprepíše novšiu.",
          de: "Echtzeit-Updates kamen über mehrere Kanäle und konnten in falscher Reihenfolge eintreffen, sodass ein älteres Update manchmal ein neueres ersetzte und der Bildschirm flackerte. Ich habe sie in ein gemeinsames PubSub verlegt und sichergestellt, dass eine ältere Nachricht nie eine neuere überschreibt.",
          cs: "Aktualizace v reálném čase chodily přes více kanálů a mohly přijít ve špatném pořadí, takže starší někdy přepsala novější a obrazovka blikala. Přesunul jsem je do jednoho společného PubSub a zajistil, že starší zpráva nikdy nepřepíše novější.",
          hu: "A valós idejű frissítések több csatornán jöttek és rossz sorrendben is érkezhettek, így egy régebbi frissítés néha felülírta az újabbat, és a képernyő villogott. Egyetlen közös PubSubba tettem őket, és gondoskodtam róla, hogy régebbi üzenet soha ne írjon felül újabbat.",
        },
      },
      {
        title: {
          en: "Caching with invalidation designed in",
          sk: "Cache s invalidáciou od začiatku",
          de: "Caching mit eingeplanter Invalidierung",
          cs: "Cache s invalidací od začátku",
          hu: "Gyorsítótár eleve invalidálással",
        },
        text: {
          en: "Caching labels and settings removed many queries, but a stale cache is worse than a slow page. Every cached entry is cleared when its data changes, and administrators can see and clear the cache in the app.",
          sk: "Cache pre štítky a nastavenia odstránila veľa dopytov, no zastaraná cache je horšia ako pomalá stránka. Každý záznam sa vymaže, keď sa zmenia jeho dáta, a administrátori môžu cache v aplikácii vidieť a vyčistiť.",
          de: "Das Cachen von Labels und Einstellungen sparte viele Abfragen, aber ein veralteter Cache ist schlimmer als eine langsame Seite. Jeder Eintrag wird gelöscht, wenn sich seine Daten ändern, und Administratoren können den Cache in der App einsehen und leeren.",
          cs: "Cache pro štítky a nastavení odstranila mnoho dotazů, ale zastaralá cache je horší než pomalá stránka. Každý záznam se vymaže, když se změní jeho data, a administrátoři mohou cache v aplikaci vidět a vyčistit.",
          hu: "A címkék és beállítások gyorsítótárazása sok lekérdezést megspórolt, de az elavult gyorsítótár rosszabb a lassú oldalnál. Minden bejegyzés törlődik, amikor az adatai változnak, és az adminisztrátorok az alkalmazásban láthatják és üríthetik a gyorsítótárat.",
        },
      },
    ],
    lessons: [
      {
        en: "Measure before optimizing. The profile, not a guess, decided what to fix first.",
        sk: "Pred optimalizáciou merať. O tom, čo opraviť ako prvé, rozhodol profil, nie odhad.",
        de: "Vor dem Optimieren messen. Was zuerst behoben wurde, entschied das Profil, nicht eine Vermutung.",
        cs: "Před optimalizací měřit. O tom, co opravit jako první, rozhodl profil, ne odhad.",
        hu: "Optimalizálás előtt mérni kell. Azt, hogy mit javítsak először, a profil döntötte el, nem a találgatás.",
      },
      {
        en: "In a large codebase, a written-down pattern such as infinite scroll helps the whole team build the same thing the same way in every module.",
        sk: "Vo veľkom kóde pomáha zapísaný vzor, napríklad nekonečný scroll, aby celý tím robil rovnakú vec rovnako v každom module.",
        de: "In einer großen Codebasis hilft ein aufgeschriebenes Muster wie Infinite Scroll dem ganzen Team, dasselbe in jedem Modul gleich zu bauen.",
        cs: "Ve velkém kódu pomáhá zapsaný vzor, například nekonečný scroll, aby celý tým dělal stejnou věc stejně v každém modulu.",
        hu: "Egy nagy kódbázisban egy leírt minta, például a végtelen görgetés, segít, hogy az egész csapat minden modulban ugyanúgy építse meg ugyanazt.",
      },
    ],
  },
  {
    id: "wydo",
    summary: {
      en: "App for finding sports activities and people to play with. I started the Android and iOS app and the web app and wrote the largest share of both.",
      sk: "Aplikácia na hľadanie športových aktivít a ľudí na hru. Založil som aplikáciu pre Android a iOS aj webovú aplikáciu a napísal najväčšiu časť oboch.",
      de: "App, um Sportaktivitäten und Mitspieler zu finden. Ich habe die Android- und iOS-App und die Web-App begonnen und den größten Teil von beiden geschrieben.",
      cs: "Aplikace pro hledání sportovních aktivit a lidí na hru. Založil jsem aplikaci pro Android a iOS i webovou aplikaci a napsal největší část obou.",
      hu: "Alkalmazás sporttevékenységek és játszótársak kereséséhez. Én indítottam az Android- és iOS-alkalmazást és a webes alkalmazást, és mindkettő legnagyobb részét én írtam.",
    },
    description: [
      {
        en: "WYDO helps people find sports activities nearby, join groups and meet others to play with. It runs on Android, iOS and the web in four languages, on a Kotlin and Spring Boot backend.",
        sk: "WYDO pomáha ľuďom nájsť športové aktivity v okolí, pridať sa do skupín a stretnúť ďalších ľudí na hru. Funguje na Androide, iOS aj webe v štyroch jazykoch, s backendom v Kotline a Spring Boote.",
        de: "WYDO hilft Menschen, Sportaktivitäten in der Nähe zu finden, Gruppen beizutreten und Mitspieler kennenzulernen. Die App läuft auf Android, iOS und im Web in vier Sprachen, mit einem Backend in Kotlin und Spring Boot.",
        cs: "WYDO pomáhá lidem najít sportovní aktivity v okolí, přidat se do skupin a potkat další lidi na hru. Funguje na Androidu, iOS i webu ve čtyřech jazycích, s backendem v Kotlinu a Spring Bootu.",
        hu: "A WYDO segít a közeli sporttevékenységek megtalálásában, csoportokhoz csatlakozni és játszótársakat találni. Androidon, iOS-en és a weben fut négy nyelven, Kotlin és Spring Boot backenddel.",
      },
      {
        en: "I started the mobile app in Kotlin Multiplatform in February 2026 and later the React web app, and I wrote the largest share of both. I also built the promo site and added backend features in Spring Boot. The team has 3 developers.",
        sk: "Mobilnú aplikáciu v Kotlin Multiplatform som založil vo februári 2026, neskôr aj webovú aplikáciu v Reacte, a napísal som najväčšiu časť oboch. Postavil som aj promo stránku a pridával funkcie do backendu v Spring Boote. Tím má 3 vývojárov.",
        de: "Ich habe die mobile App in Kotlin Multiplatform im Februar 2026 begonnen, später die React-Web-App, und den größten Teil von beiden geschrieben. Außerdem habe ich die Promo-Website gebaut und Backend-Funktionen in Spring Boot ergänzt. Das Team hat 3 Entwickler.",
        cs: "Mobilní aplikaci v Kotlin Multiplatform jsem založil v únoru 2026, později i webovou aplikaci v Reactu, a napsal jsem největší část obou. Postavil jsem také promo stránku a přidával funkce do backendu ve Spring Bootu. Tým má 3 vývojáře.",
        hu: "A mobilalkalmazást Kotlin Multiplatformban 2026 februárjában indítottam, később a React webes alkalmazást is, és mindkettő legnagyobb részét én írtam. Én készítettem a promóciós oldalt is, és Spring Bootban backendfunkciókat adtam hozzá. A csapat 3 fejlesztőből áll.",
      },
    ],
    contributions: [
      {
        en: "Mobile app in Kotlin and Compose Multiplatform: a map that clusters activities and loads them as you move, search with filters, a location picker with address search, groups with posts, comments and reactions, ratings, calendar export and chat over WebSockets that reconnects on its own",
        sk: "Mobilná aplikácia v Kotline a Compose Multiplatform: mapa, ktorá zhlukuje aktivity a načítava ich pri posúvaní, vyhľadávanie s filtrami, výber miesta s hľadaním adresy, skupiny s príspevkami, komentármi a reakciami, hodnotenia, export do kalendára a chat cez WebSockety, ktorý sa sám znovu pripojí",
        de: "Mobile App in Kotlin und Compose Multiplatform: eine Karte, die Aktivitäten clustert und beim Verschieben nachlädt, Suche mit Filtern, eine Ortsauswahl mit Adresssuche, Gruppen mit Beiträgen, Kommentaren und Reaktionen, Bewertungen, Kalenderexport und ein Chat über WebSockets, der sich selbst neu verbindet",
        cs: "Mobilní aplikace v Kotlinu a Compose Multiplatform: mapa, která shlukuje aktivity a načítá je při posouvání, vyhledávání s filtry, výběr místa s hledáním adresy, skupiny s příspěvky, komentáři a reakcemi, hodnocení, export do kalendáře a chat přes WebSockety, který se sám znovu připojí",
        hu: "Mobilalkalmazás Kotlinban és Compose Multiplatformban: térkép, amely csoportosítja a tevékenységeket és mozgatás közben tölti be őket, keresés szűrőkkel, helyválasztó címkereséssel, csoportok bejegyzésekkel, kommentekkel és reakciókkal, értékelések, naptárexport és WebSocketes chat, amely magától újracsatlakozik",
      },
      {
        en: "Web app in React and TanStack: a map page, a location wizard with GPS, virtualized infinite feeds, chat that writes new messages straight into the query cache, browser push notifications, social and passkey login, Stripe checkout and per-page SEO with real 404 pages",
        sk: "Webová aplikácia v Reacte a TanStacku: stránka s mapou, sprievodca výberom miesta s GPS, virtualizované nekonečné feedy, chat, ktorý zapisuje nové správy priamo do cache dopytov, push notifikácie v prehliadači, prihlásenie cez sociálne siete a passkeys, platby cez Stripe a SEO pre každú stránku so skutočnými stránkami 404",
        de: "Web-App in React und TanStack: eine Kartenseite, ein Standort-Assistent mit GPS, virtualisierte endlose Feeds, ein Chat, der neue Nachrichten direkt in den Query-Cache schreibt, Browser-Push-Benachrichtigungen, Social- und Passkey-Login, Stripe-Checkout und SEO pro Seite mit echten 404-Seiten",
        cs: "Webová aplikace v Reactu a TanStacku: stránka s mapou, průvodce výběrem místa s GPS, virtualizované nekonečné feedy, chat, který zapisuje nové zprávy přímo do cache dotazů, push notifikace v prohlížeči, přihlášení přes sociální sítě a passkeys, platby přes Stripe a SEO pro každou stránku se skutečnými stránkami 404",
        hu: "Webes alkalmazás Reactban és TanStackkel: térképoldal, GPS-es helyválasztó varázsló, virtualizált végtelen hírfolyamok, chat, amely az új üzeneteket közvetlenül a lekérdezési gyorsítótárba írja, böngészős push-értesítések, közösségi és passkey-bejelentkezés, Stripe-fizetés és oldalankénti SEO valódi 404-es oldalakkal",
      },
      {
        en: "Promo site in React with language routes, a sitemap, social sharing images and Lighthouse work",
        sk: "Promo stránka v Reacte s jazykovými cestami, sitemapou, obrázkami na zdieľanie a optimalizáciou podľa Lighthouse",
        de: "Promo-Website in React mit Sprachrouten, Sitemap, Vorschaubildern zum Teilen und Lighthouse-Optimierung",
        cs: "Promo stránka v Reactu s jazykovými cestami, sitemapou, obrázky pro sdílení a optimalizací podle Lighthouse",
        hu: "Promóciós oldal Reactban nyelvi útvonalakkal, oldaltérképpel, megosztási képekkel és Lighthouse-optimalizálással",
      },
      {
        en: "Backend features in Spring Boot: passkeys (WebAuthn), translated error codes in the API docs, blocking users, follower roles, group join modes and a seed system for test data",
        sk: "Funkcie backendu v Spring Boote: passkeys (WebAuthn), preložené chybové kódy v dokumentácii API, blokovanie používateľov, roly sledujúcich, režimy pridávania do skupín a systém testovacích dát",
        de: "Backend-Funktionen in Spring Boot: Passkeys (WebAuthn), übersetzte Fehlercodes in der API-Dokumentation, Blockieren von Nutzern, Follower-Rollen, Beitrittsmodi für Gruppen und ein System für Testdaten",
        cs: "Funkce backendu ve Spring Bootu: passkeys (WebAuthn), přeložené chybové kódy v dokumentaci API, blokování uživatelů, role sledujících, režimy přidávání do skupin a systém testovacích dat",
        hu: "Backendfunkciók Spring Bootban: passkey-k (WebAuthn), lefordított hibakódok az API-dokumentációban, felhasználók tiltása, követői szerepek, csoportcsatlakozási módok és tesztadat-rendszer",
      },
      {
        en: "Four languages everywhere, with tests that keep the translations in sync, and unit and end-to-end tests in Vitest and Playwright",
        sk: "Štyri jazyky všade, s testami, ktoré udržiavajú preklady zosúladené, a unit a end-to-end testy vo Viteste a Playwrighte",
        de: "Vier Sprachen überall, mit Tests, die die Übersetzungen synchron halten, sowie Unit- und End-to-End-Tests mit Vitest und Playwright",
        cs: "Čtyři jazyky všude, s testy, které udržují překlady sladěné, a unit a end-to-end testy ve Vitestu a Playwrightu",
        hu: "Négy nyelv mindenhol, a fordításokat szinkronban tartó tesztekkel, valamint unit és end-to-end tesztek Vitesttel és Playwrighttal",
      },
    ],
    decisions: [
      {
        title: {
          en: "From Compose on the web to React",
          sk: "Z Compose na webe na React",
          de: "Von Compose im Web zu React",
          cs: "Z Compose na webu na React",
          hu: "A webes Compose-tól a Reactig",
        },
        text: {
          en: "The first web version was the same Compose Multiplatform app compiled to WebAssembly. It had no proper URL routing, its text was drawn on a canvas and could not be selected, and its tooling was thin compared with web-native options. I rewrote the web app in React and TanStack with an improved UI, on the same backend API.",
          sk: "Prvá webová verzia bola tá istá aplikácia v Compose Multiplatform skompilovaná do WebAssembly. Nemala poriadne URL routovanie, text sa kreslil na canvas a nedal sa označiť a nástroje boli slabé v porovnaní s webovými. Webovú aplikáciu som prepísal do Reactu a TanStacku s vylepšeným UI, nad tým istým API backendu.",
          de: "Die erste Web-Version war dieselbe Compose-Multiplatform-App, kompiliert zu WebAssembly. Sie hatte kein richtiges URL-Routing, ihr Text wurde auf ein Canvas gezeichnet und ließ sich nicht markieren, und die Werkzeuge waren dünn im Vergleich zu webnativen Lösungen. Ich habe die Web-App in React und TanStack mit verbesserter Oberfläche neu geschrieben, auf derselben Backend-API.",
          cs: "První webová verze byla tatáž aplikace v Compose Multiplatform zkompilovaná do WebAssembly. Neměla pořádné URL routování, text se kreslil na canvas a nešel označit a nástroje byly slabé ve srovnání s webovými. Webovou aplikaci jsem přepsal do Reactu a TanStacku s vylepšeným UI, nad stejným API backendu.",
          hu: "Az első webes verzió ugyanaz a Compose Multiplatform alkalmazás volt WebAssemblyre fordítva. Nem volt rendes URL-útválasztása, a szöveget canvasra rajzolta, így nem lehetett kijelölni, és az eszközkészlete szegényes volt a webes megoldásokhoz képest. A webes alkalmazást Reactban és TanStackkel írtam újra, jobb felülettel, ugyanarra a backend API-ra.",
        },
      },
      {
        title: {
          en: "API types generated from the backend",
          sk: "Typy API generované z backendu",
          de: "API-Typen aus dem Backend generiert",
          cs: "Typy API generované z backendu",
          hu: "A backendből generált API-típusok",
        },
        text: {
          en: "The backend has more than 250 endpoints. Instead of writing request types by hand, the web app generates its API client and types from the backend's OpenAPI spec with Orval, so a changed endpoint shows up as a type error instead of a bug in production.",
          sk: "Backend má viac ako 250 endpointov. Namiesto ručného písania typov webová aplikácia generuje klienta API aj typy zo špecifikácie OpenAPI cez Orval, takže zmenený endpoint sa ukáže ako chyba typov, nie ako chyba v produkcii.",
          de: "Das Backend hat mehr als 250 Endpunkte. Statt die Typen von Hand zu schreiben, generiert die Web-App Client und Typen mit Orval aus der OpenAPI-Spezifikation des Backends, sodass ein geänderter Endpunkt als Typfehler auffällt statt als Fehler in Produktion.",
          cs: "Backend má více než 250 endpointů. Místo ručního psaní typů webová aplikace generuje klienta API i typy ze specifikace OpenAPI pomocí Orvalu, takže změněný endpoint se ukáže jako chyba typů, ne jako chyba v produkci.",
          hu: "A backendnek több mint 250 végpontja van. A típusok kézi írása helyett a webes alkalmazás az Orvallal generálja az API-klienst és a típusokat a backend OpenAPI-specifikációjából, így egy megváltozott végpont típushibaként jelenik meg, nem élesben.",
        },
      },
      {
        title: {
          en: "Real-time data in one cache",
          sk: "Dáta v reálnom čase v jednej cache",
          de: "Echtzeitdaten in einem Cache",
          cs: "Data v reálném čase v jedné cache",
          hu: "Valós idejű adatok egy gyorsítótárban",
        },
        text: {
          en: "Chat messages and notifications arrive over WebSockets (STOMP). They go straight into the TanStack Query cache, so every screen that shows that data updates without keeping its own socket state.",
          sk: "Správy v chate a notifikácie prichádzajú cez WebSockety (STOMP). Idú priamo do cache TanStack Query, takže každá obrazovka s týmito dátami sa aktualizuje bez vlastného stavu socketu.",
          de: "Chatnachrichten und Benachrichtigungen kommen über WebSockets (STOMP). Sie landen direkt im TanStack-Query-Cache, sodass sich jeder Bildschirm mit diesen Daten aktualisiert, ohne eigenen Socket-Zustand.",
          cs: "Zprávy v chatu a notifikace přicházejí přes WebSockety (STOMP). Jdou přímo do cache TanStack Query, takže každá obrazovka s těmito daty se aktualizuje bez vlastního stavu socketu.",
          hu: "A chatüzenetek és az értesítések WebSocketen (STOMP) érkeznek. Közvetlenül a TanStack Query gyorsítótárába kerülnek, így minden képernyő, amely ezeket az adatokat mutatja, saját socketállapot nélkül frissül.",
        },
      },
    ],
    lessons: [
      {
        en: "Sharing code between Android and iOS paid off, but the web needed its own stack to behave like a real website.",
        sk: "Spoločný kód pre Android a iOS sa oplatil, no web potreboval vlastné technológie, aby sa správal ako skutočná webová stránka.",
        de: "Gemeinsamer Code für Android und iOS hat sich gelohnt, aber das Web brauchte einen eigenen Stack, um sich wie eine echte Website zu verhalten.",
        cs: "Společný kód pro Android a iOS se vyplatil, ale web potřeboval vlastní technologie, aby se choval jako skutečná webová stránka.",
        hu: "Megérte közös kódot írni Androidra és iOS-re, de a webnek saját technológia kellett, hogy valódi weboldalként működjön.",
      },
      {
        en: "Generated API types catch backend changes early, which matters when the backend and the apps change at the same time.",
        sk: "Generované typy API zachytia zmeny backendu včas, čo je dôležité, keď sa backend a aplikácie menia naraz.",
        de: "Generierte API-Typen fangen Backend-Änderungen früh ab, was wichtig ist, wenn sich Backend und Apps gleichzeitig ändern.",
        cs: "Generované typy API zachytí změny backendu včas, což je důležité, když se backend a aplikace mění zároveň.",
        hu: "A generált API-típusok korán jelzik a backend változásait, ami számít, amikor a backend és az alkalmazások egyszerre változnak.",
      },
    ],
  },
  {
    id: "cleaneeg",
    summary: {
      en: "Web app for a service that removes noise from EEG recordings, with a WebGL viewer that compares raw and cleaned signals. I built the frontend from scratch.",
      sk: "Webová aplikácia služby, ktorá odstraňuje šum z EEG záznamov, s WebGL prehliadačom na porovnanie pôvodných a vyčistených signálov. Frontend som postavil od nuly.",
      de: "Web-App für einen Dienst, der Rauschen aus EEG-Aufnahmen entfernt, mit einem WebGL-Viewer, der Roh- und bereinigte Signale vergleicht. Ich habe das Frontend von Grund auf gebaut.",
      cs: "Webová aplikace služby, která odstraňuje šum z EEG záznamů, s WebGL prohlížečem pro porovnání původních a vyčištěných signálů. Frontend jsem postavil od nuly.",
      hu: "Webes alkalmazás egy szolgáltatáshoz, amely eltávolítja a zajt az EEG-felvételekből, WebGL-es megjelenítővel, amely összeveti a nyers és a tisztított jeleket. A frontendet a nulláról építettem.",
    },
    description: [
      {
        en: "CleanEEG removes noise and artefacts from EEG recordings (brain signals). Users upload their recordings, the service cleans them, and they need to check that the cleaning removed the noise without damaging the signal.",
        sk: "CleanEEG odstraňuje šum a artefakty z EEG záznamov (mozgových signálov). Používatelia nahrajú svoje záznamy, služba ich vyčistí a oni potrebujú overiť, že čistenie odstránilo šum bez poškodenia signálu.",
        de: "CleanEEG entfernt Rauschen und Artefakte aus EEG-Aufnahmen (Hirnsignalen). Nutzer laden ihre Aufnahmen hoch, der Dienst bereinigt sie, und sie müssen prüfen, ob die Bereinigung das Rauschen entfernt hat, ohne das Signal zu beschädigen.",
        cs: "CleanEEG odstraňuje šum a artefakty z EEG záznamů (mozkových signálů). Uživatelé nahrají své záznamy, služba je vyčistí a oni potřebují ověřit, že čištění odstranilo šum bez poškození signálu.",
        hu: "A CleanEEG eltávolítja a zajt és a műtermékeket az EEG-felvételekből (agyi jelekből). A felhasználók feltöltik a felvételeiket, a szolgáltatás megtisztítja őket, nekik pedig ellenőrizniük kell, hogy a tisztítás eltávolította-e a zajt a jel sérülése nélkül.",
      },
      {
        en: "I built the whole web app from scratch in a team of 2, from December 2025 to March 2026: signup, pricing, billing, the file dashboard and the EEG viewer. The backend in Spring Boot and the Python cleaning worker were built by colleagues.",
        sk: "Celú webovú aplikáciu som postavil od nuly v tíme dvoch, od decembra 2025 do marca 2026: registráciu, cenník, platby, prehľad súborov a EEG prehliadač. Backend v Spring Boote a čistiaci proces v Pythone robili kolegovia.",
        de: "Ich habe die ganze Web-App von Grund auf in einem Zweierteam gebaut, von Dezember 2025 bis März 2026: Registrierung, Preise, Abrechnung, das Datei-Dashboard und den EEG-Viewer. Das Backend in Spring Boot und den Python-Worker für die Bereinigung haben Kollegen gebaut.",
        cs: "Celou webovou aplikaci jsem postavil od nuly v týmu dvou, od prosince 2025 do března 2026: registraci, ceník, platby, přehled souborů a EEG prohlížeč. Backend ve Spring Bootu a čisticí proces v Pythonu dělali kolegové.",
        hu: "Az egész webes alkalmazást a nulláról építettem egy kétfős csapatban, 2025 decemberétől 2026 márciusáig: regisztráció, árak, számlázás, a fájlok áttekintése és az EEG-megjelenítő. A Spring Boot backendet és a Python tisztító folyamatot a kollégáim készítették.",
      },
    ],
    contributions: [
      {
        en: "An EEG viewer that shows raw and cleaned signals over each other, only one of them or their difference, with stacked channels and the true values in tooltips",
        sk: "EEG prehliadač, ktorý zobrazí pôvodný a vyčistený signál cez seba, len jeden z nich alebo ich rozdiel, s kanálmi pod sebou a skutočnými hodnotami v popisoch",
        de: "Ein EEG-Viewer, der Roh- und bereinigtes Signal übereinander, nur eines davon oder ihre Differenz zeigt, mit gestapelten Kanälen und den echten Werten in Tooltips",
        cs: "EEG prohlížeč, který zobrazí původní a vyčištěný signál přes sebe, jen jeden z nich nebo jejich rozdíl, s kanály pod sebou a skutečnými hodnotami v popiscích",
        hu: "EEG-megjelenítő, amely egymásra rajzolja a nyers és a tisztított jelet, csak az egyiket vagy a különbségüket mutatja, egymás alatti csatornákkal és a valódi értékekkel a felugró címkékben",
      },
      {
        en: "Signal filters (high-pass, low-pass and notch) running in the browser, so changing a filter needs no request to the server",
        sk: "Filtre signálu (horná priepusť, dolná priepusť a pásmová zádrž) bežiace v prehliadači, takže zmena filtra nepotrebuje požiadavku na server",
        de: "Signalfilter (Hochpass, Tiefpass und Notch) im Browser, sodass ein geänderter Filter keine Anfrage an den Server braucht",
        cs: "Filtry signálu (horní propust, dolní propust a pásmová zádrž) běžící v prohlížeči, takže změna filtru nepotřebuje požadavek na server",
        hu: "Jelszűrők (felüláteresztő, aluláteresztő és sávzáró) a böngészőben, így a szűrő módosítása nem igényel kérést a szerver felé",
      },
      {
        en: "Full keyboard control for views, panning, amplitude, window size and full screen, plus channel search and file download",
        sk: "Úplné ovládanie klávesnicou pre zobrazenia, posun, amplitúdu, veľkosť okna a celú obrazovku, plus hľadanie kanálov a stiahnutie súboru",
        de: "Volle Tastatursteuerung für Ansichten, Verschieben, Amplitude, Fenstergröße und Vollbild, dazu Kanalsuche und Datei-Download",
        cs: "Úplné ovládání klávesnicí pro zobrazení, posun, amplitudu, velikost okna a celou obrazovku, plus hledání kanálů a stažení souboru",
        hu: "Teljes billentyűzetes vezérlés a nézetekhez, a görgetéshez, az amplitúdóhoz, az ablakmérethez és a teljes képernyőhöz, valamint csatornakeresés és fájlletöltés",
      },
      {
        en: "Multi-step signup, login with route guards, pricing, billing and notifications",
        sk: "Registrácia v niekoľkých krokoch, prihlásenie s ochranou ciest, cenník, platby a notifikácie",
        de: "Mehrstufige Registrierung, Login mit geschützten Routen, Preise, Abrechnung und Benachrichtigungen",
        cs: "Registrace v několika krocích, přihlášení s ochranou cest, ceník, platby a notifikace",
        hu: "Többlépéses regisztráció, bejelentkezés védett útvonalakkal, árak, számlázás és értesítések",
      },
      {
        en: "A file dashboard with drag-and-drop upload, a price estimate before processing and a status stepper for each file",
        sk: "Prehľad súborov s nahrávaním cez drag and drop, odhadom ceny pred spracovaním a krokmi stavu pre každý súbor",
        de: "Ein Datei-Dashboard mit Upload per Drag and Drop, einer Preisschätzung vor der Verarbeitung und einer Statusanzeige für jede Datei",
        cs: "Přehled souborů s nahráváním přes drag and drop, odhadem ceny před zpracováním a kroky stavu pro každý soubor",
        hu: "Fájláttekintő drag and drop feltöltéssel, árbecsléssel a feldolgozás előtt és állapotjelzővel minden fájlhoz",
      },
      {
        en: "TanStack Router, Query, Form, Table and Virtual throughout, with Zod validation and the React Compiler",
        sk: "TanStack Router, Query, Form, Table a Virtual v celej aplikácii, s validáciou cez Zod a React Compilerom",
        de: "TanStack Router, Query, Form, Table und Virtual in der ganzen App, mit Zod-Validierung und dem React Compiler",
        cs: "TanStack Router, Query, Form, Table a Virtual v celé aplikaci, s validací přes Zod a React Compilerem",
        hu: "TanStack Router, Query, Form, Table és Virtual az egész alkalmazásban, Zod-validációval és a React Compilerrel",
      },
    ],
    decisions: [
      {
        title: {
          en: "WebGL instead of SVG charts",
          sk: "WebGL namiesto SVG grafov",
          de: "WebGL statt SVG-Diagrammen",
          cs: "WebGL místo SVG grafů",
          hu: "WebGL az SVG-diagramok helyett",
        },
        text: {
          en: "The first two versions of the viewer used Recharts, which draws every point as an SVG element. EEG recordings have many channels with hundreds of samples per second each, so the third version moved to Plotly's WebGL scatter plots, which draw on the GPU.",
          sk: "Prvé dve verzie prehliadača používali Recharts, ktorý kreslí každý bod ako SVG prvok. EEG záznamy majú veľa kanálov so stovkami vzoriek za sekundu, preto tretia verzia prešla na WebGL grafy z Plotly, ktoré kreslí grafická karta.",
          de: "Die ersten beiden Versionen des Viewers nutzten Recharts, das jeden Punkt als SVG-Element zeichnet. EEG-Aufnahmen haben viele Kanäle mit jeweils Hunderten Messwerten pro Sekunde, daher wechselte die dritte Version zu den WebGL-Diagrammen von Plotly, die auf der GPU zeichnen.",
          cs: "První dvě verze prohlížeče používaly Recharts, který kreslí každý bod jako SVG prvek. EEG záznamy mají mnoho kanálů se stovkami vzorků za sekundu, proto třetí verze přešla na WebGL grafy z Plotly, které kreslí grafická karta.",
          hu: "A megjelenítő első két verziója Rechartsot használt, amely minden pontot SVG-elemként rajzol. Az EEG-felvételeknek sok csatornája van, csatornánként másodpercenként több száz mintával, ezért a harmadik verzió a Plotly WebGL-es diagramjaira váltott, amelyeket a GPU rajzol.",
        },
      },
      {
        title: {
          en: "Draw only what is visible",
          sk: "Kresliť len to, čo je vidieť",
          de: "Nur zeichnen, was sichtbar ist",
          cs: "Kreslit jen to, co je vidět",
          hu: "Csak azt rajzolni, ami látszik",
        },
        text: {
          en: "The backend reduces the data before sending it, and the viewer finds the visible time window with a binary search and passes only that slice to the chart, so panning and zooming stay quick on long recordings.",
          sk: "Backend dáta pred odoslaním zredukuje a prehliadač nájde viditeľné časové okno binárnym vyhľadávaním a do grafu pošle len tento úsek, takže posun a priblíženie zostávajú rýchle aj pri dlhých záznamoch.",
          de: "Das Backend reduziert die Daten vor dem Senden, und der Viewer findet das sichtbare Zeitfenster per binärer Suche und gibt nur diesen Ausschnitt an das Diagramm, sodass Verschieben und Zoomen auch bei langen Aufnahmen flüssig bleiben.",
          cs: "Backend data před odesláním zredukuje a prohlížeč najde viditelné časové okno binárním vyhledáváním a do grafu pošle jen tento úsek, takže posun a přiblížení zůstávají rychlé i u dlouhých záznamů.",
          hu: "A backend küldés előtt csökkenti az adatot, a megjelenítő pedig bináris kereséssel megtalálja a látható időablakot, és csak ezt a szeletet adja át a diagramnak, így a görgetés és a nagyítás hosszú felvételeken is gyors marad.",
        },
      },
      {
        title: {
          en: "Filters in the browser",
          sk: "Filtre v prehliadači",
          de: "Filter im Browser",
          cs: "Filtry v prohlížeči",
          hu: "Szűrők a böngészőben",
        },
        text: {
          en: "The high-pass, low-pass and notch filters are standard biquad filters computed in the browser. Users can compare settings instantly instead of waiting for the server to process the file again.",
          sk: "Filtre hornej a dolnej priepusti a pásmovej zádrže sú štandardné bikvadratické filtre počítané v prehliadači. Používatelia môžu nastavenia porovnávať okamžite a nečakajú, kým server súbor spracuje znova.",
          de: "Hochpass-, Tiefpass- und Notch-Filter sind Standard-Biquad-Filter, die im Browser berechnet werden. Nutzer können Einstellungen sofort vergleichen, statt zu warten, bis der Server die Datei erneut verarbeitet.",
          cs: "Filtry horní a dolní propusti a pásmové zádrže jsou standardní bikvadratické filtry počítané v prohlížeči. Uživatelé mohou nastavení porovnávat okamžitě a nečekají, až server soubor zpracuje znovu.",
          hu: "A felüláteresztő, az aluláteresztő és a sávzáró szűrő szabványos biquad szűrő, amelyet a böngésző számol. A felhasználók azonnal összevethetik a beállításokat, és nem kell megvárniuk, hogy a szerver újra feldolgozza a fájlt.",
        },
      },
    ],
    lessons: [
      {
        en: "Pick the drawing technology for the size of the data. The SVG chart library was quick to start with, but the amount of data called for WebGL.",
        sk: "Technológiu kreslenia treba vyberať podľa objemu dát. S knižnicou SVG grafov sa začínalo rýchlo, no množstvo dát si vyžiadalo WebGL.",
        de: "Die Zeichentechnik muss zur Datenmenge passen. Mit der SVG-Diagrammbibliothek ging der Start schnell, aber die Datenmenge verlangte nach WebGL.",
        cs: "Technologii kreslení je třeba vybírat podle objemu dat. S knihovnou SVG grafů se začínalo rychle, ale množství dat si vyžádalo WebGL.",
        hu: "A rajzolási technológiát az adat méretéhez kell választani. Az SVG-diagramkönyvtárral gyorsan el lehetett indulni, de az adatmennyiség WebGL-t kívánt.",
      },
    ],
  },
];

export function getCaseStudy(id: string) {
  const study = caseStudies.find((entry) => entry.id === id);
  if (!study) return undefined;
  const job = jobs.find((entry) => entry.items.some((item) => item.id === id)) as Job;
  const item = job.items.find((entry) => entry.id === id) as WorkItem;
  return { study, job, item };
}

export const hasCaseStudy = (id: string) => caseStudies.some((entry) => entry.id === id);
