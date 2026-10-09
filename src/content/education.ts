import type { Degree } from "./types";

const fiit = {
  en: "Slovak University of Technology in Bratislava, Faculty of Informatics and Information Technologies",
  sk: "Slovenská technická univerzita v Bratislave, Fakulta informatiky a informačných technológií",
};

export const degrees: Degree[] = [
  {
    degree: { en: "Master's degree (Ing.)", sk: "Inžinierske štúdium (Ing.)" },
    field: { en: "Intelligent Software Systems", sk: "Inteligentné softvérové systémy" },
    school: fiit,
    url: "https://www.fiit.stuba.sk/",
    start: 2022,
    end: 2024,
    thesis: {
      title: {
        en: "Neural network based semi-automatic segmentation methods to enhance the detection and monitoring of human eye diseases",
        sk: "Poloautomatické segmentačné metódy založené na neurónových sieťach na zlepšenie detekcie a monitorovania ochorení ľudského oka",
      },
      url: "/projects/glaucoma-segmentation",
    },
  },
  {
    degree: { en: "Bachelor's degree (Bc.)", sk: "Bakalárske štúdium (Bc.)" },
    field: { en: "Computer Science", sk: "Informatika" },
    school: fiit,
    url: "https://www.fiit.stuba.sk/",
    start: 2019,
    end: 2022,
    thesis: {
      title: {
        en: "Problem generator for analytic geometry in the plane: conic sections",
        sk: "Generátor úloh z analytickej geometrie v rovine: kužeľosečky",
      },
    },
  },
  {
    degree: { en: "Secondary school", sk: "Stredná škola" },
    field: { en: "Grammar school", sk: "Gymnázium" },
    school: {
      en: "Gymnázium M. R. Štefánika, Nové Zámky",
      sk: "Gymnázium M. R. Štefánika, Nové Zámky",
    },
    start: 2011,
    end: 2019,
  },
];
