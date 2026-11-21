/** Pure helpers behind the terminal page: completion, suggestions, history and a small fake filesystem. */

/** Commands listed in `help`. Easter eggs stay out of completion and suggestions so they remain hidden. */
export const COMMANDS = [
  "achievements",
  "cat",
  "cd",
  "clear",
  "contact",
  "copy",
  "crt",
  "cv",
  "date",
  "echo",
  "exit",
  "grep",
  "help",
  "history",
  "lang",
  "ls",
  "man",
  "neofetch",
  "open",
  "ping",
  "pwd",
  "scheme",
  "theme",
  "tree",
  "uptime",
  "whoami",
];

export const ALIASES: Record<string, string> = {
  ll: "ls -l",
  la: "ls -a",
  dir: "ls",
  cls: "clear",
  quit: "exit",
  logout: "exit",
  "?": "help",
};

const PATH_COMMANDS = new Set(["cd", "ls", "cat", "tree", "grep"]);

export const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export type FsFile = { kind: "file"; content: string };
/** `view` names a richer listing the terminal shows for that folder instead of plain names. */
export type FsDir = { kind: "dir"; children: Record<string, FsNode>; view?: string };
export type FsNode = FsFile | FsDir;

export const HOME = ["home", "guest"];

export const dir = (children: Record<string, FsNode>, view?: string): FsDir => ({
  kind: "dir",
  children,
  view,
});
export const file = (content: string): FsFile => ({ kind: "file", content });

/** Turns a path typed at `cwd` into absolute segments, understanding `~`, `.` and `..`. */
export function resolve(cwd: string[], path: string): string[] {
  const absolute = path.startsWith("/");
  const home = path === "~" || path.startsWith("~/");
  const segments = absolute ? [] : home ? [...HOME] : [...cwd];
  for (const part of (home ? path.slice(1) : path).split("/")) {
    if (part === "..") segments.pop();
    else if (part && part !== ".") segments.push(part);
  }
  return segments;
}

function nodeAt(root: FsDir, segments: string[]): FsNode | undefined {
  let node: FsNode | undefined = root;
  for (const segment of segments) {
    node = node?.kind === "dir" ? node.children[segment] : undefined;
  }
  return node;
}

/** Finds a node; `cat about` also finds `about.txt`, as the terminal accepted bare names before. */
export function lookup(root: FsDir, cwd: string[], path: string) {
  const segments = resolve(cwd, path);
  const node = nodeAt(root, segments);
  if (node || !segments.length) return { segments, node };
  const parent = nodeAt(root, segments.slice(0, -1));
  const name = segments.at(-1) as string;
  const match =
    parent?.kind === "dir"
      ? Object.keys(parent.children).find((child) => child.replace(/\.\w+$/, "") === name)
      : undefined;
  return match
    ? { segments: [...segments.slice(0, -1), match], node: (parent as FsDir).children[match] }
    : { segments, node: undefined };
}

/** `~/projects` for paths inside the home folder, the absolute path otherwise. */
export function displayPath(segments: string[]) {
  const inHome = HOME.every((part, index) => segments[index] === part);
  if (inHome) return ["~", ...segments.slice(HOME.length)].join("/");
  return `/${segments.join("/")}`;
}

/** Lines of a `tree` drawing; hidden entries are left out, as `tree` does by default. */
export function tree(node: FsDir, prefix = ""): string[] {
  const names = Object.keys(node.children).filter((name) => !name.startsWith("."));
  return names.flatMap((name, index) => {
    const last = index === names.length - 1;
    const child = node.children[name];
    const line = `${prefix}${last ? "└── " : "├── "}${name}${child.kind === "dir" ? "/" : ""}`;
    if (child.kind === "file") return [line];
    return [line, ...tree(child, `${prefix}${last ? "    " : "│   "}`)];
  });
}

/** Every line of every visible file under `node` that contains `term`, ignoring case. */
export function grep(node: FsDir, term: string, path = ""): { path: string; line: string }[] {
  const needle = term.toLowerCase();
  return Object.entries(node.children).flatMap(([name, child]) => {
    if (name.startsWith(".")) return [];
    const childPath = path ? `${path}/${name}` : name;
    if (child.kind === "dir") return grep(child, term, childPath);
    return child.content
      .split("\n")
      .filter((line) => line.toLowerCase().includes(needle))
      .map((line) => ({ path: childPath, line }));
  });
}

/** What Tab can complete the last word of `input` to. */
export function completionOptions(
  input: string,
  args: Record<string, readonly string[]>,
  root: FsDir,
  cwd: string[],
): string[] {
  const words = input.split(" ");
  if (words.length === 1) return COMMANDS;
  const [command] = words;
  if (!PATH_COMMANDS.has(command)) return [...(args[command] ?? [])];
  const word = words.at(-1) as string;
  const folder = word.slice(0, word.lastIndexOf("/") + 1);
  const node = nodeAt(root, resolve(cwd, folder || "."));
  if (node?.kind !== "dir") return [];
  const showHidden = word.slice(folder.length).startsWith(".");
  return Object.entries(node.children)
    .filter(([name]) => showHidden || !name.startsWith("."))
    .filter(([, child]) => command !== "cd" || child.kind === "dir")
    .map(([name, child]) => `${folder}${name}${child.kind === "dir" ? "/" : ""}`);
}

/**
 * Tab completion as in bash: completes as far as all matches agree and returns the matches,
 * so a second Tab can list them. A finished command gets a trailing space.
 */
export function complete(input: string, options: readonly string[]) {
  const start = input.lastIndexOf(" ") + 1;
  const word = input.slice(start).toLowerCase();
  const matches = options.filter((option) => option.toLowerCase().startsWith(word));
  if (!matches.length) return { value: input, matches };
  const prefix = commonPrefix(matches);
  const done = matches.length === 1 && start === 0;
  return { value: input.slice(0, start) + prefix + (done ? " " : ""), matches };
}

function commonPrefix(words: string[]) {
  let prefix = words[0];
  for (const word of words) {
    while (!word.toLowerCase().startsWith(prefix.toLowerCase())) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/** The greyed-out rest of the line, as in fish: the newest matching history entry, else a command. */
export function suggestion(input: string, history: string[]) {
  if (!input) return "";
  const match =
    [...history].reverse().find((entry) => entry.startsWith(input)) ??
    COMMANDS.find((command) => command.startsWith(input));
  return match ? match.slice(input.length) : "";
}

/** The closest of `options` to a mistyped `word`, if it is only a typo or two away. */
export function closest(word: string, options: readonly string[]) {
  let best: string | undefined;
  let bestDistance = Math.min(2, word.length - 1);
  for (const option of options) {
    const distance = levenshtein(word.toLowerCase(), option);
    if (distance <= bestDistance) {
      best = option;
      bestDistance = distance - 1;
    }
  }
  return best;
}

function levenshtein(a: string, b: string) {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
    }
    previous = current;
  }
  return previous[b.length];
}

/** Expands `!!` (last command) and `!n` (the nth history entry). Undefined when the event is missing. */
export function expandHistory(input: string, history: string[]): string | undefined {
  const numbered = /^!(\d+)$/.exec(input);
  if (numbered) return history[Number(numbered[1]) - 1];
  if (!input.includes("!!")) return input;
  const last = history.at(-1);
  return last === undefined ? undefined : input.replaceAll("!!", last);
}

const COW = String.raw`        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`;

/** A cow saying `text` in a speech bubble, wrapped at 40 characters. */
export function cowsay(text: string) {
  const lines: string[] = [];
  for (const word of text.split(/\s+/)) {
    const last = lines.at(-1);
    if (last !== undefined && `${last} ${word}`.length <= 40)
      lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  const width = Math.max(...lines.map((line) => line.length));
  const edges = (index: number) => {
    if (lines.length === 1) return ["<", ">"];
    if (index === 0) return ["/", "\\"];
    if (index === lines.length - 1) return ["\\", "/"];
    return ["|", "|"];
  };
  const bubble = lines.map((line, index) => {
    const [left, right] = edges(index);
    return `${left} ${line.padEnd(width)} ${right}`;
  });
  return [` ${"_".repeat(width + 2)}`, ...bubble, ` ${"-".repeat(width + 2)}`, COW].join("\n");
}
