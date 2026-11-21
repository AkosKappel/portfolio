import { describe, expect, it } from "vitest";
import { projects } from "../content/projects";
import { checkDemo, checkDemos } from "./demo-status";

const answer = (status: number) => (async () => new Response(null, { status })) as typeof fetch;

describe("checkDemo", () => {
  it("counts redirects and client errors as up", async () => {
    expect(await checkDemo("https://demo.test", answer(200))).toBe("up");
    expect(await checkDemo("https://demo.test", answer(302))).toBe("up");
    expect(await checkDemo("https://demo.test", answer(405))).toBe("up");
  });

  it("counts server errors and failed requests as down", async () => {
    expect(await checkDemo("https://demo.test", answer(502))).toBe("down");
    expect(await checkDemo("https://demo.test", answer(530))).toBe("down");
    const offline = (async () => {
      throw new TypeError("fetch failed");
    }) as typeof fetch;
    expect(await checkDemo("https://demo.test", offline)).toBe("down");
  });
});

describe("checkDemos", () => {
  it("checks exactly the self-hosted demos", async () => {
    const status = await checkDemos(answer(200));
    const selfHosted = projects.filter((project) => project.selfHosted).map((p) => p.slug);
    expect(Object.keys(status).sort()).toEqual(selfHosted.sort());
    expect(Object.values(status)).not.toContain("down");
  });
});
