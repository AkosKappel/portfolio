import { describe, expect, it } from "vitest";
import {
  closest,
  complete,
  completionOptions,
  cowsay,
  dir,
  displayPath,
  expandHistory,
  file,
  grep,
  HOME,
  lookup,
  resolve,
  suggestion,
  tree,
} from "./terminal";

const root = dir({
  home: dir({
    guest: dir({
      "about.txt": file("Hello\nI build web apps with React"),
      ".secrets": file("psst"),
      projects: dir({
        "skysense.md": file("SkySense\nWeather app in React"),
        "sketchbook.md": file("Sketchbook"),
      }),
    }),
  }),
});

const options = (input: string, cwd = HOME) =>
  completionOptions(input, { open: ["skysense", "sketchbook"] }, root, cwd);

describe("terminal completion", () => {
  it("completes a unique command and adds a space", () => {
    expect(complete("who", options("who")).value).toBe("whoami ");
    expect(complete("con", options("con")).value).toBe("contact ");
  });

  it("completes paths and arguments as far as the matches agree", () => {
    expect(complete("ls pro", options("ls pro")).value).toBe("ls projects/");
    expect(complete("cat projects/sky", options("cat projects/sky")).value).toBe(
      "cat projects/skysense.md",
    );
    expect(complete("open sk", options("open sk"))).toEqual({
      value: "open sk",
      matches: ["skysense", "sketchbook"],
    });
    expect(complete("c", options("c")).value).toBe("c");
  });

  it("lists hidden files only when the word starts with a dot", () => {
    expect(options("cat ")).not.toContain(".secrets");
    expect(options("cat .")).toContain(".secrets");
  });

  it("offers only folders to cd", () => {
    expect(options("cd ")).toEqual(["projects/"]);
  });

  it("leaves unknown input alone", () => {
    expect(complete("whoami x", options("whoami x")).value).toBe("whoami x");
  });
});

describe("terminal suggestions", () => {
  it("suggests the newest matching history entry, then a command", () => {
    expect(suggestion("ls", ["ls skills", "ls projects/"])).toBe(" projects/");
    expect(suggestion("neo", [])).toBe("fetch");
    expect(suggestion("", ["ls"])).toBe("");
  });

  it("corrects small typos only", () => {
    expect(closest("lss", ["ls", "cat"])).toBe("ls");
    expect(closest("whaomi", ["whoami"])).toBe("whoami");
    expect(closest("banana", ["ls", "cat"])).toBeUndefined();
  });

  it("expands !! and !n", () => {
    const history = ["ls", "whoami"];
    expect(expandHistory("!!", history)).toBe("whoami");
    expect(expandHistory("sudo !!", history)).toBe("sudo whoami");
    expect(expandHistory("!1", history)).toBe("ls");
    expect(expandHistory("!9", history)).toBeUndefined();
    expect(expandHistory("!!", [])).toBeUndefined();
  });
});

describe("terminal filesystem", () => {
  it("resolves ~, . and ..", () => {
    expect(resolve(HOME, "projects/../projects/./x")).toEqual([...HOME, "projects", "x"]);
    expect(resolve(["tmp"], "~/projects")).toEqual([...HOME, "projects"]);
    expect(resolve(HOME, "/")).toEqual([]);
    expect(displayPath([...HOME, "projects"])).toBe("~/projects");
    expect(displayPath(["home"])).toBe("/home");
  });

  it("finds files without their extension", () => {
    expect(lookup(root, HOME, "about").segments).toEqual([...HOME, "about.txt"]);
    expect(lookup(root, HOME, "nope").node).toBeUndefined();
  });

  it("draws a tree and greps visible files", () => {
    expect(tree(root.children.home as never)).toEqual([
      "└── guest/",
      "    ├── about.txt",
      "    └── projects/",
      "        ├── skysense.md",
      "        └── sketchbook.md",
    ]);
    expect(grep(root, "react")).toEqual([
      { path: "home/guest/about.txt", line: "I build web apps with React" },
      { path: "home/guest/projects/skysense.md", line: "Weather app in React" },
    ]);
  });
});

describe("cowsay", () => {
  it("wraps long text in a bubble with matching edges", () => {
    expect(cowsay("moo").split("\n").slice(0, 3)).toEqual([" _____", "< moo >", " -----"]);
    const lines = cowsay(`${"word ".repeat(12)}end`).split("\n");
    expect(lines[1].startsWith("/ ")).toBe(true);
    expect(lines[2].startsWith("\\ ")).toBe(true);
    expect(lines[1].length).toBe(lines[2].length);
  });
});
