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
import { oasis } from "./oasis";
import { oriel } from "./oriel";
import { petguide } from "./petguide";
import { pokedex } from "./pokedex";
import { sketchbook } from "./sketchbook";
import { skysense } from "./skysense";
import { smarttechEShop } from "./smarttech-e-shop";
import { wacMicrofrontends } from "./wac-microfrontends";

/** Order is the "Recommended" order on the projects page. */
export const projects: Project[] = [
  skysense,
  feastFinder,
  modernFashionStore,
  budgetMaster,
  oriel,
  fakeshop,
  wacMicrofrontends,
  pokedex,
  oasis,
  smarttechEShop,
  glaucomaSegmentation,
  sketchbook,
  adventOfCode,
  adventOfSql,
  iridescent,
  petguide,
  conicSectionsGenerator,
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
