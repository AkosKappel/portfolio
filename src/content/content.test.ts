import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatDuration, formatPeriod, monthsBetween } from "../lib/format";
import { jobs } from "./experience";
import { projects } from "./projects";

const publicDir = join(__dirname, "../../public");

describe("projects", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("point to images that exist", () => {
    for (const project of projects) {
      if (project.image)
        expect(existsSync(join(publicDir, project.image.src)), project.slug).toBe(true);
    }
  });

  it("use absolute https links", () => {
    for (const project of projects) {
      for (const url of [project.repoUrl, project.liveUrl]) {
        if (url) expect(new URL(url).protocol, project.slug).toBe("https:");
      }
    }
  });

  it("upgrade after they start", () => {
    for (const project of projects) {
      if (project.upgraded) expect(project.upgraded).toBeGreaterThan(project.year);
    }
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

describe("format", () => {
  it("formats periods and durations", () => {
    expect(formatPeriod("2024-06", "2025-01")).toBe("Jun 2024 to Jan 2025");
    expect(formatPeriod("2025-02")).toBe("Feb 2025 to now");
    expect(monthsBetween("2024-06", "2025-01")).toBe(8);
    expect(formatDuration(21)).toBe("1 yr 9 mo");
    expect(formatDuration(12)).toBe("1 yr");
  });
});
