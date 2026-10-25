import type { Project } from "../types";

export const sketchbook: Project = {
  slug: "sketchbook",
  title: "SketchBook",
  summary: {
    en: "21 small browser sketches: classic games, simulations, fractals and canvas effects.",
    sk: "21 malých skíc v prehliadači: klasické hry, simulácie, fraktály a efekty na plátne.",
  },
  description: [
    {
      en: "Small projects I wrote in 2021 while learning JavaScript, mostly by following tutorials. Later I fixed their bugs, gave them one shared design that works on phones, and added nine new ones.",
      sk: "Malé projekty, ktoré som napísal v roku 2021, keď som sa učil JavaScript, väčšinou podľa tutoriálov. Neskôr som opravil ich chyby, dal im spoločný dizajn, ktorý funguje aj na mobile, a pridal deväť nových.",
    },
  ],
  features: [
    {
      en: "Games: Snake, Pong against the computer or a friend, Tic Tac Toe with an unbeatable bot, Minesweeper, 2048",
      sk: "Hry: Snake, Pong proti počítaču alebo kamarátovi, piškvorky s neporaziteľným botom, Mínolovka, 2048",
    },
    {
      en: "Simulations and algorithms: Game of Life, flocking boids, a genetic algorithm, a quadtree, maze generation and solving, sorting, Langton's Ant, reaction-diffusion",
      sk: "Simulácie a algoritmy: Game of Life, kŕdeľ boidov, genetický algoritmus, quadtree, generovanie a riešenie bludiska, triedenie, Langtonov mravec, reakcia a difúzia",
    },
    {
      en: "Math: a Mandelbrot explorer with zoom, Fourier series, the chaos game, the Barnsley fern, fractal trees and a double pendulum",
      sk: "Matematika: Mandelbrotova množina s priblížením, Fourierove rady, chaos game, Barnsleyho papraď, fraktálové stromy a dvojité kyvadlo",
    },
    {
      en: "Effects that react to the pointer or touch, two of them built from your own uploaded image",
      sk: "Efekty, ktoré reagujú na kurzor alebo dotyk, dva z nich zostavené z vlastného nahraného obrázka",
    },
    {
      en: "Every project has a short explanation of how it works",
      sk: "Každý projekt má krátke vysvetlenie, ako funguje",
    },
    {
      en: "A landing page with category filters and a preview of every project",
      sk: "Úvodná stránka s filtrom podľa kategórií a náhľadom každého projektu",
    },
  ],
  technical: [
    {
      en: "Plain HTML, CSS and JavaScript without a build step, hosted on GitHub Pages",
      sk: "Čisté HTML, CSS a JavaScript bez zostavovania, hostované na GitHub Pages",
    },
    {
      en: "Maze solvers and sorting algorithms are written as generators that pause after every step, so the animation can show them one step at a time",
      sk: "Riešiče bludiska a triediace algoritmy sú napísané ako generátory, ktoré sa po každom kroku zastavia, takže animácia ich ukáže krok po kroku",
    },
    {
      en: "Pixel-heavy effects write straight into image buffers, and the Mandelbrot set renders a few rows per frame to keep the page responsive",
      sk: "Efekty s veľa pixelmi zapisujú priamo do obrazových bufferov a Mandelbrotova množina sa vykresľuje po niekoľkých riadkoch na snímku, aby stránka reagovala",
    },
    {
      en: "The double pendulum is integrated with RK4, and several copies start 0.001° apart to show how quickly they drift apart",
      sk: "Dvojité kyvadlo sa počíta metódou RK4 a niekoľko kópií začína 0,001° od seba, aby bolo vidno, ako rýchlo sa rozídu",
    },
    {
      en: "Reaction-diffusion follows the Gray-Scott model",
      sk: "Reakcia a difúzia vychádza z Gray-Scottovho modelu",
    },
  ],
  changelog: [
    {
      en: "p5.js 1.3 to 1.11",
      sk: "p5.js 1.3 na 1.11",
    },
    {
      en: "One shared dark design",
      sk: "Jeden spoločný tmavý dizajn",
    },
    {
      en: "Canvases that fit any screen and work with touch",
      sk: "Plátna, ktoré sa prispôsobia každej obrazovke a fungujú s dotykom",
    },
    {
      en: "About a dozen bug fixes",
      sk: "Asi tucet opráv chýb",
    },
    {
      en: "Nine new projects",
      sk: "Deväť nových projektov",
    },
  ],
  versions: ["p5.js 1.11"],
  kind: "personal",
  areas: ["web", "games"],
  year: 2021,
  until: 2026,
  stack: ["JavaScript", "p5.js", "Canvas", "HTML", "CSS", "GitHub Pages"],
  repoUrl: "https://github.com/AkosKappel/sketchbook",
  liveUrl: "https://akoskappel.github.io/sketchbook/",
  image: {
    src: "/images/projects/sketchbook-2026.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "SketchBook landing page with the title drawn by particles and project previews",
      sk: "Úvodná stránka SketchBook s nadpisom z častíc a náhľadmi projektov",
    },
  },
  gallery: [
    {
      src: "/images/projects/sketchbook/mandelbrot.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Blue spirals at the edge of the Mandelbrot set",
        sk: "Modré špirály na okraji Mandelbrotovej množiny",
      },
      caption: {
        en: "Mandelbrot explorer: click, drag and scroll to zoom into the fractal.",
        sk: "Mandelbrotova množina: kliknutím, ťahaním a skrolovaním sa dá fraktál približovať.",
      },
    },
    {
      src: "/images/projects/sketchbook/maze.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "A generated maze with the explored cells colored and the shortest path drawn in green",
        sk: "Vygenerované bludisko s farebne označenými preskúmanými políčkami a najkratšou cestou zelenou",
      },
      caption: {
        en: "Maze: generated step by step, then solved by breadth-first search, depth-first search or A*.",
        sk: "Bludisko: generované krok po kroku a potom vyriešené prehľadávaním do šírky, do hĺbky alebo A*.",
      },
    },
    {
      src: "/images/projects/sketchbook/flow-field.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Colorful flowing lines drawn by particles following Perlin noise",
        sk: "Farebné plynulé čiary nakreslené časticami, ktoré sledujú Perlinov šum",
      },
      caption: {
        en: "Flow Field: thousands of particles following Perlin noise, stirred by the pointer.",
        sk: "Flow Field: tisíce častíc, ktoré sledujú Perlinov šum a dajú sa rozvíriť kurzorom.",
      },
    },
    {
      src: "/images/projects/sketchbook/reaction-diffusion.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Glowing green rings and cells grown by a reaction-diffusion simulation",
        sk: "Žiariace zelené prstence a bunky vytvorené simuláciou reakcie a difúzie",
      },
      caption: {
        en: "Reaction-Diffusion: patterns grown by the Gray-Scott model; draw to add chemical.",
        sk: "Reakcia a difúzia: vzory, ktoré rastú podľa Gray-Scottovho modelu; kreslením sa pridáva chemikália.",
      },
    },
    {
      src: "/images/projects/sketchbook/double-pendulum.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Many colored double pendulums with tangled trails",
        sk: "Veľa farebných dvojitých kyvadiel so spletenými stopami",
      },
      caption: {
        en: "Double Pendulum: copies that start 0.001° apart end up in completely different places.",
        sk: "Dvojité kyvadlo: kópie, ktoré začnú 0,001° od seba, skončia úplne inde.",
      },
    },
    {
      src: "/images/projects/sketchbook/sorting.webp",
      width: 1280,
      height: 800,
      alt: {
        en: "Bars being sorted by quicksort, with comparison and write counters",
        sk: "Stĺpce triedené algoritmom quicksort s počítadlom porovnaní a zápisov",
      },
      caption: {
        en: "Sorting: six algorithms animated step by step, with comparisons and writes counted.",
        sk: "Triedenie: šesť algoritmov animovaných krok po kroku, s počítaním porovnaní a zápisov.",
      },
    },
  ],
};
