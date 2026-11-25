import { describe, expect, it } from "vitest";
import { jobs } from "../content/experience";
import { projects } from "../content/projects";
import { site } from "../content/site";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";

describe("llms.txt", () => {
  it("links every project", () => {
    const index = buildLlmsTxt();
    for (const project of projects) expect(index).toContain(`/projects/${project.slug})`);
  });
});

describe("llms-full.txt", () => {
  const full = buildLlmsFullTxt();

  // The portfolio assistant sends the whole file with every question, and Groq's free tier
  // allows about 8,000 tokens a minute. 20,000 characters is roughly 5,000 tokens.
  it("stays within the assistant's token budget", () => {
    expect(full.length).toBeLessThanOrEqual(20_000);
  });

  it("covers every job and project", () => {
    for (const job of jobs) expect(full).toContain(job.company);
    for (const project of projects) expect(full).toContain(`### ${project.title} (`);
  });

  it("has no doubled periods", () => {
    expect(full).not.toContain("..");
  });

  it("leaves out the e-mail address and phone number", () => {
    expect(full).not.toContain(site.email);
    expect(full).not.toContain(site.phone);
  });
});
