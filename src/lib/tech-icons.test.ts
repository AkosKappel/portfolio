import { describe, expect, it } from "vitest";
import { iconId, logoColor, techIcon } from "./tech-icons";
import { techIcons } from "./tech-icons.data";

describe("tech icon sprite ids", () => {
  it("gives every logo its own valid id", () => {
    const ids = Object.keys(techIcons).map(iconId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it("resolves aliases to the shared logo's id", () => {
    expect(techIcon("LiveView")).toMatchObject({ id: iconId("Phoenix LiveView") });
  });
});

describe("logo colours", () => {
  it("draws black, white and grey logos in the text colour", () => {
    expect(logoColor("000000")).toBeUndefined();
    expect(logoColor("FFFFFF")).toBeUndefined();
    expect(logoColor("ECE8D1")).toBeUndefined();
  });

  it("keeps brand colours that show on both themes", () => {
    expect(logoColor("3178C6")).toBe("#3178C6");
  });

  it("lightens a dark brand colour on the dark theme only", () => {
    expect(logoColor("4B275F")).toMatch(/^light-dark\(#4B275F, #[0-9a-f]{6}\)$/);
  });

  it("uses the brand colour where Simple Icons has only black", () => {
    expect(techIcon("Angular")).toMatchObject({ color: "#DD0031" });
  });
});
