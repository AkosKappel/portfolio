import { describe, expect, it } from "vitest";
import { getProject } from "../content/projects";
import { breadcrumbs, person, projectData } from "./structured-data";

describe("projectData", () => {
  it("describes a project with a repository as source code", () => {
    const project = getProject("glaucoma-segmentation");
    if (!project) throw new Error("missing project");
    const data = projectData(project, "sk", "https://example.com/sk/projects/x");
    expect(data["@type"]).toBe("SoftwareSourceCode");
    expect(data.codeRepository).toMatch(/^https:\/\/github\.com\//);
    expect(data.description).toBe(project.summary.sk);
  });
});

describe("breadcrumbs", () => {
  it("numbers the items from one", () => {
    const list = breadcrumbs([
      { name: "Home", url: "https://example.com/" },
      { name: "Projects", url: "https://example.com/projects" },
    ]);
    expect(list.itemListElement.map((item) => item.position)).toEqual([1, 2]);
  });
});

describe("person", () => {
  it("is one entity that projects point to", () => {
    const project = getProject("glaucoma-segmentation");
    if (!project) throw new Error("missing project");
    expect(projectData(project, "en", "https://example.com/x").author["@id"]).toBe(person["@id"]);
  });

  it("lists only profiles as sameAs", () => {
    expect(person.sameAs).toContain("https://github.com/AkosKappel");
    expect(person.sameAs.some((url) => url.includes("uptimerobot"))).toBe(false);
  });
});
