import type { Project } from "../types";
import { adventOfCode } from "./advent-of-code";
import { adventOfSql } from "./advent-of-sql";
import { budgetMaster } from "./budget-master";
import { conicSectionsGenerator } from "./conic-sections-generator";
import { fakeshop } from "./fakeshop";
import { feastFinder } from "./feast-finder";
import { glaucomaSegmentation } from "./glaucoma-segmentation";
import { iridescent } from "./iridescent";
import { modernFashionStore } from "./modern-fashion-store";
import { petguide } from "./petguide";
import { pokedex } from "./pokedex";
import { sketchbook } from "./sketchbook";
import { smarttechEShop } from "./smarttech-e-shop";
import { wacMicrofrontends } from "./wac-microfrontends";

/** Order is the "Recommended" order on the projects page. */
export const projects: Project[] = [
  modernFashionStore,
  smarttechEShop,
  glaucomaSegmentation,
  pokedex,
  fakeshop,
  feastFinder,
  budgetMaster,
  wacMicrofrontends,
  petguide,
  conicSectionsGenerator,
  iridescent,
  adventOfCode,
  adventOfSql,
  sketchbook,
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
