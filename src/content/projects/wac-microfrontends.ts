import type { Project } from "../types";

export const wacMicrofrontends: Project = {
  slug: "wac-microfrontends",
  title: "WAC",
  summary: {
    en: "Micro-frontend web app with a Go API, deployed to Kubernetes on Azure through GitOps.",
    sk: "Webová aplikácia z micro-frontendov s API v Go, nasadená do Kubernetes v Azure cez GitOps.",
  },
  description: [
    {
      en: "A university team project. The frontend is a micro-frontend in Stencil.js and TypeScript, the backend a Go API with MongoDB and an OpenAPI specification. It was deployed with Docker, Kubernetes and GitHub Actions to Azure, with the cluster configuration in a separate GitOps repository.",
      sk: "Tímový projekt na univerzite. Frontend je micro-frontend v Stencil.js a TypeScripte, backend API v Go s MongoDB a OpenAPI špecifikáciou. Nasadenie cez Docker, Kubernetes a GitHub Actions do Azure, s konfiguráciou klastra v samostatnom GitOps repozitári.",
    },
  ],
  kind: "team",
  area: "infrastructure",
  year: 2024,
  stack: ["Stencil.js", "TypeScript", "Go", "MongoDB", "Kubernetes", "Azure", "GitHub Actions"],
  repoUrl: "https://github.com/AkosKappel/wac-projekt-gitops",
};
