import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import sk from "../../messages/sk.json";
import { projects } from "../content/projects";
import { buildCommandIndex } from "./command-index";
import { type Command, filterCommands } from "./commands";

const commands: Command[] = [
  { id: "page:projects", group: "Pages", label: "Projects", href: "/projects" },
  { id: "page:experience", group: "Pages", label: "Experience", href: "/experience" },
  {
    id: "project:pokedex",
    group: "Projects",
    label: "Pokédex",
    keywords: ["Kotlin"],
    href: "/projects/pokedex",
  },
  {
    id: "project:oriel",
    group: "Projects",
    label: "Oriel",
    keywords: ["Elixir"],
    href: "/projects/oriel",
  },
  { id: "theme:dark", group: "Theme", label: "Switch to dark theme" },
];

const ids = (query: string) => filterCommands(commands, query).map((command) => command.id);

describe("filterCommands", () => {
  it("keeps every command in order for an empty query", () => {
    expect(filterCommands(commands, "  ")).toBe(commands);
  });

  it("puts an exact label before a partial one and allows missing letters in labels", () => {
    expect(ids("oriel")[0]).toBe("project:oriel");
    expect(ids("exprnce")).toEqual(["page:experience"]);
  });

  it("drops loose matches when a label contains the query", () => {
    expect(ids("ore")).toEqual(["project:oriel", "theme:dark"]);
    const core: Command = { id: "section:core3", group: "Experience", label: "Core3" };
    expect(filterCommands([...commands, core], "ore").map((command) => command.id)).toEqual([
      "section:core3",
    ]);
  });

  it("finds commands by keyword and group, but only as whole substrings", () => {
    expect(ids("kotlin")).toEqual(["project:pokedex"]);
    expect(ids("theme")).toEqual(["theme:dark"]);
    expect(ids("ktln")).toEqual([]);
  });
});

describe("buildCommandIndex", () => {
  it("lists every project and has unique ids in both languages", () => {
    for (const [locale, messages] of [
      ["en", en],
      ["sk", sk],
    ] as const) {
      const index = buildCommandIndex(locale, messages);
      expect(new Set(index.map((command) => command.id)).size).toBe(index.length);
      for (const project of projects) {
        expect(index).toContainEqual(
          expect.objectContaining({ href: `/projects/${project.slug}` }),
        );
      }
    }
  });
});
