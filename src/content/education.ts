import type { Degree, Text } from "./types";

export const university = {
  name: {
    en: "Slovak University of Technology in Bratislava",
    sk: "Slovenská technická univerzita v Bratislave",
  } satisfies Text,
  faculty: {
    en: "Faculty of Informatics and Information Technologies (FIIT)",
    sk: "Fakulta informatiky a informačných technológií (FIIT)",
  } satisfies Text,
  url: "https://www.fiit.stuba.sk/",
};

/** University degrees, newest first. */
export const degrees: Degree[] = [
  {
    id: "masters",
    degree: { en: "Master's degree (Ing.)", sk: "Inžinierske štúdium (Ing.)" },
    field: { en: "Intelligent Software Systems", sk: "Inteligentné softvérové systémy" },
    start: 2022,
    end: 2024,
    description: {
      en: "Machine learning, neural networks, data analysis and the design of larger software systems.",
      sk: "Strojové učenie, neurónové siete, analýza dát a návrh väčších softvérových systémov.",
    },
    thesis: {
      title: {
        en: "Neural network based semi-automatic segmentation methods to enhance the detection and monitoring of human eye diseases",
        sk: "Poloautomatické segmentačné metódy založené na neurónových sieťach na zlepšenie detekcie a monitorovania ochorení ľudského oka",
      },
      url: "/projects/glaucoma-segmentation",
    },
  },
  {
    id: "bachelors",
    degree: { en: "Bachelor's degree (Bc.)", sk: "Bakalárske štúdium (Bc.)" },
    field: { en: "Computer Science", sk: "Informatika" },
    start: 2019,
    end: 2022,
    description: {
      en: "Programming, algorithms, databases, networks, web technologies and team projects such as the SmartTech e-shop and the Iridescent game.",
      sk: "Programovanie, algoritmy, databázy, siete, webové technológie a tímové projekty ako e-shop SmartTech a hra Iridescent.",
    },
    thesis: {
      title: {
        en: "Problem generator for analytical geometry in the plane: conic sections",
        sk: "Generátor úloh z analytickej geometrie v rovine: kužeľosečky",
      },
    },
  },
];

export const secondarySchool = {
  name: { en: "Gymnázium M. R. Štefánika", sk: "Gymnázium M. R. Štefánika" } satisfies Text,
  place: "Nové Zámky",
  type: { en: "Grammar school", sk: "Gymnázium" } satisfies Text,
  start: 2011,
  end: 2019,
};
