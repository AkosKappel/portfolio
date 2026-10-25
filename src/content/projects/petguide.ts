import type { Project } from "../types";

export const petguide: Project = {
  slug: "petguide",
  title: "PetGuide",
  summary: {
    en: "Helps people choose a cat breed and a trusted breeder, and recognises a cat's breed from a photo with a neural network.",
    sk: "Pomáha vybrať si plemeno mačky a overenú chovateľskú stanicu a neurónovou sieťou rozpozná plemeno mačky z fotky.",
  },
  description: [
    {
      en: "A semester team project at FIIT STU from 2022 to 2023, branded as maciatka.eu. It connects people looking for a healthy pedigree cat with verified Slovak breeding stations, and helps those who do not yet know which breed they want.",
      sk: "Semestrálny tímový projekt na FIIT STU z rokov 2022 až 2023, pod značkou maciatka.eu. Spája ľudí, ktorí hľadajú zdravú mačku s rodokmeňom, s overenými slovenskými chovateľskými stanicami a pomáha aj tým, ktorí ešte nevedia, aké plemeno chcú.",
    },
    {
      en: "Visitors can describe the cat they want by its traits, or upload a photo of a cat they like, and the site recommends matching breeds. The photo goes to a separate Python service, where a TensorFlow neural network predicts the breed.",
      sk: "Návštevníci môžu opísať mačku, ktorú chcú, podľa jej vlastností, alebo nahrať fotku mačky, ktorá sa im páči, a stránka im odporučí vhodné plemená. Fotka ide do samostatnej služby v Pythone, kde plemeno určí neurónová sieť v TensorFlow.",
    },
    {
      en: "The web application is built with Laravel and Bootstrap, and the breed classifier is served through a FastAPI endpoint. The whole site is available in Slovak and English.",
      sk: "Webová aplikácia je postavená na Laraveli a Bootstrape a klasifikátor plemien je dostupný cez FastAPI endpoint. Celá stránka je po slovensky aj po anglicky.",
    },
    {
      en: "We were a team of seven and worked in Scrum, with sprints, planning and reviews. I helped train the neural network that recognises cat breeds, and built parts of the backend and frontend of the Laravel application.",
      sk: "Boli sme sedemčlenný tím a pracovali sme podľa Scrumu, so šprintmi, plánovaním a revíziami. Podieľal som sa na trénovaní neurónovej siete, ktorá rozpoznáva plemená mačiek, a vytvoril som časti backendu a frontendu aplikácie v Laraveli.",
    },
  ],
  features: [
    {
      en: "Breed recommendation from desired traits or from an uploaded photo",
      sk: "Odporúčanie plemena podľa želaných vlastností alebo z nahratej fotky",
    },
    {
      en: "Breed pages with a gallery, traits, history and the breeding stations that keep the breed",
      sk: "Stránky plemien s galériou, vlastnosťami, históriou a chovateľskými stanicami, ktoré plemeno chovajú",
    },
    {
      en: "Directory of breeding stations, searchable by name and breed",
      sk: "Zoznam chovateľských staníc s vyhľadávaním podľa názvu a plemena",
    },
    {
      en: "User registration and login",
      sk: "Registrácia a prihlásenie používateľov",
    },
  ],
  kind: "team",
  role: {
    en: "Model training, backend and frontend in a team of seven",
    sk: "Trénovanie modelu, backend a frontend v sedemčlennom tíme",
  },
  areas: ["ai", "web"],
  year: 2022,
  until: 2023,
  stack: ["Laravel", "PHP", "FastAPI", "Python", "TensorFlow", "Bootstrap"],
  image: {
    src: "/images/projects/petguide.webp",
    width: 1600,
    height: 1022,
    alt: {
      en: "PetGuide home page with breeding station search and three sections",
      sk: "Úvodná stránka PetGuide s vyhľadávaním chovateľských staníc a tromi sekciami",
    },
  },
};
