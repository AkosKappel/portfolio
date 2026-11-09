import { describe, expect, it } from "vitest";
import { renderCv } from "./cv-latex";

// The LaTeX files are generated from src/content; `pnpm cv:tex` rewrites them.
describe("CV LaTeX", () => {
  it("matches latex/main-english.tex", async () => {
    await expect(renderCv("en")).toMatchFileSnapshot("../../latex/main-english.tex");
  });

  it("matches latex/main-slovak.tex", async () => {
    await expect(renderCv("sk")).toMatchFileSnapshot("../../latex/main-slovak.tex");
  });

  it("escapes LaTeX special characters", () => {
    expect(renderCv("en")).toContain("C\\#");
  });
});
