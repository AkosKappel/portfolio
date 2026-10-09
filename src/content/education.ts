import type { Degree } from "./types";

export const degrees: Degree[] = [
  {
    degree: "Ing. (Master's degree)",
    field: "Intelligent Software Systems",
    school:
      "Slovak University of Technology in Bratislava, Faculty of Informatics and Information Technologies",
    url: "https://www.fiit.stuba.sk/",
    start: 2022,
    end: 2024,
    thesis: {
      title:
        "Neural network based semi-automatic segmentation methods to enhance the detection and monitoring of human eye diseases",
      url: "/projects/glaucoma-segmentation",
    },
  },
  {
    degree: "Bc. (Bachelor's degree)",
    field: "Computer Science",
    school:
      "Slovak University of Technology in Bratislava, Faculty of Informatics and Information Technologies",
    url: "https://www.fiit.stuba.sk/",
    start: 2019,
    end: 2022,
    thesis: { title: "Problem generator for analytical geometry in the plane: conic sections" },
  },
  {
    degree: "Secondary school",
    field: "Grammar school",
    school: "Gymnázium M. R. Štefánika, Nové Zámky",
    start: 2011,
    end: 2019,
  },
];
