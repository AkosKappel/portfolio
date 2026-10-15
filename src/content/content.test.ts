import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import sk from "../../messages/sk.json";
import { formatMonth, monthsBetween, yearRange } from "../lib/format";
import { techIcon } from "../lib/tech-icons";
import { jobs } from "./experience";
import { projects } from "./projects";
import { site } from "./site";
import { skillGroups } from "./skills";

const publicDir = join(__dirname, "../../public");

function keys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? keys(child, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

describe("projects", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("point to images that exist", () => {
    for (const project of projects) {
      for (const image of [project.image, ...(project.gallery ?? [])]) {
        if (image) expect(existsSync(join(publicDir, image.src)), image.src).toBe(true);
      }
      for (const figure of project.gallery ?? []) {
        if (figure.video)
          expect(existsSync(join(publicDir, figure.video)), figure.video).toBe(true);
      }
    }
  });

  it("use absolute https links", () => {
    for (const project of projects) {
      for (const url of [project.repoUrl, project.liveUrl, project.paperUrl]) {
        if (url) expect(new URL(url).protocol, project.slug).toBe("https:");
      }
    }
  });

  it("have text in every language", () => {
    for (const project of projects) {
      const figures = (project.gallery ?? []).flatMap((figure) => [figure.alt, figure.caption]);
      for (const text of [
        project.summary,
        ...project.description,
        ...(project.highlights ?? []),
        ...figures,
      ]) {
        expect(text.en, project.slug).not.toBe("");
        expect(text.sk, project.slug).not.toBe("");
      }
    }
  });
});

describe("cv", () => {
  it("lists every page image the build script rendered", () => {
    const rendered = readdirSync(join(publicDir, "images/cv")).map((file) => `/images/cv/${file}`);
    const listed = site.cv.flatMap((cv) => cv.pages);
    expect(listed.toSorted()).toEqual(rendered.toSorted());
    for (const cv of site.cv) expect(existsSync(join(publicDir, cv.href)), cv.href).toBe(true);
  });
});

describe("experience", () => {
  it("is listed newest first with valid months", () => {
    const starts = jobs.map((job) => job.start);
    expect([...starts].sort().reverse()).toEqual(starts);
    for (const job of jobs) {
      expect(job.start).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      if (job.end) expect(job.end >= job.start).toBe(true);
    }
  });
});

describe("messages", () => {
  it("have the same keys in English and Slovak", () => {
    expect(keys(sk).sort()).toEqual(keys(en).sort());
  });
});

describe("skills", () => {
  it("are unique", () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    expect(new Set(skills).size).toBe(skills.length);
  });

  it("mostly have logos", () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    const withoutLogo = skills.filter((skill) => !techIcon(skill));
    expect(withoutLogo).toEqual(["MSSQL", "Codex", "OpenAI API", "Playwright"]);
  });
});

describe("format", () => {
  it("formats months and ranges", () => {
    expect(formatMonth("2024-06", "en")).toBe("Jun 2024");
    expect(formatMonth("2024-06", "sk")).toBe("06/2024");
    expect(monthsBetween("2024-06", "2025-01")).toBe(8);
    expect(yearRange(2021, 2026)).toBe("2021 – 2026");
    expect(yearRange(2024)).toBe("2024");
  });
});
