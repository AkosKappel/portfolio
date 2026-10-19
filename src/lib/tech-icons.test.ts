import { describe, expect, it } from "vitest";
import { iconId, techIcon } from "./tech-icons";
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
