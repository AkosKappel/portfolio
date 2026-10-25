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
      en: "There are two ways to find a breed. In a short questionnaire, visitors set how active, affectionate or talkative the cat should be, order the traits by how much they matter, and get the closest breeds with a match percentage. Or they upload a photo of a cat they like, and a neural network in a separate Python service guesses the breed.",
      sk: "Plemeno sa dá nájsť dvoma spôsobmi. V krátkom dotazníku návštevník nastaví, aká aktívna, prítulná alebo zhovorčivá má mačka byť, zoradí vlastnosti podľa dôležitosti a dostane najbližšie plemená s percentom zhody. Alebo nahrá fotku mačky, ktorá sa mu páči, a neurónová sieť v samostatnej službe v Pythone odhadne plemeno.",
    },
    {
      en: "The rest of the site is a catalogue of breeds and breeding stations. Registered users can review stations, and an administrator approves the reviews and manages stations and sponsors. The site is available in Slovak and English.",
      sk: "Zvyšok stránky tvorí katalóg plemien a chovateľských staníc. Registrovaní používatelia môžu stanice hodnotiť a administrátor recenzie schvaľuje a spravuje stanice aj sponzorov. Stránka je po slovensky aj po anglicky.",
    },
    {
      en: "We were a team of seven and worked in Scrum, with sprints, planning and reviews. I was responsible for the breed questionnaire and its matching, the database models and seed data, the breed pages, translations and user accounts. I also wrapped the breed classifier in a small FastAPI service and connected it to the Laravel app. Teammates prepared the neural network, the station reviews, the admin moderation and the Docker setup.",
      sk: "Boli sme sedemčlenný tím a pracovali sme podľa Scrumu, so šprintmi, plánovaním a revíziami. Bol som zodpovedný za dotazník na výber plemena a jeho vyhodnotenie, databázové modely a úvodné dáta, stránky plemien, preklady a používateľské účty. Klasifikátor plemien som tiež zabalil do malej služby vo FastAPI a prepojil ho s aplikáciou v Laraveli. Ostatní členovia tímu pripravili neurónovú sieť, recenzie staníc, moderovanie v administrácii a Docker.",
    },
  ],
  features: [
    {
      en: "Breed questionnaire with trait sliders and a drag-and-drop ranking of what matters most",
      sk: "Dotazník na výber plemena s posuvníkmi vlastností a poradím dôležitosti cez drag and drop",
    },
    {
      en: "Breed recognition from an uploaded photo, with the most likely breeds and their probability",
      sk: "Rozpoznanie plemena z nahratej fotky s najpravdepodobnejšími plemenami a ich pravdepodobnosťou",
    },
    {
      en: "Breed pages with a gallery, traits, history and the breeding stations that keep the breed",
      sk: "Stránky plemien s galériou, vlastnosťami, históriou a chovateľskými stanicami, ktoré plemeno chovajú",
    },
    {
      en: "Directory of breeding stations, searchable by name and breed, with user reviews and photos",
      sk: "Zoznam chovateľských staníc s vyhľadávaním podľa názvu a plemena, s recenziami a fotkami od používateľov",
    },
    {
      en: "Registration and login, also with Google or Facebook, and password reset by email",
      sk: "Registrácia a prihlásenie, aj cez Google alebo Facebook, a obnovenie hesla cez e-mail",
    },
  ],
  highlights: [
    {
      en: "Questionnaire matching: each breed is scored by a weighted distance between its traits and the answers, with traits ranked higher counting more",
      sk: "Vyhodnotenie dotazníka: každé plemeno dostane skóre podľa váženej vzdialenosti medzi jeho vlastnosťami a odpoveďami, pričom vlastnosti vyššie v poradí majú väčšiu váhu",
    },
    {
      en: "Database models and relationships for breeds, traits and stations, with seeders that load breed traits from the team's spreadsheet",
      sk: "Databázové modely a vzťahy pre plemená, vlastnosti a stanice so seedermi, ktoré načítajú vlastnosti plemien z tímovej tabuľky",
    },
    {
      en: "Breed detail pages with a gallery and image popup, and the list of stations for each breed",
      sk: "Detailné stránky plemien s galériou a zväčšením obrázka a so zoznamom staníc pre každé plemeno",
    },
    {
      en: "Registration, login with Google and Facebook through Laravel Socialite, password rules and password reset",
      sk: "Registrácia, prihlásenie cez Google a Facebook pomocou Laravel Socialite, pravidlá pre heslá a obnovenie hesla",
    },
    {
      en: "Slovak and English translations, the language switcher and a custom error page",
      sk: "Slovenské a anglické preklady, prepínač jazyka a vlastná chybová stránka",
    },
    {
      en: "Admin-only middleware, the sponsor carousel and touch support for the questionnaire on phones",
      sk: "Middleware len pre administrátorov, karusel sponzorov a dotyková podpora dotazníka na mobile",
    },
  ],
  technical: [
    {
      en: "Laravel 9 application with Blade templates, Bootstrap and jQuery UI, backed by MySQL",
      sk: "Aplikácia v Laraveli 9 so šablónami Blade, Bootstrapom a jQuery UI nad databázou MySQL",
    },
    {
      en: "The breed classifier is a Keras model built on VGG16, served by FastAPI; Laravel sends the photo as base64 and gets back the likely breeds",
      sk: "Klasifikátor plemien je model v Kerase postavený na VGG16 a beží vo FastAPI; Laravel pošle fotku ako base64 a dostane späť pravdepodobné plemená",
    },
    {
      en: "The web app, the Python service and the database run as separate containers in Docker Compose",
      sk: "Webová aplikácia, služba v Pythone a databáza bežia ako samostatné kontajnery v Docker Compose",
    },
  ],
  versions: ["Laravel 9", "TensorFlow 2.10"],
  kind: "team",
  role: {
    en: "Breed questionnaire, accounts and the classifier integration in a team of seven",
    sk: "Dotazník na výber plemena, účty a prepojenie s klasifikátorom v sedemčlennom tíme",
  },
  areas: ["ai", "web"],
  year: 2022,
  until: 2023,
  stack: [
    "Laravel",
    "PHP",
    "MySQL",
    "FastAPI",
    "Python",
    "TensorFlow",
    "Keras",
    "Bootstrap",
    "Docker",
  ],
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
