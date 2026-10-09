import type { Project } from "../types";

export const petguide: Project = {
  slug: "petguide",
  title: "PetGuide",
  summary: {
    en: "Helps people choose a pet, and recognises a pet's breed from a photo with a neural network.",
    sk: "Pomáha vybrať si domáce zviera a neurónovou sieťou rozpozná plemeno z fotky.",
  },
  description: [
    {
      en: "A university team project: users register, search and filter pets by their traits, and upload a photo of their pet so that a neural network predicts its breed.",
      sk: "Tímový projekt na univerzite: používatelia sa zaregistrujú, hľadajú a filtrujú zvieratá podľa vlastností a nahrajú fotku svojho zvieraťa, z ktorej neurónová sieť určí plemeno.",
    },
  ],
  kind: "team",
  area: "ai",
  year: 2022,
  until: 2023,
  stack: ["Laravel", "PHP", "FastAPI", "Python", "TensorFlow", "Bootstrap"],
  repoUrl: "https://github.com/ImMuffin/team_project_14",
  image: {
    src: "/images/projects/petguide.webp",
    width: 1600,
    height: 1022,
    alt: {
      en: "PetGuide search page with pet cards",
      sk: "Vyhľadávanie v PetGuide s kartami zvierat",
    },
  },
};
