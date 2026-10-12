import { describe, expect, it } from "vitest";
import { degrees, university } from "./education";
import { jobs } from "./experience";
import { projects } from "./projects";
import { site } from "./site";

// Some sites refuse automated requests (LinkedIn answers 999, CRZP 429), so these
// statuses mean "cannot tell", not "broken".
const blockedStatuses = new Set([403, 429, 999]);

const links = [
  ...Object.values(site.links),
  site.repository,
  university.url,
  ...degrees.flatMap(({ thesis }) => [thesis.url, thesis.recordUrl]),
  ...jobs.flatMap((job) => job.items.map((item) => item.url)),
  ...projects.flatMap((project) => [project.repoUrl, project.liveUrl, project.paperUrl]),
].filter((url): url is string => url?.startsWith("https://") ?? false);

describe("external links", () => {
  it.concurrent.each([...new Set(links)])("%s responds", async (url) => {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(25_000),
      headers: {
        "user-agent": "Mozilla/5.0 (link check; +https://github.com/AkosKappel/portfolio)",
      },
    });
    await response.body?.cancel();
    if (blockedStatuses.has(response.status)) {
      console.warn(`${url}: ${response.status}, the site blocks automated checks`);
      return;
    }
    expect(response.status, url).toBeLessThan(400);
  });
});
