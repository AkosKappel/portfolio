import type { Project } from "../types";

export const glaucomaSegmentation: Project = {
  slug: "glaucoma-segmentation",
  title: "Glaucoma Segmentation",
  summary: {
    en: "Master's thesis: neural networks that outline the optic disc and cup in eye images.",
    sk: "Diplomová práca: neurónové siete, ktoré vyznačia optický disk a jamku na snímkach oka.",
  },
  description: [
    {
      en: "Glaucoma is diagnosed partly from the ratio between the optic cup and the optic disc. For my master's thesis I designed, implemented and evaluated two network architectures for finding them: a cascade, where a second network looks for the cup inside the disc found by the first, and a dual-decoder network with one shared encoder.",
      sk: "Glaukóm sa diagnostikuje aj podľa pomeru optickej jamky a optického disku. V diplomovej práci som navrhol, implementoval a vyhodnotil dve architektúry sietí na ich nájdenie: kaskádu, kde druhá sieť hľadá jamku vo vnútri disku nájdeného prvou, a sieť s dvoma dekodérmi a spoločným enkodérom.",
    },
    {
      en: "The models were trained on the ORIGA dataset and tested on DRISHTI-GS. The best one reached a Dice score of 96.8 % for the disc and 89.7 % for the cup.",
      sk: "Modely som trénoval na dátach ORIGA a testoval na DRISHTI-GS. Najlepší dosiahol Dice skóre 96,8 % pre disk a 89,7 % pre jamku.",
    },
  ],
  highlights: [
    {
      en: "Cascade and dual-decoder architectures in PyTorch",
      sk: "Kaskádová architektúra a architektúra s dvoma dekodérmi v PyTorch",
    },
    {
      en: "Region-of-interest detection and training in polar coordinates",
      sk: "Detekcia oblasti záujmu a trénovanie v polárnych súradniciach",
    },
    { en: "Explainability with Grad-CAM", sk: "Vysvetliteľnosť pomocou Grad-CAM" },
  ],
  technical: [
    {
      en: "Exploratory data analysis showed class imbalance and very different image quality, which shaped the preprocessing",
      sk: "Prieskumná analýza dát ukázala nevyváženosť tried a veľmi rozdielnu kvalitu snímok, čo určilo predspracovanie",
    },
    {
      en: "A CenterNet model first finds the region of interest around the optic disc, and the segmentation runs on that crop in polar coordinates",
      sk: "Model CenterNet najprv nájde oblasť okolo optického disku a segmentácia beží na tomto výreze v polárnych súradniciach",
    },
    {
      en: "The vertical cup-to-disc ratio from the predictions was compared with values measured by experts",
      sk: "Vertikálny pomer jamky a disku z predikcií som porovnal s hodnotami nameranými odborníkmi",
    },
    {
      en: "Probability maps, activation maps and Grad-CAM show what the networks look at",
      sk: "Mapy pravdepodobnosti, aktivačné mapy a Grad-CAM ukazujú, na čo sa siete pozerajú",
    },
  ],
  versions: ["Python 3.10", "PyTorch 2.0"],
  kind: "university",
  area: "ai",
  year: 2023,
  until: 2024,
  role: {
    en: "Supervised by doc. RNDr. Silvester Czanner, PhD.",
    sk: "Vedúci práce doc. RNDr. Silvester Czanner, PhD.",
  },
  stack: ["Python", "PyTorch", "OpenCV", "NumPy", "Albumentations", "Matplotlib"],
  repoUrl: "https://github.com/AkosKappel/DP-GlaucomaSegmentation",
  image: {
    src: "/images/projects/glaucoma.webp",
    width: 1600,
    height: 784,
    alt: {
      en: "Processing steps from a raw eye image to the detected optic disc",
      sk: "Kroky spracovania od snímky oka po nájdený optický disk",
    },
  },
  featured: true,
};
