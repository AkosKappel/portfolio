import type { Project } from "../types";

export const conicSectionsGenerator: Project = {
  slug: "conic-sections-generator",
  title: "Conic Sections Problem Generator",
  summary: {
    en: "Bachelor's thesis: a Mathematica tool that generates ellipse problems with step-by-step solutions.",
    sk: "Bakalárska práca: nástroj v Mathematice, ktorý generuje úlohy o elipse s postupom riešenia.",
  },
  description: [
    {
      en: "For my bachelor's thesis I built a generator of analytical geometry problems about ellipses for students practising for exams. It covers ten problem types, from rewriting an equation into its general form to finding the tangents through a point, each in an easy, medium and hard variant.",
      sk: "V bakalárskej práci som vytvoril generátor úloh z analytickej geometrie o elipse pre študentov, ktorí sa pripravujú na skúšky. Pokrýva desať typov úloh, od prepisu rovnice do všeobecného tvaru po hľadanie dotyčníc cez bod, každý v ľahkej, strednej a ťažkej verzii.",
    },
    {
      en: "Every problem is random but chosen to have clean numbers, and comes with a worked solution written the way a student would solve it on paper, a plot and the answer. Teachers can put together a whole test and export it with an answer key or full solutions.",
      sk: "Každá úloha je náhodná, ale s peknými číslami, a obsahuje postup riešenia tak, ako by ho študent písal na papier, graf a výsledok. Učiteľ si môže zostaviť celý test a exportovať ho s kľúčom odpovedí alebo s úplnými riešeniami.",
    },
  ],
  highlights: [
    {
      en: "10 problem types in 3 difficulty levels",
      sk: "10 typov úloh v 3 úrovniach náročnosti",
    },
    {
      en: "Step-by-step solutions recorded while the problem is solved",
      sk: "Postup riešenia zaznamenaný počas riešenia úlohy",
    },
    {
      en: "Student practice mode and teacher test builder",
      sk: "Režim na precvičovanie pre študenta a zostavovanie testov pre učiteľa",
    },
  ],
  technical: [
    {
      en: "Each problem type is a self-contained Mathematica module that returns the statement, the solution steps, a plot and the answer",
      sk: "Každý typ úlohy je samostatný modul v Mathematice, ktorý vráti zadanie, postup riešenia, graf a výsledok",
    },
    {
      en: "Parameters are kept readable: semi-axes are clamped so the ellipse is neither a near-circle nor too flat, and the general equation is reduced by its greatest common divisor",
      sk: "Parametre zostávajú čitateľné: poloosi sú obmedzené, aby elipsa nebola takmer kružnica ani príliš plochá, a všeobecná rovnica sa krátí najväčším spoločným deliteľom",
    },
    {
      en: "Some problem types are generated backwards: start from a random answer, derive the problem, then reverse the recorded steps and invert each operation",
      sk: "Niektoré typy úloh sa generujú odzadu: z náhodného výsledku sa odvodí zadanie, potom sa zaznamenané kroky otočia a každá operácia sa nahradí inverznou",
    },
    {
      en: "Ellipses with many integer points were found by a brute-force search and stored, so intersections and touching points can be computed by hand",
      sk: "Elipsy s mnohými celočíselnými bodmi som našiel hrubou silou a uložil, aby sa priesečníky a body dotyku dali vypočítať ručne",
    },
    {
      en: "Tested with final-year secondary school students for ease of use and how well the generated solutions matched their own",
      sk: "Testované so študentmi posledného ročníka strednej školy: jednoduchosť použitia a zhoda vzorových riešení s ich vlastnými",
    },
    {
      en: "The interface and test export were adapted from two fellow students' bachelor's theses and connected to the generators",
      sk: "Rozhranie a export testov som prevzal z bakalárskych prác dvoch spolužiakov a prepojil ich s generátormi",
    },
  ],
  versions: ["Mathematica 12.3"],
  kind: "university",
  areas: ["math"],
  year: 2021,
  until: 2022,
  role: {
    en: "Supervised by Mgr. Milada Omachelová, PhD. et PhD.",
    sk: "Vedúca práce Mgr. Milada Omachelová, PhD. et PhD.",
  },
  stack: ["Wolfram Mathematica"],
  repoUrl: "https://github.com/AkosKappel/BP-ConicShapes",
  paperUrl: "https://opac.crzp.sk/?fn=detailBiblioForm&sid=4F55101800366CEF5AFDC4DB109A",
  image: {
    src: "/images/projects/conic-sections.webp",
    width: 1032,
    height: 795,
    alt: {
      en: "Generated ellipse problem with its solution steps and a plot of the ellipse",
      sk: "Vygenerovaná úloha o elipse s postupom riešenia a grafom elipsy",
    },
  },
  gallery: [
    {
      src: "/images/projects/conic-sections-generator/demo.webp",
      video: "/images/projects/conic-sections-generator/demo.mp4",
      width: 1032,
      height: 978,
      alt: {
        en: "Screen recording of the generator building a test and solving a tangent problem step by step",
        sk: "Záznam obrazovky generátora pri zostavovaní testu a riešení úlohy s dotyčnicou po krokoch",
      },
      caption: {
        en: "A 50-second walkthrough: building a test in teacher mode, then a generated tangent problem with its solution steps and plot.",
        sk: "50-sekundová ukážka: zostavenie testu v režime pre učiteľa a potom vygenerovaná úloha s dotyčnicou, postupom riešenia a grafom.",
      },
    },
    {
      src: "/images/projects/conic-sections-generator/tangent-transformations.webp",
      width: 1307,
      height: 436,
      alt: {
        en: "Three plots of an ellipse with two tangents through point M: original, mirrored across x = y, and shifted",
        sk: "Tri grafy elipsy s dvoma dotyčnicami cez bod M: pôvodný, zrkadlený podľa priamky x = y a posunutý",
      },
      caption: {
        en: "Tangent problems come from stored cases with integer results. Mirroring across x = y and shifting by an integer vector turn each case into many different problems.",
        sk: "Úlohy s dotyčnicami vychádzajú z uložených prípadov s celočíselnými výsledkami. Zrkadlenie podľa priamky x = y a posunutie o celočíselný vektor z každého prípadu vytvoria mnoho rôznych úloh.",
      },
    },
    {
      src: "/images/projects/conic-sections-generator/problem-types.webp",
      width: 1032,
      height: 797,
      alt: {
        en: "List of ten ellipse problem types coloured green, yellow and red",
        sk: "Zoznam desiatich typov úloh o elipse vyfarbených nazeleno, nažlto a načerveno",
      },
      caption: {
        en: "Student mode: the ten problem types, coloured from simpler (green) to harder (red).",
        sk: "Režim pre študenta: desať typov úloh, vyfarbených od jednoduchších (zelená) po náročnejšie (červená).",
      },
    },
    {
      src: "/images/projects/conic-sections-generator/test-builder.webp",
      width: 1028,
      height: 795,
      alt: {
        en: "Form with a number of problems for every problem type and difficulty",
        sk: "Formulár s počtom úloh pre každý typ a náročnosť",
      },
      caption: {
        en: "Teacher mode: choose how many problems of each type and difficulty the test should have, then generate it with an answer key or full solutions.",
        sk: "Režim pre učiteľa: zvoľte, koľko úloh každého typu a náročnosti má test obsahovať, a vygenerujte ho s kľúčom odpovedí alebo s riešeniami.",
      },
    },
  ],
};
