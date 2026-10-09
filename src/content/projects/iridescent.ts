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
      en: "A two-player split-screen puzzle game made as a university team project. Players collect colours, mix them into new ones and use them together to get through each level.",
      sk: "Hádanková hra pre dvoch hráčov na rozdelenej obrazovke, tímový projekt na univerzite. Hráči zbierajú farby, miešajú z nich nové a spoločne ich využívajú na prejdenie levelov.",
    },
  ],
  kind: "team",
  area: "games",
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
};
