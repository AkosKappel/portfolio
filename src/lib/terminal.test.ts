import { describe, expect, it } from "vitest";
import { complete } from "./terminal";

const targets = ["skysense", "sketchbook", "skills"];

describe("terminal completion", () => {
  it("completes a unique command and adds a space", () => {
    expect(complete("who", targets)).toBe("whoami ");
    expect(complete("con", targets)).toBe("contact ");
  });

  it("completes the arguments of ls, cat and open", () => {
    expect(complete("ls pro", targets)).toBe("ls projects");
    expect(complete("cat a", targets)).toBe("cat about");
    expect(complete("open sky", targets)).toBe("open skysense");
  });

  it("leaves ambiguous or unknown input alone", () => {
    expect(complete("c", targets)).toBe("c");
    expect(complete("open sk", targets)).toBe("open sk");
    expect(complete("whoami x", targets)).toBe("whoami x");
  });
});
