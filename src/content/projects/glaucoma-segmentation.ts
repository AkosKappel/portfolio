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
  areas: ["ai"],
  year: 2023,
  until: 2024,
  role: {
    en: "Supervised by doc. RNDr. Silvester Czanner, PhD.",
    sk: "Vedúci práce doc. RNDr. Silvester Czanner, PhD.",
  },
  stack: [
    "Python",
    "PyTorch",
    "OpenCV",
    "NumPy",
    "pandas",
    "scikit-learn",
    "Albumentations",
    "Matplotlib",
    "Jupyter",
    "Weights & Biases",
  ],
  repoUrl: "https://github.com/AkosKappel/DP-GlaucomaSegmentation",
  paperUrl: "https://opac.crzp.sk/?fn=detailBiblioForm&sid=CC8450CBF10FC669817CF9C1506C",
  image: {
    src: "/images/projects/glaucoma-segmentation/thumbnail.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "Dual-decoder U-Net: one encoder feeds two decoder branches that output the optic disc and optic cup masks",
      sk: "U-Net s dvoma dekodérmi: jeden enkóder napája dve vetvy dekodéra, ktoré vrátia masky optického disku a jamky",
    },
  },
  gallery: [
    {
      src: "/images/projects/glaucoma.webp",
      width: 1600,
      height: 784,
      alt: {
        en: "Processing steps from a raw eye image to the detected optic disc",
        sk: "Kroky spracovania od snímky oka po nájdený optický disk",
      },
      caption: {
        en: "Preprocessing: black edges are removed, the image is padded and resized, and CenterNet finds the optic disc to crop the region of interest.",
        sk: "Predspracovanie: odstránia sa čierne okraje, snímka sa doplní na štvorec a zmenší a CenterNet nájde optický disk, podľa ktorého sa vyreže oblasť záujmu.",
      },
    },
    {
      src: "/images/projects/glaucoma-segmentation/segmentation-results.webp",
      width: 1482,
      height: 1206,
      alt: {
        en: "Four eye images with the expert outline, the model prediction and both contours overlaid",
        sk: "Štyri snímky oka s obrysom od expertov, predikciou modelu a oboma obrysmi cez seba",
      },
      caption: {
        en: "Results of the dual-decoder model: input, ground truth, prediction, and the true (blue) and predicted (black) contours of the optic disc and cup.",
        sk: "Výsledky modelu s dvoma dekodérmi: vstup, referenčná maska, predikcia a skutočné (modré) a predikované (čierne) obrysy optického disku a jamky.",
      },
    },
    {
      src: "/images/projects/glaucoma-segmentation/cascade-architecture.webp",
      width: 1600,
      height: 1414,
      alt: {
        en: "Diagram of two U-Net models in a row: the first outputs the disc mask, which crops the input for the second, which outputs the cup mask",
        sk: "Diagram dvoch U-Net modelov za sebou: prvý vytvorí masku disku, ktorá oreže vstup pre druhý, a ten vytvorí masku jamky",
      },
      caption: {
        en: "Cascade architecture: a first U-Net segments the optic disc, its mask crops the image, and a second U-Net finds the cup inside it. It reached a Dice score of 96.8 % for the disc and 87.1 % for the cup.",
        sk: "Kaskádová architektúra: prvý U-Net segmentuje optický disk, jeho maska oreže obrázok a druhý U-Net v ňom nájde jamku. Dosiahla Dice skóre 96,8 % pre disk a 87,1 % pre jamku.",
      },
    },
    {
      src: "/images/projects/glaucoma-segmentation/dual-decoder-architecture.webp",
      width: 1600,
      height: 927,
      alt: {
        en: "Diagram of a network with one shared encoder and two decoders, one for the disc and one for the cup",
        sk: "Diagram siete s jedným spoločným enkodérom a dvoma dekodérmi, pre disk a pre jamku",
      },
      caption: {
        en: "Dual-decoder architecture: one shared encoder, a decoder for the optic disc and one for the cup. It reached a Dice score of 96.8 % for the disc and 89.7 % for the cup.",
        sk: "Architektúra s dvoma dekodérmi: jeden spoločný enkodér, dekodér pre optický disk a dekodér pre jamku. Dosiahla Dice skóre 96,8 % pre disk a 89,7 % pre jamku.",
      },
    },
    {
      src: "/images/projects/glaucoma-segmentation/training-history.webp",
      width: 1399,
      height: 788,
      alt: {
        en: "Line charts of loss and Dice score over the training epochs",
        sk: "Čiarové grafy straty a Dice skóre počas epoch trénovania",
      },
      caption: {
        en: "Training history of the dual-decoder model: loss, Dice score and other metrics on the training and validation sets.",
        sk: "Priebeh trénovania modelu s dvoma dekodérmi: strata, Dice skóre a ďalšie metriky na trénovacích a validačných dátach.",
      },
    },
    {
      src: "/images/projects/glaucoma-segmentation/vcdr-results.webp",
      width: 1589,
      height: 789,
      alt: {
        en: "Charts comparing the predicted and the expert cup-to-disc ratio",
        sk: "Grafy porovnávajúce predikovaný a expertmi nameraný pomer jamky a disku",
      },
      caption: {
        en: "Vertical cup-to-disc ratio, the main sign of glaucoma, computed from the predictions and compared with values measured by experts.",
        sk: "Vertikálny pomer jamky a disku, hlavný ukazovateľ glaukómu, vypočítaný z predikcií a porovnaný s hodnotami od expertov.",
      },
    },
  ],
  featured: true,
};
