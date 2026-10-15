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
      en: "Small projects I wrote in 2021 while learning JavaScript, mostly by following tutorials. Later I fixed their bugs, gave them one shared design that works on phones, and added five new ones.",
      sk: "Malé projekty, ktoré som napísal v roku 2021, keď som sa učil JavaScript, väčšinou podľa tutoriálov. Neskôr som opravil ich chyby, dal im spoločný dizajn, ktorý funguje aj na mobile, a pridal päť nových.",
    },
  ],
  features: [
    {
      en: "Games: Snake, Pong against the computer or a friend, Tic Tac Toe with an unbeatable bot, Minesweeper",
      sk: "Hry: Snake, Pong proti počítaču alebo kamarátovi, piškvorky s neporaziteľným botom, Mínolovka",
    },
    {
      en: "Simulations and algorithms: Game of Life, flocking boids, a genetic algorithm, a quadtree, maze generation and solving, sorting",
      sk: "Simulácie a algoritmy: Game of Life, kŕdeľ boidov, genetický algoritmus, quadtree, generovanie a riešenie bludiska, triedenie",
    },
    {
      en: "Math: a Mandelbrot explorer with zoom, Fourier series, the chaos game, the Barnsley fern and fractal trees",
      sk: "Matematika: Mandelbrotova množina s priblížením, Fourierove rady, chaos game, Barnsleyho papraď a fraktálové stromy",
    },
    {
      en: "Effects that react to the pointer or touch, two of them built from your own uploaded image",
      sk: "Efekty, ktoré reagujú na kurzor alebo dotyk, dva z nich zostavené z vlastného nahraného obrázka",
    },
    {
      en: "Every project has a short explanation of how it works",
      sk: "Každý projekt má krátke vysvetlenie, ako funguje",
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
      en: "Five new projects",
      sk: "Päť nových projektov",
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
  ],
};
