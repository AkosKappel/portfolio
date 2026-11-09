import { rankItem, rankings } from "@tanstack/match-sorter-utils";
import type { Palette, Theme } from "../components/layout/theme-script";
import type { Locale } from "../i18n/routing";

export type CommandAction =
  | { type: "theme"; theme: Theme }
  | { type: "palette"; theme: Theme; palette: Palette }
  | { type: "locale"; locale: Locale }
  | { type: "copy"; text: string };

/** One entry of the command palette: a link (`href`) or an action. Labels are already translated. */
export type Command = {
  id: string;
  group: string;
  label: string;
  keywords?: string[];
  href?: string;
  action?: CommandAction;
};

/**
 * Best matches first, the original order on ties; an empty query keeps every command.
 * The group and keywords only match whole substrings. Labels also allow missing letters
 * ("exprnce"), but only when nothing matches as a substring: in short labels such loose
 * matches are mostly noise ("core" would find "Switch to dark theme").
 */
export function filterCommands(commands: Command[], query: string): Command[] {
  const value = query.trim();
  if (!value) return commands;
  const ranked = commands
    .map((command, index) => ({
      command,
      index,
      ranking: rankItem(command, value, {
        accessors: [
          (command) => command.label,
          { accessor: (command) => command.group, threshold: rankings.CONTAINS },
          { accessor: (command) => command.keywords ?? [], threshold: rankings.CONTAINS },
        ],
      }),
    }))
    .filter(({ ranking }) => ranking.passed)
    .sort((a, b) => b.ranking.rank - a.ranking.rank || a.index - b.index);
  const close = ranked.filter(({ ranking }) => ranking.rank >= rankings.CONTAINS);
  return (close.length ? close : ranked).map(({ command }) => command);
}
