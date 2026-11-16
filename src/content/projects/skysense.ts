import type { Project } from "../types";

export const skysense: Project = {
  slug: "skysense",
  title: "SkySense",
  summary: {
    en: "A weather app that answers questions: when to go for a run, whether to take an umbrella, how sure the forecast is and whether today is normal.",
    sk: "Aplikácia o počasí, ktorá odpovedá na otázky: kedy si ísť zabehať, či si vziať dáždnik, aká istá je predpoveď a či je dnešok normálny.",
  },
  description: [
    {
      en: 'Most weather apps show a grid of numbers and icons and leave the thinking to you. SkySense starts with one or two plain sentences, like "Rain until 16:00, then dry.", tells you what to wear, and then answers one question per tile: do I need an umbrella, when does it get dark, how windy is it.',
      sk: "Väčšina aplikácií o počasí ukáže mriežku čísel a ikon a premýšľanie nechá na vás. SkySense začne jednou-dvoma jednoduchými vetami, napríklad „Dážď do 16:00, potom sucho.“, povie, čo si obliecť, a potom každá dlaždica odpovedá na jednu otázku: potrebujem dáždnik, kedy sa zotmie, aký silný je vietor.",
    },
    {
      en: 'The part I enjoyed most is being honest about uncertainty. The app reads all 51 runs of the ECMWF ensemble, so it can say "96% of model runs show rain right now", hedge the summary when the runs disagree and show a likely range around the temperature line. It also compares today with the 1991 to 2020 climate for the same date, so "3° colder than usual" has real data behind it.',
      sk: "Najviac ma bavilo byť úprimný k neistote. Aplikácia číta všetkých 51 behov ansámblu ECMWF, takže vie povedať „96 % behov modelu ukazuje dážď práve teraz“, zmierniť zhrnutie, keď sa behy nezhodujú, a ukázať pravdepodobný rozsah okolo krivky teploty. Dnešok tiež porovná s klímou rokov 1991 až 2020 pre rovnaký dátum, takže „o 3° chladnejšie ako zvyčajne“ stojí na skutočných dátach.",
    },
    {
      en: "Every hour is scored for running, cycling, walking, hiking, a picnic, laundry outside, stargazing and golden hour photos. The scores are explicit rules rather than a model, so each one opens into the factors behind it, and a map of the area around you shows where the same activity scores better on a given day.",
      sk: "Každá hodina dostane skóre pre beh, bicykel, prechádzku, turistiku, piknik, sušenie prádla vonku, pozorovanie hviezd a fotky v zlatej hodinke. Skóre sú jasné pravidlá, nie model, takže každé sa dá rozbaliť na faktory, ktoré zaň stoja, a mapa okolia ukáže, kde je v daný deň pre rovnakú aktivitu lepšie.",
    },
  ],
  features: [
    {
      en: "A plain summary on top, what to wear, and tiles that each answer one question: umbrella, darkness, wind, air quality, pollen, the moon and frost",
      sk: "Jednoduché zhrnutie navrchu, čo si obliecť a dlaždice, z ktorých každá odpovedá na jednu otázku: dáždnik, tma, vietor, kvalita vzduchu, peľ, mesiac a mráz",
    },
    {
      en: "The best time today and in the next 10 days for eight activities, each score broken into its factors, with the good times as a calendar file",
      sk: "Najlepší čas dnes a v nasledujúcich 10 dňoch pre osem aktivít, každé skóre rozložené na faktory, s dobrými časmi ako súborom do kalendára",
    },
    {
      en: "Forecast confidence from 51 ensemble runs, and five weather models compared side by side",
      sk: "Istota predpovede z 51 behov ansámblu a päť modelov počasia porovnaných vedľa seba",
    },
    {
      en: "Today against the 30-year climate normal, the same date in each of the last ten years, and how long it has been dry",
      sk: "Dnešok oproti 30-ročnému klimatickému normálu, rovnaký dátum v každom z posledných desiatich rokov a ako dlho už neprší",
    },
    {
      en: "Rain radar for the last 2 hours and the model's rain for the next 3, also described in words",
      sk: "Dažďový radar za posledné 2 hodiny a dážď z modelu na ďalšie 3, opísaný aj slovami",
    },
    {
      en: '"Where is it better?": a map of about 150 km around you scored for an activity, with the answer in a sentence',
      sk: "„Kde je lepšie?“: mapa okolia v okruhu asi 150 km ohodnotená pre aktivitu, s odpoveďou v jednej vete",
    },
    {
      en: "A week view with the best day per activity, two places compared day by day, an embeddable card and a wall display for an old tablet",
      sk: "Týždenný pohľad s najlepším dňom pre každú aktivitu, porovnanie dvoch miest po dňoch, karta na vloženie do iného webu a nástenný displej pre starý tablet",
    },
    {
      en: "Installable and usable offline for places opened before; no accounts and no tracking",
      sk: "Dá sa nainštalovať a funguje offline pre už otvorené miesta; bez účtov a bez sledovania",
    },
    {
      en: "English, German, Slovak, Hungarian and Spanish, light and dark theme",
      sk: "Angličtina, nemčina, slovenčina, maďarčina a španielčina, svetlá a tmavá téma",
    },
  ],
  technical: [
    {
      en: "The browser talks only to the app: server routes call Open-Meteo, validate the answers with Zod and reduce them, so 51 ensemble members become three numbers an hour",
      sk: "Prehliadač komunikuje len s aplikáciou: serverové routy volajú Open-Meteo, overia odpovede cez Zod a zredukujú ich, takže z 51 členov ansámblu sú tri čísla na hodinu",
    },
    {
      en: "Coordinates rounded to about 1 km for privacy and cache hits; answers cached on the CDN and in memory",
      sk: "Súradnice zaokrúhlené na asi 1 km kvôli súkromiu a lepšiemu cachovaniu; odpovede uložené v CDN aj v pamäti",
    },
    {
      en: "Activity scores are weighted geometric means of named thresholds, so one bad factor sinks a score instead of being averaged away; every rule is written up as a decision record",
      sk: "Skóre aktivít sú vážené geometrické priemery pomenovaných prahov, takže jeden zlý faktor skóre potopí namiesto toho, aby sa spriemeroval; každé pravidlo je zdôvodnené v zázname rozhodnutí",
    },
    {
      en: "Whole sentences per language: logic returns a message key and values, never fragments, with each language's plural forms",
      sk: "Celé vety v každom jazyku: logika vracia kľúč správy a hodnoty, nikdy nie útržky, s množnými tvarmi každého jazyka",
    },
    {
      en: "Unit, component and Playwright tests against recorded weather, including polar night, the midnight sun and a heat wave; axe checks at 320 px, and Lighthouse scores and JavaScript budgets enforced in CI",
      sk: "Unit, komponentové a Playwright testy nad nahratým počasím vrátane polárnej noci, polnočného slnka a vlny horúčav; kontroly cez axe pri 320 px a skóre Lighthouse a limity JavaScriptu vynútené v CI",
    },
  ],
  versions: ["SvelteKit 3", "Svelte 5", "Tailwind CSS 4", "TypeScript 6"],
  kind: "personal",
  areas: ["web"],
  year: 2026,
  stack: [
    "SvelteKit",
    "Svelte",
    "TypeScript",
    "Tailwind CSS",
    "Zod",
    "Leaflet",
    "Paraglide",
    "Vitest",
    "Playwright",
    "Vercel",
  ],
  repoUrl: "https://github.com/AkosKappel/SkySense",
  liveUrl: "https://skysense.akoskappel.dev",
  image: {
    src: "/images/projects/skysense-2026.webp",
    width: 1440,
    height: 900,
    alt: {
      en: "SkySense for Bratislava on a wide screen: the summary, an air quality notice and tiles for the current weather, umbrella, darkness and wind",
      sk: "SkySense pre Bratislavu na širokej obrazovke: zhrnutie, upozornenie na kvalitu vzduchu a dlaždice s aktuálnym počasím, dáždnikom, tmou a vetrom",
    },
  },
  architecture: [
    {
      name: { en: "Browser", sk: "Prehliadač" },
      detail: {
        en: "Svelte pages, saved places in local storage",
        sk: "Stránky vo Svelte, uložené miesta v lokálnom úložisku",
      },
    },
    {
      name: { en: "SvelteKit server", sk: "Server SvelteKit" },
      detail: {
        en: "Validates, reduces and caches the weather data",
        sk: "Overí, zredukuje a uloží údaje o počasí do cache",
      },
    },
    {
      name: { en: "Open-Meteo", sk: "Open-Meteo" },
      detail: {
        en: "Forecast, ensemble, air quality and the climate archive",
        sk: "Predpoveď, ansámbel, kvalita vzduchu a klimatický archív",
      },
    },
  ],
  gallery: [
    {
      src: "/images/projects/skysense/phone-overview.webp",
      width: 520,
      height: 1125,
      alt: {
        en: "Bratislava on a phone: the summary, an air quality notice and 6 degrees with rain",
        sk: "Bratislava v mobile: zhrnutie, upozornenie na kvalitu vzduchu a 6 stupňov s dažďom",
      },
      caption: {
        en: "The answer comes first: a sentence about the day, then what to wear.",
        sk: "Odpoveď je na prvom mieste: veta o dni a potom čo si obliecť.",
      },
    },
    {
      src: "/images/projects/skysense/phone-activities.webp",
      width: 520,
      height: 1125,
      alt: {
        en: "The activity tile with a run scored 97 of 100 and a bar for each factor",
        sk: "Dlaždica aktivít s behom ohodnoteným 97 zo 100 a pruhom pre každý faktor",
      },
      caption: {
        en: "Every activity score opens into the factors behind it, and the good times go straight to a calendar.",
        sk: "Každé skóre aktivity sa dá rozbaliť na faktory, ktoré zaň stoja, a dobré časy idú rovno do kalendára.",
      },
    },
    {
      src: "/images/projects/skysense/phone-night.webp",
      width: 520,
      height: 1125,
      alt: {
        en: "Norilsk at night: dry for the next 24 hours, though some model runs show snow",
        sk: "Norilsk v noci: sucho na ďalších 24 hodín, hoci niektoré behy modelu ukazujú sneh",
      },
      caption: {
        en: "When the model runs disagree, the summary says so instead of pretending to be sure.",
        sk: "Keď sa behy modelu nezhodujú, zhrnutie to povie namiesto predstieranej istoty.",
      },
    },
    {
      src: "/images/projects/skysense/models.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Five weather models compared for Madrid, with temperature lines and each model's rain",
        sk: "Päť modelov počasia porovnaných pre Madrid s krivkami teploty a dažďom každého modelu",
      },
      caption: {
        en: "Five forecasting centres side by side: where they agree, the forecast is solid.",
        sk: "Päť predpovedných centier vedľa seba: kde sa zhodujú, predpoveď je spoľahlivá.",
      },
    },
  ],
};
