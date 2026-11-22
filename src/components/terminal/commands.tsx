"use client";

import type { useTranslations } from "next-intl";
import { type ReactNode, useEffect, useState } from "react";
import { getPalette, setPalette, setTheme } from "@/components/layout/appearance";
import { PALETTES, type Palette, type Theme } from "@/components/layout/theme-script";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import {
  COMMANDS,
  closest,
  cowsay,
  dir,
  type FsDir,
  file,
  grep,
  lookup,
  tree,
} from "@/lib/terminal";
import type messages from "../../../messages/en.json";
import {
  Cmd,
  Highlight,
  Lines,
  Progress,
  reducedMotion,
  Sequence,
  Table,
  Typewriter,
} from "./output";
import type { TerminalData } from "./terminal";

type HelpKey = keyof typeof messages.terminal.help;

/** Usage and an example to run when the row is clicked, in the order `help` lists them. */
export const HELP: [HelpKey, usage: string, example: string][] = [
  ["help", "help", "help"],
  ["whoami", "whoami", "whoami"],
  ["neofetch", "neofetch", "neofetch"],
  ["ls", "ls [folder]", "ls projects"],
  ["cd", "cd <folder>", "cd projects"],
  ["pwd", "pwd", "pwd"],
  ["tree", "tree [folder]", "tree"],
  ["cat", "cat <file>", "cat about.txt"],
  ["grep", "grep <text>", "grep react"],
  ["open", "open <name>", "open projects"],
  ["cv", "cv", "cv"],
  ["contact", "contact", "contact"],
  ["copy", "copy email", "copy email"],
  ["theme", "theme [name]", "theme"],
  ["lang", "lang <code>", "lang"],
  ["scheme", "scheme <name>", "scheme"],
  ["crt", "crt on|off", "crt"],
  ["history", "history", "history"],
  ["date", "date", "date"],
  ["echo", "echo <text>", "echo hello"],
  ["uptime", "uptime", "uptime"],
  ["ping", "ping <host>", "ping akoskappel.dev"],
  ["man", "man <command>", "man ls"],
  ["achievements", "achievements", "achievements"],
  ["clear", "clear", "clear"],
  ["exit", "exit", "exit"],
];

export const ACHIEVEMENTS = [
  "sudo",
  "rm",
  "vim",
  "matrix",
  "konami",
  "secrets",
  "hack",
  "teapot",
  "snake",
  "cowsay",
  "fortune",
] as const;
export type Achievement = (typeof ACHIEVEMENTS)[number];

export const SCHEMES = ["default", "green", "amber", "mono"] as const;
export type Settings = { scheme: (typeof SCHEMES)[number]; crt: boolean };
export type Mode = "vim" | "snake" | "matrix";

/** What a command can see and change; the terminal builds it for every command it runs. */
export type Shell = {
  t: ReturnType<typeof useTranslations<"terminal">>;
  languageName: (locale: Locale) => string;
  locale: Locale;
  data: TerminalData;
  fs: FsDir;
  cwd: string[];
  setCwd: (cwd: string[]) => void;
  history: string[];
  achieved: readonly string[];
  unlock: (achievement: Achievement) => void;
  /** Hides the prompt until the job ends; Ctrl+C aborts it through the signal. */
  startJob: () => { signal: AbortSignal; done: () => void };
  setMode: (mode: Mode) => void;
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  navigate: (href: string, locale?: Locale) => void;
};

const BASH_HISTORY = `ls projects
sudo make me a sandwich
vim notes.txt
cowsay hello
fortune
matrix
hack
snake
make coffee
rm -rf /`;

const FORTUNES = [
  "There are two hard things in computer science: cache invalidation, naming things and off-by-one errors.",
  "It works on my machine. My machine is also the production server.",
  "A good commit message says why. A great one also says why not.",
  "The fastest code is the code that never runs.",
  "Weeks of coding can save you hours of planning.",
  "99 little bugs in the code. Take one down, patch it around, 117 little bugs in the code.",
  "Real programmers count from 0.",
  "TODO: write a better fortune.",
];

const LOGO = String.raw`    _    _  __
   / \  | |/ /
  / _ \ | ' /
 / ___ \| . \
/_/   \_\_|\_\ `;

/** The visitor's home folder: the site's content as files. */
export function buildFs(data: TerminalData, secrets: string): FsDir {
  const files = <T,>(items: T[], name: (item: T) => string, content: (item: T) => string) =>
    Object.fromEntries(items.map((item) => [name(item), file(content(item))]));
  return dir({
    home: dir({
      guest: dir({
        "about.txt": file(data.about),
        "contact.txt": file(
          [`email: ${site.email}`, ...data.links.map((link) => `${link.name}: ${link.url}`)].join(
            "\n",
          ),
        ),
        "cv.pdf": file(""),
        ".bash_history": file(BASH_HISTORY),
        ".secrets": file(secrets),
        projects: dir(
          files(
            data.projects,
            (project) => `${project.slug}.md`,
            (project) => `# ${project.title}\n${project.years}\n\n${project.summary}`,
          ),
          "projects",
        ),
        skills: dir(
          files(
            data.skills,
            (group) => `${group.id}.txt`,
            (group) => `${group.name}\n${group.skills.join(", ")}`,
          ),
          "skills",
        ),
        jobs: dir(
          files(
            data.jobs,
            (job) => `${job.id}.txt`,
            (job) => `${job.role}, ${job.company}\n${job.period}`,
          ),
          "jobs",
        ),
      }),
    }),
  });
}

const formatUptime = () => {
  const seconds = Math.floor(performance.now() / 1000);
  return `${Math.floor(seconds / 60)} min, ${seconds % 60} s`;
};

/** Runs one command line (aliases and history already expanded) and returns what it prints. */
export function execute(line: string, shell: Shell): ReactNode {
  const { t, data, fs, cwd } = shell;
  const words = line.trim().split(/\s+/);
  const command = words[0].toLowerCase();
  const args = words.slice(1);
  const arg = args.join(" ");
  const usage = (name: HelpKey) =>
    t("usage", { usage: HELP.find(([key]) => key === name)?.[1] ?? name });

  if (args.includes("--help")) return manual(command, shell);

  switch (command) {
    case "help":
      return <HelpTable t={t} />;
    case "whoami":
      return <Typewriter text={data.whoami.join("\n")} />;
    case "neofetch":
      return <Neofetch shell={shell} />;
    case "ls":
      return list(args, shell);
    case "cd": {
      const { node, segments } = lookup(fs, cwd, arg || "~");
      if (!node) return t("noSuchFile", { command: "cd", path: arg });
      if (node.kind === "file") return t("notADirectory", { path: arg });
      shell.setCwd(segments);
      return null;
    }
    case "pwd":
      return `/${cwd.join("/")}`;
    case "tree": {
      const { node } = lookup(fs, cwd, arg || ".");
      if (!node) return t("noSuchFile", { command: "tree", path: arg });
      if (node.kind === "file") return arg;
      return <pre>{[arg || ".", ...tree(node)].join("\n")}</pre>;
    }
    case "cat": {
      if (!arg) return usage("cat");
      const { node, segments } = lookup(fs, cwd, arg);
      if (!node) return t("noSuchFile", { command: "cat", path: arg });
      if (node.kind === "dir") return t("isADirectory", { path: arg });
      if (segments.at(-1)?.endsWith(".pdf"))
        return t.rich("binaryFile", {
          path: arg,
          cmd: (chunks) => <Cmd command="cv">{chunks}</Cmd>,
        });
      if (segments.at(-1) === ".secrets") shell.unlock("secrets");
      return <Typewriter text={node.content} />;
    }
    case "grep": {
      if (!arg) return usage("grep");
      const { node } = lookup(fs, cwd, ".");
      const matches = node?.kind === "dir" ? grep(node, arg) : [];
      if (!matches.length) return t("noMatches", { term: arg });
      return (
        <ul>
          {matches.map((match) => (
            <li key={`${match.path}:${match.line}`}>
              <Cmd command={`cat ${match.path}`}>{match.path}</Cmd>:{" "}
              <Highlight text={match.line} term={arg} />
            </li>
          ))}
        </ul>
      );
    }
    case "open": {
      const name = arg.toLowerCase();
      if (!name) return usage("open");
      const project = data.projects.find((p) => p.slug === name);
      const page = data.pages.find((p) => p.name === name);
      const href = project ? `/projects/${project.slug}` : page?.href;
      if (!href) return t("unknownTarget", { name });
      shell.navigate(href);
      return t("opening", { name: project?.title ?? page?.label ?? name });
    }
    case "cv": {
      const pdf = site.cv.find((cv) => cv.locale === shell.locale) ?? site.cv[0];
      window.open(pdf.href, "_blank", "noopener");
      return (
        <>
          {t("cvOpening")}{" "}
          <a
            href={pdf.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {pdf.href}
          </a>
        </>
      );
    }
    case "contact":
      return <Contact data={data} />;
    case "copy":
      return arg === "email" ? <CopyEmail t={t} /> : usage("copy");
    case "theme":
      return theme(arg.toLowerCase(), shell);
    case "lang": {
      const locale = routing.locales.find((code) => code === arg.toLowerCase());
      if (locale) {
        shell.navigate("/terminal", locale);
        return t("langSwitching", { language: shell.languageName(locale) });
      }
      return (
        <Options
          label={usage("lang")}
          options={routing.locales.map((code) => [`lang ${code}`, shell.languageName(code)])}
        />
      );
    }
    case "scheme": {
      const scheme = SCHEMES.find((name) => name === arg.toLowerCase());
      if (!scheme)
        return (
          <Options
            label={usage("scheme")}
            options={SCHEMES.map((name) => [`scheme ${name}`, name])}
          />
        );
      shell.updateSettings({ scheme });
      return t("schemeSet", { scheme });
    }
    case "crt": {
      const crt = arg ? arg === "on" : !shell.settings.crt;
      if (arg && arg !== "on" && arg !== "off") return usage("crt");
      shell.updateSettings({ crt });
      return crt ? t("crtOn") : t("crtOff");
    }
    case "history":
      return (
        <ol>
          {shell.history.map((entry, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: history numbers are positions
            <li key={index}>
              <span className="inline-block w-10 text-right text-muted">{index + 1}</span>{" "}
              <Cmd command={entry} />
            </li>
          ))}
        </ol>
      );
    case "date":
      return new Intl.DateTimeFormat(shell.locale, {
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date());
    case "echo":
      return words
        .slice(1)
        .join(" ")
        .replaceAll("$USER", "guest")
        .replaceAll("$HOME", "/home/guest")
        .replaceAll("$SHELL", "/bin/akoskappel-sh");
    case "uptime":
      return `up ${formatUptime()}, 1 user, load average: 0.42, 0.13, 0.37`;
    case "ping": {
      const host = args[0];
      if (!host) return usage("ping");
      const replies = Array.from(
        { length: 4 },
        (_, seq) =>
          `64 bytes from ${host}: icmp_seq=${seq} ttl=57 time=${(8 + Math.random() * 12).toFixed(1)} ms`,
      );
      return job(shell, 600, [
        `PING ${host}: 56 data bytes`,
        ...replies,
        `--- ${host} ping statistics ---`,
        "4 packets transmitted, 4 packets received, 0.0% packet loss",
      ]);
    }
    case "man":
      return arg ? manual(arg.toLowerCase(), shell) : usage("man");
    case "achievements":
      return <Achievements t={t} achieved={shell.achieved} />;
    case "exit":
      shell.navigate("/");
      return t("opening", { name: "/" });

    // Easter eggs: not in help or completion, hinted at in ~/.bash_history.
    case "sudo":
      shell.unlock("sudo");
      if (arg === "make me a sandwich") return "Okay.";
      return "guest is not in the sudoers file. This incident will be reported.";
    case "make":
      if (arg === "me a sandwich") return "What? Make it yourself.";
      if (arg === "coffee") return teapot(shell);
      return arg
        ? `make: *** No rule to make target '${arg}'.  Stop.`
        : "make: *** No targets specified and no makefile found.  Stop.";
    case "coffee":
    case "brew":
      return teapot(shell);
    case "rm":
      return remove(args, shell);
    case "cowsay":
      shell.unlock("cowsay");
      return <pre>{cowsay(arg || "moo")}</pre>;
    case "fortune":
      shell.unlock("fortune");
      return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    case "vi":
    case "vim":
    case "nvim":
      shell.setMode("vim");
      return null;
    case "nano":
    case "emacs":
      return `${command}: command not found. vim is installed, though.`;
    case "hack":
      return job(
        shell,
        700,
        [
          "> initializing hack.exe",
          `> resolving ${new URL(site.url).host}… 127.0.0.1 (it was localhost all along)`,
          <Progress key="firewall" label="> bypassing firewall" />,
          <Progress key="passwords" label="> decrypting passwords" />,
          <Progress key="ram" label="> downloading more RAM" />,
          <span key="granted" className="font-bold text-accent">
            ACCESS GRANTED
          </span>,
          t.rich("hackJoke", { cmd: (chunks) => <Cmd command="contact">{chunks}</Cmd> }),
        ],
        () => shell.unlock("hack"),
      );
    case "matrix":
      if (reducedMotion()) return t("reducedMotion", { command });
      shell.unlock("matrix");
      shell.setMode("matrix");
      return null;
    case "snake":
      shell.setMode("snake");
      return null;
    default: {
      const suggestion = closest(command, COMMANDS);
      return (
        <>
          {t("notFound", { command })}
          {suggestion ? (
            <>
              {" "}
              {t.rich("didYouMean", {
                suggestion: [suggestion, ...args].join(" "),
                cmd: (chunks) => <Cmd command={[suggestion, ...args].join(" ")}>{chunks}</Cmd>,
              })}
            </>
          ) : null}
        </>
      );
    }
  }
}

function job(shell: Shell, delay: number, lines: ReactNode[], onFinish?: () => void) {
  const { signal, done } = shell.startJob();
  return (
    <Sequence
      lines={lines}
      delay={delay}
      signal={signal}
      onDone={(aborted) => {
        done();
        if (!aborted) onFinish?.();
      }}
    />
  );
}

function teapot(shell: Shell) {
  shell.unlock("teapot");
  return "418 I'm a teapot. Brewing coffee is not supported.";
}

function remove(args: string[], shell: Shell) {
  const forced = args.some((arg) => /^-\w*(rf|fr)\w*$/.test(arg));
  const everything = args.some((arg) => ["/", "/*", "~", "~/", "*", "."].includes(arg));
  if (!forced || !everything) {
    const target = args.filter((arg) => !arg.startsWith("-")).join(" ") || "";
    return `rm: cannot remove '${target}': Read-only file system`;
  }
  const folders = ["/bin", "/etc", "/usr", "/var", "/home/guest/projects", "/home/guest/cv.pdf"];
  return job(
    shell,
    350,
    [...folders.map((folder) => `removed '${folder}'`), shell.t("rmJoke")],
    () => shell.unlock("rm"),
  );
}

function manual(command: string, { t }: Shell) {
  const row = HELP.find(([key]) => key === command);
  if (!row) return t("noManual", { command });
  const [key, usage] = row;
  return <pre>{`NAME\n    ${key} - ${t(`help.${key}`)}\n\nSYNOPSIS\n    ${usage}`}</pre>;
}

function theme(name: string, shell: Shell) {
  const modes = Object.keys(PALETTES) as Theme[];
  const mode = modes.find(
    (option) => option === name || (PALETTES[option] as readonly string[]).includes(name),
  );
  if (mode) {
    if (name === mode) setTheme(mode);
    else setPalette(mode, name as Palette);
    return shell.t("themeSet", { theme: name });
  }
  return (
    <Options
      label={`${shell.t("usage", { usage: "theme [name]" })} · ${shell.t("current", { value: getPalette() })}`}
      options={modes.flatMap((option) =>
        PALETTES[option].map((palette): [string, string] => [`theme ${palette}`, palette]),
      )}
    />
  );
}

function list(args: string[], shell: Shell): ReactNode {
  const { t, fs, cwd, data } = shell;
  const flags = args.filter((arg) => arg.startsWith("-")).join("");
  const path = args.find((arg) => !arg.startsWith("-")) ?? ".";
  const { node } = lookup(fs, cwd, path);
  if (!node) return t("noSuchFile", { command: "ls", path });
  if (node.kind === "file") return path;
  const all = flags.includes("a");
  const long = flags.includes("l");

  if (!all && !long && node.view === "projects")
    return (
      <ul>
        {data.projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
              {project.slug}
            </Link>{" "}
            <span className="text-muted">({project.years})</span> {project.summary}
          </li>
        ))}
      </ul>
    );
  if (!all && !long && node.view === "skills")
    return <Table rows={data.skills.map((group) => [group.name, group.skills.join(", ")])} />;
  if (!all && !long && node.view === "jobs")
    return <Table rows={data.jobs.map((job) => [job.period, `${job.role}, ${job.company}`])} />;

  const prefix = path === "." ? "" : path.replace(/\/?$/, "/");
  const entries = Object.entries(node.children).filter(([name]) => all || !name.startsWith("."));
  const link = (name: string, isDir: boolean) => (
    <Cmd command={`${isDir ? "cd" : "cat"} ${prefix}${name}`}>
      {name}
      {isDir ? "/" : ""}
    </Cmd>
  );
  if (long)
    return (
      <ul className="whitespace-pre">
        {entries.map(([name, child]) => (
          <li key={name}>
            {child.kind === "dir" ? "drwxr-xr-x" : "-rw-r--r--"} guest guest{" "}
            {String(child.kind === "dir" ? 4096 : child.content.length).padStart(5)}{" "}
            {link(name, child.kind === "dir")}
          </li>
        ))}
      </ul>
    );
  return (
    <div className="flex flex-wrap gap-x-6">
      {entries.map(([name, child]) => (
        <span key={name}>{link(name, child.kind === "dir")}</span>
      ))}
    </div>
  );
}

export function HelpTable({ t }: { t: Shell["t"] }) {
  return (
    <Table
      rows={HELP.map(([key, usage, example]) => [
        <Cmd key={key} command={example}>
          {usage}
        </Cmd>,
        t(`help.${key}`),
      ])}
    />
  );
}

/** A usage line followed by clickable choices. */
function Options({ label, options }: { label: string; options: [string, string][] }) {
  return (
    <>
      <p>{label}</p>
      <div className="flex flex-wrap gap-x-4">
        {options.map(([command, name]) => (
          <Cmd key={command} command={command}>
            {name}
          </Cmd>
        ))}
      </div>
    </>
  );
}

function Contact({ data }: { data: TerminalData }) {
  return (
    <ul>
      <li>
        email:{" "}
        <a href={`mailto:${site.email}`} className="text-accent hover:underline">
          {site.email}
        </a>{" "}
        <span className="text-muted">
          (<Cmd command="copy email" />)
        </span>
      </li>
      {data.links.map((link) => (
        <li key={link.name}>
          {link.name}:{" "}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {link.url.replace(/^https:\/\//, "")}
          </a>
        </li>
      ))}
    </ul>
  );
}

function CopyEmail({ t }: { t: Shell["t"] }) {
  const [state, setState] = useState<"pending" | "copied" | "failed">("pending");

  useEffect(() => {
    // The clipboard API is missing outside secure contexts, which would throw synchronously.
    Promise.resolve()
      .then(() => navigator.clipboard.writeText(site.email))
      .then(
        () => setState("copied"),
        () => setState("failed"),
      );
  }, []);

  if (state === "pending") return null;
  return state === "copied"
    ? t("copied", { email: site.email })
    : t("copyFailed", { email: site.email });
}

function Achievements({ t, achieved }: { t: Shell["t"]; achieved: readonly string[] }) {
  return (
    <>
      <ul>
        {ACHIEVEMENTS.map((id) => (
          <li key={id}>
            {achieved.includes(id) ? (
              <>
                <span className="text-accent">★</span> {t(`achievements.${id}`)}
              </>
            ) : (
              <span className="text-muted">☆ ???</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-2">
        {t("achievementsFound", { found: achieved.length, total: ACHIEVEMENTS.length })}
      </p>
      {achieved.length < ACHIEVEMENTS.length ? (
        <p className="text-muted">{t("achievementsHint")}</p>
      ) : null}
    </>
  );
}

function Neofetch({ shell }: { shell: Shell }) {
  const { data, locale, settings } = shell;
  const host = new URL(site.url).host;
  const rows: [string, string][] = [
    ["OS", "Portfolio OS (Next.js, React, TypeScript)"],
    ["Host", host],
    ["Uptime", formatUptime()],
    ["Shell", "akoskappel-sh 1.0"],
    ["Resolution", `${screen.width}x${screen.height}`],
    ["Theme", getPalette()],
    ["Terminal", `${settings.scheme}${settings.crt ? " (crt)" : ""}`],
    ["Locale", locale],
    ["Name", site.name],
    ["Role", data.whoami[1]],
    ["Location", data.whoami[2]],
    ["Status", data.whoami[3]],
  ];
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      <pre aria-hidden className="font-bold text-accent">
        {LOGO}
      </pre>
      <div>
        <p>
          <span className="font-bold text-accent">guest</span>@
          <span className="font-bold text-accent">{host}</span>
        </p>
        <p aria-hidden>{"-".repeat(`guest@${host}`.length)}</p>
        <Lines
          lines={rows.map(([label, value]) => (
            <>
              <span className="font-bold text-accent">{label}</span>: {value}
            </>
          ))}
        />
        <p aria-hidden className="mt-2 flex">
          {Array.from({ length: 8 }, (_, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed colour swatches
              key={index}
              className="inline-block h-4 w-6"
              style={{ background: `var(--series-${index + 1})` }}
            />
          ))}
        </p>
      </div>
    </div>
  );
}
