const COMMANDS = ["help", "whoami", "ls", "cat", "open", "contact", "clear", "exit"];
const ARGUMENTS: Record<string, string[]> = { ls: ["projects", "skills", "jobs"], cat: ["about"] };

/**
 * Tab completion for the terminal page: completes the command, or the argument of `ls`,
 * `cat` and `open`, when exactly one option starts with what was typed.
 */
export function complete(input: string, openTargets: string[]) {
  const parts = input.split(" ");
  const [command] = parts;
  const options =
    parts.length === 1 ? COMMANDS : command === "open" ? openTargets : (ARGUMENTS[command] ?? []);
  const prefix = (parts.at(-1) ?? "").toLowerCase();
  const matches = options.filter((option) => option.startsWith(prefix));
  if (matches.length !== 1) return input;
  return [...parts.slice(0, -1), matches[0]].join(" ") + (parts.length === 1 ? " " : "");
}
