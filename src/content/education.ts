import type { Degree, Text } from "./types";

export const university = {
  name: {
    en: "Slovak University of Technology in Bratislava",
    sk: "Slovenská technická univerzita v Bratislave",
    de: "Slowakische Technische Universität in Bratislava",
    cs: "Slovenská technická univerzita v Bratislavě",
    hu: "Pozsonyi Szlovák Műszaki Egyetem",
  } satisfies Text,
  faculty: {
    en: "Faculty of Informatics and Information Technologies (FIIT)",
    sk: "Fakulta informatiky a informačných technológií (FIIT)",
    de: "Fakultät für Informatik und Informationstechnologien (FIIT)",
    cs: "Fakulta informatiky a informačních technologií (FIIT)",
    hu: "Informatikai és Információtechnológiai Kar (FIIT)",
  } satisfies Text,
  url: "https://www.fiit.stuba.sk/",
};

/** University degrees, newest first. */
export const degrees: Degree[] = [
  {
    id: "masters",
    degree: {
      en: "Master's degree (Ing.)",
      sk: "Inžinierske štúdium (Ing.)",
      de: "Masterstudium (Ing.)",
      cs: "Inženýrské studium (Ing.)",
      hu: "Mesterképzés (Ing.)",
    },
    field: {
      en: "Intelligent Software Systems",
      sk: "Inteligentné softvérové systémy",
      de: "Intelligente Softwaresysteme",
      cs: "Inteligentní softwarové systémy",
      hu: "Intelligens szoftverrendszerek",
    },
    start: 2022,
    end: 2024,
    description: {
      en: "Machine learning, neural networks, data analysis and the design of larger software systems.",
      sk: "Strojové učenie, neurónové siete, analýza dát a návrh väčších softvérových systémov.",
      de: "Maschinelles Lernen, neuronale Netze, Datenanalyse und der Entwurf größerer Softwaresysteme.",
      cs: "Strojové učení, neuronové sítě, analýza dat a návrh větších softwarových systémů.",
      hu: "Gépi tanulás, neurális hálók, adatelemzés és nagyobb szoftverrendszerek tervezése.",
    },
    thesis: {
      title: {
        en: "Neural network based semi-automatic segmentation methods to enhance the detection and monitoring of human eye diseases",
        sk: "Poloautomatické segmentačné metódy založené na neurónových sieťach na zlepšenie detekcie a monitorovania ochorení ľudského oka",
        de: "Halbautomatische Segmentierungsmethoden auf Basis neuronaler Netze zur Verbesserung der Erkennung und Überwachung von Erkrankungen des menschlichen Auges",
        cs: "Poloautomatické segmentační metody založené na neuronových sítích pro zlepšení detekce a monitorování onemocnění lidského oka",
        hu: "Neurális hálókon alapuló félautomatikus szegmentációs módszerek az emberi szem betegségeinek jobb felismeréséhez és nyomon követéséhez",
      },
      url: "/projects/glaucoma-segmentation",
      recordUrl: "https://opac.crzp.sk/?fn=detailBiblioForm&sid=CC8450CBF10FC669817CF9C1506C",
    },
  },
  {
    id: "bachelors",
    degree: {
      en: "Bachelor's degree (Bc.)",
      sk: "Bakalárske štúdium (Bc.)",
      de: "Bachelorstudium (Bc.)",
      cs: "Bakalářské studium (Bc.)",
      hu: "Alapképzés (Bc.)",
    },
    field: {
      en: "Computer Science",
      sk: "Informatika",
      de: "Informatik",
      cs: "Informatika",
      hu: "Informatika",
    },
    start: 2019,
    end: 2022,
    description: {
      en: "Programming, algorithms, databases, networks, web technologies and team projects such as the SmartTech e-shop and the Iridescent game.",
      sk: "Programovanie, algoritmy, databázy, siete, webové technológie a tímové projekty ako e-shop SmartTech a hra Iridescent.",
      de: "Programmierung, Algorithmen, Datenbanken, Netzwerke, Webtechnologien und Teamprojekte wie der Onlineshop SmartTech und das Spiel Iridescent.",
      cs: "Programování, algoritmy, databáze, sítě, webové technologie a týmové projekty jako e-shop SmartTech a hra Iridescent.",
      hu: "Programozás, algoritmusok, adatbázisok, hálózatok, webes technológiák és csapatprojektek, például a SmartTech webáruház és az Iridescent játék.",
    },
    thesis: {
      title: {
        en: "Problem generator for analytical geometry in the plane: conic sections",
        sk: "Generátor úloh z analytickej geometrie v rovine: kužeľosečky",
        de: "Aufgabengenerator für analytische Geometrie in der Ebene: Kegelschnitte",
        cs: "Generátor úloh z analytické geometrie v rovině: kuželosečky",
        hu: "Feladatgenerátor a síkbeli analitikus geometriához: kúpszeletek",
      },
      url: "/projects/conic-sections-generator",
      recordUrl: "https://opac.crzp.sk/?fn=detailBiblioForm&sid=4F55101800366CEF5AFDC4DB109A",
    },
  },
];

export const secondarySchool = {
  name: {
    en: "Gymnázium M. R. Štefánika",
    sk: "Gymnázium M. R. Štefánika",
    de: "Gymnázium M. R. Štefánika",
    cs: "Gymnázium M. R. Štefánika",
    hu: "Gymnázium M. R. Štefánika",
  } satisfies Text,
  place: "Nové Zámky",
  type: {
    en: "Grammar school",
    sk: "Gymnázium",
    de: "Gymnasium",
    cs: "Gymnázium",
    hu: "Gimnázium",
  } satisfies Text,
  start: 2011,
  end: 2019,
};
