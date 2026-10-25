import type { Project } from "../types";

export const iridescent: Project = {
  slug: "iridescent",
  title: "Iridescent",
  summary: {
    en: "Cooperative puzzle game for two players who collect and mix colours to get past obstacles.",
    sk: "Kooperatívna hádanková hra pre dvoch hráčov, ktorí zbierajú a miešajú farby, aby prekonali prekážky.",
  },
  description: [
    {
      en: "A 3D split-screen puzzle platformer for two players, made by a team of three for the Game Development course at FIIT STU in 2022. Students from the Academy of Performing Arts in Bratislava contributed 3D models.",
      sk: "3D hádanková plošinovka pre dvoch hráčov na rozdelenej obrazovke, ktorú vytvoril trojčlenný tím v predmete Vývoj hier na FIIT STU v roku 2022. 3D modely prispeli aj študenti Vysokej školy múzických umení v Bratislave.",
    },
    {
      en: "Each player carries a colour. Players collect colours in the level, mix them into new ones and use them on obstacles that only react to a certain colour, so most puzzles need both players working together. A playthrough takes about half an hour.",
      sk: "Každý hráč nesie farbu. Hráči v leveli zbierajú farby, miešajú z nich nové a používajú ich na prekážky, ktoré reagujú len na určitú farbu, takže väčšina hádaniek si vyžaduje spoluprácu oboch hráčov. Prejdenie hry trvá asi pol hodiny.",
    },
    {
      en: "I was responsible for the obstacles: buttons, levers, doors and the special blocks the levels are built from. I also built most of the second level and fixed bugs in jumping and collisions. My teammates handled the player controls, colour mixing, camera, menus and the other levels. The game is released on itch.io for the browser, Windows, macOS and Linux.",
      sk: "Bol som zodpovedný za prekážky: tlačidlá, páky, dvere a špeciálne bloky, z ktorých sú levely poskladané. Postavil som aj väčšinu druhého levelu a opravoval chyby v skákaní a kolíziách. Ostatní členovia tímu mali na starosti ovládanie postáv, miešanie farieb, kameru, menu a ďalšie levely. Hra je vydaná na itch.io pre prehliadač, Windows, macOS a Linux.",
    },
  ],
  features: [
    {
      en: "Local co-op on one screen, with keyboard or Xbox and PlayStation controllers",
      sk: "Lokálna kooperácia na jednej obrazovke, s klávesnicou alebo ovládačmi Xbox a PlayStation",
    },
    {
      en: "Colour mixing: combine collected colours to unlock obstacles that need a new one",
      sk: "Miešanie farieb: spojením nazbieraných farieb vzniknú nové, ktoré otvoria ďalšie prekážky",
    },
    {
      en: "Doors, buttons, levers, shadow blocks and destructible walls that react to colour",
      sk: "Dvere, tlačidlá, páky, tieňové bloky a zničiteľné steny, ktoré reagujú na farbu",
    },
  ],
  highlights: [
    {
      en: "Push buttons, timed buttons and levers that only react to the right colour; bigger buttons need a player who has absorbed several colours, and a cube of the right colour can hold a button down",
      sk: "Tlačidlá, časované tlačidlá a páky, ktoré reagujú len na správnu farbu; väčšie tlačidlá potrebujú hráča, ktorý pohltil viac farieb, a tlačidlo môže podržať aj kocka správnej farby",
    },
    {
      en: "A button stays pressed while anyone stands on it, and lets go when the player on it loses the right colour",
      sk: "Tlačidlo zostane stlačené, kým na ňom niekto stojí, a uvoľní sa, keď hráč na ňom stratí správnu farbu",
    },
    {
      en: "Doors linked to any number of buttons, and one button able to open several doors; a door stays open while any of its buttons is pressed",
      sk: "Dvere prepojené s ľubovoľným počtom tlačidiel a jedno tlačidlo, ktoré otvorí viacero dverí; dvere zostanú otvorené, kým je stlačené aspoň jedno z ich tlačidiel",
    },
    {
      en: "Coloured doors that only a player of the same colour can pass, shadow blocks on a timer and destructible obstacles, all as reusable prefabs",
      sk: "Farebné dvere, cez ktoré prejde len hráč rovnakej farby, tieňové bloky s časovačom a zničiteľné prekážky, všetko ako opakovane použiteľné prefaby",
    },
    {
      en: "Most of the second level and the last checkpoint of the first one",
      sk: "Väčšina druhého levelu a posledný checkpoint prvého",
    },
    {
      en: "Fixes to the double jump, walking through walls and buttons pressed by both players at once",
      sk: "Opravy dvojitého skoku, prechádzania cez steny a tlačidiel stlačených oboma hráčmi naraz",
    },
  ],
  versions: ["Unity 2021.3"],
  kind: "team",
  role: {
    en: "Obstacles, the second level and bug fixes in a team of three",
    sk: "Prekážky, druhý level a opravy chýb v trojčlennom tíme",
  },
  areas: ["games"],
  year: 2022,
  stack: ["Unity", "C#"],
  repoUrl: "https://gitlab.com/VighNorbert/iridescent",
  liveUrl: "https://the-norb.itch.io/iridescent",
  image: {
    src: "/images/projects/iridescent.webp",
    width: 1435,
    height: 798,
    alt: {
      en: "Iridescent title screen with two characters",
      sk: "Úvodná obrazovka hry Iridescent s dvoma postavami",
    },
  },
  gallery: [
    {
      src: "/images/projects/iridescent/bedroom.webp",
      width: 1280,
      height: 715,
      alt: {
        en: "Split-screen view of a colourless character next to a storybook on a bed",
        sk: "Rozdelená obrazovka s bezfarebnou postavou pri rozprávkovej knihe na posteli",
      },
      caption: {
        en: "The story opens in a bedroom: both characters start without colour.",
        sk: "Príbeh sa začína v spálni: obe postavy začínajú bez farby.",
      },
    },
    {
      src: "/images/projects/iridescent/stone-ruins.webp",
      width: 1280,
      height: 720,
      alt: {
        en: "Both players standing on pressure plates in stone ruins",
        sk: "Obaja hráči stoja na tlakových doskách v kamenných ruinách",
      },
      caption: {
        en: "Many puzzles need both players at once, for example on two pressure plates.",
        sk: "Mnohé hádanky potrebujú oboch hráčov naraz, napríklad na dvoch tlakových doskách.",
      },
    },
    {
      src: "/images/projects/iridescent/stone-blocks.webp",
      width: 1280,
      height: 706,
      alt: {
        en: "A see-through shadow block next to a player on a button",
        sk: "Priehľadný tieňový blok vedľa hráča na tlačidle",
      },
      caption: {
        en: "A see-through block that turns solid while a button is held down.",
        sk: "Priehľadný blok, ktorý spevnie, kým je tlačidlo stlačené.",
      },
    },
    {
      src: "/images/projects/iridescent/sand-door.webp",
      width: 1280,
      height: 709,
      alt: {
        en: "Red player next to a blue colour source in a wall, the other player still colourless",
        sk: "Červený hráč pri modrom zdroji farby v stene, druhý hráč je ešte bez farby",
      },
      caption: {
        en: "Colour sources in the walls give a player their colour.",
        sk: "Zdroje farby v stenách dajú hráčovi jeho farbu.",
      },
    },
    {
      src: "/images/projects/iridescent/water-pool.webp",
      width: 1280,
      height: 715,
      alt: {
        en: "Blue player next to a blue see-through area of water with a ball",
        sk: "Modrý hráč pri modrej priehľadnej vodnej ploche s loptičkou",
      },
      caption: {
        en: "Obstacles only react to a player of the matching colour.",
        sk: "Prekážky reagujú len na hráča zodpovedajúcej farby.",
      },
    },
    {
      src: "/images/projects/iridescent/rainbow-goal.webp",
      width: 1280,
      height: 715,
      alt: {
        en: "Yellow player in a light level with lock signs and a rainbow in the distance",
        sk: "Žltý hráč vo svetlom leveli so značkami zámkov a dúhou v diaľke",
      },
      caption: {
        en: "A later level, with a rainbow on the horizon.",
        sk: "Neskorší level s dúhou na obzore.",
      },
    },
  ],
};
